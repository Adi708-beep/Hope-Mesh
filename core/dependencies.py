from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from bson import ObjectId

from app.core.config import settings
from app.db.db import membership_collection, ngo_collection, users_collection

bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_token_payload(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token",
        )

    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
    except JWTError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
        ) from error

    user_id = str(payload.get("user_id") or "").strip()
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token payload",
        )

    return {
        "user_id": user_id,
        "email": str(payload.get("email") or "").strip().lower(),
    }


def _extract_ngo_id(document: dict | None) -> str:
    if not isinstance(document, dict):
        return ""

    for key in ("ngo_id", "ngoId", "organization_id", "organizationId"):
        value = str(document.get(key) or "").strip()
        if value:
            return value

    return ""


def _parse_object_id(value: str) -> ObjectId | None:
    if ObjectId.is_valid(value):
        return ObjectId(value)
    return None


async def get_current_ngo_id(payload: dict = Depends(get_current_token_payload)) -> str:
    user_id = payload["user_id"]
    user_object_id = _parse_object_id(user_id)

    ngo = await ngo_collection.find_one(
        {"admin_id": user_id},
        {"ngo_id": 1},
    )
    ngo_id = _extract_ngo_id(ngo)
    if ngo_id:
        return ngo_id

    user_filters = [{"_id": user_id}]
    if user_object_id:
        user_filters.append({"_id": user_object_id})

    user = await users_collection.find_one(
        {"$or": user_filters},
        {"ngo_id": 1, "ngoId": 1, "organization_id": 1, "organizationId": 1},
    )
    ngo_id = _extract_ngo_id(user)
    if ngo_id:
        return ngo_id

    membership_user_filters = [{"user_id": user_id}, {"userId": user_id}]
    if user_object_id:
        membership_user_filters.extend(
            [{"user_id": user_object_id}, {"userId": user_object_id}]
        )

    membership = await membership_collection.find_one(
        {
            "$and": [
                {"$or": membership_user_filters},
                {"status": {"$nin": ["inactive", "removed"]}},
                {"is_active": {"$ne": False}},
            ]
        },
        {
            "ngo_id": 1,
            "ngoId": 1,
            "organization_id": 1,
            "organizationId": 1,
        },
    )

    ngo_id = _extract_ngo_id(membership)

    if not ngo_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Authenticated user is not linked to any NGO",
        )

    return ngo_id
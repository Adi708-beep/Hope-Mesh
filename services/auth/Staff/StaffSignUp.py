from fastapi import HTTPException
from app.db.db import users_collection, ngo_collection
from app.core.security import hash_password
from app.services.auth.user_id import generate_next_ngo_member_id


async def signup_staff(data):
    """Create a new staff member for an NGO."""

    # Verify NGO exists
    ngo = await ngo_collection.find_one({"ngo_id": data.ngo_id})
    if not ngo:
        raise HTTPException(status_code=400, detail="NGO does not exist")

    # Check if email already exists
    existing = await users_collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = await generate_next_ngo_member_id(ngo_id=data.ngo_id, role="staff")

    # Create staff user
    staff_user = {
        "user_id": user_id,
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "ngo_id": data.ngo_id,
        "role": "staff",
        "designation": data.designation,
        "contact_number": data.contact_number,
    }

    await users_collection.insert_one(staff_user)

    return {
        "message": "Staff member created successfully",
        "user_id": user_id,
        "staff_id": user_id,
        "ngo_id": data.ngo_id,
    }

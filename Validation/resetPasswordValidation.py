import re

from pydantic import BaseModel, Field, field_validator


class ResetPasswordValidationSchema(BaseModel):
    token: str = Field(..., min_length=20, max_length=512)
    new_password: str = Field(..., min_length=8, max_length=128)
    confirm_password: str = Field(..., min_length=8, max_length=128)

    @field_validator("token")
    @classmethod
    def validate_token(cls, value: str) -> str:
        token = value.strip()

        if not token:
            raise ValueError("Token is required")
        if not re.match(r"^[A-Za-z0-9_\-]+$", token):
            raise ValueError("Token format is invalid")

        return token

    @field_validator("new_password")
    @classmethod
    def validate_new_password(cls, value: str) -> str:
        password = value.strip()

        if len(password) < 8:
            raise ValueError("Password should be at least 8 characters")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", password):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[^A-Za-z0-9]", password):
            raise ValueError("Password must contain at least one special character")

        return password

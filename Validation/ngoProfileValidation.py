from pydantic import BaseModel, Field, EmailStr

class NGOProfileValidationSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    address: str = Field(..., min_length=1)
    password: str = Field(..., min_length=6)
    description: str = Field(..., min_length=1)

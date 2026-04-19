from pydantic import BaseModel, EmailStr


class EmailRequest(BaseModel):
    to_email: EmailStr
    to_name: str
    subject: str
    html_content: str

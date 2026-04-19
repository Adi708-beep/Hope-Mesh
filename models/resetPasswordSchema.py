from pydantic import BaseModel


class ResetPasswordSchema(BaseModel):
    token: str
    new_password: str

from typing import Literal

from pydantic import BaseModel


class UserSignUpSchema(BaseModel):
    name: str
    email: str
    password: str
    skill: Literal[
        "Food shortage",
        "Medical help",
        "Shelter",
        "Education",
        "Disaster relief",
        "Other",
    ]

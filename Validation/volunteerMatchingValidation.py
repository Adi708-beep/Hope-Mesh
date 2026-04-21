from typing import Optional

from pydantic import BaseModel, Field, field_validator, model_validator


class VolunteerMatchingValidationSchema(BaseModel):
    need_id: Optional[str] = Field(default=None, min_length=1, max_length=128)
    submitted_by: Optional[str] = Field(default=None, min_length=1, max_length=128)
    max_volunteers: int = Field(default=50, ge=1, le=300)
    max_ranked_results: int = Field(default=10, ge=1, le=50)

    @field_validator("need_id", "submitted_by", mode="before")
    @classmethod
    def normalize_optional_text(cls, value):
        if value is None:
            return None

        cleaned_value = str(value).strip()
        if not cleaned_value:
            return None

        return cleaned_value

    @model_validator(mode="after")
    def validate_identifier_and_limits(self):
        if not self.need_id and not self.submitted_by:
            raise ValueError("Either need_id or submitted_by is required")

        if self.max_ranked_results > self.max_volunteers:
            raise ValueError("max_ranked_results cannot be greater than max_volunteers")

        return self

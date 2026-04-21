from fastapi import APIRouter, Depends

from app.Validation.volunteerMatchingValidation import (
    VolunteerMatchingValidationSchema,
)
from app.core.dependencies import get_current_ngo_id
from app.models.volunteerMatchingSchema import VolunteerMatchResponseSchema
from app.services.matching.VolunteerMatching import rank_volunteers_for_need

router = APIRouter(prefix="/volunteer-matching", tags=["Volunteer Matching"])


@router.post("/rank", response_model=VolunteerMatchResponseSchema)
async def rank_volunteers_controller(
    data: VolunteerMatchingValidationSchema,
    ngo_id: str = Depends(get_current_ngo_id),
):
    return await rank_volunteers_for_need(data, ngo_id)

from fastapi import APIRouter, Query

from app.Validation.surveyDataControlValidation import SurveyDataControlValidationSchema
from app.models.surveyDataControlSchema import (
    SurveyDataControlCreateResponseSchema,
    SurveyDataControlListResponseSchema,
)
from app.services.survey.SurveyDataControl import (
    create_survey_data_control,
    get_latest_survey_data_control_for_user,
    get_survey_data_controls,
)

router = APIRouter(prefix="/survey-data-control", tags=["Survey Data Control"])


@router.post("", response_model=SurveyDataControlCreateResponseSchema)
async def create_survey_data_control_controller(data: SurveyDataControlValidationSchema):
    return await create_survey_data_control(data)


@router.get("", response_model=SurveyDataControlListResponseSchema)
async def get_survey_data_control_controller(limit: int = Query(default=50, ge=1, le=200)):
    return await get_survey_data_controls(limit)


@router.get("/result/{submitted_by}", response_model=SurveyDataControlCreateResponseSchema)
async def get_latest_survey_result_controller(submitted_by: str):
    return await get_latest_survey_data_control_for_user(submitted_by)
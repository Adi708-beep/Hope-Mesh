from typing import List, Optional

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

from app.core.config import get_settings
from app.services.email.emailConfig import campaign_api

settings = get_settings()


def create_email_campaign(
    name: str,
    subject: str,
    html_content: str,
    list_ids: List[int],
    sender_name: Optional[str] = None,
    sender_email: Optional[str] = None,
    scheduled_at: Optional[str] = None,
):
    email_from = sender_email or settings.EMAIL_FROM or settings.BREVO_SENDER_EMAIL
    if not settings.brevo_api_key:
        raise RuntimeError("Missing Brevo API key in environment")
    if not email_from:
        raise RuntimeError("Missing EMAIL_FROM or BREVO_SENDER_EMAIL in environment")

    campaign_payload = sib_api_v3_sdk.CreateEmailCampaign(
        name=name,
        subject=subject,
        sender={
            "name": sender_name or settings.APP_NAME,
            "email": email_from,
        },
        type="classic",
        html_content=html_content,
        recipients={"listIds": list_ids},
        scheduled_at=scheduled_at,
    )

    try:
        return campaign_api.create_email_campaign(campaign_payload)
    except ApiException as error:
        raise RuntimeError(
            f"Exception when calling EmailCampaignsApi->create_email_campaign: {error}"
        ) from error

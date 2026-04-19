from fastapi import APIRouter
from app.models.Users.signUpSchema import UserSignUpSchema
from app.models.NGO.signUpSchema import NgoSignUpSchema
from app.models.logInSchema import loginSchema
from app.Validation.forgotPasswordValidation import ForgotPasswordValidationSchema
from app.Validation.resetPasswordValidation import ResetPasswordValidationSchema
from app.models.token import Token
from app.services.auth.Users.userSignUp import signup_user
from app.services.auth.NGO.NgoSignUp import signup_ngo
from app.services.auth.LogIn import login_user
from app.services.auth.ForgotPassword import forgot_password
from app.services.auth.ResetPassword import (
    reset_password,
    validate_reset_password_token,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup/user")
async def register_user(data: UserSignUpSchema):
    return await signup_user(data)


@router.post("/signup/ngo")
async def register_ngo(data: NgoSignUpSchema):
    return await signup_ngo(data)


@router.post("/login", response_model=Token)
async def login(data: loginSchema):
    return await login_user(data)


@router.post("/forgot-password")
async def forgot_password_controller(data: ForgotPasswordValidationSchema):
    return await forgot_password(data)


@router.post("/reset-password")
async def reset_password_controller(data: ResetPasswordValidationSchema):
    return await reset_password(data)


@router.get("/reset-password/validate")
async def validate_reset_password_token_controller(token: str):
    return await validate_reset_password_token(token)
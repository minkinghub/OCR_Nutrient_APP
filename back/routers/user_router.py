from fastapi import APIRouter
from controllers import auth_controller, user_controller

router = APIRouter()

router.include_router(auth_controller.router, prefix="/auth", tags=["auth"])
router.include_router(user_controller.router, prefix="/user", tags=["user"])

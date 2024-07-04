from fastapi import APIRouter, Depends, Request
from models.nutrient_data import Nutrient
from controllers.nutrient_controller import  get_nutrients_from_db
from controllers.auth_controller import get_current_user_id

router = APIRouter()


@router.get("/get_nutrient/")
async def get_nutrient(user_id: str = Depends(get_current_user_id)):
    return await get_nutrients_from_db(user_id)

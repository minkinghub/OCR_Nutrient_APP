from fastapi import APIRouter, Depends, HTTPException
from models.nutrient_data import Nutrient
from controllers.nutrient_controller import add_nutrient_to_db, get_nutrients_from_db
from controllers.auth_controller import get_current_user_id

router = APIRouter()

@router.post("/add_nutrient/")
def add_nutrient(nutrient: Nutrient, user_id: str = Depends(get_current_user_id)):
    return add_nutrient_to_db(nutrient)

@router.get("/get_nutrient/")
def get_nutrient(user_id: str = Depends(get_current_user_id)):
    return get_nutrients_from_db(user_id)

from pydantic import BaseModel
from typing import Optional, Dict

class Nutrient(BaseModel):
    product_id: str
    product_name: str
    serving_size: str
    calories: Optional[int] = None
    sodium: Optional[int] = None
    carbohydrate: Optional[int] = None
    sugars: Optional[int] = None
    fat: Optional[int] = None
    trans_fat: Optional[int] = None
    saturated_fat: Optional[int] = None
    cholesterol: Optional[int] = None
    protein: Optional[int] = None
    calcium: Optional[int] = None
    phosphorus: Optional[int] = None
    iron: Optional[int] = None
    potassium: Optional[int] = None
    mineral: Optional[int] = None
    vitamin_a_re: Optional[int] = None
    vitamin_a_carotene: Optional[int] = None
    vitamin_b1: Optional[int] = None
    vitamin_b2: Optional[int] = None
    niacin: Optional[int] = None
    vitamin_c: Optional[int] = None
    vitamin_b6: Optional[int] = None
    folic_acid: Optional[int] = None
    user_id: str

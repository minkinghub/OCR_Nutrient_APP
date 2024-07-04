from pydantic import BaseModel

class Nutrient(BaseModel):
    calories: float = 0.0  # 칼로리
    carbohydrate: float = 0.0  # 탄수화물
    protein: float = 0.0  # 단백질
    fat: float = 0.0  # 지방
    sodium: float = 0.0  # 나트륨
    sugars: float = 0.0  # 당류
    saturated_fat: float = 0.0  # 포화지방
    trans_fat: float = 0.0  # 트랜스지방
    cholesterol: float = 0.0  # 콜레스테롤
    calcium: float = 0.0  # 칼슘

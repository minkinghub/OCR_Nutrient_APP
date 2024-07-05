from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import copy
from models.upload_model import ImageBase64
from controllers.upload_controller import upload_controller
from controllers.nutrient_controller import process_and_store_nutrition, extract_nutrition_info
from models.nutrient_data import Nutrient
from controllers.auth_controller import get_current_user_id
router = APIRouter()

"""
총 내용량 74g(18.5gx 4봉지) 
영양정보 1봉지(18.5g)당 85kcal/ 총 343kcal
1봉지당 1일 영양성분 기준치에대한비율 총 내용량당
나트륨 85 mg 4% 338 mg 17%
탄수화물 14 g 4% 54 g 17%
당류 2 g 2% 9 g 9%
지방 2.6 g 5% 11 g 20%
트랜스지방 0 g 0 g
포화지방 0.7 g 5% 2.8 g 19%
콜레스테롤 4 mg 1% 14 mg 5%
단백질 2g 4% 7 g 13%
1일 영양성분 기준치에 대한 비율(%)은 2,000kcal
기준이므로 개인의 필요 열량에 따라 다를 수 있습니다.
"""

@router.post("/upload")
async def upload_router(image: ImageBase64):
    text = upload_controller(image)  # 이미지에서 텍스트를 추출하는 함수 호출
    print(text)
    
    if not text:
        raise HTTPException(status_code=400, detail="No text extracted from image")
    
    nutrient_info = extract_nutrition_info(text)
    nutrient_data = Nutrient(**nutrient_info)
    result = await process_and_store_nutrition(nutrient_data, image.user_id)
    return result
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
#대한민국 #대표콘 #부라보콘
•총 내용량 140ml 230 kcal
납자는 바닐라맛을
영양정보
라빈시드입니다.
천천히 녹여드십시오
환경을 깨끗이
O
나트륨 65 mg 3% 탄수화물 32 g 10% 당류 19 g 19% 지방9g17%
트랜스지방 0g 포화지방 5g33% 콜레스테롤 10 mg 3% 단백질 5g9%
1일 영양성분 기준치에 대한 비율(%)은 2,000 kcal 기준이므로 개인의 필요 열량에 따라 다를 수 있습니다.
O
"""

@router.post("/upload")
async def upload_router(image: ImageBase64, request:Request):
    user_id = await get_current_user_id(request)
    if not user_id:
        raise HTTPException(status_code=401, detail="upload_router: Not authenticated")
    
    text = upload_controller(image)  # 이미지에서 텍스트를 추출하는 함수 호출
    if not text:
        raise HTTPException(status_code=400, detail="No text extracted from image")
    

    nutrient_info = extract_nutrition_info(text)
    nutrient_data = Nutrient(**nutrient_info)
    result = await process_and_store_nutrition(nutrient_data, request)
    return result
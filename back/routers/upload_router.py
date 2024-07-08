from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.upload_model import ImageBase64
from controllers.upload_controller import upload_controller, crop_nutrition_info
from controllers.nutrient_controller import process_and_store_nutrition, extract_nutrition_info
from models.nutrient_data import Nutrient
import re
import base64

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
async def upload_router(image: ImageBase64): #이미지에서 텍스트를 추출하는 함수 호출
    text = upload_controller(image) # 이미지에서 텍스트를 추출하는 함수 호출
    print(text)
    
    nutrient_info = extract_nutrition_info(text)
    nutrient_data = Nutrient(**nutrient_info)
    final_result = await process_and_store_nutrition(nutrient_data, image.user_id)
    return final_result

@router.post("/boxedimage")
async def upload_router(image: ImageBase64):
    try:
        # base64 문자열에서 헤더와 데이터 분리
        match = re.match(r'data:image/(\w+);base64,(.+)', image.base64)
        if match:
            image_format, base64_data = match.groups()
        else:
            # 헤더가 없는 경우 전체를 데이터로 간주
            image_format = 'png'  # 기본값으로 PNG 설정
            base64_data = image.base64

        # 패딩 추가
        base64_data += '=' * ((4 - len(base64_data) % 4) % 4)

        # base64 문자열 디코딩
        image_data = base64.b64decode(base64_data)

        # 필요한 부분만 자르기
        cropped_images = crop_nutrition_info(image_data)

        return JSONResponse(content={"cropped_images": cropped_images})

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": str(e)})
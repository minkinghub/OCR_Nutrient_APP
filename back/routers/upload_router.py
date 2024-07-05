from fastapi import APIRouter, HTTPException
from models.upload_model import ImageBase64
from controllers.upload_controller import upload_controller
from controllers.nutrient_controller import process_and_store_nutrition, extract_nutrition_info
from models.nutrient_data import Nutrient

router = APIRouter()

@router.post("/upload")
async def upload_router(image: ImageBase64):
    result = upload_controller(image)  # 이미지에서 텍스트를 추출하는 함수 호출
    
    if result["type"] == "nutritional label":
        text = result["data"]["ocr_result"]
        if not text:
            raise HTTPException(status_code=400, detail="No text extracted from image")
        
        nutrient_info = extract_nutrition_info(text)
        nutrient_data = Nutrient(**nutrient_info)
        final_result = await process_and_store_nutrition(nutrient_data, image.user_id)
        return final_result
    elif result["type"] == "food":
        return result["data"]
    else:
        raise HTTPException(status_code=400, detail="Unsupported image type")

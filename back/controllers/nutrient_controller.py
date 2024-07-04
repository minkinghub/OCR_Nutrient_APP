from db import product_nutrients, nutrient_data
from fastapi import HTTPException, Request
from models.nutrient_data import Nutrient
from datetime import datetime, date
from datetime import datetime
from controllers.history_controller import get_today_datetime
import re




def extract_nutrition_info(text):
    mapping = {
        "칼로리": "calories",
        "탄수화물": "carbohydrate",
        "단백질": "protein",
        "지방": "fat",
        "나트륨": "sodium",
        "당류": "sugars",
        "포화지방": "saturated_fat",
        "트랜스지방": "trans_fat",
        "콜레스테롤": "cholesterol",
        "칼슘": "calcium"
    }

    nutrition_info = {}
    lines = text.split("\n")
    
    for line in lines:
        for key, value in mapping.items():
            if key in line:
                matches = re.findall(r"(\d+\.?\d*)\s*[a-zA-Z]*", line)
                if matches:
                    nutrition_info[value] = float(matches[0])
    
    return nutrition_info

async def process_and_store_nutrition(nutrient_data: Nutrient,user_id:str):
    nutrient_dict = nutrient_data.model_dump()
    if not user_id:
        raise HTTPException(status_code=401, detail="process_and_store_nutrition : Not authenticated")

    nutrient_dict["timestamp"] = get_today_datetime()
    nutrient_dict["user_id"] = user_id
    
    product_nutrients.insert_one(nutrient_dict)
    return {"message": "Nutrient added successfully"}



# 현재 사용자가 섭취한 영양소 정보를 데이터베이스에서 가져오는 비동기 함수
async def get_nutrients_from_db(request: Request):
    # 세션에서 user_id를 가져옴
    user_id = request.session.get("user_id")
    # user_id가 없으면 인증되지 않았다는 예외를 발생 
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # 오늘 시작 시간을 서울 시간대로 설정
    today_start = datetime.combine(date.today(), datetime.min.time()).astimezone(seoul_tz)
    # 데이터베이스에서 user_id와 timestamp가 오늘 날짜인 영양소 정보를 찾음
    nutrients = product_nutrients.find({"user_id": user_id, "timestamp": {"$gte": today_start}})
    results = []
    # 각 영양소 정보를 반복하여 ObjectId를 문자열로 변환 후 리스트에 추가
    async for nutrient in nutrients:
        nutrient["_id"] = str(nutrient["_id"])
        results.append(nutrient)
    # 영양소 정보 리스트를 반환
    return results
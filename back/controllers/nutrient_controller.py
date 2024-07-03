from db import product_nutrients, nutrient_data
from fastapi import HTTPException, Request
from models.nutrient_data import Nutrient
from datetime import datetime, date
import pytz
from datetime import datetime
from controllers.auth_controller import get_current_user_id

# 서울 시간대를 설정
seoul_tz = pytz.timezone('Asia/Seoul')

# 현재 시간을 서울 시간대로 반환하는 함수
def get_current_time():
    return datetime.now(seoul_tz)

# 영양소 정보를 데이터베이스에 추가하는 비동기 함수
async def add_nutrient_to_db(nutrient: Nutrient, request: Request):
    # 세션에서 user_id를 가져옴
    user_id = request.session.get("user_id")
    # user_id가 없으면 인증되지 않았다는 예외를 발생
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    print("user_id = ", user_id)
    
    # Nutrient 모델의 데이터를 딕셔너리로 변환
    nutrient_dict = nutrient.dict()
    # 현재 시간과 user_id를 nutrient_dict에 추가
    nutrient_dict["timestamp"] = get_current_time()
    nutrient_dict["user_id"] = user_id
    
    # nutrient_dict의 키를 반복하여 특정 필드를 제외한 나머지 필드를 확인
    for key in nutrient_dict.keys():
        # 특정 필드를 제외
        if key not in ["product_id", "product_name", "serving_size", "timestamp", "user_id"]:
            # 영양소 값이 None이 아닌지 확인
            if nutrient_dict[key] is not None:
                # nutrient_data 컬렉션에서 해당 영양소 이름을 찾음
                nutrient_name = await nutrient_data.find_one({"name": key})
                # 영양소 이름이 존재하면 nutrient_dict를 product_nutrients 컬렉션에 삽입
                if nutrient_name is not None:
                    result = await product_nutrients.insert_one(nutrient_dict)
                    # ObjectId를 문자열로 변환하여 JSON 직렬화 문제 해결
                    nutrient_dict["_id"] = str(result.inserted_id)
                    return {"message": "Nutrient added successfully", "nutrient_dict": nutrient_dict}
                # 영양소 값이 None인 경우 메시지 반환
                return {"message": "nutrient_dict[key] is None", "nutrient": nutrient_dict[key]}
            # 필수 정보가 누락된 경우 메시지 반환
            return {"message": "Required information missing"}
    # 영양소 추가 실패 메시지 반환
    return {"message": "Nutrient added failure"}

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

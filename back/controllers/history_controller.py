from fastapi import HTTPException
from fastapi.responses import JSONResponse
from models.history_model import HistoryDocument
from bson import ObjectId
from db import product_nutrients
from datetime import datetime
from db import users_collection
import pytz

def get_user_tdee(documentKey):
    user = users_collection.find_one({"_id": ObjectId(documentKey)})
    if not user or "tdee" not in user:
        raise HTTPException(status_code=404, detail={"code": "U01", "message": "User not found or TDEE not available"})
    return user["tdee"]

def get_today_date():
    seoul_tz = pytz.timezone('Asia/Seoul')
    return datetime.now(seoul_tz).strftime("%Y-%m-%d")

def get_today_datetime():
    seoul_tz = pytz.timezone('Asia/Seoul')
    return datetime.now(seoul_tz).strftime("%Y-%m-%d %H:%M:%S")

async def history_controller(documentKey):
    today_date = get_today_date()

    # MongoDB 쿼리
    query = {
        "user_id": documentKey,
        "timestamp": {
            "$regex": f"^{today_date}"
        }
    }
    
    documents = list(product_nutrients.find(query))
    # 초기 합계 값 설정
    total_nutrients = {
        "calorie": 0,
        "charbodrate": 0,
        "protein": 0,
        "fat": 0,
        "sodium": 0,
        "saturatedFat": 0,
        "transFat": 0,
        "calcium": 0,
        "cholesterol": 0,
        "sugar": 0
    }
    
    tdee = get_user_tdee(documentKey)
    
    if not documents:
        print("not Document")
        return {"total_nutrients": total_nutrients, "tdee": tdee}
    
    # 각 문서의 값을 합산
    for doc in documents:
        print(doc)
        total_nutrients["calorie"] += doc.get("calories", 0)
        total_nutrients["charbodrate"] += doc.get("carbohydrate", 0)
        total_nutrients["protein"] += doc.get("protein", 0)
        total_nutrients["fat"] += doc.get("fat", 0)
        total_nutrients["sodium"] += doc.get("sodium", 0)
        total_nutrients["saturatedFat"] += doc.get("saturated_fat", 0)
        total_nutrients["transFat"] += doc.get("trans_fat", 0)
        total_nutrients["calcium"] += doc.get("calcium", 0)
        total_nutrients["cholesterol"] += doc.get("cholesterol", 0)
        total_nutrients["sugar"] += doc.get("sugars", 0)

    return {"total_nutrients": total_nutrients, "tdee": tdee}

# 예시 데이터 생성 함수
def create_example_data(userId):
    example_data = []
    for i in range(10):
        data = HistoryDocument(
            userId=userId,
            uploadTime=get_today_datetime(),
            calorie=float(i),
            charbodrate=float(i),
            protein=float(i),
            fat=float(i),
            sodium=float(i),
            saturatedFat=float(i),
            transFat=float(i),
            calcium=float(i),
            cholesterol=float(i),
            sugar=float(i)
        )
        example_data.append(data.model_dump())
    return example_data

async def insert_example_data(userId):
    example_data = create_example_data(userId)
    result = product_nutrients.insert_many(example_data)
    return {"inserted_ids": [str(_id) for _id in result.inserted_ids]}
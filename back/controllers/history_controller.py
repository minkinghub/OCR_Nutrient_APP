from fastapi import HTTPException
from fastapi.responses import JSONResponse
from db import product_nutrients
from datetime import datetime
from pymongo import MongoClient

def get_today_date():
    return datetime.utcnow().strftime("%Y-%m-%d")

def history_controller(documentKey):
    today_date = get_today_date()

    # MongoDB 쿼리
    query = {
        "user_id": documentKey,
        "date": today_date
    }
    
    documents = list(product_nutrients.find(query))

    if not documents:
        raise HTTPException(status_code=400, detail={"code": "H01", "message": "No documents found"})

    # 결과를 반환할 때 ObjectId를 문자열로 변환
    for doc in documents:
        doc["_id"] = str(doc["_id"])

    return JSONResponse(content={"documents": documents})
# controllers/mypage_controller.py
from fastapi import HTTPException, Request
from models.user_model import User
from db import users_collection
from bson import ObjectId

# 현재 로그인된 사용자의 ID를 가져오는 함수
async def get_current_user_id(request: Request) -> str:
    # 세션에 "user_id"가 없는 경우 인증되지 않은 상태로 간주하고 예외를 발생시킴
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    # 세션에서 "user_id"를 추출하여 반환
    return str(request.session["user_id"])

# 현재 로그인된 사용자의 정보를 가져오는 함수
async def get_current_user(request: Request) -> User:
    # 현재 로그인된 사용자의 ID를 가져옴
    user_id = await get_current_user_id(request)
    # 데이터베이스에서 해당 ID를 가진 사용자를 조회
    user_in_db = users_collection.find_one({"_id": ObjectId(user_id)})
    # 사용자가 데이터베이스에 없는 경우 예외를 발생시킴
    if user_in_db is None:
        raise HTTPException(status_code=404, detail="User not found")
    # 조회된 사용자 정보를 User 모델 인스턴스로 변환하여 반환
    return User(**user_in_db)

# 마이페이지 정보를 조회하는 함수
async def get_mypage(current_user: User) -> User:
    # 현재 로그인된 사용자의 정보를 반환
    return current_user

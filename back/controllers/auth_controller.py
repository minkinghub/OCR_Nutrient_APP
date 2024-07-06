from passlib.context import CryptContext
from db import users_collection
from models.user_model import User, UserCreate, UserLogin
from fastapi import HTTPException, Request
from bson import ObjectId

# 암호화 및 해시 처리를 위한 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 비밀번호를 검증하는 함수
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 비밀번호를 해시화하는 함수
def get_password_hash(password):
    return pwd_context.hash(password)

# 사용자 등록 함수
async def signup(user: UserCreate):
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Database connection is not initialized.")
    
    user_exists = users_collection.find_one({"id": user.id})
    if user_exists:
        raise HTTPException(status_code=400, detail="ID already registered")

    hashed_password = pwd_context.hash(user.password)
    user_data = user.model_dump()
    user_data['password'] = hashed_password

    user_obj = User(**user_data)
    user_obj.calculate_bmr()
    user_obj.calculate_tdee()
    
    user_data['bmr'] = user_obj.bmr
    user_data['tdee'] = user_obj.tdee

    users_collection.insert_one(user_data)
    return user_obj

# 사용자 로그인 함수
async def login(user: UserLogin):
    user_in_db = users_collection.find_one({"id": user.id})
    if not user_in_db or not verify_password(user.password, user_in_db["password"]):
        raise HTTPException(status_code=400, detail="Incorrect ID or password")

    # 검증된 사용자 정보 반환
    return user_in_db

# 현재 로그인한 사용자 ID를 가져오는 함수
async def get_current_user_id(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="get_current_user_id : Not authenticated")
    return str(request.session["user_id"])

# 로그아웃 함수
async def logout(request: Request):
    if "user_id" in request.session:
        request.session.pop("user_id")
    return {"message": "Logout successful"}

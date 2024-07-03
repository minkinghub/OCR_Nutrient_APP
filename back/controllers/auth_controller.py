from passlib.context import CryptContext
from db import users_collection
from models.user_model import User, UserCreate, UserLogin
from fastapi import HTTPException, Request

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
    # 데이터베이스 연결이 초기화되지 않은 경우 예외 발생
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Database connection is not initialized.")
    
    # 이미 등록된 사용자인지 확인
    user_exists = users_collection.find_one({"id": user.id})
    if user_exists:
        raise HTTPException(status_code=400, detail="ID already registered")

    # 비밀번호를 해시화
    hashed_password = get_password_hash(user.password)
    
    # 사용자 데이터를 사전 형태로 변환
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password

    # 새로운 사용자 데이터베이스에 삽입
    new_user = users_collection.insert_one(user_dict)
    
    # 삽입된 사용자를 데이터베이스에서 찾음
    created_user = users_collection.find_one({"_id": new_user.inserted_id})

    # User 모델로 반환
    return User(**created_user)

# 사용자 로그인 함수
async def login(user: UserLogin):
    # 데이터베이스에서 사용자 찾기
    user_in_db = users_collection.find_one({"id": user.id})
    
    # 사용자 존재 여부 및 비밀번호 검증
    if not user_in_db or not verify_password(user.password, user_in_db["password"]):
        raise HTTPException(status_code=400, detail="Incorrect ID or password")

    # 검증된 사용자 정보 반환
    return user_in_db

# 현재 로그인한 사용자 ID를 가져오는 함수
async def get_current_user_id(request: Request):
    # 세션에 사용자 ID가 없는 경우 예외 발생
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # 세션에서 사용자 ID 반환
    return {"user_id": request.session["user_id"]}

async def logout(request: Request):
    if "user_id" in request.session:
        request.session.pop("user_id")
    return {"message": "Logout successful"}
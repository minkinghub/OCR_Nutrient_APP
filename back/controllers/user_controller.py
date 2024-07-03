from passlib.context import CryptContext
from db import users_collection
from models.user_model import User, UserUpdate
from bson import ObjectId
from fastapi import HTTPException, Request

# 암호화 및 해시 처리를 위한 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 비밀번호를 해시화하는 함수
def get_password_hash(password):
    return pwd_context.hash(password)

# 사용자 프로필 업데이트 함수
async def update_user_profile(request: Request, update: UserUpdate):
    # 세션에 사용자 ID가 없는 경우 예외 발생
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # 세션에서 사용자 ID 가져오기
    user_id = request.session["user_id"]
    
    # 데이터베이스에서 사용자 찾기
    user_in_db = users_collection.find_one({"_id": ObjectId(user_id)})
    
    # 사용자가 존재하지 않는 경우 예외 발생
    if not user_in_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 업데이트할 데이터 가져오기, 기본값은 제외
    update_data = update.dict(exclude_unset=True)
    
    # 비밀번호가 업데이트 데이터에 포함된 경우 해시화 처리
    if "password" in update_data:
        update_data["password"] = get_password_hash(update_data["password"])
    
    # 업데이트할 데이터가 있는 경우 데이터베이스 업데이트
    if update_data:
        await users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        
        # 업데이트된 사용자 데이터베이스에서 찾기
        updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
        
        # 업데이트된 사용자 정보 반환
        return User(**updated_user)
    
    # 업데이트할 데이터가 없는 경우 예외 발생
    raise HTTPException(status_code=400, detail="No update data provided")

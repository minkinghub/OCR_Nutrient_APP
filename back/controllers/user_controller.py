from passlib.context import CryptContext
from db import users_collection
from models.user_model import User, UserUpdate
from bson import ObjectId
from fastapi import HTTPException, Request
from models.user_model import User

# BMR 계산 함수
def calculate_bmr(weight: float, height: float, age: int, gender: str) -> float:
    if gender == 'male':
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

# TDEE 계산 함수
def calculate_tdee(bmr: float, activity_level: str) -> float:
    activity_multipliers = {
        "sedentary": 1.2,
        "lightly_active": 1.375,
        "moderately_active": 1.55,
        "very_active": 1.725,
        "extra_active": 1.9
    }
    return bmr * activity_multipliers.get(activity_level, 1.2)

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
    
    # BMR과 TDEE 계산을 위한 정보가 포함된 경우 처리
    if any(key in update_data for key in ["weight", "height", "age", "activity_level"]):
        weight = update_data.get("weight", user_in_db.get("weight"))
        height = update_data.get("height", user_in_db.get("height"))
        age = update_data.get("age", user_in_db.get("age"))
        activity_level = update_data.get("activity_level", user_in_db.get("activity_level"))
        gender = user_in_db.get("gender")  # 성별은 변경되지 않는다고 가정
        
        if weight and height and age and gender:
            bmr = calculate_bmr(weight, height, age, gender)
            tdee = calculate_tdee(bmr, activity_level)
            update_data["bmr"] = round(bmr, 1)
            update_data["tdee"] = round(tdee, 1)
            
    # 업데이트할 데이터가 있는 경우 데이터베이스 업데이트
    if update_data:
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        
        # 업데이트된 사용자 데이터베이스에서 찾기
        updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
        
        # 업데이트된 사용자 정보 반환
        return User(**updated_user)
    
    # 업데이트할 데이터가 없는 경우 예외 발생
    raise HTTPException(status_code=400, detail="No update data provided")

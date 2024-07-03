from passlib.context import CryptContext
from db import users_collection
from models.user_model import User, UserUpdate
from bson import ObjectId
from fastapi import HTTPException, Request

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

async def update_user_profile(request: Request, update: UserUpdate):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = request.session["user_id"]
    user_in_db = users_collection.find_one({"_id": ObjectId(user_id)})
    
    if not user_in_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = update.dict(exclude_unset=True)
    
    if "password" in update_data:
        update_data["password"] = get_password_hash(update_data["password"])
    
    if update_data:
        await users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
        return User(**updated_user)
    
    raise HTTPException(status_code=400, detail="No update data provided")

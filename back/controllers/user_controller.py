from fastapi import APIRouter, HTTPException, Request, Depends
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from models.user_model import User, UserUpdate, UserInDB
from bson import ObjectId

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

client = AsyncIOMotorClient("mongodb+srv://minjuking:GAdeWGF35XjDLId8@cluster0.qvqzpec.mongodb.net/")
db = client.AI_Camp_Mini
users_collection = db.users_test

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_current_user(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = request.session["user_id"]
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return UserInDB(**user)
    raise HTTPException(status_code=404, detail="User not found")

@router.get("/mypage", response_model=User)
async def get_mypage(current_user: UserInDB = Depends(get_current_user)):
    return current_user

@router.put("/mypage/update", response_model=User)
async def update_mypage(
    request: Request,
    update: UserUpdate,
    current_user: UserInDB = Depends(get_current_user)
):
    update_data = update.dict(exclude_unset=True)
    
    if "password" in update_data:
        update_data["password"] = get_password_hash(update_data["password"])
    
    if update_data:
        await users_collection.update_one({"_id": current_user.id}, {"$set": update_data})
        updated_user = await users_collection.find_one({"_id": current_user.id})
        return User(**updated_user)
    
    raise HTTPException(status_code=400, detail="No update data provided")

from fastapi import APIRouter, HTTPException, Request
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from models.user_model import User, UserCreate, UserLogin, UserUpdate
from bson import ObjectId

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

client = AsyncIOMotorClient("mongodb+srv://minjuking:GAdeWGF35XjDLId8@cluster0.qvqzpec.mongodb.net/")
db = client.AI_Camp_Mini
users_collection = db.users_test

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    user_exists = await users_collection.find_one({"id": user.id})
    if user_exists:
        raise HTTPException(status_code=400, detail="ID already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    
    new_user = await users_collection.insert_one(user_dict)
    created_user = await users_collection.find_one({"_id": new_user.inserted_id})
    
    return User(**created_user)

@router.post("/login", response_model=dict)
async def login(user: UserLogin, request: Request):
    user_in_db = await users_collection.find_one({"id": user.id})
    if not user_in_db or not verify_password(user.password, user_in_db["password"]):
        raise HTTPException(status_code=400, detail="Incorrect ID or password")
    
    request.session["user_id"] = str(user_in_db["_id"])
    return {"message": "Login successful", "user_id": user.id}

@router.get("/current_user_id", response_model=dict)
async def get_current_user_id(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {"user_id": request.session["user_id"]}

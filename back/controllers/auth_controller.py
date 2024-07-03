from passlib.context import CryptContext
from db import users_collection
from models.user_model import User, UserCreate, UserLogin
from fastapi import HTTPException, Request

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def signup(user: UserCreate):
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Database connection is not initialized.")
    
    print("user.id = ", user.id)
    user_exists = users_collection.find_one({"id": user.id})
    if user_exists:
        raise HTTPException(status_code=400, detail="ID already registered")

    hashed_password = get_password_hash(user.password)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password

    new_user = users_collection.insert_one(user_dict)
    created_user = users_collection.find_one({"_id": new_user.inserted_id})

    return User(**created_user)

async def login(user: UserLogin):
    user_in_db = users_collection.find_one({"id": user.id})
    if not user_in_db or not verify_password(user.password, user_in_db["password"]):
        raise HTTPException(status_code=400, detail="Incorrect ID or password")

    return user_in_db

async def get_current_user_id(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {"user_id": request.session["user_id"]}

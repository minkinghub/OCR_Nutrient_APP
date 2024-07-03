from fastapi import FastAPI, HTTPException, UploadFile, types, File
from motor.motor_asyncio import AsyncIOMotorClient
from models.user_model import User
from routers.user_router import router as main_router
from routers.upload_router import router as upload_router
from middlewares.cors_middleware import cors_middleware
from middlewares.session_middleware import create_session_middleware
from routers import nutrient_router
from google.cloud import vision
from starlette.responses import JSONResponse
import os

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'iconic-episode-428206-c2-d8dce4f6a18d.json'

app = FastAPI()

cors_middleware(app)
create_session_middleware(app)

client = AsyncIOMotorClient("mongodb+srv://minjuking:GAdeWGF35XjDLId8@cluster0.qvqzpec.mongodb.net/")
db = client.AI_Camp_Mini
users_collection = db.users_test

@app.get("/user/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await users_collection.find_one({"id": user_id})
    if user:
        return User(**user)
    raise HTTPException(status_code=404, detail="User not found")

app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

app = FastAPI()

app.include_router(nutrient_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Nutrient API"}

app.include_router(upload_router, prefix="/api")
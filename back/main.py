from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from models.user_model import User
from routers.user_router import router as main_router
from middlewares.session_middleware import create_session_middleware

app = FastAPI()

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

app.include_router(main_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI
from routers import nutrient_router
print("민주킹만만세")
app = FastAPI()

app.include_router(nutrient_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Nutrient API"}

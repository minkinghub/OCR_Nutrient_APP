from fastapi import FastAPI
from routers.user_router import router as user_router
from routers.upload_router import router as upload_router
from routers.history_router import router as history_router
from routers.mypage_router import router as mypage_router
from middlewares.session_middleware import create_session_middleware
from middlewares.cors_middleware import cors_middleware
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "iconic-episode-428206-c2-bc5268f142db.json"

app = FastAPI()

create_session_middleware(app)
cors_middleware(app)

app.include_router(user_router)
app.include_router(upload_router)
app.include_router(history_router)
app.include_router(mypage_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Nutrient API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

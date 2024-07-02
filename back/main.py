from fastapi import FastAPI
from routers import nutrient_router

app = FastAPI()

app.include_router(nutrient_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Nutrient API"}

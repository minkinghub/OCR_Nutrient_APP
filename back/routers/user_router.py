from fastapi import APIRouter, HTTPException, Request
from models.user_model import User, UserCreate, UserLogin,  UserUpdate
from controllers.auth_controller import signup, login,logout
from controllers.user_controller import update_user_profile
router = APIRouter()

@router.post("/signup", response_model=User)
async def signup_route(user: UserCreate):
    return await signup(user)


@router.post("/login", response_model=dict)
async def login_route(user: UserLogin, request: Request):
    user_in_db = await login(user)
    request.session["user_id"] = str(user_in_db["_id"])
    return {"message": "Login successful", "user_id":str(request.session["user_id"])}

@router.get("/current_user_id", response_model=dict)
async def get_current_user_id(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {"user_id": request.session["user_id"]}

@router.put("/update_profile", response_model=User)
async def update_profile(request: Request, update: UserUpdate):
    return await update_user_profile(request, update)

@router.post("/logout")
async def logout_route(request: Request):
    return await logout(request)

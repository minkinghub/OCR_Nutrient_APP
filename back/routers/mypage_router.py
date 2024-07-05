# routers/mypage_router.py
from fastapi import APIRouter, Depends, Request
from models.user_model import User
from controllers.mypage_controller import get_current_user, get_mypage

# APIRouter 인스턴스를 생성
router = APIRouter()

# 마이페이지 정보를 조회하는 엔드포인트
@router.get("/mypage", response_model=User)
async def get_mypage_route(current_user: User = Depends(get_current_user)):
    # 현재 로그인된 사용자의 정보를 반환
    return await get_mypage(current_user)

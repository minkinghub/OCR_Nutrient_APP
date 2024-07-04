from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.history_model import historyReq
from controllers.history_controller import history_controller

router = APIRouter()

@router.post("/history")
async def history_router(historyReq: historyReq):
    res = await history_controller(historyReq.documentKey)
    return JSONResponse({"key":"으에에"})
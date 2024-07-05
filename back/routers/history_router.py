from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.history_model import historyReq
from controllers.history_controller import history_controller, insert_example_data

router = APIRouter()

@router.post("/history")
async def history_router(historyReq: historyReq):
    res = await history_controller(historyReq.documentKey)
    return JSONResponse(res)

@router.post("/insertSample")
async def insert_Sample(historyReq: historyReq):
    res = await insert_example_data(historyReq.documentKey)
    return JSONResponse(res)
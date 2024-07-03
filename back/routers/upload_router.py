from fastapi import APIRouter
from fastapi.responses import JSONResponse
import copy
from models.upload_model import ImageBase64
from controllers.upload_controller import upload_controller

router = APIRouter()

@router.post("/upload")
async def upload_router(image: ImageBase64):
    text = upload_controller(image)
    extractText = copy.deepcopy(text)
    print(extractText)
    return JSONResponse(content=text)
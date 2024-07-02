# routers.py
from fastapi import APIRouter, UploadFile, File
from controllers.ocr_controller import process_image

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    return await process_image(file)
# routers.py
from fastapi import APIRouter, UploadFile, File
from controllers.ocr_controller import process_image
import copy

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    ocredText = await process_image(file)
    extractText = copy.deepcopy(ocredText["text"])
    print(extractText)
    return {"text" : "으에에"}
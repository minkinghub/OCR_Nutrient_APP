# controllers.py
import io
from fastapi import HTTPException, UploadFile
from google.cloud import vision
from starlette.responses import JSONResponse

async def process_image(file: UploadFile):
    if file.content_type not in ['image/jpeg', 'image/png']:
        raise HTTPException(status_code=400, detail="Invalid file type")

    contents = await file.read()
    image = vision.Image(content=contents)

    client = vision.ImageAnnotatorClient()
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if not texts:
        return JSONResponse(content={"message": "No text found"}, status_code=200)

    return {"text": texts[0].description}
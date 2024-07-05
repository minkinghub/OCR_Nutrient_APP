import base64
from PIL import Image
from io import BytesIO
from fastapi import HTTPException
from google.cloud import vision
from models.upload_model import ImageBase64

def upload_controller(image: ImageBase64):
    try:
        image_data = base64.b64decode(image.base64)
        if not image_data:
            raise ValueError("Decoded image data is empty.")       
        
        pil_image = Image.open(BytesIO(image_data))
    except Exception as e:
        print(f"Error decoding image: {e}")  
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": "Error decoding image"})
    
    # Google Cloud Vision API 클라이언트 생성
    client = vision.ImageAnnotatorClient()

    # 이미지를 Google Cloud Vision API에서 인식할 수 있는 형식으로 변환
    image = vision.Image(content=image_data)

    # OCR 수행
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if response.error.message:
        raise HTTPException(status_code=400, detail={"code": "I02", "message": "Error OCR process"})

    # OCR 결과 추출
    if texts:
        ocr_result = texts[0].description
    else:
        ocr_result = ""
    
    print(ocr_result)
    return ocr_result
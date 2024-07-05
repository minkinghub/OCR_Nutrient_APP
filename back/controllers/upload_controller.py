import base64
import requests
from fastapi import HTTPException
from models.upload_model import ImageBase64

def upload_controller(image: ImageBase64):
    try:
        # base64 문자열을 디코딩
        image_data = base64.b64decode(image.base64)
        if not image_data:
            raise ValueError("Decoded 이미지 데이터가 비어 있습니다.")
    except Exception as e:
        print(f"이미지 디코딩 오류: {e}")
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": "이미지 디코딩 오류"})

    # 업스테이지 OCR API 요청
    api_key = "up_ZrP7tTb7Hc7UhrdIZulcotZN8szlj"
    url = "https://api.upstage.ai/v1/document-ai/ocr"
    headers = {"Authorization": f"Bearer {api_key}"}
    
    try:
        files = {"document": ("image.jpg", image_data, "application/octet-stream")}
        response = requests.post(url, headers=headers, files=files)
    except Exception as e:
        print(f"이미지 읽기 또는 요청 전송 오류: {e}")
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": "이미지 읽기 또는 요청 전송 오류"})

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail={"code": "I02", "message": "Error OCR process"})
    
    response_data = response.json()

    # OCR 결과 추출
    ocr_result = response_data.get("text", "")

    return ocr_result
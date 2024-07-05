import base64
import requests
from fastapi import HTTPException
from models.upload_model import ImageBase64
import openai
import io
import re

def upload_controller(image: ImageBase64):
    try:
        # base64 문자열에서 헤더와 데이터 분리
        match = re.match(r'data:image/(\w+);base64,(.+)', image.base64)
        if match:
            image_format, base64_data = match.groups()
        else:
            # 헤더가 없는 경우 전체를 데이터로 간주
            image_format = 'png'  # 기본값으로 PNG 설정
            base64_data = image.base64

        # 패딩 추가
        base64_data += '=' * ((4 - len(base64_data) % 4) % 4)

        # base64 문자열 디코딩
        image_data = base64.b64decode(base64_data)
        
        # OCR API 요청 준비
        api_key = "up_ZrP7tTb7Hc7UhrdIZulcotZN8szlj"
        url = "https://api.upstage.ai/v1/document-ai/ocr"
        headers = {"Authorization": f"Bearer {api_key}"}
        
        # requests를 사용한 동기식 요청
        files = {'document': ('image.png', image_data, f'image/{image_format}')}
        response = requests.post(url, headers=headers, files=files)
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail={"code": "I02", "message": "Error OCR process"})
        
        response_data = response.json()
        ocr_result = response_data.get("text", "")
        
        return ocr_result
    
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": str(e)})
import base64
import requests
from fastapi import HTTPException
from models.upload_model import ImageBase64
import re
import cv2
import easyocr
import matplotlib.pyplot as plt
import numpy as np

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

def crop_nutrition_info(image_data: bytes):
    # Load the image from bytes
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply GaussianBlur to reduce noise and improve contour detection
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Use Canny edge detector
    edges = cv2.Canny(blurred, 50, 150)

    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Initialize easyOCR Reader
    reader = easyocr.Reader(['ko'])

    # Initialize list to store rectangles that contain "영양정보"
    rects_with_text = []

    # Iterate through contours to find rectangles
    for contour in contours:
        # Get the bounding box of the contour
        x, y, w, h = cv2.boundingRect(contour)
        # Filter out small contours by setting a minimum size (e.g., width and height > 50)
        if w > 50 and h > 50:
            # Crop the detected region
            cropped_image = image[y:y+h, x:x+w]
            # Use easyOCR to extract text
            result = reader.readtext(cropped_image)
            # Check if "영양정보" is in the extracted text
            for (bbox, text, prob) in result:
                if "영양정보" in text:
                    rects_with_text.append((x, y, w, h))
                    break

    # Draw rectangles around the detected regions that contain "영양정보"
    cropped_images = []
    for rect in rects_with_text:
        x, y, w, h = rect
        cropped_image = image[y:y+h, x:x+w]
        # Encode cropped image to base64
        _, buffer = cv2.imencode('.png', cropped_image)
        cropped_base64 = base64.b64encode(buffer).decode('utf-8')
        cropped_images.append(cropped_base64)
    
    return cropped_images
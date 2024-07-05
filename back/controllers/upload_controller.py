import base64
import requests
from fastapi import HTTPException
from models.upload_model import ImageBase64
import openai

# OpenAI API key setup
openai.api_key = "sk-proj-WEgsPIBxPAJpiZc4jDuPT3BlbkFJDz9m5ZHB38vHT3kd6wU4"

def classify_image(image_data):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Classify the image content described."},
            {"role": "user", "content": f"This is an image with the following content: {image_data}"}
        ]
    )
    description = response['choices'][0]['message']['content'].lower()
    
    if "nutrition label" in description or "nutrition facts" in description:
        return "nutritional label"
    elif "food" in description or "dish" in description:
        return "food"
    else:
        return "unknown"

def process_nutritional_label(image_data):
    api_key = "YOUR_UPSTAGE_API_KEY"
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

    return {"message": "Processed nutritional label", "ocr_result": ocr_result}

def analyze_food_image(image_data):
    # Implement the logic to analyze food image and return nutritional information
    return {"message": "Analyzed food image"}

def upload_controller(image: ImageBase64):
    try:
        # base64 문자열을 디코딩
        image_data = base64.b64decode(image.base64)
        if not image_data:
            raise ValueError("Decoded 이미지 데이터가 비어 있습니다.")
    except Exception as e:
        print(f"이미지 디코딩 오류: {e}")
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": "이미지 디코딩 오류"})

    classification = classify_image(image_data)

    if classification == "nutritional label":
        result = process_nutritional_label(image_data)
        return {"type": "nutritional label", "data": result}
    elif classification == "food":
        result = analyze_food_image(image_data)
        return {"type": "food", "data": result}
    else:
        raise HTTPException(status_code=400, detail="Unsupported image type")

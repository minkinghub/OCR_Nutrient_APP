import base64
from PIL import Image
from io import BytesIO
from fastapi import HTTPException
from google.cloud import vision
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
    client = vision.ImageAnnotatorClient()
    image = vision.Image(content=image_data)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if response.error.message:
        raise HTTPException(status_code=400, detail={"code": "I02", "message": "Error OCR process"})

    ocr_result = texts[0].description if texts else ""
    return {"message": "Processed nutritional label", "ocr_result": ocr_result}

def analyze_food_image(image_data):
    # Implement the logic to analyze food image and return nutritional information
    return {"message": "Analyzed food image"}

def upload_controller(image: ImageBase64):
    try:
        image_data = base64.b64decode(image.base64)
        if not image_data:
            raise ValueError("Decoded image data is empty.")
        pil_image = Image.open(BytesIO(image_data))
    except Exception as e:
        print(f"Error decoding image: {e}")  
        raise HTTPException(status_code=400, detail={"code": "Io2", "message": "Error decoding image"})

    classification = classify_image(image_data)

    if classification == "nutritional label":
        result = process_nutritional_label(image_data)
        return {"type": "nutritional label", "data": result}
    elif classification == "food":
        result = analyze_food_image(image_data)
        return {"type": "food", "data": result}
    else:
        raise HTTPException(status_code=400, detail="Unsupported image type")

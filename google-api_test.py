from google.cloud import vision
from google.oauth2 import service_account
import io
import json

def perform_ocr(image_path, json_keyfile_path):
    # 서비스 계정 키 파일을 사용하여 자격 증명 생성
    credentials = service_account.Credentials.from_service_account_file(json_keyfile_path)

    # Vision API 클라이언트 생성
    client = vision.ImageAnnotatorClient(credentials=credentials)

    # 이미지 파일 읽기
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # 이미지에서 텍스트 감지
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if not texts:
        print('No text detected')
        return

    print('Detected text:')
    for text in texts:
        print(text.description)

# JSON 키 파일 경로, 이미지 경로 및 출력 JSON 경로 설정
json_keyfile_path = './back/iconic-episode-428206-c2-bc5268f142db.json'
image_path = 'sample3.jfif'

# OCR 수행 및 결과 저장
perform_ocr(image_path, json_keyfile_path)

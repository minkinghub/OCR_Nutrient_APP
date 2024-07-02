from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
import requests
import os

# ChromeDriver 경로 설정
chrome_driver_path = 'C:/Users/admin/python_workplace/OCR_Nutrient_APP/collectingData/chromedriver-win64/chromedriver.exe'

# ChromeDriver 설정
service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service)

# 목표 URL 설정 (네이버 이미지 검색)
target_url = "https://search.naver.com/search.naver?ssc=tab.image.all&where=image&sm=tab_jum&query=%EC%8B%9D%ED%92%88%20%EC%98%81%EC%96%91%20%EC%A0%95%EB%B3%B4%20%ED%91%9C%EC%8B%9C"

# 웹 페이지 열기
driver.get(target_url)

# 페이지를 유지하여 확인할 시간
time.sleep(5)

# 이미지 요소 찾기
image_elements = driver.find_elements(By.CSS_SELECTOR, "img._image")

# 이미지 저장 디렉토리 설정
save_dir = 'downloaded_images'
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 이미지 다운로드
for idx, img_element in enumerate(image_elements):
    img_url = img_element.get_attribute('src')
    try:
        img_data = requests.get(img_url).content
        img_filename = os.path.join(save_dir, f'image_{idx+1}.jpg')
        with open(img_filename, 'wb') as img_file:
            img_file.write(img_data)
        print(f'{img_filename} 저장 완료')
    except Exception as e:
        print(f'이미지 다운로드 실패: {img_url}')
        print(f'오류: {e}')

# 드라이버 종료
driver.quit()

print("모든 이미지가 저장되었습니다.")

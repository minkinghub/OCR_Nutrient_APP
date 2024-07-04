import re
import json
import difflib

def process_nutrition_text(text):
    # 미리 정의된 열 목록
    columns = ["serving_size", "calories", "total_fat", "saturated_fat", "cholesterol", "sodium", 
               "total_carbohydrate", "dietary_fiber", "sugars", "protein", "vitamins", "Object", 
               "vitamin_a", "vitamin_c", "calcium", "iron", "potassium", "vitamin_d"]

    # 열 매핑 사전
    mapping = {
        "총 내용량": "serving_size",
        "내용량": "serving_size",
        "kcal": "calories",
        "칼로리": "calories",
        "지방": "total_fat",
        "포화지방": "saturated_fat",
        "콜레스테롤": "cholesterol",
        "나트륨": "sodium",
        "탄수화물": "total_carbohydrate",
        "식이섬유": "dietary_fiber",
        "당류": "sugars",
        "단백질": "protein",
        "비타민D": "vitamin_d",
        "칼슘": "calcium",
        "철분": "iron",
        "칼륨": "potassium"
    }

    # 매핑에서 키워드에 대한 최적의 일치를 얻기 위한 함수
    def get_best_match(keyword, mapping):
        matches = difflib.get_close_matches(keyword, mapping.keys(), n=1, cutoff=0.6)
        if matches:
            return mapping[matches[0]]
        return None

    # 정규 표현식을 사용하여 영양 정보를 추출하는 함수
    def extract_nutrition_info(text):
        nutrition_info = {}
        lines = text.split("\n")
        
        for line in lines:
            for key in mapping.keys():
                if key in line:
                    matched_key = get_best_match(key, mapping)
                    if matched_key:
                        # 'kcal' 단위를 찾기 위한 별도의 정규 표현식
                        if matched_key == 'calories':
                            matches = re.findall(r"(\d+\.?\d*)\s*kcal", line)
                        else:
                            matches = re.findall(r"(\d+\.?\d*)\s*[a-zA-Z]*", line)
                        if matches:
                            value = max(map(float, matches))  # 일치 항목을 부동 소수점으로 변환하고 최대값 찾기
                            if matched_key not in nutrition_info or value > float(nutrition_info[matched_key]):
                                nutrition_info[matched_key] = str(value)
        
        return nutrition_info

    # 텍스트를 JSON 형식으로 변환
    nutrition_info = extract_nutrition_info(text)
    nutrition_json = json.dumps(nutrition_info, ensure_ascii=False, indent=4)
    return nutrition_json

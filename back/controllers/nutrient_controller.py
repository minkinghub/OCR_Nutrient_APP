from db import product_nutrients, nutrient_data
from fastapi import HTTPException, Request
from models.nutrient_data import Nutrient
from datetime import datetime, date
from datetime import datetime
from controllers.history_controller import get_today_datetime
import re




def extract_nutrition_info(text):
    mapping = {
        "Kcal": "calories",
        "kcal": "calories",  # 추가적으로 소문자도 포함
        "탄수화물": "carbohydrate",
        "단백질": "protein",
        "지방": "fat",
        "나트륨": "sodium",
        "당류": "sugars",
        "포화지방": "saturated_fat",
        "트랜스지방": "trans_fat",
        "콜레스테롤": "cholesterol",
        "칼슘": "calcium"
    }

# 총 내용량당 영양소 정보를 저장할 딕셔너리
    nutrition_info = {}

    # 텍스트를 줄 단위로 분리하여 처리
    lines = text.strip().split('\n')


    # 나머지 영양소 정보 처리
    for line in lines:
        for key, value in mapping.items():
            # 키워드가 정확히 일치하는 경우만 처리
            if re.search(rf'\b{key}\b', line):
                matches = re.findall(rf"{key}\s*([\d,\.]+)\s*(g|mg)?", line)
                if matches:
                    amount = matches[0][0].replace(',', '')
                    nutrition_info[value] = float(amount)
                    print(key, "------", amount)

    # 칼로리 정보 처리
    for line in lines:
        if 'kcal' in line:
            try:
                # 공백이 있거나 없는 경우 모두를 처리
                total_calories = re.search(r'(\d+[\d,\.]*)\s*kcal', line).group(1).replace(',', '')
                if total_calories:
                    nutrition_info["calories"] = int(total_calories)
                    print("칼로리다아ㅏ :", nutrition_info["calories"])
            except (AttributeError, ValueError):
                print("칼로리 추출 실패:", line)
            break
        else:
            print("안돼ㅐㅐ", line)


            
            
    return nutrition_info


async def process_and_store_nutrition(nutrient_data: Nutrient,user_id:str):
    nutrient_dict = nutrient_data.model_dump()
    if not user_id:
        raise HTTPException(status_code=401, detail="process_and_store_nutrition : Not authenticated")

    nutrient_dict["timestamp"] = get_today_datetime()
    nutrient_dict["user_id"] = user_id
    
    product_nutrients.insert_one(nutrient_dict)
    return {"message": "Nutrient added successfully"}

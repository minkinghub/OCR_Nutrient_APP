from db import product_nutrients, nutrient_data
from models.nutrient_data import Nutrient
from datetime import datetime, date
import pytz
from datetime import datetime

seoul_tz = pytz.timezone('Asia/Seoul')

def get_current_time():
    return datetime.now(seoul_tz)

def add_nutrient_to_db(nutrient: Nutrient):
    nutrient_dict = nutrient.model_dump()
    nutrient_dict["timestamp"] = get_current_time()
    for key in nutrient_dict.keys():
        if key not in ["product_id", "product_name", "serving_size", "timestamp", "user_id"]:
            if nutrient_dict[key] is not None:
                nutrient_name = nutrient_data.find_one({"name": key})
                if nutrient_name is not None:
                    nutrient_data.insert_one(nutrient_dict)
                    break
    return {"message": "Nutrient added successfully"}

def get_nutrients_from_db(user_id: str):
    today_start = datetime.combine(date.today(), datetime.min.time()).astimezone(seoul_tz)
    nutrients = product_nutrients.find({"user_id": user_id, "timestamp": {"$gte": today_start}})
    results = []
    for nutrient in nutrients:
        nutrient["_id"] = str(nutrient["_id"])
        results.append(nutrient)
    return results

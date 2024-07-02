from pymongo import MongoClient

client = MongoClient("mongodb+srv://minjuking:GAdeWGF35XjDLId8@cluster0.qvqzpec.mongodb.net/")
db = client.AI_Camp_Mini
nutrient_names_collection = db.nutrient_names

# 주어진 데이터를 nutrient_names 컬렉션에 삽입
nutrient_names_data = [
  {"_id": 1, "name": "칼로리"},
  {"_id": 2, "name": "나트륨"},
  {"_id": 3, "name": "탄수화물"},
  {"_id": 4, "name": "당류"},
  {"_id": 5, "name": "지방"},
  {"_id": 6, "name": "트랜스지방"},
  {"_id": 7, "name": "포화지방"},
  {"_id": 8, "name": "콜레스테롤"},
  {"_id": 9, "name": "단백질"},
  {"_id": 10, "name": "칼슘"},
  {"_id": 11, "name": "인"},
  {"_id": 12, "name": "철"},
  {"_id": 13, "name": "나트륨"},
  {"_id": 14, "name": "칼륨"},
  {"_id": 15, "name": "무기질"},
  {"_id": 16, "name": "비타민 A (RE)"},
  {"_id": 17, "name": "비타민 A (베타카로틴)"},
  {"_id": 18, "name": "비타민 B1"},
  {"_id": 19, "name": "비타민 B2"},
  {"_id": 20, "name": "나이아신"},
  {"_id": 21, "name": "비타민 C"},
  {"_id": 22, "name": "비타민 B6"},
  {"_id": 23, "name": "엽산"}
]

nutrient_names_collection.insert_many(nutrient_names_data)

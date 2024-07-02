from pymongo import MongoClient

client = MongoClient("mongodb+srv://minjuking:GAdeWGF35XjDLId8@cluster0.qvqzpec.mongodb.net/")
db = client.AI_Camp_Mini
nutrient_data = db.nutrient_data
product_nutrients = db.product_nutrients
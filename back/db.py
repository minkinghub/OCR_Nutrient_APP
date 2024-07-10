from pymongo import MongoClient

# Global DB
client = MongoClient("mongodb+srv://mongoDB_url")

# Global DB
db = client.AI_Camp_Mini

# Local DB
# db = client.Test

nutrient_data = db.nutrient_data
product_nutrients = db.product_nutrients
users_collection = db.users
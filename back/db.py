from pymongo import MongoClient

# Local DB
# client = MongoClient("mongodb+srv://xotks7524:vxnJicUT7g7oiovN@test.uypu1vv.mongodb.net/")

# Global DB
client = MongoClient("mongodb+srv://minjuking:GAdeWGF35XjDLId8@cluster0.qvqzpec.mongodb.net/")

# Global DB
db = client.AI_Camp_Mini

# Local DB
# db = client.Test

nutrient_data = db.nutrient_data
product_nutrients = db.product_nutrients
users_collection = db.users
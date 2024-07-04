from pydantic import BaseModel

class HistoryDocument(BaseModel):
    userId: str
    uploadTime: str
    calorie: float = 0.0
    charbodrate: float = 0.0
    protein: float = 0.0
    fat: float = 0.0
    sodium: float = 0.0
    saturatedFat: float = 0.0
    transFat: float = 0.0
    calcium: float = 0.0
    cholesterol: float = 0.0
    sugar: float = 0.0

class historyReq(BaseModel):
    documentKey: str
from pydantic import BaseModel, Field
from bson import ObjectId

# Custom class to handle BSON ObjectId for Pydantic
class PyObjectId(ObjectId):

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class historyReq(BaseModel):
    documentKey: str

class historyDocument(BaseModel):
    uid: PyObjectId = Field(..., alias='_id')
    data : any
    
    class Config:
        json_encoders = {
            ObjectId: str
        }
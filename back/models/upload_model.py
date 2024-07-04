from pydantic import BaseModel

class ImageBase64(BaseModel):
    base64: str
    user_id:str
from fastapi import HTTPException

def get_current_user():
    user_id = "user123"
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user_id

from pydantic import BaseModel, Field, StrictStr, field_validator
from typing import Optional, Literal
import re

class User(BaseModel):
    id: StrictStr = Field(..., min_length=5, max_length=20, description="아이디: 5~20자의 영문 소문자 및 숫자만 사용 가능합니다.")
    name: StrictStr = Field(..., min_length=2, max_length=20, description="이름: 2~20자의 한글 또는 알파벳만 사용 가능합니다.")
    password: StrictStr = Field(..., description="비밀번호: 해시된 비밀번호입니다.")
    is_athlete: Optional[bool] = Field(default=False, description="운동 여부")
    age: int = Field(..., description="나이는 0 이상이어야 합니다.")
    height: float = Field(..., description="신장은 0보다 커야 합니다.")
    weight: float = Field(..., description="몸무게는 0보다 커야 합니다.")
    gender: Literal['man', 'woman'] = Field(..., description="성별은 'man' 또는 'woman' 중 하나여야 합니다.")
    bmr: Optional[float] = Field(None, description="BMR 자동 계산")
    tdee: Optional[float] = Field(None, description="TDEE 자동 계산")


    @field_validator('id')
    def validate_id(cls, value):
        if not value.isalnum() or not value.islower():
            raise ValueError('아이디는 영문 소문자 및 숫자만 사용 가능합니다.')
        return value

    @field_validator('name')
    def validate_name(cls, value):
        if not re.match(r'^[a-zA-Z가-힣]{2,20}$', value):
            raise ValueError('이름은 2~20자의 한글 또는 알파벳만 사용 가능합니다.')
        return value

    @field_validator('age')
    def validate_age(cls, value):
        if value < 0:
            raise ValueError('나이는 0 이상이어야 합니다.')
        return value

    @field_validator('height')
    def validate_height(cls, value):
        if value <= 0:
            raise ValueError('신장은 0보다 커야 합니다.')
        return value

    @field_validator('weight')
    def validate_weight(cls, value):
        if value <= 0:
            raise ValueError('몸무게는 0보다 커야 합니다.')
        return value
    
    def calculate_bmr(self):
        if self.gender.lower() == 'man':
            self.bmr = 88.362 + (13.397 * self.weight) + (4.799 * self.height) - (5.677 * self.age)
        else:
            self.bmr = 447.593 + (9.247 * self.weight) + (3.098 * self.height) - (4.330 * self.age)
        self.bmr = round(self.bmr, 1)  # 소수점 첫째 자리까지 반올림


    def calculate_tdee(self):
        if self.bmr is None:
            self.calculate_bmr()
        
        activity_multiplier = 1.2 if not self.is_athlete else 1.55
        self.tdee = self.bmr * activity_multiplier
        self.tdee = round(self.tdee, 1)  # 소수점 첫째 자리까지 반올림


class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    id: StrictStr = Field(..., min_length=5, max_length=20, description="아이디: 5~20자의 영문 소문자 및 숫자만 사용 가능합니다.")
    name: StrictStr = Field(..., min_length=2, max_length=20, description="이름: 2~20자의 한글 또는 알파벳만 사용 가능합니다.")
    password: StrictStr = Field(..., min_length=8, max_length=16, description="비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.")
    is_athlete: Optional[bool] = Field(default=False, description="운동 여부")
    age: int = Field(..., description="나이는 0 이상이어야 합니다.")
    height: float = Field(..., description="신장은 0보다 커야 합니다.")
    weight: float = Field(..., description="몸무게는 0보다 커야 합니다.")
    gender: Literal['man', 'woman'] = Field(..., description="성별은 'man' 또는 'woman' 중 하나여야 합니다.")
    bmr: Optional[float] = Field(None, description="BMR 자동 계산")
    tdee: Optional[float] = Field(None, description="TDEE 자동 계산")


    @field_validator('id')
    def validate_id(cls, value):
        if not value.isalnum() or not value.islower():
            raise ValueError('아이디는 영문 소문자 및 숫자만 사용 가능합니다.')
        return value

    @field_validator('name')
    def validate_name(cls, value):
        if not re.match(r'^[a-zA-Z가-힣]{2,20}$', value):
            raise ValueError('이름은 2~20자의 한글 또는 알파벳만 사용 가능합니다.')
        return value

    @field_validator('password')
    def validate_password(cls, value):
        if not (8 <= len(value) <= 16):
            raise ValueError('비밀번호는 8자 이상 16자 이하이어야 합니다.')
        if not any(char.islower() for char in value):
            raise ValueError('비밀번호에는 소문자가 포함되어야 합니다.')
        if not any(char.isupper() for char in value):
            raise ValueError('비밀번호에는 대문자가 포함되어야 합니다.')
        if not any(char.isdigit() for char in value):
            raise ValueError('비밀번호에는 숫자가 포함되어야 합니다.')
        if not any(char in '@$!%*?&' for char in value):
            raise ValueError('비밀번호에는 특수문자가 포함되어야 합니다.')
        return value

    @field_validator('age')
    def validate_age(cls, value):
        if value < 0:
            raise ValueError('나이는 0 이상이어야 합니다.')
        return value

    @field_validator('height')
    def validate_height(cls, value):
        if value <= 0:
            raise ValueError('신장은 0보다 커야 합니다.')
        return value

    @field_validator('weight')
    def validate_weight(cls, value):
        if value <= 0:
            raise ValueError('몸무게는 0보다 커야 합니다.')
        return value
    

class UserLogin(BaseModel):
    id: StrictStr = Field(..., min_length=5, max_length=20, description="아이디: 5~20자의 영문 소문자 및 숫자만 사용 가능합니다.")
    password: StrictStr = Field(..., min_length=8, max_length=16, description="비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.")

    @field_validator('id')
    def validate_id(cls, value):
        if not value.isalnum() or not value.islower():
            raise ValueError('아이디는 영문 소문자 및 숫자만 사용 가능합니다.')
        return value

    @field_validator('password')
    def validate_password(cls, value):
        if not (8 <= len(value) <= 16):
            raise ValueError('비밀번호는 8자 이상 16자 이하이어야 합니다.')
        return value

class UserUpdate(BaseModel):
    
    name: StrictStr = Field(..., min_length=2, max_length=20, description="이름: 2~20자의 한글 또는 알파벳만 사용 가능합니다.")
    password: Optional[StrictStr] = Field(None, min_length=8, max_length=16, description="비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.")
    age: Optional[int] = Field(None, description="나이는 0 이상이어야 합니다.")
    height: Optional[float] = Field(None, description="신장은 0보다 커야 합니다.")
    weight: Optional[float] = Field(None, description="몸무게는 0보다 커야 합니다.")
    is_athlete: Optional[bool] = Field(None, description="운동 여부")


    @field_validator('name')
    def validate_name(cls, value):
        if value is not None and not re.match(r'^[a-zA-Z가-힣]{2,20}$', value):
            raise ValueError('이름은 2~20자의 한글 또는 알파벳만 사용 가능합니다.')
        return value

    @field_validator('password')
    def validate_password(cls, value):
        if value is not None:
            if not (8 <= len(value) <= 16):
                raise ValueError('비밀번호는 8자 이상 16자 이하이어야 합니다.')
            if not any(char.islower() for char in value):
                raise ValueError('비밀번호에는 소문자가 포함되어야 합니다.')
            if not any(char.isupper() for char in value):
                raise ValueError('비밀번호에는 대문자가 포함되어야 합니다.')
            if not any(char.isdigit() for char in value):
                raise ValueError('비밀번호에는 숫자가 포함되어야 합니다.')
            if not any(char in '@$!%*?&' for char in value):
                raise ValueError('비밀번호에는 특수문자가 포함되어야 합니다.')
        return value

    @field_validator('age')
    def validate_age(cls, value):
        if value is not None and value < 0:
            raise ValueError('나이는 0 이상이어야 합니다.')
        return value

    @field_validator('height')
    def validate_height(cls, value):
        if value is not None and value <= 0:
            raise ValueError('신장은 0보다 커야 합니다.')
        return value

    @field_validator('weight')
    def validate_weight(cls, value):
        if value is not None and value <= 0:
            raise ValueError('몸무게는 0보다 커야 합니다.')
        return value

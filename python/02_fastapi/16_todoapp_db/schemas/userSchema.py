from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    role: str

class UserOut(UserBase):
    id: str  # <-- changed from int to str

    class Config:
        orm_mode = True
        
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    role: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

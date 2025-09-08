from pydantic import BaseModel

class TodoOut(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True
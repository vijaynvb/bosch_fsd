from pydantic import BaseModel
# dto data transfer object which happends bertween client and server
# configure your pydantic model to work with ORM objects for validations
class TodoOut(BaseModel):
    id: int
    completed: bool

    # class Config:
    #     from_attributes = True
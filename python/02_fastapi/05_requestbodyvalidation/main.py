from fastapi import FastAPI
from pydantic import BaseModel # pip install pydantic

class Todo(BaseModel):
    id: int
    title: str
    completed: bool

app = FastAPI()

@app.get("/todos/")
async def get_todos():
    todo = Todo(id=1, title="Learn FastAPI", completed=False)
    return {"todos": [todo]}

@app.post("/todos/")
async def create_todo(todo: Todo):
    return {"todo": todo}
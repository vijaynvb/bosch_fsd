from fastapi import FastAPI

app = FastAPI()

# example for path parameters
# http://localhost:8000/todos/5
@app.get("/todos/{id}")
def read_item(id: int):
    return {"id": id}

# example for query parameters
# http://localhost:8000/todos/?skip=10&limit=10
@app.get("/todos/")
def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}


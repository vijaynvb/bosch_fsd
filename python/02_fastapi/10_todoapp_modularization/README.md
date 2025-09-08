# TodoApp Modularization with FastAPI

- This project demonstrates how to **modularize a FastAPI application** by splitting the code into **models, schemas, routers, and services**.
- This makes the project **clean, maintainable, and scalable** for real-world use.

---

## Project Structure

```
TodoApp/
│── db/
│   └── db.json               # Database mock (JSON file)
│
│── models/
│   └── todoModel.py          # Python class representing a Todo object
│
│── routers/
│   └── todoRouter.py         # API routes for Todos
│
│── schemas/
│   └── todoSchema.py         # Pydantic schemas for validation & serialization
│
│── services/
│   └── todoService.py        # Business logic and database operations
│
│── main.py                   # FastAPI application entry point
│── requirements.txt          # Dependencies
```

---

## Database: `db/db.json`

A simple JSON file acting as our database:

```json
[
    {
        "id": 1,
        "title": "Sample Todo",
        "completed": false
    },
    {
        "id": 2,
        "title": "Another Todo",
        "completed": true
    }
]
```

---

## Models: `models/todoModel.py`

The model defines the **Python object structure** for a Todo.

```python
class Todo:
    def __init__(self, id: int, title: str, completed: bool = False):
        self.id = id
        self.title = title
        self.completed = completed
```

---

## Schemas: `schemas/todoSchema.py`

Schemas are Pydantic models that handle **validation and serialization**.

```python
from pydantic import BaseModel

class TodoOut(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True
```

Ensures data is valid before sending/receiving.
Integrates with Swagger docs automatically.

---

## Services: `services/todoService.py`

Business logic and database interaction (reading JSON file).

```python
import json
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "db" / "db.json"

def get_all_todos():
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
```

---

## Routers: `routers/todoRouter.py`

Defines the **API endpoints** for Todos.

```python
from fastapi import APIRouter
from schemas.todoSchema import TodoOut
from services import todoService as todo_service

router = APIRouter()

@router.get("/", response_model=list[TodoOut])
def list_todos():
    return todo_service.get_all_todos()
```

Uses `APIRouter` for modular route grouping.
Applies response model validation with `TodoOut`.

---

## Application Entry: `main.py`

The root FastAPI app where routers are included.

```python
from fastapi import FastAPI
from routers import todoRouter

app = FastAPI(
    title="Todo App",
    version="1.0.0",
    description="Todo application API"
)

# Include todos router
app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])
```

---

## Requirements: `requirements.txt`

```txt
fastapi
uvicorn
pydantic
```

---

## Running the Application

1. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the server with **Uvicorn**:

   ```bash
   uvicorn main:app --reload
   ```

3. Open in your browser:

   * API Docs (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   * ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
   * Todos API: [http://127.0.0.1:8000/todos](http://127.0.0.1:8000/todos)

---

##  Best Practices

* Use **APIRouter** for modular endpoints (keeps routes organized).
* Separate **models** (internal representation) and **schemas** (validation & response).
* Keep **services** focused on business logic (reusable, testable).
* Use `db.json` only for demo — replace with **real database** (Postgres, MongoDB) in production.
* Add more routes (`POST`, `PUT`, `DELETE`) to complete CRUD functionality.

---

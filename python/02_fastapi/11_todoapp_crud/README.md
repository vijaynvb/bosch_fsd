# TodoApp CRUD with FastAPI

This project extends the modular TodoApp by implementing full CRUD operations:

- Create a new todo
- Read todos (list & single)
- Update an existing todo
- Delete a todo

---

## New Schemas (`schemas/todoSchema.py`)

```python
class TodoBase(BaseModel):
    title: str

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: str = None
    completed: bool = None
```

### Explanation

* **`TodoBase`** → A shared base schema that defines fields common to multiple schemas (`title`).
* **`TodoCreate`** → Used when creating a new Todo. Inherits from `TodoBase`.
* **`TodoUpdate`** → Used for updating a Todo. Fields are optional (`title`, `completed`) to allow **partial updates**.

---

## New Routes (`routers/todoRouter.py`)

```python
@router.get("/{id}", response_model=TodoOut)
def get_todo(id: int):
    return todo_service.get_todo(id)

@router.post("/", response_model=TodoOut, status_code=201)
def create_todo(data: TodoCreate):
    return todo_service.create_todo(data)

@router.put("/{id}", response_model=TodoOut)
def update_todo(id: int, data: TodoUpdate):
    return todo_service.update_todo(id, data)

@router.delete("/{id}", status_code=204)
def delete_todo(id: int):
    return todo_service.delete_todo(id)
```

### Explanation

* **`GET /todos/{id}`** → Fetch a single Todo by `id`.
* **`POST /todos/`** → Create a new Todo. Uses `TodoCreate` schema for validation. Returns `201 Created`.
* **`PUT /todos/{id}`** → Update an existing Todo. Uses `TodoUpdate` schema, allowing **partial updates**.
* **`DELETE /todos/{id}`** → Deletes a Todo by `id`. Returns `204 No Content`.

---

## Service Layer Updates (`services/todoService.py`)

### Helper functions

```python
def read_todos():
    if not DB_PATH.exists():
        return []
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def write_todos(todos):
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump(todos, f, indent=2)
```

* **`read_todos()`** → Reads todos from the JSON file.
* **`write_todos()`** → Saves todos back to the JSON file.

---

### CRUD Operations

```python
def get_todo(id: int):
    todos = read_todos()
    for todo in todos:
        if todo["id"] == id:
            return todo
    return None
```

* Finds a todo by ID. Returns `None` if not found.

```python
def create_todo(data):
    todos = read_todos()
    new_id = max([todo["id"] for todo in todos], default=0) + 1
    todo = {"id": new_id, "title": data.title, "completed": False}
    todos.append(todo)
    write_todos(todos)
    return todo
```

* Creates a new todo with a **unique ID**.
* Defaults `completed = False`.

```python
def update_todo(id: int, data):
    todos = read_todos()
    for todo in todos:
        if todo["id"] == id:
            if data.title is not None:
                todo["title"] = data.title
            if data.completed is not None:
                todo["completed"] = data.completed
            write_todos(todos)
            return todo
    return None
```

* Updates an existing todo.
* Only updates provided fields (supports **partial updates**).

```python
def delete_todo(id: int):
    todos = read_todos()
    new_todos = [todo for todo in todos if todo["id"] != id]
    write_todos(new_todos)
    return None
```

* Removes a todo by ID.
* Returns nothing, but updates the database file.

---

## Summary of CRUD Endpoints

| Method   | Endpoint      | Description          |
| -------- | ------------- | -------------------- |
| `GET`    | `/todos/`     | List all todos       |
| `GET`    | `/todos/{id}` | Get todo by ID       |
| `POST`   | `/todos/`     | Create new todo      |
| `PUT`    | `/todos/{id}` | Update existing todo |
| `DELETE` | `/todos/{id}` | Delete todo by ID    |

---
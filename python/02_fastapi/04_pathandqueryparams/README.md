# Path Variables and Query Parameters

## Path Variables

Path variables are used to capture values from the URL. In the example below, the `id` path variable is captured from the URL.

```python
@app.get("/todos/{id}")
def read_item(id: int):
    return {"id": id}
```

## Query Parameters

Query parameters are used to filter or modify the request. In the example below, the `skip` and `limit` query parameters are used to paginate the results.

```python
@app.get("/todos/")
def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

## Demo

Add the following code to `main.py` to see the path and query parameters in action:

```python
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
```

Run the application with the command:

```bash
uvicorn main:app --reload
```

Verify that the application is running by visiting the following URLs in your browser:

- For path parameters: [http://localhost:8000/todos/5](http://localhost:8000/todos/5)
- For query parameters: [http://localhost:8000/todos/?skip=10&limit=10](http://localhost:8000/todos/?skip=10&limit=10)

---
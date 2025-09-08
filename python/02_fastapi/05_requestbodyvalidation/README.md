# Request Body Validation in FastAPI

When building APIs, it’s crucial to ensure that incoming data is **valid, structured, and safe**.
FastAPI integrates seamlessly with **Pydantic** to provide automatic **request body validation**, making your APIs more robust and developer-friendly.

---

## What is Pydantic?

[Pydantic](https://docs.pydantic.dev/) is a Python library for **data parsing and validation** using Python type hints.
FastAPI uses Pydantic models to:

* Define the expected structure of request and response data.
* Automatically validate and parse JSON payloads into strongly-typed Python objects.
* Provide helpful error messages if the input data is incorrect.

Think of Pydantic as a **contract** between your API and its clients — it ensures that data exchanged always matches the expected schema.

---

## Example: Todo Model with Validation

```python
from fastapi import FastAPI
from pydantic import BaseModel

# Define a request body model
class Todo(BaseModel):
    id: int
    title: str
    completed: bool

app = FastAPI()

# Example endpoint returning a Todo
@app.get("/todos/")
async def get_todos():
    todo = Todo(id=1, title="Learn FastAPI", completed=False)
    return {"todos": [todo]}

# Endpoint with request body validation
@app.post("/todos/")
async def create_todo(todo: Todo):
    return {"todo": todo}
```

---

## Why Do We Need Request Body Validation?

1. **Automatic Data Validation**

   * Ensures clients send data in the correct format.
   * Example: If `id` must be an integer, FastAPI rejects `"abc"` automatically.

2. **Clear Error Messages**

   * Invalid input triggers informative error responses.
   * Example:

     ```json
     {
       "detail": [
         {
           "loc": ["body", "id"],
           "msg": "value is not a valid integer",
           "type": "type_error.integer"
         }
       ]
     }
     ```

3. **Type Safety & Developer Productivity**

   * Type hints + Pydantic models give IDEs **autocompletion** and **linting support**.
   * Reduces runtime bugs.

4. **Data Parsing Made Easy**

   * Incoming JSON automatically becomes Python objects.
   * No need for manual parsing or validation.

---

## Running the Demo

1. Save the code above in `main.py`.
2. Start the server with:

   ```bash
   uvicorn main:app --reload
   ```
3. Test your API:

   * Open **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   * Try `POST /todos/` with a valid payload:

     ```json
     {
       "id": 1,
       "title": "Learn FastAPI",
       "completed": false
     }
     ```
   * Try sending invalid data (e.g., `"id": "abc"`) and see the validation error.

---
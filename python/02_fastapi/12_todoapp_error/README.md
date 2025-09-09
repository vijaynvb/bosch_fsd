# Custom Error Handling in TodoApp

In this update, we introduce **custom exception handling** to make error responses more consistent and user-friendly.

---

## Custom Exception (`error/todoNotFound.py`)

```python
class TodoNotFoundException(Exception):
    def __init__(self, todo_id: int):
        self.todo_id = todo_id
```

* Defines a custom exception `TodoNotFoundException`.
* Accepts the missing `todo_id` so we can include it in the error message.

---

## Exception Handler

```python
def todo_not_found_exception_handler(request: Request, exc: TodoNotFoundException):
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": f"Todo with id {exc.todo_id} not found."}
    )
```

* When the exception is raised, this handler returns:

  * **HTTP 404 Not Found** status.
  * JSON response like:

    ```json
    { "detail": "Todo with id 5 not found." }
    ```

---

## Raising the Exception in Routes (`routers/todoRouter.py`)

```python
@router.get("/{id}", response_model=TodoOut)
def get_todo(id: int):
    todo = todo_service.get_todo(id)
    if not todo:
        raise TodoNotFoundException(id)
    return todo
```

* If a todo is missing, `TodoNotFoundException` is raised.
* The same pattern is applied in `update_todo` and `delete_todo` routes.

---

## Registering the Handler (`main.py`)

```python
app.add_exception_handler(TodoNotFoundException, todo_not_found_exception_handler)
```

* This registers our handler globally.
* Any route that raises `TodoNotFoundException` will automatically trigger the JSON error response.

---

## Alternative: Middleware

```python
@app.middleware("http")
async def todo_not_found_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except TodoNotFoundException as exc:
        return todo_not_found_exception_handler(request, exc)
```

* Instead of using `add_exception_handler`, you could catch exceptions with middleware.
* Middleware wraps **every request/response cycle**.
* In this case, exception handlers are usually preferred because they are more explicit and modular.

---

## Example Response

Request:

```
GET /todos/99
```

Response:

```json
{
  "detail": "Todo with id 99 not found."
}
```

---
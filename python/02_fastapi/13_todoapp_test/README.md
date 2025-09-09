# Testing TodoApp with Pytest

Testing ensures that our API and services **work as expected**, remain **reliable**, and **catch bugs early**. In this section, we integrate **pytest** into our TodoApp.

---

## Why Testing is Important?

1. **Reliability** – Confirms your API and business logic behave correctly.
2. **Maintainability** – Prevents accidental breakage when making changes.
3. **Confidence** – Developers can refactor code without fear.
4. **Automation** – Tests can run in CI/CD pipelines to ensure quality.
5. **Documentation** – Tests serve as **living documentation** for how the system should behave.

---

## What is Pytest?

* **pytest** is a powerful testing framework for Python.
* Simple function-based tests, no boilerplate required.
* Provides **fixtures** for reusable test setup.
* Supports plugins (e.g., coverage, mocking).
* Great integration with FastAPI’s `TestClient` for API testing.

---

## What is `assert`?

The `assert` keyword is used to verify that a condition holds true.

Example:

```python
assert 2 + 2 == 4  # Passes
assert "hi".upper() == "HI"  # Passes
assert 5 > 10  # Fails (raises AssertionError)
```

* If the condition is `True`, the test passes.
* If it’s `False`, the test fails, showing the error.

---

## What is `monkeypatch`?

* `monkeypatch` is a pytest fixture that lets you **temporarily replace** or **mock** functions, methods, or objects during a test.
* Useful when you don’t want to perform real I/O (like file writes) or external API calls.

Example:

```python
def get_data():
    return "real data"

def test_with_monkeypatch(monkeypatch):
    monkeypatch.setattr("__main__.get_data", lambda: "fake data")
    assert get_data() == "fake data"
```

Here, `get_data()` is overridden only for this test.

---

## Test Files

### 1. API Tests (`tests/test_todo_api.py`)

Uses **FastAPI’s `TestClient`** to test endpoints:

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_todos():
    resp = client.get("/todos/")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
```

Verifies API routes like `GET /todos/`, `POST /todos/`, `PUT /todos/{id}`, `DELETE /todos/{id}`.
Checks both **success** and **failure** scenarios (e.g., todo not found).

---

### 2. Service Layer Tests (`tests/test_todo_service.py`)

Tests **business logic** without hitting the API:

```python
@pytest.fixture
def sample_todos(monkeypatch):
    todos = [
        {"id": 1, "title": "Test 1", "completed": False},
        {"id": 2, "title": "Test 2", "completed": True}
    ]
    monkeypatch.setattr(todoService, "read_todos", lambda: todos.copy())
    monkeypatch.setattr(todoService, "write_todos", lambda x: None)
    return todos
```

Uses `monkeypatch` to mock file reads/writes.
Verifies `get_all_todos`, `create_todo`, `update_todo`, and `delete_todo`.
Ensures logic works independently of FastAPI.

---

## Running Tests

Run all tests:

```bash
pytest -v
```

Run specific file:

```bash
pytest tests/test_todo_api.py -v
```

Run specific test function:

```bash
pytest tests/test_todo_api.py::test_get_todo_success -v
```


Run with detailed output:

```bash
pytest -s
```

---

## Example Output

```bash
tests/test_todo_api.py::test_list_todos PASSED
tests/test_todo_api.py::test_get_todo_success PASSED
tests/test_todo_api.py::test_get_todo_not_found PASSED
tests/test_todo_service.py::test_create_todo PASSED
```

---
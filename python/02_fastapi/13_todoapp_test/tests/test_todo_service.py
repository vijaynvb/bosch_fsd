import pytest
from services import todoService

# Fixture to provide sample todos and mock file I/O
@pytest.fixture
def sample_todos(monkeypatch):
    todos = [
        {"id": 1, "title": "Test 1", "completed": False},
        {"id": 2, "title": "Test 2", "completed": True}
    ]
    monkeypatch.setattr(todoService, "read_todos", lambda: todos.copy())
    monkeypatch.setattr(todoService, "write_todos", lambda x: None)
    return todos

# Test getting all todos
def test_get_all_todos(sample_todos):
    result = todoService.get_all_todos()
    assert result == sample_todos

# Test getting a todo by valid id
def test_get_todo_found(sample_todos):
    todo = todoService.get_todo(1)
    assert todo["id"] == 1

# Test getting a todo by invalid id (not found)
def test_get_todo_not_found(sample_todos):
    todo = todoService.get_todo(99)
    assert todo is None

# Test creating a new todo
def test_create_todo(monkeypatch):
    monkeypatch.setattr(todoService, "read_todos", lambda: [])
    written = []
    monkeypatch.setattr(todoService, "write_todos", lambda x: written.extend(x))
    class Data: title = "New"
    todo = todoService.create_todo(Data())
    assert todo["id"] == 1
    assert todo["title"] == "New"
    assert not todo["completed"]

# Test updating an existing todo
def test_update_todo(sample_todos, monkeypatch):
    updated = []
    monkeypatch.setattr(todoService, "write_todos", lambda x: updated.extend(x))
    class Data: title = "Updated"; completed = True
    todo = todoService.update_todo(1, Data())
    assert todo["title"] == "Updated"
    assert todo["completed"] is True

# Test updating a non-existent todo
def test_update_todo_not_found(sample_todos):
    class Data: title = "Updated"; completed = True
    todo = todoService.update_todo(99, Data())
    assert todo is None

# Test deleting an existing todo
def test_delete_todo(sample_todos, monkeypatch):
    deleted = []
    monkeypatch.setattr(todoService, "write_todos", lambda x: deleted.extend(x))
    todoService.delete_todo(1)
    assert all(t["id"] != 1 for t in deleted)

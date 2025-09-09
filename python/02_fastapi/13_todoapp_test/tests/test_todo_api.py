import pytest
from fastapi.testclient import TestClient
from main import app
from typing import List

client = TestClient(app)

# Test listing all todos
def test_list_todos():
    """Test the root path to ensure the API is working."""
    resp = client.get("/todos/")
    assert resp.status_code == 200
    assert isinstance(resp.json(), List)

# Test getting a todo by valid id
def test_get_todo_success():
    """Test getting a todo by a valid ID."""
    resp = client.get("/todos/1")
    assert resp.status_code == 200
    assert resp.json()["id"] == 1

# Test getting a todo by invalid id (not found)
def test_get_todo_not_found():
    """Test getting a todo by an ID that doesn't exist."""
    resp = client.get("/todos/9999")
    assert resp.status_code == 404
    assert "not found" in resp.json()["detail"]

# Test creating a new todo
def test_create_todo():
    """Test creating a new todo item."""
    resp = client.post("/todos/", json={"title": "API Test"})
    assert resp.status_code == 201
    data = resp.json()
    assert data["title"] == "API Test"
    assert not data["completed"]

# Test updating an existing todo
def test_update_todo():
    """Test updating an existing todo item."""
    resp = client.post("/todos/", json={"title": "To Update"})
    todo_id = resp.json()["id"]
    resp2 = client.put(f"/todos/{todo_id}", json={"title": "Updated", "completed": True})
    assert resp2.status_code == 200
    assert resp2.json()["title"] == "Updated"
    assert resp2.json()["completed"] is True

# Test updating a non-existent todo
def test_update_todo_not_found():
    """Test updating a todo that doesn't exist."""
    resp = client.put("/todos/9999", json={"title": "Nope"})
    assert resp.status_code == 404

# Test deleting an existing todo
def test_delete_todo():
    """Test deleting an existing todo item."""
    resp = client.post("/todos/", json={"title": "To Delete"})
    todo_id = resp.json()["id"]
    resp2 = client.delete(f"/todos/{todo_id}")
    assert resp2.status_code == 204

# Test deleting a non-existent todo
def test_delete_todo_not_found():
    """Test deleting a todo that doesn't exist."""
    resp = client.delete("/todos/9999")
    assert resp.status_code == 404

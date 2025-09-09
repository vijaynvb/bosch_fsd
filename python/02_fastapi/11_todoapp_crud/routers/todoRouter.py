from fastapi import APIRouter
from schemas.todoSchema import TodoOut, TodoCreate, TodoUpdate
from services import todoService as todo_service
from typing import List
router = APIRouter()

@router.get("/", response_model=List[TodoOut])
def list_todos():
    return todo_service.get_all_todos()

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
from fastapi import APIRouter, Request, Depends
from schemas.todoSchema import TodoOut, TodoCreate, TodoUpdate
from services import todoService as todo_service
from error.todoNotFound import TodoNotFoundException
from services.authService import get_current_user, get_current_admin
from typing import List
router = APIRouter()

@router.get("/", response_model=List[TodoOut])
def list_todos(current_user = Depends(get_current_user)):
    # any authenticated user will be validated via dependency
    return todo_service.get_all_todos()

@router.get("/{id}", response_model=TodoOut)
def get_todo(id: int, request: Request, current_user = Depends(get_current_user)):
    todo = todo_service.get_todo(id)
    if not todo:
        raise TodoNotFoundException(id)
    return todo

@router.post("/", response_model=TodoOut, status_code=201)
def create_todo(data: TodoCreate, current_user = Depends(get_current_admin)):
    return todo_service.create_todo(data)

@router.put("/{id}", response_model=TodoOut)
def update_todo(id: int, data: TodoUpdate, current_user = Depends(get_current_admin)):
    todo = todo_service.update_todo(id, data)
    if not todo:
        raise TodoNotFoundException(id)
    return todo

@router.delete("/{id}", status_code=204)
def delete_todo(id: int, current_user = Depends(get_current_admin)):
    todo = todo_service.get_todo(id)
    if not todo:
        raise TodoNotFoundException(id)
    todo_service.delete_todo(id)
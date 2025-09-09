from fastapi import APIRouter
from schemas.todoSchema import TodoOut, TodoCreate, TodoUpdate
from services import todoService as todo_service
from error.todoNotFound import TodoNotFoundException

router = APIRouter()

@router.get("/", response_model=list[TodoOut])
def list_todos():
    return todo_service.get_all_todos()

@router.get("/{id}", response_model=TodoOut)
def get_todo(id: int):
    todo = todo_service.get_todo(id)
    if not todo:
        raise TodoNotFoundException(id)
    return todo

@router.post("/", response_model=TodoOut, status_code=201)
def create_todo(data: TodoCreate):
    return todo_service.create_todo(data)

@router.put("/{id}", response_model=TodoOut)
def update_todo(id: int, data: TodoUpdate):
    todo = todo_service.update_todo(id, data)
    if not todo:
        raise TodoNotFoundException(id)
    return todo

@router.delete("/{id}", status_code=204)
def delete_todo(id: int):
    todo = todo_service.get_todo(id)
    if not todo:
        raise TodoNotFoundException(id)
    todo_service.delete_todo(id)
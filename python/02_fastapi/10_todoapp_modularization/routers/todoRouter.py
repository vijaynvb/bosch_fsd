from fastapi import APIRouter
from schemas.todoSchema import TodoOut
from services import todoService as todo_service

router = APIRouter()

@router.get("/", response_model=list[TodoOut])
def list_todos():
    return todo_service.get_all_todos()
from fastapi import FastAPI, Request
from routers import todoRouter
from error.todoNotFound import todo_not_found_exception_handler, TodoNotFoundException

app = FastAPI(title="Todo App", version="1.0.0", description="Todo application API")

app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])

app.add_exception_handler(TodoNotFoundException, todo_not_found_exception_handler)

from fastapi import FastAPI, Request
from routers import todoRouter
from error.todoNotFound import todo_not_found_exception_handler, TodoNotFoundException

app = FastAPI(title="Todo App", version="1.0.0", description="Todo application API")

app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])

# @app.middleware("http")
# async def todo_not_found_middleware(request: Request, call_next):
#     try:
#         response = await call_next(request)
#         return response
#     except TodoNotFoundException as exc:
#         return todo_not_found_exception_handler(request, exc)

app.add_exception_handler(TodoNotFoundException, todo_not_found_exception_handler)

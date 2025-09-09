from fastapi import FastAPI
from routers import todoRouter

app = FastAPI(title="Todo App", version="1.0.0", description="Todo application API")

app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])
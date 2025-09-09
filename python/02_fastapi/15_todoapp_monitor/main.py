from fastapi import FastAPI, Request
from routers import todoRouter
from routers import authRouter  # add this import
from routers import userRouter
from routers import healthRouter
from error.todoNotFound import todo_not_found_exception_handler, TodoNotFoundException
from error.userNotFound import user_not_found_exception_handler, UserNotFoundException
import time
import uuid
from datetime import datetime
from utils.logging_config import setup_logging

logger = setup_logging()
startup_time = datetime.utcnow()

app = FastAPI(title="Todo App", version="1.0.0", description="Todo application API")

app.include_router(authRouter.router, prefix="/auth", tags=["auth"])
app.include_router(userRouter.router, prefix="/users", tags=["users"])
app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])
app.include_router(healthRouter.router, prefix="/health", tags=["health"])

# Exception Handlers

app.add_exception_handler(TodoNotFoundException, todo_not_found_exception_handler)
app.add_exception_handler(UserNotFoundException, user_not_found_exception_handler)

# Logging Middleware

@app.on_event("startup")
def on_startup():
    global startup_time
    startup_time = datetime.utcnow()
    logger.info("Application startup")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    start = time.perf_counter()
    client = request.client.host if request.client else "unknown"
    method = request.method
    path = request.url.path

    logger.info(f"[{request_id}] -> {client} {method} {path}")
    try:
        response = await call_next(request)
    except Exception as ex:
        duration_ms = (time.perf_counter() - start) * 1000
        logger.exception(f"[{request_id}] !! {method} {path} failed in {duration_ms:.2f}ms: {ex}")
        raise
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info(f"[{request_id}] <- {method} {path} {response.status_code} {duration_ms:.2f}ms")
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time-ms"] = f"{duration_ms:.2f}"
    return response

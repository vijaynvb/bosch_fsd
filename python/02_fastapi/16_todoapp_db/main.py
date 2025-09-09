from fastapi import FastAPI, Request
from routers import todoRouter
from routers import authRouter  # add this import
from routers import userRouter
from error.todoNotFound import todo_not_found_exception_handler, TodoNotFoundException
from error.userNotFound import user_not_found_exception_handler, UserNotFoundException
from passlib.context import CryptContext
from db.mongo import user_collection

app = FastAPI(title="Todo App", version="1.0.0", description="Todo application API")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def init_admin_user():
    admin = await user_collection.find_one({"username": "admin"})
    if not admin:
        admin_user = {
            "id": 1,
            "username": "admin",
            "hashed_password": pwd_context.hash("admin"),
            "role": "admin"
        }
        await user_collection.insert_one(admin_user)

@app.on_event("startup")
async def startup_event():
    await init_admin_user()

app.include_router(authRouter.router, prefix="/auth", tags=["auth"])
app.include_router(userRouter.router, prefix="/users", tags=["users"])
app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])

app.add_exception_handler(TodoNotFoundException, todo_not_found_exception_handler)
app.add_exception_handler(UserNotFoundException, user_not_found_exception_handler)

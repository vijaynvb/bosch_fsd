from fastapi import FastAPI, Request
from fastapi.openapi.utils import get_openapi
from routers import todoRouter
from routers import authRouter  # add this import
from routers import userRouter
from middlewares.auth_middleware import AuthMiddleware
from error.todoNotFound import todo_not_found_exception_handler, TodoNotFoundException
from error.userNotFound import user_not_found_exception_handler, UserNotFoundException

app = FastAPI(title="Todo App", version="1.0.0", description="Todo application API")

# Register authentication middleware (parses Bearer token and sets request.state.current_user)
app.add_middleware(AuthMiddleware)

app.include_router(authRouter.router, prefix="/auth", tags=["auth"])
app.include_router(userRouter.router, prefix="/users", tags=["users"])
app.include_router(todoRouter.router, prefix="/todos", tags=["todos"])

app.add_exception_handler(TodoNotFoundException, todo_not_found_exception_handler)
app.add_exception_handler(UserNotFoundException, user_not_found_exception_handler)


def custom_openapi():
	"""Create a custom OpenAPI schema that registers a Bearer JWT security scheme.

	This makes Swagger UI show the Authorize dialog so you can paste a JWT.
	"""
	if app.openapi_schema:
		return app.openapi_schema
	openapi_schema = get_openapi(
		title=app.title,
		version=app.version,
		description=app.description,
		routes=app.routes,
	)
	# Register a simple HTTP bearer JWT security scheme
	openapi_schema.setdefault("components", {})
	openapi_schema["components"].setdefault("securitySchemes", {})["BearerAuth"] = {
		"type": "http",
		"scheme": "bearer",
		"bearerFormat": "JWT",
	}
	# Note: not applying global "security" requirement so endpoints remain public by default.
	app.openapi_schema = openapi_schema
	return app.openapi_schema


app.openapi = custom_openapi

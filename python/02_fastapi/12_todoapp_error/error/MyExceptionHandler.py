from fastapi import Request, status
from fastapi.responses import JSONResponse

def my_general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred. Please try again later. contact support if the issue persists."}
    )

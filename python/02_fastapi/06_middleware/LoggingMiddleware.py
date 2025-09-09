from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
import time
class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("Request received at", time.strftime("%X"))
        response = await call_next(request)
        print("Response sent at", time.strftime("%X"))
        return response
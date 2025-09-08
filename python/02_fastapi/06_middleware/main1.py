# Custom Middleware Example

import asyncio
from fastapi import FastAPI, Request
import time

app = FastAPI()

from starlette.middleware.base import BaseHTTPMiddleware

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("Request received at", time.strftime("%X"))
        response = await call_next(request)
        print("Response sent at", time.strftime("%X"))
        return response

app.add_middleware(LoggingMiddleware)

@app.get("/")
async def read_root():
    await asyncio.sleep(10)  # Simulate a delay
    print("Hello World")
    return {"Hello": "World"}
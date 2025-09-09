# Custom Middleware Example

import asyncio
from fastapi import FastAPI
from LoggingMiddleware import LoggingMiddleware

app = FastAPI()


app.add_middleware(LoggingMiddleware)

@app.get("/")
async def read_root():
    await asyncio.sleep(10)  # Simulate a delay
    print("Hello World")
    return {"Hello": "World"}
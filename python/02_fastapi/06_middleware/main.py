import asyncio
from fastapi import FastAPI, Request
import time

app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Process the request
    response = await call_next(request)
    
    process_time = time.time() - start_time
    formatted_process_time = f"{process_time:.2f}s"
    
    print(f"Request: {request.method} {request.url} completed in {formatted_process_time}")
    
    return response

@app.get("/")
async def read_root():
    await asyncio.sleep(10)  # Simulate a delay
    return {"Hello": "World"}
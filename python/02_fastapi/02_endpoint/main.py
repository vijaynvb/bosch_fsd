from fastapi import FastAPI

app = FastAPI(
    title="My API",
    description="This is a sample API",
    version="1.0.0"
)

# annotation
@app.get("/")
def read_root():
    return {"Hello": "World"}

# opinionated setup -> listen on port -> override host and port
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
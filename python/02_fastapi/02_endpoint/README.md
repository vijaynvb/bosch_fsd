# Simple Endpoint

This section will cover the creation of a simple endpoint using FastAPI.

## Step 1: Create a FastAPI Application

First, create a new Python file (e.g., `main.py`) and import FastAPI:

```python
from fastapi import FastAPI

app = FastAPI()
```

## Step 2: Define an Endpoint

Next, define a simple GET endpoint:

```python
@app.get("/")
def read_root():
    return {"Hello": "World"}
```

## Step 3: Run the Application

Finally, run the application using Uvicorn:

```bash
uvicorn main:app --reload
```

You can now access the endpoint at `http://127.0.0.1:8000/`.

Application will automatically launch at port 8000.

At default the application will be reloaded automatically when you make changes to the code.

---

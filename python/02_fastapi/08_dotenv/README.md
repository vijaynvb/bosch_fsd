# Dotenv

In this example, we will use the `python-dotenv` package to load environment variables from a `.env` file. This is useful for managing sensitive information like API keys, database URLs, and other configuration settings without hardcoding them into your application.

## Step 1: Install `python-dotenv`

You can install the `python-dotenv` package using pip. Run the following command in your terminal:

```bash
pip install python-dotenv
pip install pydantic-settings 
```

pydantic-settings is used to manage settings and environment variables in a structured way.

## Step 2: Create a `.env` File

Create a file named `.env` in the root directory of your project. Add your environment variables in the following format:

```env
SECRET_KEY=supersecret
DEBUG=True
DATABASE_URL=mongodb://localhost:27017/mydatabase
API_KEY=your_api_key
```

Make sure to add `.env` to your `.gitignore` file to prevent it from being committed to version control.

## Step 3: Load Environment Variables in Your FastAPI Application

In your FastAPI application, you can load the environment variables using the `load_dotenv` function from the `dotenv` module. Here's an example of how to do this:

```python
from fastapi import FastAPI
from pydantic_settings import BaseSettings  # pip install pydantic-settings
from dotenv import load_dotenv # pip install python-dotenv
import os

# Load environment variables from .env file
load_dotenv()
app = FastAPI()

class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    DEBUG: bool = os.getenv("DEBUG", "False") == "True"
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    API_KEY: str = os.getenv("API_KEY")

settings = Settings()
print(f"Loaded settings: {settings.json()}")

@app.get("/config")
def get_config():
    return {
        "SECRET_KEY": settings.SECRET_KEY,
        "DEBUG": settings.DEBUG,
        "DATABASE_URL": settings.DATABASE_URL,
        "API_KEY": settings.API_KEY,
    }

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# To run the app, use the command: uvicorn main:app --reload
```

## Step 4: Run Your FastAPI Application

You can run your FastAPI application using Uvicorn. Use the following command in your terminal:

```bash
uvicorn main:app --reload
```

Replace `main` with the name of your Python file (without the `.py` extension) if it's different.

## Step 5: Test the Configuration Endpoint

You can test the `/config` endpoint to see if the environment variables are loaded correctly. Open your browser or use a tool like Postman or curl to access:

```
http://localhost:8000/config
```

You should see a JSON response with the values of your environment variables.

## Conclusion

Using `python-dotenv` to manage environment variables in your FastAPI application helps keep sensitive information secure and makes it easier to configure your application for different environments (development, testing, production).

Make sure to handle your environment variables carefully and avoid exposing sensitive information in your codebase.

---
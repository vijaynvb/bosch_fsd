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
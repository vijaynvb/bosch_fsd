# Conditional OpenAPI

from fastapi import FastAPI
from pydantic_settings import BaseSettings

# if openapi_url is empty then swagger will not be available
class Settings(BaseSettings):
    openapi_url: str = "/openapi.json"


settings = Settings()

app = FastAPI(openapi_url=settings.openapi_url)


@app.get("/")
def root():
    return {"message": "Hello World"}
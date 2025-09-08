from fastapi import FastAPI

# app = FastAPI(swagger_ui_parameters={"syntaxHighlight": False})
app = FastAPI(swagger_ui_parameters={"syntaxHighlight": {"theme": "obsidian"}})


@app.get("/todos/{title}")
async def read_todo(title: str):
    return {"message": f"Hello {title}"}
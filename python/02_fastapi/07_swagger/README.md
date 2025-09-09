# Introduction to Swagger (OpenAPI) in FastAPI

FastAPI automatically generates **OpenAPI documentation** for your APIs, which powers the **Swagger UI** and **ReDoc** interactive docs.

This allows developers and testers to **explore, test, and understand APIs** without writing manual documentation.

---

## What is Swagger (OpenAPI)?

* **OpenAPI** is a specification for describing APIs in a standard format (JSON/YAML).
* **Swagger UI** is a web-based interface that reads the OpenAPI schema and provides:

  * Interactive API documentation
  * Built-in request/response testing
  * Schema validation and descriptions

In FastAPI, your path operations, parameters, and models **automatically generate** the OpenAPI schema behind the scenes.

---

## Example 1: Conditional OpenAPI (Enable/Disable Swagger)

Sometimes, you may want to disable Swagger docs in production for **security** or **performance** reasons.
You can do this by controlling the `openapi_url` parameter:

```bash
pip install pydantic_settings
```

```python
from fastapi import FastAPI
from pydantic_settings import BaseSettings

# If openapi_url is empty, Swagger UI will not be available
class Settings(BaseSettings):
    openapi_url: str = "/openapi.json"

settings = Settings()

app = FastAPI(openapi_url=settings.openapi_url)

@app.get("/")
def root():
    return {"message": "Hello World"}
```

If `openapi_url` is `None` or `""`, no OpenAPI schema will be exposed, and Swagger docs are disabled.

---

## Example 2: Extending the OpenAPI Schema

You can customize the generated OpenAPI schema by overriding FastAPI’s `app.openapi` function:

```python
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

app = FastAPI()

@app.get("/todos/")
async def get_todos():
    return [{"name": "Learn FastAPI", "description": "A comprehensive guide to FastAPI"}]

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Custom title",
        version="2.5.0",
        summary="This is a very custom OpenAPI schema",
        description="Here's a longer description of the custom **OpenAPI** schema",
        routes=app.routes,
    )
    # Add custom branding (logo in docs)
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
```

This allows you to:

* Change **title, version, description**.
* Add a **logo or vendor-specific metadata**.
* Extend schema with custom fields.

---

## Example 3: Customizing Swagger UI

Swagger UI can also be customized using the `swagger_ui_parameters` parameter in `FastAPI()`.

```python
from fastapi import FastAPI

# Disable syntax highlighting OR apply a theme
# app = FastAPI(swagger_ui_parameters={"syntaxHighlight": False})
app = FastAPI(swagger_ui_parameters={"syntaxHighlight": {"theme": "obsidian"}})

@app.get("/todos/{title}")
async def read_todo(title: str):
    return {"message": f"Hello {title}"}
```

Options you can customize:

* **`syntaxHighlight`** → Enable/disable or set a theme.
* **`defaultModelsExpandDepth`** → Expand/collapse models by default.
* **`docExpansion`** → Control how operations expand in the UI (`none`, `list`, `full`).
* **`displayRequestDuration`** → Show request duration in responses.

---

## Best Practices (Trainer Notes)

* **Keep docs enabled in dev/test**, but consider disabling (`openapi_url=None`) in production.
* Use **custom OpenAPI schemas** to brand your API when sharing with external clients.
* Organize endpoints with **tags** for cleaner docs.
* Use **descriptions and summaries** in path operations for better readability in Swagger UI.
* Leverage **Pydantic models** for request/response schemas — they make docs self-explanatory.

---
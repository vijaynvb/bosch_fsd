# Automatic API Documentation in FastAPI

FastAPI comes with **built-in, interactive documentation** powered by **Swagger UI** and **ReDoc**. This feature saves developers time and effort, as you don’t need to manually create or maintain API documentation — FastAPI generates it automatically from your code.

---

## Why Automatic Documentation Matters

* **No Extra Effort** – Just by defining your endpoints, FastAPI builds docs for you.
* **Interactive Testing** – Swagger UI allows you to **execute requests directly from the browser**.
* **Readable for All** – Developers, testers, and even non-technical stakeholders can explore endpoints easily.
* **Always in Sync** – Docs update automatically when your code changes.

---

## Documentation Options in FastAPI

FastAPI exposes **two interactive documentation UIs** out of the box:

### 1. Swagger UI

A friendly web interface that allows you to:

* Browse all endpoints
* View request/response models
* Try out endpoints with live API calls

**Default URL:**

```
http://127.0.0.1:8000/docs
```

---

### 2. ReDoc

A more structured and professional-looking API documentation interface, suitable for external users or clients.
It provides:

* Collapsible endpoint sections
* Clear schema visualizations
* Enhanced readability for large APIs

**Default URL:**

```
http://127.0.0.1:8000/redoc
```

---

## Customizing Documentation

FastAPI allows you to customize the generated documentation by using the description, title, and version parameters when creating the FastAPI app instance:

```python
app = FastAPI(
    title="My API",
    description="This is a sample API",
    version="1.0.0"
)
```

---
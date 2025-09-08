# Fast API and Uvicorn

## What is FastAPI?

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.6+ based on standard Python type hints. It is designed for speed, ease of use, and automatic generation of interactive API documentation. FastAPI is ideal for building RESTful APIs, microservices, and backend systems.

- **High Performance**: Built on Starlette and Pydantic, FastAPI is one of the fastest Python frameworks available.
- **Type Safety**: Uses Python type hints for data validation and serialization.
- **Automatic Documentation**: Generates interactive API docs using Swagger UI and ReDoc.
- **Easy Integration**: Works seamlessly with modern Python libraries and tools.

## Uvicorn

Uvicorn is a lightning-fast ASGI server implementation, using `uvloop` and `httptools`. It is designed to run asynchronous web applications and is commonly used to serve FastAPI applications.

## Installing FastAPI and Uvicorn

### Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.6 or later
- pip (Python package installer)

### Step 1: Install FastAPI

You can install FastAPI using pip. Run the following command in your terminal:

```bash
pip install fastapi
```

### Step 2: Install Uvicorn

Uvicorn is an ASGI web server implementation for Python.

Install Uvicorn using pip:

```bash
pip install uvicorn
```

### Step 3: Verify Installation

To verify that FastAPI and Uvicorn are installed correctly, you can run the following commands:

```bash
pip show fastapi
pip show uvicorn
```

If the installation was successful, you should see information about the installed packages, including their versions.

---
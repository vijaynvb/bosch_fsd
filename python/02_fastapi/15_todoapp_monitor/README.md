# Monitoring & Logging in TodoApp

This module adds structured logging, request monitoring middleware, and health check endpoints to make the API production-ready.

---

## Python Logging Setup (`utils/logging_config.py`)

We configure logging using Python’s built-in `logging` module with both file-based and console handlers.

### Key Features

* RotatingFileHandler:

  Logs are written to `logs/app.log`. Old logs are rotated when the file reaches 1 MB, keeping 5 backups.

* Console Logging:

  Logs are also streamed to the console during development.

* Log Format:

  ```
  2025-09-08 05:21:47 INFO todoapp Application startup
  2025-09-08 05:21:50 INFO todoapp [2c3f7b] -> 127.0.0.1 GET /todos
  ```

### Example Code

```python
import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler

def setup_logging(name: str = "todoapp", level: int = logging.INFO, logs_dir: Path | None = None) -> logging.Logger:
    # Place logs at project root: .../15_todoapp_monitor/logs/app.log
    root_dir = Path(__file__).resolve().parent.parent
    logs_dir = logs_dir or (root_dir / "logs")
    logs_dir.mkdir(exist_ok=True)

    logger = logging.getLogger(name)
    logger.setLevel(level)

    formatter = logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s")

    file_handler = RotatingFileHandler(
        logs_dir / "app.log", maxBytes=1_000_000, backupCount=5, encoding="utf-8"
    )
    file_handler.setFormatter(formatter)

    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)

    # Reset handlers to avoid duplicates on reload
    logger.handlers.clear()
    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)

    # Reduce noise from uvicorn access logs
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    return logger
```

---

## Request Logging Middleware (`main.py`)

Every request is wrapped with logging middleware that tracks:

* Request ID (`X-Request-ID` header or generated UUID)
* Client IP, Method, Path
* Execution Time
* Response Status

### Example Log

```
2025-09-08 05:22:10 INFO todoapp [8a9b3c] -> 127.0.0.1 GET /todos
2025-09-08 05:22:10 INFO todoapp [8a9b3c] <- GET /todos 200 3.42ms
```

### Middleware Features

* Adds response headers:

  * `X-Request-ID` → Trace request across logs
  * `X-Process-Time-ms` → Request duration

* Catches exceptions and logs errors with stack trace.

## Example Middleware Code

```python
from utils.logging_config import setup_logging

logger = setup_logging()
startup_time = datetime.utcnow()


# Logging Middleware

@app.on_event("startup")
def on_startup():
    global startup_time
    startup_time = datetime.utcnow()
    logger.info("Application startup")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    start = time.perf_counter()
    client = request.client.host if request.client else "unknown"
    method = request.method
    path = request.url.path

    logger.info(f"[{request_id}] -> {client} {method} {path}")
    try:
        response = await call_next(request)
    except Exception as ex:
        duration_ms = (time.perf_counter() - start) * 1000
        logger.exception(f"[{request_id}] !! {method} {path} failed in {duration_ms:.2f}ms: {ex}")
        raise
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info(f"[{request_id}] <- {method} {path} {response.status_code} {duration_ms:.2f}ms")
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time-ms"] = f"{duration_ms:.2f}"
    return response
```

---

## Health Checks (`routers/healthRouter.py`)

Health checks are essential for monitoring and orchestration tools like Kubernetes, Docker Swarm, or AWS ALB.

### Endpoint

```
GET /health
```

### Example Response

✅ When app is healthy:

```json
{
  "status": "ok"
}
```

❌ When app is simulated as down:

```json
{
  "status": "down"
}
```

*The `_is_healthy` flag can be toggled during development/testing to simulate downtime.*

### Example Code

```python
from fastapi import APIRouter
from starlette.responses import JSONResponse

router = APIRouter()

# dev-only toggle to simulate downtime
_is_healthy = True

@router.get("/")
def health():
    if _is_healthy:
        return JSONResponse({"status": "ok"}, status_code=200)
    return JSONResponse({"status": "down"}, status_code=503)
```

---
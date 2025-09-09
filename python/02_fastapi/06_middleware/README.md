# Middleware in FastAPI

Middleware in FastAPI is a powerful mechanism to **intercept requests and responses** globally.
It allows you to add cross-cutting functionality such as **logging, security, performance monitoring, or request transformations** without changing individual routes.

---

## What is Middleware?

* Middleware runs **before** each request is processed by a path operation.
* Middleware runs **after** a response is generated, before sending it back to the client.

In short: **Every request → Middleware → Path operation → Middleware → Response.**

Common uses of middleware:

* Logging requests & responses
* Authentication & authorization checks
* Adding custom headers
* Measuring performance
* Enforcing HTTPS

---

## Example 1: Simple Middleware with `@app.middleware`

```python
from fastapi import FastAPI, Request
import time

app = FastAPI()

# Custom Middle ware to manage request logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Forward request to the next handler
    response = await call_next(request)
    
    process_time = time.time() - start_time
    formatted_process_time = f"{process_time:.2f}s"
    
    print(f"Request: {request.method} {request.url} completed in {formatted_process_time}")
    
    return response

@app.get("/")
async def read_root():
    return {"Hello": "World"}
```

### Key points

* `request`: gives access to request details (headers, URL, body, etc.).
* `call_next(request)`: sends the request down to the actual route handler.
* Code before `call_next` runs **before the handler**.
* Code after `call_next` runs **after the handler, before response is sent**.

---

## Example 2: Custom Middleware with `BaseHTTPMiddleware`

FastAPI is built on **Starlette**, which provides `BaseHTTPMiddleware` for creating reusable, class-based middleware.

```python
import asyncio
from fastapi import FastAPI, Request
import time
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()



# Register custom middleware
app.add_middleware(LoggingMiddleware)

@app.get("/")
async def read_root():
    await asyncio.sleep(3)  # Simulate delay
    return {"Hello": "World"}
```

### Key points

* Inherit from `BaseHTTPMiddleware`.
* Override the `dispatch` method to intercept request/response.
* Use `app.add_middleware()` to add it to the app.
* Useful when you need **stateful or reusable middleware classes**.

---

## Example 3: Built-in Middleware (HTTPS & Trusted Hosts)

FastAPI also ships with **common built-in middleware** for security and best practices.

```python
from fastapi import FastAPI
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app = FastAPI()

# Redirect all HTTP → HTTPS
app.add_middleware(HTTPSRedirectMiddleware)

# Only allow requests from trusted hosts
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["example.com", "*.example.com"])

@app.get("/")
async def main():
    return {"message": "Hello Secure World"}
```

### Key points

* `HTTPSRedirectMiddleware`: forces all traffic to HTTPS/WSS.
* `TrustedHostMiddleware`: blocks requests from untrusted domains.

---

## Best Practices

* Use **`@app.middleware`** for **simple, inline middleware**.
* Use **`BaseHTTPMiddleware`** when building **reusable, complex middleware**.
* Avoid heavy computations inside middleware (they run on **every request**).
* Keep middleware **stateless** whenever possible.
* Use **built-in middlewares** (HTTPS, CORS, GZip, TrustedHost) instead of reinventing.
* Log **essential details only** (method, path, status code, duration) to avoid noise.

---
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

# application infomation endpoint
@router.get("/info")
def info():
    return {
        "app": "Todo App",
        "version": "1.0.0",
        "description": "Todo application API"
    }   

# application resource usage endpoint
@router.get("/metrics")
def metrics():
    import psutil
    process = psutil.Process()
    mem_info = process.memory_info()
    cpu_percent = process.cpu_percent(interval=0.1)
    return {
        "memory": {
            "rss": mem_info.rss,
            "vms": mem_info.vms,
            "percent": process.memory_percent()
        },
        "cpu": {
            "percent": cpu_percent
        }
    }

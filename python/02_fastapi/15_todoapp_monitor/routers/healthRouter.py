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
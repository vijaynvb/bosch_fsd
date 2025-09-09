from fastapi import Request
from fastapi.responses import JSONResponse
from services.authService import verify_token
from fastapi import status, HTTPException
import logging

logger = logging.getLogger("auth_middleware")
logger.setLevel(logging.DEBUG)


class AuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        # Only handle HTTP requests
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        request = Request(scope, receive=receive)
        # Default: no user
        scope.setdefault("state", {})
        token = None
        try:
            auth_header = request.headers.get("authorization")
            logger.debug(f"auth_header={auth_header}")
            if auth_header and auth_header.lower().startswith("bear "):
                token = auth_header.split(" ", 1)[1].strip()
                try:
                    user = verify_token(token)
                    logger.debug(f"verify_token ok: {getattr(user,'username',None)}")
                except Exception as e:
                    logger.exception("verify_token failed")
                    raise
                # attach user object to state for handlers
                request.state.current_user = user
                scope["state"]["current_user"] = user
        except HTTPException as exc:
            # translate HTTPException into a JSONResponse so middleware short-circuits correctly
            content = {"detail": exc.detail}
            response = JSONResponse(status_code=exc.status_code, content=content, headers=getattr(exc, "headers", None))
            await response(scope, receive, send)
            return
        # continue
        await self.app(scope, receive, send)

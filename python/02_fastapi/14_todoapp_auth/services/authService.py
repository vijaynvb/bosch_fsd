from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.userModel import User
from services.userService import get_user, authenticate_user as _authenticate_user, create_user as _create_user, read_users as read_users, get_user_by_id as get_user_by_id
import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "mysecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
except (TypeError, ValueError):
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    now = datetime.utcnow()
    expire = now + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    # Use datetime objects for exp/iat so jose handles them consistently
    to_encode.update({"exp": expire, "iat": now})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user_from_token(token: str) -> User:
    """Decode a JWT token and return User (used by middleware/verify_token)."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except (JWTError, AttributeError):
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise credentials_exception
    return user


def get_current_user(request: Request) -> User:
    """FastAPI dependency: read current user from request.state set by middleware."""
    user = getattr(request.state, "current_user", None)
    if user is None:
        # Try to read Authorization header as a fallback (helps when middleware
        # didn't attach state for some reason).
        auth_header = request.headers.get("authorization")
        if auth_header and auth_header.lower().startswith("bearer "):
            token = auth_header.split(" ", 1)[1].strip()
            user = get_current_user_from_token(token)
            # attach for downstream
            request.state.current_user = user
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return user

def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user


def authenticate_user(username: str, password: str):
    """Compatibility wrapper used by routers/authRouter.py"""
    return _authenticate_user(username, password)


def signup_user(username: str, password: str):
    """Create a new user (wrapper around services.userService.create_user).

    Raises HTTPException on duplicate username to match router expectations.
    """
    try:
        return _create_user(username, password)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")


def verify_token(token: str) -> User:
    """Decode token and return User instance or raise HTTPException.

    This is used by the project's middleware which calls verify_token(token).
    """
    return get_current_user_from_token(token)


def requires_role(role: str):
    """A simple decorator factory that checks request.state.current_user.role.

    The decorated endpoint must accept a `Request` (positional or keyword) so
    the decorator can locate it and validate the current user. This keeps the
    code compatible with the existing middleware which injects
    request.state.current_user.
    """
    from functools import wraps
    from fastapi import Request

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Locate Request instance from kwargs or args
            request = kwargs.get("request")
            if request is None:
                for a in args:
                    if isinstance(a, Request) or hasattr(a, "state"):
                        request = a
                        break
            if request is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Request required for authorization")

            current_user = getattr(request.state, "current_user", None)
            if current_user is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
            if getattr(current_user, "role", None) != role:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")
            return func(*args, **kwargs)

        return wrapper

    return decorator

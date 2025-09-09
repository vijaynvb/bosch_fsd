from fastapi import APIRouter, Depends, HTTPException, status

from services.authService import authenticate_user, create_access_token, signup_user
from schemas.userSchema import UserOut
from schemas.authSchema import SignupModel, LoginModel

router = APIRouter()

@router.post("/login")
def login(data: LoginModel):
    """Login using JSON body (username + password). Returns JWT access token."""
    user = authenticate_user(data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup", response_model=UserOut)
def signup(data: SignupModel):
    user = signup_user(data.username, data.password)
    return user

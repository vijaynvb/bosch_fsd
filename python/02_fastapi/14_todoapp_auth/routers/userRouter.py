from fastapi import APIRouter, Request, Depends
from services.authService import read_users, get_user_by_id, get_current_admin
from error.userNotFound import UserNotFoundException
from schemas.userSchema import UserOut
from typing import List
router = APIRouter()

@router.get("/", response_model=List[UserOut])
def list_users(current_user = Depends(get_current_admin)):
    return read_users()

@router.get("/{id}", response_model=UserOut)
def get_user(id: int, current_user = Depends(get_current_admin)):
    user = get_user_by_id(id)
    if not user:
        raise UserNotFoundException(id)
    return user

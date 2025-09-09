import json
from pathlib import Path
from typing import List, Optional, Union
from passlib.context import CryptContext
from models.userModel import User

# Persistence
USER_DB_PATH = Path(__file__).parent.parent / "db" / "user.json"
USER_DB_PATH.parent.mkdir(parents=True, exist_ok=True)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def read_users() -> List[User]:
    if not USER_DB_PATH.exists() or USER_DB_PATH.stat().st_size == 0:
        # Initialize admin user if file is empty
        admin_user = [{
            "id": 1,
            "username": "admin",
            "hashed_password": pwd_context.hash("admin"),
            "role": "admin"
        }]
        with open(USER_DB_PATH, "w", encoding="utf-8") as f:
            json.dump(admin_user, f, indent=2)
        return [User(**admin_user[0])]
    with open(USER_DB_PATH, "r", encoding="utf-8") as f:
        users_raw = json.load(f)
    return [User(**user) for user in users_raw]

def write_users(users: List[Union[User, dict]]):
    users_dict = [user.__dict__ if isinstance(user, User) else user for user in users]
    with open(USER_DB_PATH, "w", encoding="utf-8") as f:
        json.dump(users_dict, f, indent=2)

def get_user(username: str) -> Optional[User]:
    users = read_users()
    for user in users:
        if user.username == username:
            return user
    return None

def get_user_by_id(user_id: int) -> Optional[User]:
    users = read_users()
    for user in users:
        if user.id == user_id:
            return user
    return None

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

def create_user(username: str, password: str, role: str = "user") -> User:
    users = read_users()
    if get_user(username):
        raise ValueError("Username already exists")
    new_id = max([user.id for user in users], default=0) + 1
    user = User(
        id=new_id,
        username=username,
        hashed_password=pwd_context.hash(password),
        role=role
    )
    users.append(user)
    write_users(users)
    return user

def update_user(user_id: int, **fields) -> Optional[User]:
    users = read_users()
    for idx, user in enumerate(users):
        if user.id == user_id:
            for k, v in fields.items():
                if k == "password":
                    setattr(user, "hashed_password", pwd_context.hash(v))
                elif hasattr(user, k):
                    setattr(user, k, v)
            users[idx] = user
            write_users(users)
            return user
    return None

def delete_user(user_id: int) -> bool:
    users = read_users()
    new_users = [u for u in users if u.id != user_id]
    if len(new_users) == len(users):
        return False
    write_users(new_users)
    return True

from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user_model import User
from app.schemas.user_schema import UserCreate
from app.core.security import hash_password, verify_password
from app.core.security import create_access_token
from app.services.log_service import create_log


def create_user(db: Session, user: UserCreate):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }


def login_user(db, username, password):

    print("USERNAME:", username)

    user = db.query(User).filter(User.email == username).first()

    print("USER:", user)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")

    print("INPUT PASSWORD:", password)
    print("HASHED PASSWORD:", user.hashed_password)

    password_check = verify_password(
        password,
        user.hashed_password
    )

    print("PASSWORD CHECK:", password_check)

    if not password_check:
        raise HTTPException(status_code=401, detail="Invalid password")

    access_token = create_access_token(
    data={"sub": user.email}
)
    create_log(
    db,
    "LOGIN",
    user.email
)

    return {
        "access_token": access_token,
        "token_type": "bearer"
   }
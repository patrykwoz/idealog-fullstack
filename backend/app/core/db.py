from sqlmodel import Session, create_engine, select

from app.crud import user_crud
from app.core.config import settings
from app.models_sql import (
    UserBase, UserCreate, UserRegister, UpdatePassword,
    User, UserUpdate, UserPublic, UsersPublic,
    Message, Token, TokenPayload, NewPassword
    )

print(settings.DATABASE_URL)

engine = create_engine(str(settings.DATABASE_URL))

def init_db(session: Session) -> None:
    from sqlmodel import SQLModel
    
    SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = user_crud.create_user(session=session, user_create=user_in)
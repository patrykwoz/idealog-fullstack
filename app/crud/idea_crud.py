from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import (UserBase, User, UserCreate, UserUpdate, UserPublic, UserUpdateMe, UsersPublic,
                         IdeaBase, Idea,  IdeaCreate, IdeaUpdate, IdeaPublic, IdeasPublic, Message)

def create_idea(*, session: Session, idea_in: IdeaCreate, owner_id: int) -> Idea:
    db_idea = Idea.model_validate(idea_in, update={"owner_id": owner_id})
    session.add(db_idea)
    session.commit()
    session.refresh(db_idea)
    return db_idea
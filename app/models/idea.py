from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from sqlalchemy.types import Text
from app.models.user import User

class IdeaBase(SQLModel):
    title: str = Field(default=None, max_length=255)
    description: str = Field(default=None, sa_column=Text)
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")
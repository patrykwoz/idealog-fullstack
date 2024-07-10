from pydantic import EmailStr, BaseModel
from sqlmodel import Field, Relationship, SQLModel
from sqlalchemy.types import Text

# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)
    image_url: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    ideas: list["Idea"] = Relationship(back_populates="owner")


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

#IDEAS
class IdeaBase(BaseModel):
    label: str
    description: str
    owner_id: int

class IdeaCreate(IdeaBase):
    pass

class IdeaUpdate(IdeaBase):
    id: int

class IdeaPublic(BaseModel):
    id: int

# class IdeaBase(SQLModel):
#     title: str = Field(default=None, max_length=255)
#     description: str = Field(default=None, sa_column=Text)

# # Properties to receive on idea creation
# class IdeaCreate(IdeaBase):
#     title: str = Field(min_length=1, max_length=255)


# # Properties to receive on idea update
# class IdeaUpdate(IdeaBase):
#     title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# # Database model, database table inferred from class name
# class Idea(IdeaBase, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     title: str = Field(max_length=255)
#     owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
#     owner: User | None = Relationship(back_populates="ideas")


# # Properties to return via API, id is always required
# class IdeaPublic(IdeaBase):
#     id: int
#     owner_id: int


# class IdeasPublic(SQLModel):
#     data: list[IdeaPublic]
#     count: int


# UTILITY MODELS
# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
from pydantic import EmailStr, BaseModel

#IDEAS
class IdeaBase(BaseModel):
    label: str
    description: str

class IdeaCreate(IdeaBase):
    pass

class IdeaUpdate(IdeaBase):
    pass

class IdeaPublic(BaseModel):
    label: str

class Idea(IdeaBase):
    owner_email: EmailStr
    owner_id: int
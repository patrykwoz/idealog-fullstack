from pydantic import EmailStr, BaseModel

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
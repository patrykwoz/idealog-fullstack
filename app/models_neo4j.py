from pydantic import EmailStr, BaseModel

#IDEAS
class IdeaBase(BaseModel):
    name: str
    description: str

class IdeaCreate(IdeaBase):
    pass

class IdeaUpdate(IdeaBase):
    pass

class IdeaPublic(BaseModel):
    name: str

class Idea(IdeaBase):
    owner_email: EmailStr
    owner_id: int

#RELATIONSHIPS
class RelBase(BaseModel):
    name: str


class RelCreate(RelBase):
    node1: str
    node2: str
    rel_type: str

class RelUpdate(RelBase):
    noode1: str
    node2: str
    rel_type: str

class RelPublic(RelBase):
    pass

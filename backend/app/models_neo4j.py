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
    head: str
    tail: str
    rel_type: str

class RelUpdate(RelBase):
    head: str
    tail: str
    rel_type: str

class RelPublic(RelBase):
    pass


#KNOWLEDGE SOURCES
class KnowledgeBase(BaseModel):
    name: str

class KnowledgeCreate(KnowledgeBase):
    summary: str
    full_text: str
    url: str

class KnowledgeUpdate(KnowledgeBase):
    summary: str
    full_text: str
    url: str

class KnowledgePublic(KnowledgeBase):
    pass
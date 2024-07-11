from typing import Any, Annotated

from fastapi import APIRouter, HTTPException, FastAPI, Query
from sqlmodel import func, select
from fastapi.encoders import jsonable_encoder

from app.api.deps import Neo4jDriverDep, CurrentUser
from app.dao.ideas import IdeaDAO
from app.models_neo4j import IdeaCreate, IdeaUpdate

from neo4j.exceptions import ConstraintError, CypherTypeError

router = APIRouter()

@router.get("/")
def read_ideas(
    driver:Neo4jDriverDep,
    sort: Annotated[str | None, Query(max_length=50)] = "label",
    order: Annotated[str | None, Query] ="ASC",
    limit: int | None = 10,
    skip: int | None = 0) -> Any:
    dao = IdeaDAO(driver)
    output = dao.all(sort, order, limit, skip)
    return jsonable_encoder(output)

@router.get("/{label}")
def read_idea(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    label:str) -> Any:
    dao = IdeaDAO(driver)
    output = dao.get(label)
    return jsonable_encoder(output)

#create an idea
@router.post("/")
def create_idea(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    idea_in: IdeaCreate) -> Any:
    """Create an idea."""
    dao = IdeaDAO(driver)
    try:
        output = dao.create(idea_in.label, idea_in.description, current_user.id)
    except ConstraintError:
        raise HTTPException(status_code=400, detail="Idea already exists")
    except TypeError:
        raise HTTPException(status_code=400, detail="Invalid user ID")
    return jsonable_encoder(output)

#update an idea
@router.put("/{id}")
def update_idea(
    driver:Neo4jDriverDep,
    idea_in: IdeaUpdate) -> Any:
    """Update an idea."""
    dao = IdeaDAO(driver)
    output = dao.update(idea_in.id, idea_in.label, idea_in.description, idea_in.owner_id)
    return jsonable_encoder(output)

# @router.get("/", response_model=IdeasPublic)
# def read_ideas(
#     session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
# ) -> Any:
#     """
#     Retrieve ideas.
#     """

#     if current_user.is_superuser:
#         count_statement = select(func.count()).select_from(Idea)
#         count = session.exec(count_statement).one()
#         statement = select(Idea).offset(skip).limit(limit)
#         ideas = session.exec(statement).all()
#     else:
#         count_statement = (
#             select(func.count())
#             .select_from(Idea)
#             .where(Idea.owner_id == current_user.id)
#         )
#         count = session.exec(count_statement).one()
#         statement = (
#             select(Idea)
#             .where(Idea.owner_id == current_user.id)
#             .offset(skip)
#             .limit(limit)
#         )
#         ideas = session.exec(statement).all()

#     return IdeasPublic(data=ideas, count=count)


# @router.get("/{id}", response_model=IdeaPublic)
# def read_idea(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
#     """
#     Get idea by ID.
#     """
#     idea = session.get(Idea, id)
#     if not idea:
#         raise HTTPException(status_code=404, detail="Idea not found")
#     if not current_user.is_superuser and (idea.owner_id != current_user.id):
#         raise HTTPException(status_code=400, detail="Not enough permissions")
#     return idea


# @router.post("/", response_model=IdeaPublic)
# def create_idea(
#     *, session: SessionDep, current_user: CurrentUser, idea_in: IdeaCreate
# ) -> Any:
#     """
#     Create new idea.
#     """
#     idea = Idea.model_validate(idea_in, update={"owner_id": current_user.id})
#     session.add(idea)
#     session.commit()
#     session.refresh(idea)
#     return idea


# @router.put("/{id}", response_model=IdeaPublic)
# def update_idea(
#     *, session: SessionDep, current_user: CurrentUser, id: int, idea_in: IdeaUpdate
# ) -> Any:
#     """
#     Update an idea.
#     """
#     idea = session.get(Idea, id)
#     if not idea:
#         raise HTTPException(status_code=404, detail="Idea not found")
#     if not current_user.is_superuser and (idea.owner_id != current_user.id):
#         raise HTTPException(status_code=400, detail="Not enough permissions")
#     update_dict = idea_in.model_dump(exclude_unset=True)
#     idea.sqlmodel_update(update_dict)
#     session.add(idea)
#     session.commit()
#     session.refresh(idea)
#     return idea


# @router.delete("/{id}")
# def delete_idea(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
#     """
#     Delete an idea.
#     """
#     idea = session.get(Idea, id)
#     if not idea:
#         raise HTTPException(status_code=404, detail="Idea not found")
#     if not current_user.is_superuser and (idea.owner_id != current_user.id):
#         raise HTTPException(status_code=400, detail="Not enough permissions")
#     session.delete(idea)
#     session.commit()
#     return Message(message="Idea deleted successfully")
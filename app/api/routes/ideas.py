from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from fastapi.encoders import jsonable_encoder

from app.api.deps import CurrentUser, SessionDep
from app.dao.ideas import IdeaDAO
from app.core.neo4j_db import neo4j_driver


router = APIRouter()

@router.get("/")
def read_ideas() -> Any:
    dao = IdeaDAO(neo4j_driver.get_driver())

    # Retrieve a paginated list of movies
    output = dao.all()

    # Return as JSON
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
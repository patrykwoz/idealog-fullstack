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

@router.post("/")
def create_idea(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    idea_in: IdeaCreate) -> Any:
    """Create an idea."""
    dao = IdeaDAO(driver)
    try:
        output = dao.create(
            idea_in.label,
            idea_in.description,
            current_user.email,
            current_user.id)
    except ConstraintError:
        raise HTTPException(status_code=400, detail="Idea already exists")
    except TypeError:
        raise HTTPException(status_code=400, detail="Invalid user ID {current_user.email}")
    return jsonable_encoder(output)

@router.put("/{id}")
def update_idea(
    driver:Neo4jDriverDep,
    idea_in: IdeaUpdate) -> Any:
    """Update an idea."""
    dao = IdeaDAO(driver)
    output = dao.update(
        idea_in.label,
        idea_in.description)
    return jsonable_encoder(output)

@router.delete("/{label}")
def delete_idea(
    driver:Neo4jDriverDep,
    label:str) -> Any:
    """Delete an idea."""
    dao = IdeaDAO(driver)
    output = dao.delete(label)
    return jsonable_encoder(output)
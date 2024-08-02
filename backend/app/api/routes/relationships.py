from typing import Any, Annotated

from fastapi import APIRouter, HTTPException, FastAPI, Query
from sqlmodel import func, select
from fastapi.encoders import jsonable_encoder

from app.api.deps import Neo4jDriverDep, CurrentUser
from app.dao.relationships import RelDAO
from app.models_neo4j import RelCreate, RelUpdate

from neo4j.exceptions import ConstraintError, CypherTypeError

router = APIRouter()

@router.get("/")
def read_relationships(
    driver:Neo4jDriverDep,
    sort: Annotated[str | None, Query(max_length=50)] = "name",
    order: Annotated[str | None, Query] ="ASC",
    limit: int | None = 1000,
    skip: int | None = 0) -> Any:
    """Retrieve relationships."""
    dao = RelDAO(driver)
    output = dao.all(sort, order, limit, skip)
    return jsonable_encoder(output)

@router.post("/")
def create_relationship(
    driver:Neo4jDriverDep,
    rel_in: RelCreate) -> Any:
    """Create a relationship."""
    dao = RelDAO(driver)
    try:
        output = dao.create(
            rel_in.head,
            rel_in.tail,
            rel_in.rel_type,
            rel_in.name)
    except ConstraintError:
        raise HTTPException(status_code=400, detail="Relationship already exists")
    return jsonable_encoder(output)
from typing import Any, Annotated

from fastapi import APIRouter, HTTPException, FastAPI, Query
from sqlmodel import func, select
from fastapi.encoders import jsonable_encoder

from app.api.deps import Neo4jDriverDep, CurrentUser
from app.dao.knowledgeSources import KnowledgeDAO
from app.models_neo4j import KnowledgeCreate

from neo4j.exceptions import ConstraintError, CypherTypeError

router = APIRouter()

@router.get("/")
def read_knowledge_sources(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    sort: Annotated[str | None, Query(max_length=50)] = "name",
    order: Annotated[str | None, Query] ="ASC",
    limit: int | None = 1000,
    skip: int | None = 0) -> Any:
    """Retrieve knowledge_sources."""
    dao = KnowledgeDAO(driver)
    output = dao.all(sort, order, limit, skip)
    return jsonable_encoder(output)

@router.post("/")
def create_knowledge_source(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    knowledge_in: KnowledgeCreate) -> Any:
    """Create a knowledge_source."""
    dao = KnowledgeDAO(driver)
    try:
        output = dao.create(
            knowledge_in.name,
            knowledge_in.summary,
            knowledge_in.full_text,
            knowledge_in.url,
            current_user.email,
            current_user.id
        )
    except ConstraintError:
        raise HTTPException(status_code=400, detail="Knowledge Source already exists")
    return jsonable_encoder(output)
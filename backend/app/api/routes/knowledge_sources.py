from typing import Any, Annotated

from fastapi import APIRouter, HTTPException, Query
from fastapi.encoders import jsonable_encoder

from app.api.deps import Neo4jDriverDep, CurrentUser
from app.dao.knowledgeSources import KnowledgeDAO
from app.models_neo4j import KnowledgeCreate

from celeryapp.ml_tasks import createKnowledgeSource

from neo4j.exceptions import ConstraintError, CypherTypeError

router = APIRouter()

@router.get("")
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

@router.post("")
def create_knowledge_source(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    knowledge_in: KnowledgeCreate) -> Any:
    """Create a knowledge_source."""
    knowledge_data = knowledge_in.dict()
    task = createKnowledgeSource.delay(
        current_user.id,
        current_user.email,
        knowledge_data
    )
    return {"task_id": task.id}

@router.get("/task/{task_id}")
def task_status(task_id: str) -> Any:
    task = createKnowledgeSource.AsyncResult(task_id)
    return {"status": task.status, "info": task.info}
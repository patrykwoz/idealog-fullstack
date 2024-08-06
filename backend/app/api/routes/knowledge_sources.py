from typing import Any, Annotated

from fastapi import APIRouter, HTTPException, FastAPI, Query
from sqlmodel import func, select
from fastapi.encoders import jsonable_encoder

from app.api.deps import Neo4jDriverDep, CurrentUser
from app.dao.knowledgeSources import KnowledgeDAO
from app.models_neo4j import KnowledgeCreate

from app.ml.class_kb import from_text_to_kb

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
        if knowledge_in.use_ml:
            #use ml model to process the text and extract entities and relations
            kb = from_text_to_kb(
                text=knowledge_in.full_text,
                article_url=knowledge_in.url,
                article_title=knowledge_in.name)
            kb_data = kb.to_json()
            knowledge_in.entities = kb_data.get('entities', {})
            knowledge_in.relations = kb_data.get('relations', [])
            
        output = dao.create(
            knowledge_in.name,
            knowledge_in.summary,
            knowledge_in.full_text,
            knowledge_in.url,
            current_user.email,
            current_user.id,
            knowledge_in.entities,
            knowledge_in.relations,
        )
    except ConstraintError:
        raise HTTPException(status_code=400, detail="Knowledge Source already exists")
    return jsonable_encoder(output)
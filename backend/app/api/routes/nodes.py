from typing import Any, Annotated

from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder

from app.api.deps import Neo4jDriverDep, CurrentUser
from app.dao.nodes import NodeDAO
# from app.models_neo4j import NodeCreate, NodeUpdate

router = APIRouter()

@router.get("")
def read_nodes(
    driver:Neo4jDriverDep,
    current_user: CurrentUser,
    search: Annotated[str | None, Query(max_length=50)] = "",
    sort: Annotated[str | None, Query(max_length=50)] = "name",
    order: Annotated[str | None, Query] ="ASC",
    limit: int | None = 1000,
    skip: int | None = 0) -> Any:
    dao = NodeDAO(driver)
    output = dao.all(search, sort, order, limit, skip)
    return jsonable_encoder(output)

@router.get("/{neo4j_id}")
def read_node(
    neo4j_id: str,
    driver:Neo4jDriverDep,
    current_user: CurrentUser) -> Any:
    dao = NodeDAO(driver)
    output = dao.get(neo4j_id)
    return jsonable_encoder(output)
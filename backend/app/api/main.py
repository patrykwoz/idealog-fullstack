from fastapi import APIRouter

from app.api.routes import (
    login,
    users,
    utils,
    ideas,
    nodes,
    knowledge_sources,
    relationships,
    knowledge_graphs,)

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
api_router.include_router(nodes.router, prefix="/nodes", tags=["nodes"])
api_router.include_router(knowledge_sources.router, prefix="/knowledge_sources", tags=["knowledge_sources"])
api_router.include_router(relationships.router, prefix="/relationships", tags=["relationships"])
# api_router.include_router(knowledge_graphs.router, prefix="/knowledge_graphs", tags=["knowledge_graphs"])

from fastapi import APIRouter

from app.api.routes import ideas, login, users, utils, relationships, ml

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
api_router.include_router(relationships.router, prefix="/relationships", tags=["relationships"])
api_router.include_router(ml.router, prefix="/ml", tags=["ml"])

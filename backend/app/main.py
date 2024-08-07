import sentry_sdk

import uvicorn
import os

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.routing import APIRoute

from contextlib import asynccontextmanager

from starlette.middleware.cors import CORSMiddleware

from app.api.main import api_router
from app.core.config import settings
from app.core.neo4j_db import neo4j_driver

def custom_generate_unique_id(route: APIRoute) -> str:
    tag = route.tags[0] if route.tags else "default"
    return f"{tag}-{route.name}"

# TODO: Talk to mentor whether this is necessary
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     neo4j_driver.init_driver(
#         uri=settings.NEO4J_URI,
#         username=settings.NEO4J_USERNAME,
#         password=settings.NEO4J_PASSWORD
#     ) 
#     yield
#     neo4j_driver.close_driver()

if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/")
def root():
    return {"message": "Hello World"}

from celeryapp.tasks import add
@app.get("/add")
def add_numbers():
    task = add.delay(1, 2)
    return {"task_id": task.id}

@app.get("/task/{task_id}")
def get_task_result(task_id):
    task = add.AsyncResult(task_id)
    return {"task_status": task.status, "task_result": task.result}


app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
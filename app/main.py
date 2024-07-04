import sentry_sdk

import uvicorn
import os

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.routing import APIRoute

from starlette.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import Any, Dict, List, Optional

import json

from app.ml.class_kb import from_text_to_kb

from app.api.main import api_router
from app.core.config import settings

def custom_generate_unique_id(route: APIRoute) -> str:
    tag = route.tags[0] if route.tags else "default"
    return f"{tag}-{route.name}"


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
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

class JSONData(BaseModel):
    data: Any

def write_json_to_file(json_data: dict, filename: str) -> None:
    try:
        with open(filename, "w") as f:
            json.dump(json_data, f, indent=4)
    except Exception as e:
        print(f"Error writing JSON to file: {e}")

def create_kb_and_save(
        text: str,
        article_url: str,
        article_title: str = None,
        filename: str = "kb.json") -> Dict:
    kb = from_text_to_kb(text, article_url, article_title=article_title)
    kb_data = kb.to_json()
    write_json_to_file(kb_data, filename)
    return kb_data

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/extract")
def extract(
    text: str,
    article_url: str,
    article_title: str = None):
    kb = from_text_to_kb(text, article_url, article_title=article_title)
    return kb.to_json()

@app.post("/extract_and_save")
def extract_and_save(
    text: str,
    article_url: str,
    background_tasks: BackgroundTasks,
    article_title: str = None,
    filename: str = "kb.json"):
    background_tasks.add_task(
        create_kb_and_save,
        text,
        article_url,
        article_title,
        filename)
    return {"message": f"Knowledge base saved to {filename}"}

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
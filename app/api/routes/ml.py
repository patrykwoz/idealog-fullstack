from typing import Any, Annotated, Dict, List, Optional
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, FastAPI, Query, BackgroundTasks
from sqlmodel import func, select
from fastapi.encoders import jsonable_encoder

from app.api.deps import  CurrentUser

import json
import os
from app.ml.class_kb import from_text_to_kb

router = APIRouter()

class JSONData(BaseModel):
    data: Any

def write_json_to_file(json_data: dict, filename: str) -> None:
    try:
        #directory = "/mnt/c/filewritingtests" if os.path.exists("/mnt/c") else "/filewritingtests"
        directory = "/json_data"
        os.makedirs(directory, exist_ok=True)
        
        filepath = os.path.join(directory, filename)
        with open(filepath, "w") as f:
            json.dump(json_data, f, indent=4)
        
        print(f"JSON data written to {filepath}")
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

@router.get("/")
def root():
    return {"message": "Hello World"}

@router.post("/extract")
def extract(
    text: str,
    article_url: str,
    article_title: str = None):
    kb = from_text_to_kb(text, article_url, article_title=article_title)
    return kb.to_json()

@router.post("/extract_and_save")
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
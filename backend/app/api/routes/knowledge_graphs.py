# from typing import Any

# from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks

# from app.crud import user_crud
# from app.api.deps import (
#     CurrentUser,
#     SessionDep,
#     get_current_active_superuser,
# )
# from app.core.config import settings
# from app.core.security import get_password_hash, verify_password
# from app.utils import generate_new_account_email, send_email

# import json

# from celeryapp.ml.class_kb import from_text_to_kb

# from pydantic import BaseModel
# from typing import Any, Dict, List, Optional

# router = APIRouter()

# class JSONData(BaseModel):
#     data: Any

# def write_json_to_file(json_data: dict, filename: str) -> None:
#     try:
#         with open(filename, "w") as f:
#             json.dump(json_data, f, indent=4)
#     except Exception as e:
#         print(f"Error writing JSON to file: {e}")

# def create_kb_and_save(
#         text: str,
#         article_url: str,
#         article_title: str = None,
#         filename: str = "kb.json") -> Dict:
#     kb = from_text_to_kb(text, article_url, article_title=article_title)
#     kb_data = kb.to_json()
#     write_json_to_file(kb_data, filename)
#     return kb_data

# @router.get("/")
# def root():
#     return {"message": "Hello World"}

# @router.post("/extract")
# def extract(
#     text: str,
#     article_url: str,
#     article_title: str = None):
#     kb = from_text_to_kb(text, article_url, article_title=article_title)
#     return kb.to_json()

# @router.post("/extract_and_save")
# def extract_and_save(
#     text: str,
#     article_url: str,
#     background_tasks: BackgroundTasks,
#     article_title: str = None,
#     filename: str = "kb.json"):
#     background_tasks.add_task(
#         create_kb_and_save,
#         text,
#         article_url,
#         article_title,
#         filename)
#     return {"message": f"Knowledge base saved to {filename}"}
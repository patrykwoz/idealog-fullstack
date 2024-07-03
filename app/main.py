from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Any, Dict, List, Optional
import json
import uvicorn
import os
from app.ml.class_kb import from_text_to_kb

app = FastAPI()

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
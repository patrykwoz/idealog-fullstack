from fastapi import FastAPI
import uvicorn
import os
from app.ml.class_kb import from_text_to_kb

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/extract")
async def extract(
    text: str,
    article_url: str,
    article_title: str = None):
    kb = from_text_to_kb(text, article_url, article_title=article_title)
    return kb.to_json()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
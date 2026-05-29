from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from analysis import analyze_resume
import os
import shutil

app = FastAPI()

# CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...), career: str = Form(...)):
    file_path = f"temp_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        result = analyze_resume(file_path, career)
        return result
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.get("/")
def root():
    return {"message": "AI Resume Analyzer Backend Ready!"}

# Career Guidance Project's Steps Tracker
1.basic login and signup pages are designed<br>

2.Profile Section is completed

3.Questions frontend is done

4.View All Carrer Cards

5. Landing Page is created
6. 

# AI Resume Analyzer

## Backend
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app:app --reload

## Frontend
# Use your React app with this API endpoint:
POST http://localhost:8000/analyze
FormData: { file: PDF, career: "IT" }

🚀 Quick Start (5 minutes)
Prerequisites
Node.js 16+ (for React)

Python 3.8+

Git (optional)

1. Clone & Navigate
bash
git clone <your-repo> ai-resume-analyzer
cd ai-resume-analyzer
2. Backend Setup
bash
cd backend

# Install dependencies (pre-compiled wheels for Windows)
pip install --only-binary=all fastapi uvicorn PyPDF2 python-multipart

# Start FastAPI server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
✅ Backend running at http://localhost:8000

3. Frontend Setup
bash
cd ../frontend  # or your React project folder
npm install     # or yarn install
npm start       # Runs on http://localhost:3000
4. Test It!
Open http://localhost:3000

Upload any PDF resume

Select career (e.g., "IT")

See instant analysis + recommendations!
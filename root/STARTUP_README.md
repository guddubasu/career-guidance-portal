Final Workflow
One-Time Setup
Install root dependencies
npm install
Setup Flask environment
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Setup Resume Analyzer environment
cd "AI Resume Analyzer"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Seed college database ONCE

From root:

npm run seed-colleges
Daily Usage


From root folder:

npm start


If packages not installed error:
run in root folder:-
npm install concurrently nodemon --save-dev
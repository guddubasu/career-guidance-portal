CareerCompass is a Full-Stack Career Aptitude Test that combines Holland Code (RIASEC) + Big Five Personality assessment to recommend top career matches from 20 Indian job sectors (BFSI, IT, Engineering, Government Jobs, etc.).

🎯 Key Features
25 Smart Questions → 5 Pages × 5 Questions (Perfect UX)

Holland Code (RIASEC): Realistic, Investigative, Artistic, Social, Enterprising, Conventional

Big Five (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism

20 Indian Careers: BFSI, Defence, Healthcare, IT, Civil Services, Railways + 15 more

Real-time Backend Scoring with MongoDB

Beautiful Results: Top 5 matches with % scores + personality breakdown

🛠 Tech Stack
Frontend	Backend	Database	Testing
React 18	Node.js 20	MongoDB 7	Postman/cURL
React Router	Express.js	Mongoose	Browser DevTools
CSS Grid/Flexbox	REST API		
🎮 Live Demo
text
Frontend: http://localhost:3000/aptitude
Backend API: http://localhost:4000/api/aptitude/submit
Results: http://localhost:3000/aptitude/results
🚀 Quick Start
Prerequisites
bash
Node.js 18+ | MongoDB | Git | npm/yarn
1. Clone & Install
bash
git clone <your-repo-url>
cd careercompass
2. Backend Setup
bash
cd backend
npm install
# Copy .env.example → .env
# Update MONGO_URI=your_mongodb_connection
npm run dev
Backend runs on: http://localhost:4000

3. Frontend Setup
bash
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:3000

4. Test API (Optional)
bash
curl -X POST http://localhost:4000/api/aptitude/submit \
  -H "Content-Type: application/json" \
  -d '{"answers": [5,4,3,5,4,3,4,5,4,3,5,4,3,4,5,4,5,3,4,5,3,2,4,5,4]}'
5.InstitutionPage---->1.first go to backend/initialize_career_DB folder,2.then in terminal run """node initializeCollegeData.js""" command,3.now the institution_page is ready

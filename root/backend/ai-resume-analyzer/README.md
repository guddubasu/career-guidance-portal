# AI Resume Analyzer Integration Guide

## Overview

The AI Resume Analyzer has been successfully integrated into your Career Guidance Portal backend. This module provides comprehensive resume analysis using various AI providers (OpenAI, Anthropic, Gemini).

## Features

- **Resume Upload & Analysis**: Users can upload resumes and get AI-powered analysis
- **Job Description Matching**: Compare resumes against job descriptions for fit analysis
- **Multi-Provider Support**: Integration with OpenAI, Anthropic (Claude), and Google Gemini
- **Real-time Socket.io Updates**: Live analysis progress notifications
- **Rate Limiting**: Daily upload limits to prevent abuse
- **Document Management**: Upload, list, preview, and download documents

## API Endpoints

### Authentication

- `POST /api/ai-resume/auth/register` - Register new user
- `POST /api/ai-resume/auth/login` - Login user
- `GET /api/ai-resume/auth/profile` - Get user profile (protected)
- `PUT /api/ai-resume/auth/profile` - Update user profile (protected)

### Documents

- `POST /api/ai-resume/docs/upload` - Upload document (protected, multipart/form-data)
- `GET /api/ai-resume/docs` - List documents (protected, paginated)
- `GET /api/ai-resume/docs/:id` - Get document details (protected)
- `GET /api/ai-resume/docs/:id/preview` - Preview document with analysis (protected)
- `GET /api/ai-resume/docs/:id/download` - Download original document (protected)
- `POST /api/ai-resume/docs/:id/analyze` - Analyze document (protected)
- `DELETE /api/ai-resume/docs/:id` - Delete document (protected)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Add these to your `.env` file:

```env
# AI API Keys
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key

# Authentication
JWT_SECRET=your_jwt_secret

# Database
MONGO_URI=mongodb://localhost:27017/career_guidance
```

### 3. Start the Server

```bash
npm run server  # Development with nodemon
npm start       # Production
```

## Socket.io Events

### Client → Server

- `join` - Join a user-specific room for real-time updates
  ```javascript
  socket.emit('join', userId);
  ```

### Server → Client

- `analysis:started` - Analysis has begun
  ```javascript
  socket.on('analysis:started', (data) => {
    // data = { docId: string }
  });
  ```

- `analysis:done` - Analysis is complete
  ```javascript
  socket.on('analysis:done', (data) => {
    // data = { docId: string, analysis: {...} }
  });
  ```

## Analysis Output

When analysis completes, you'll receive:

```json
{
  "summary": "Brief summary of the resume",
  "keyPoints": ["skill1", "skill2", ...],
  "sentiment": {
    "label": "positive|negative|neutral",
    "score": 0.0-1.0
  },
  "keywords": ["keyword1", "keyword2", ...],
  "questions": ["question1", "question2", "question3"],
  "resumeScore": 85,
  "matchingSkills": ["skill1", "skill2", ...],
  "skillGaps": ["missing_skill1", "missing_skill2", ...],
  "recommendations": ["recommendation1", "recommendation2", ...]
}
```

## Usage Example

### Frontend Integration

```javascript
// Upload and analyze resume
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('jobDescription', jobDescriptionText);

const response = await fetch('/api/ai-resume/docs/upload', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

const { doc } = await response.json();

// Analyze document
await fetch(`/api/ai-resume/docs/${doc._id}/analyze`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Real-time updates via Socket.io
socket.emit('join', userId);
socket.on('analysis:done', (data) => {
  console.log('Analysis complete:', data.analysis);
});
```

## Key Models

### User Model (AIResume_User)

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  aiKeys: {
    openai: String,
    anthropic: String,
    gemini: String
  },
  preferredAI: String (default: "openai"),
  createdAt: Date
}
```

### Document Model (AIResume_Document)

```javascript
{
  user: ObjectId,
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  text: String,
  jobDescription: String (optional),
  analysis: ObjectId,
  timestamps: true
}
```

### Analysis Model (AIResume_Analysis)

```javascript
{
  document: ObjectId,
  status: String ("pending", "processing", "done"),
  summary: String,
  keyPoints: [String],
  sentiment: { label, score },
  keywords: [String],
  questions: [String],
  resumeScore: Number,
  matchingSkills: [String],
  skillGaps: [String],
  recommendations: [String],
  processedAt: Date,
  timestamps: true
}
```

## Configuration

### Rate Limiting

Default: 10 documents per day per user

To modify, edit `ai-resume-analyzer/middleware/rateLimit.js`:

```javascript
export const limitDocumentsPerDay = (maxDocs = 10) => { // Change 10 to desired limit
  // ...
}
```

### File Upload Limits

- Maximum file size: 10MB
- Allowed types: PDF, TXT, MD files

Edit `ai-resume-analyzer/utils/file.js` to modify:

```javascript
limits: { fileSize: 10 * 1024 * 1024 }, // Change to desired size
```

## Troubleshooting

### "Analysis started but no results"

1. Check if AI API keys are properly set in environment
2. Verify MongoDB connection is working
3. Check server logs for queue processing errors
4. Ensure socket.io is properly connected

### "File upload fails"

1. Check file size (max 10MB)
2. Verify file type is PDF, TXT, or MD
3. Ensure uploads directory has write permissions
4. Check disk space availability

### "PDF parsing fails"

Some PDFs with special encoding might fail. Ensure the PDF is:
- Not password protected
- Valid PDF format
- Not corrupted

## Future Enhancements

- [ ] Support for DOCX, DOC file formats
- [ ] Batch document analysis
- [ ] Custom analysis templates
- [ ] Resume scoring history
- [ ] Collaborative analysis features
- [ ] Integration with ATS systems

## License

This is part of the Career Guidance Portal project.

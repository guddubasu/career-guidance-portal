import express from 'express';
import AptitudeResult from '../models/AptitudeResult.js';
import { careers, careerMapping, questions } from '../../frontend/src/data.js'; // Adjust path

const router = express.Router();

// Holland + Big Five → Your 20 careers scoring
const calculateScores = (answers) => {
  const hollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const bigFiveScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  
  // Score 25 answers [0-24] against 25 questions
  questions.forEach((question, index) => {
    const score = answers[index] || 3; // Default neutral
    const adjustedScore = question.reverse ? 6 - score : score;
    
    // Holland scoring (Q1-15)
    if (['R','I','A','S','E','C'].includes(question.category)) {
      hollandScores[question.category] += adjustedScore;
    }
    // Big Five scoring (Q16-25)
    else if (question.category === 'O') bigFiveScores.O += adjustedScore;
    else if (question.category === 'C_BF') bigFiveScores.C += adjustedScore;
    else if (question.category === 'E_BF') bigFiveScores.E += adjustedScore;
    else if (question.category === 'A_BF') bigFiveScores.A += adjustedScore;
    else if (question.category === 'N') bigFiveScores.N += adjustedScore;
  });

  return { hollandScores, bigFiveScores };
};

const calculateCareerMatches = (hollandScores, bigFiveScores) => {
  const careerScores = new Map();
  
  // Holland career mapping
  Object.entries(hollandScores).forEach(([trait, score]) => {
    if (careerMapping[trait]) {
      careerMapping[trait].forEach(careerId => {
        careerScores.set(careerId, (careerScores.get(careerId) || 0) + score * 1.2);
      });
    }
  });
  
  // Big Five career mapping
  Object.entries(bigFiveScores).forEach(([trait, score]) => {
    const mappedTrait = trait === 'N' ? 'N' : `${trait}_BF`;
    if (careerMapping[mappedTrait]) {
      careerMapping[mappedTrait].forEach(careerId => {
        careerScores.set(careerId, (careerScores.get(careerId) || 0) + score);
      });
    }
  });

  // Top 5 careers with match percentage
  return Array.from(careerScores.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([careerId, rawScore]) => {
      const career = careers.find(c => c.dataId === parseInt(careerId));
      return {
        ...career,
        matchScore: Math.min(95, Math.round((rawScore / 30) * 100)) // 30 = max possible
      };
    });
};

// ✅ MAIN API ENDPOINT
router.post('/submit', async (req, res) => {
  try {
    const { answers } = req.body; // [1,3,5,2,4...] - 25 answers
    
    if (!answers || answers.length !== 25) {
      return res.status(400).json({ error: 'Exactly 25 answers required' });
    }

    // Calculate personality scores
    const { hollandScores, bigFiveScores } = calculateScores(answers);
    
    // Get top 5 career matches
    const recommendations = calculateCareerMatches(hollandScores, bigFiveScores);
    
    // Get Holland Code (top 3 letters)
    const hollandCode = Object.entries(hollandScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([code]) => code)
      .join('');

    // Save to database (optional - works without user login too)
    const result = new AptitudeResult({
      userId: req.user?.id,
      hollandScores,
      bigFiveScores,
      topCareers: recommendations,
      hollandCode
    });
    await result.save();

    res.json({
      success: true,
      hollandCode,
      hollandScores,
      recommendations,
      message: `Your personality type: ${hollandCode}`
    });
  } catch (error) {
    console.error('Aptitude test error:', error);
    res.status(500).json({ error: 'Test processing failed' });
  }
});

export default router;

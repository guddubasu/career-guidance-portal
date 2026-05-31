import express from 'express';
import AptitudeResult from '../models/AptitudeResult.js';

const router = express.Router();

// Career Discovery Quiz Scoring
const calculateScores = (answers) => {
  const scores = {
    TC: 0, // Technical
    BM: 0, // Business
    HS: 0, // Healthcare
    CD: 0, // Creative
    ED: 0, // Engineering
    MC: 0  // Marketing
  };

  answers.forEach((answer) => {
    switch (Number(answer)) {
      case 1:
        scores.TC += 2.5;
        break;

      case 2:
        scores.BM += 2.5;
        break;

      case 3:
        scores.HS += 2.5;
        break;

      case 4:
        scores.CD += 2.5;
        break;

      case 5:
        scores.ED += 2.5;
        break;

      case 6:
        scores.MC += 2.5;
        break;

      default:
        break;
    }
  });

  return scores;
};

router.post('/submit', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length !== 20) {
      return res.status(400).json({
        success: false,
        error: 'Exactly 20 answers are required'
      });
    }

    const scores = calculateScores(answers);

    const careerMap = {
  TC: {
    title: "IT & Software",
    summary: "Software Development, AI, Data Science, Cyber Security"
  },
  BM: {
    title: "Commerce & Business Management",
    summary: "Business Administration, Operations, Management"
  },
  HS: {
    title: "Healthcare",
    summary: "Medical, Nursing, Allied Health Services"
  },
  CD: {
    title: "Arts, Design & Creative Fields",
    summary: "Graphic Design, UI/UX, Fashion, Animation"
  },
  ED: {
    title: "Core Engineering",
    summary: "Mechanical, Civil, Electrical, Production"
  },
  MC: {
    title: "Media, Communication & Marketing",
    summary: "Digital Marketing, Advertising, Journalism"
  }
};

const recommendations = Object.entries(scores)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 3)
  .map(([domain, score]) => ({
    domain,
    score,
    title: careerMap[domain].title,
    summary: careerMap[domain].summary,
    matchScore: Math.round((score / 50) * 100),
    baseColor: "#e63946"
  }));

    const summary =
      'Your scores indicate a mixed domain profile, which can be valuable for hybrid roles.';

    // Save result (optional)
    try {
      const result = new AptitudeResult({
        userId: req.user?.id,
        scores,
        recommendations,
        summary
      });

      await result.save();
    } catch (dbError) {
      console.log('Database save skipped:', dbError.message);
    }

    res.json({
      success: true,
      scores,
      recommendations,
      summary
    });
  } catch (error) {
    console.error('Aptitude test error:', error);

    res.status(500).json({
      success: false,
      error: 'Test processing failed'
    });
  }
});

export default router;
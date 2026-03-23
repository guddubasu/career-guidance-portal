import mongoose from 'mongoose';

const aptitudeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', sparse: true },
  hollandScores: {
    R: { type: Number, default: 0 }, // Realistic
    I: { type: Number, default: 0 }, // Investigative
    A: { type: Number, default: 0 }, // Artistic
    S: { type: Number, default: 0 }, // Social
    E: { type: Number, default: 0 }, // Enterprising
    C: { type: Number, default: 0 }  // Conventional
  },
  bigFiveScores: {
    O: { type: Number, default: 0 }, // Openness
    C: { type: Number, default: 0 }, // Conscientiousness
    E: { type: Number, default: 0 }, // Extraversion
    A: { type: Number, default: 0 }, // Agreeableness
    N: { type: Number, default: 0 }  // Neuroticism
  },
  topCareers: [{
    careerId: Number,
    title: String,
    matchScore: Number
  }],
  hollandCode: String, // e.g. "RIA"
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model('AptitudeResult', aptitudeSchema);

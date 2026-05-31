import mongoose from 'mongoose';

const aptitudeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    sparse: true
  },

  scores: {
    TC: { type: Number, default: 0 }, // Technical
    BM: { type: Number, default: 0 }, // Business
    HS: { type: Number, default: 0 }, // Healthcare
    CD: { type: Number, default: 0 }, // Creative
    ED: { type: Number, default: 0 }, // Engineering
    MC: { type: Number, default: 0 }  // Marketing
  },

  recommendations: [
    {
      domain: String,
      score: Number
    }
  ],

  summary: {
    type: String,
    default:
      'Your scores indicate a mixed domain profile, which can be valuable for hybrid roles.'
  },

  completedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('AptitudeResult', aptitudeSchema);
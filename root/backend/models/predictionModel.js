import mongoose from "mongoose";
const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    selectedClass: {
      type: String,
      default: "",
    },

    stream: {
      type: String,
      default: "",
    },

    tenthSubjects: [
      {
        subject: {
          type: String,
          default: "",
        },

        marks: {
          type: Number,
          default: 0,
        },
      },
    ],

    twelfthSubjects: [
      {
        subject: {
          type: String,
          default: "",
        },

        marks: {
          type: Number,
          default: 0,
        },
      },
    ],
    overallPercentage: {
      type: Number,
      default: 0,
    },
    favoriteSubjects: {
      type: [String],
      default: [],
    },
    leastFavoriteSubject: {
      type: String,
      default: "",
    },
    energySource: {
      type: String,
      default: "",
    },
    informationProcessing: {
      type: String,
      default: "",
    },
    decisionMaking: {
      type: String,
      default: "",
    },
    lifestyleApproach: {
      type: String,
      default: "",
    },
    careerAwarenessAnswers: {
     type: [String],
     default: [],
},
    careerAwarenessScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const predictionModel =
  mongoose.models.prediction ||
  mongoose.model("prediction", predictionSchema);

export default predictionModel;
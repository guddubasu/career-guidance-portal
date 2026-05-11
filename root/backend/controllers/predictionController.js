import predictionModel from "../models/predictionModel.js";
export const saveAcademicFactors = async (req, res) => {
  try {
    const {
      selectedClass,
      stream,
      tenthSubjects,
      twelfthSubjects,
      overallPercentage,
      favoriteSubjects,
      leastFavoriteSubject,
    } = req.body;
    const prediction =
      await predictionModel.findOneAndUpdate(
        { userId: req.userId },
        {
          selectedClass,
          stream,
          tenthSubjects,
          twelfthSubjects,
          overallPercentage,
          favoriteSubjects,
          leastFavoriteSubject,
        },
        {
          new: true,
          upsert: true,
        }
      );
    res.json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const savePsychologicalFactors = async (req, res) => {
  try {
    const {
      energySource,
      informationProcessing,
      decisionMaking,
      lifestyleApproach,
    } = req.body;
    const prediction =
      await predictionModel.findOneAndUpdate(

        { userId: req.userId },

        {
          energySource,
          informationProcessing,
          decisionMaking,
          lifestyleApproach,
        },

        {
          new: true,
          upsert: true,
        }

      );

    res.json({
      success: true,
      prediction,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};

export const saveCareerAwareness = async (req, res) => {

  try {

    const {

      careerAwarenessAnswers,
      careerAwarenessScore,

    } = req.body;

    const prediction =
      await predictionModel.findOneAndUpdate(

        { userId: req.userId },

        {
          careerAwarenessAnswers,
          careerAwarenessScore,
        },

        {
          new: true,
          upsert: true,
        }

      );

    res.json({
      success: true,
      prediction,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }

};
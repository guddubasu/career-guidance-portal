import express from "express";
import userAuth from "../middlewears/userAuth.js";
import {
  saveAcademicFactors,
  savePsychologicalFactors,
  saveCareerAwareness,
} from "../controllers/predictionController.js";
const predictionRouter = express.Router();
predictionRouter.post(
  "/academic-factors",
  userAuth,
  saveAcademicFactors
);
predictionRouter.post(
  "/psychological-factors",
  userAuth,
  savePsychologicalFactors
);
predictionRouter.post(
  "/career-awareness",
  userAuth,
  saveCareerAwareness
);
export default predictionRouter;
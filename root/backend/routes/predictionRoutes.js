import express from "express";
import userAuth from "../middlewears/userAuth.js";
import {
  saveAcademicFactors,
  savePsychologicalFactors,
  saveCareerAwareness,
} from "../controllers/predictionController.js";
const predictionRouter = express.Router();
//academic factors
predictionRouter.post(
  "/academic-factors",
  userAuth,
  saveAcademicFactors
);
//psychological factors
predictionRouter.post(
  "/psychological-factors",
  userAuth,
  savePsychologicalFactors
);
//career-awareness factors
predictionRouter.post(
  "/career-awareness",
  userAuth,
  saveCareerAwareness
);
export default predictionRouter;
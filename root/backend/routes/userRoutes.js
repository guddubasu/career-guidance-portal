import express from "express";
import userAuth from "../middlewears/userAuth.js";
import {
  getUserData,
  completeProfile
} from "../controllers/userController.js";
const userRouter = express.Router();
userRouter.get(
  "/data",
  userAuth,
  getUserData
);
userRouter.post(
  "/complete-profile",
  userAuth,
  completeProfile
);
export default userRouter;
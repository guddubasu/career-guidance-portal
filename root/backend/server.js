const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import predictionRouter from "./routes/predictionRoutes.js";
import userModel from "./models/usermodel.js";
import domainModel from "./models/domainModel.js";
import aptitudeRoutes from "./routes/aptitudeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app=express();
const port=process.env.PORT || 4000;
const allowedOrigins=['http://localhost:5173'];
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));

connectDB();
app.listen(port,()=>{
    console.log(`server started on PORT: ${port}`);
});
//API endpoints
app.get("/",(req,res)=>{
    res.send("API WORKING FINE");
});
app.get('/getCareerData',(req,res)=>{
domainModel.find()
.then(career_data => res.json(career_data))
.catch(error=>res.json(error));
});
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/aptitude',aptitudeRoutes);
app.use("/api/prediction",predictionRouter);
app.use("/api/colleges", collegeRoutes);






//Project123---database password(mongodb atlas)
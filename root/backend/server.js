import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import userModel from "./models/usermodel.js";
import domainModel from "./models/domainModel.js";
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







//Project123---database password(mongodb atlas)
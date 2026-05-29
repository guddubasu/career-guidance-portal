import mongoose from "mongoose";
import college_data from "./collegeData.js";
import College from "../models/College.js";
const connectDB=async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("database connected");
    });
    await mongoose.connect("mongodb://localhost:27017/career_guidance");
};
connectDB();
const initializeDB=async()=>{
    await College.deleteMany({});
    await College.insertMany(college_data);
    console.log("College data was initialized");
}
initializeDB();
import mongoose from "mongoose";
import career_data from "./data.js";
import domainModel from "../models/domainModel.js";
const connectDB=async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("database connected");
    });
    await mongoose.connect("mongodb://localhost:27017/career_guidance");
};
connectDB();
const initializeDB=async()=>{
    await domainModel.deleteMany({});
    await domainModel.insertMany(career_data);
    console.log("data was initialized");
}
initializeDB();
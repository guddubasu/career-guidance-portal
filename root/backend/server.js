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
import http from "http";
import { Server as IOServer } from "socket.io";
import aiResumeAuthRoutes from "./ai-resume-analyzer/routes/auth.js";
import aiResumeDocsRoutes from "./ai-resume-analyzer/routes/documents.js";
import { initSocket } from "./ai-resume-analyzer/utils/socket.js";
import { resumePendingJobs } from "./ai-resume-analyzer/jobs/worker.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

connectDB();

// Initialize Socket.io
const io = initSocket(server);

// API endpoints
app.get("/", (req, res) => {
  res.send("API WORKING FINE");
});

app.get('/getCareerData', (req, res) => {
  domainModel.find()
    .then(career_data => res.json(career_data))
    .catch(error => res.json(error));
});

// Original routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/aptitude', aptitudeRoutes);
app.use("/api/prediction", predictionRouter);
app.use("/api/colleges", collegeRoutes);

// AI Resume Analyzer routes
app.use('/api/ai-resume/auth', aiResumeAuthRoutes);
app.use('/api/ai-resume/docs', aiResumeDocsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

server.listen(port, async () => {
  console.log(`server started on PORT: ${port}`);
  // Resume any pending analysis jobs
  try {
    await resumePendingJobs();
    console.log("Resumed pending analysis jobs");
  } catch (err) {
    console.error("Error resuming pending jobs:", err);
  }
});

export { app, server, io };






//Project123---database password(mongodb atlas)
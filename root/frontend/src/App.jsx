import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import AICareerChat from "./pages/AICareerChat";
import AIResumeAnalyser from "./pages/AIResumeAnalyser";
import CareerRoadmap from "./pages/CareerRoadmap";
import Personality from "./pages/Personality";
// Placeholder pages
import Institutions from "./pages/Institutions";
import Scholarships from "./pages/Scholarships";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/ai-chat" element={<AICareerChat />} />
          <Route path="/ai-resume" element={<AIResumeAnalyser />}/>
          <Route path="/ai-roadmap" element={<CareerRoadmap />} />
          <Route path="/personality" element={<Personality />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      <Footer />
      </main>
    </div>
  );
}

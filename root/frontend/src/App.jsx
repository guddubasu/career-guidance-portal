// App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CareersPage from "./pages/CareersPage";
import CareerDetail from "./pages/CareerDetail";
import AICareerChat from "./pages/AICareerChat";
import AIResumeAnalyser from "./pages/AIResumeAnalyser";
import CareerRoadmap from "./pages/CareerRoadmap";
import Personality from "./pages/Personality";
import DistanceOnline from "./pages/DistanceOnline";
import AptitudeTest from "./pages/AptitudeTest";
import Institutions from "./pages/Institutions";
import Scholarships from "./pages/Scholarships";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ResetPassword from "./pages/ResetPassword";
import InterestForm from "./pages/InterestForm";
import GovernmentScholarships from "./pages/GovernmentScholarships";
import PrivateScholarships from "./pages/PrivateScholarships";
import ShowScholarship from "./pages/ShowScholarship";

export default function App() {
  const location = useLocation();

  // Hide footer only on landing page "/"
  const hideFooter = location.pathname === "/";

  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />

          {/* Careers */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<CareerDetail />} />

          {/* AI Tools */}
          <Route path="/ai-chat" element={<AICareerChat />} />
          <Route path="/ai-resume" element={<AIResumeAnalyser />} />
          <Route path="/ai-roadmap" element={<CareerRoadmap />} />

          {/* Tests */}
          <Route path="/personality" element={<Personality />} />
          <Route path="/aptitude" element={<AptitudeTest />} />
          <Route path="/interest-form" element={<InterestForm />} />

          {/* Learning & Info */}
          <Route path="/distance-online-learning" element={<DistanceOnline />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/gscholarships" element={<GovernmentScholarships />} />
          <Route path="/pscholarships" element={<PrivateScholarships />} />
          <Route path="/showscholarships" element={<ShowScholarship />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profiledetails" element={<ProfileDetails />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer shown only if NOT on landing page */}
      {!hideFooter && <Footer />}
    </div>
  );
}

import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Appcontext } from "./context/AppContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CareersPage from "./pages/CareersPage";
import CareerDetail from "./pages/CareerDetail";
import Domain from "./pages/Domain";
import SubCareerDetail from "./pages/SubCareerDetail";
import InstitutionDetails from "./pages/InstitutionDetails";
// AI Features
import AICareerChat from "./pages/AICareerChat";
import AIResumeAnalyser from "./pages/AIResumeAnalyser";
import CareerRoadmap from "./pages/CareerRoadmap";

// Assessments
import Personality from "./pages/Personality";
import AptitudeTest from "./pages/AptitudeTest";
import InterestForm from "./pages/InterestForm";
import AptitudeResults from "./pages/AptitudeResults";

// FIXED IMPORT (IMPORTANT)
import CareerAwarenessQuestions from "./pages/CareerAwareness";

// Factors
import PsychologicalFactors from "./pages/PsychologicalFactors";
import AcademicFactors from "./pages/AcademicFactors";

// Education
import DistanceOnline from "./pages/DistanceOnline";
import Institutions from "./pages/Institutions";
import Scholarships from "./pages/Scholarships";
import GovernmentScholarships from "./pages/GovernmentScholarships";
import PrivateScholarships from "./pages/PrivateScholarships";
import ShowScholarship from "./pages/ShowScholarship";

// Auth
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const location = useLocation();
  const { isLoggedin } = useContext(Appcontext);

  const isLandingPage = location.pathname === "/";
  const hideFooter = location.pathname === "/";

  return (
    <div>
      {!isLandingPage && <Navbar />}

      <main>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>

          {/* LANDING */}
          <Route
            path="/"
            element={isLoggedin ? <Navigate to="/home" /> : <LandingPage />}
          />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* USER */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/completeProfile" element={<CompleteProfile />} />
          <Route path="/changePassword" element={<ChangePassword />} />

          {/* CAREERS */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/domain/:id" element={<Domain />} />
          <Route path="/career-detail/:id/:career" element={<SubCareerDetail />} />
          <Route path="/institution/:id" element={<InstitutionDetails />}/>

          {/* AI */}
          <Route path="/ai-chat" element={<AICareerChat />} />
          <Route path="/ai-resume" element={<AIResumeAnalyser />} />
          <Route path="/ai-roadmap" element={<CareerRoadmap />} />

          {/* ASSESSMENTS */}
          <Route path="/personality" element={<Personality />} />
          <Route path="/aptitude" element={<AptitudeTest />} />
          <Route path="/aptitude/results" element={<AptitudeResults />} />
          <Route path="/interest-form" element={<InterestForm />} />

          {/* FIXED ROUTE */}
          <Route path="/career-awareness" element={<CareerAwarenessQuestions />} />

          <Route path="/academic" element={<AcademicFactors />} />
          <Route path="/psychology" element={<PsychologicalFactors />} />
          <Route path="/psychological-factors" element={<PsychologicalFactors />} />

          {/* EDUCATION */}
          <Route path="/distance-online-learning" element={<DistanceOnline />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/gscholarships" element={<GovernmentScholarships />} />
          <Route path="/pscholarships" element={<PrivateScholarships />} />
          <Route path="/showscholarships" element={<ShowScholarship />} />

          {/* CATCH ALL */}
          <Route path="*" element={<Home />} />

        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
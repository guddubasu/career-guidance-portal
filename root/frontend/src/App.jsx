// App.jsx
import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Appcontext } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CareersPage from "./pages/CareersPage";
import CareerDetail from "./pages/CareerDetail";
import Domain from "./pages/Domain";
import SubCareerDetail from "./pages/SubCareerDetail";

import AICareerChat from "./pages/AICareerChat";
import AIResumeAnalyser from "./pages/AIResumeAnalyser";
import CareerRoadmap from "./pages/CareerRoadmap";

import Personality from "./pages/Personality";
import AptitudeTest from "./pages/AptitudeTest";
import InterestForm from "./pages/InterestForm";

import DistanceOnline from "./pages/DistanceOnline";
import Institutions from "./pages/Institutions";

import Scholarships from "./pages/Scholarships";
import GovernmentScholarships from "./pages/GovernmentScholarships";
import PrivateScholarships from "./pages/PrivateScholarships";
import ShowScholarship from "./pages/ShowScholarship";

import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import ChangePassword from './pages/ChangePassword';
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const hideFooter = location.pathname === "/";
  const { isLoggedin } = useContext(Appcontext);

  return (
    <div>
      {!isLandingPage && <Navbar />}
      <main>
        <ToastContainer />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={isLoggedin ? <Navigate to="/home" /> : <LandingPage />} />

          {/* Home page */}
          <Route path="/home" element={<Home />} />

          {/* Careers */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/domain/:id" element={<Domain />} />
          <Route path="/career-detail/:id/:career" element={<SubCareerDetail />} />

          {/* AI Features */}
          <Route path="/ai-chat" element={<AICareerChat />} />
          <Route path="/ai-resume" element={<AIResumeAnalyser />} />
          <Route path="/ai-roadmap" element={<CareerRoadmap />} />

          {/* Assessment */}
          <Route path="/personality" element={<Personality />} />
          <Route path="/aptitude" element={<AptitudeTest />} />
          <Route path="/interest-form" element={<InterestForm />} />

          {/* Online learning */}
          <Route path="/distance-online-learning" element={<DistanceOnline />} />
          <Route path="/institutions" element={<Institutions />} />

          {/* Scholarships */}
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/gscholarships" element={<GovernmentScholarships />} />
          <Route path="/pscholarships" element={<PrivateScholarships />} />
          <Route path="/showscholarships" element={<ShowScholarship />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />

          {/* Catch-all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
// App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
<<<<<<< HEAD

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

=======
import { useContext } from "react";
import { Appcontext } from "./context/AppContext";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CareersPage from "./pages/CareersPage";
import CareerDetail from "./pages/CareerDetail";
<<<<<<< HEAD
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
=======
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
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
import GovernmentScholarships from "./pages/GovernmentScholarships";
import PrivateScholarships from "./pages/PrivateScholarships";
import ShowScholarship from "./pages/ShowScholarship";

<<<<<<< HEAD
export default function App() {

  
  const [hasEntered, setHasEntered] = useState(false);
  const location = useLocation();

  
  const hideFooter = location.pathname === "/";

 
  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<CareerDetail />} />

=======
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import ChangePassword from './pages/ChangePassword';
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {

  
  // const [hasEntered, setHasEntered] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  const hideFooter = location.pathname === "/";
 const { isLoggedin } = useContext(Appcontext);
 
  // if (!hasEntered) {
  //   return <LandingPage onEnter={() => setHasEntered(true)} />;
  // }

  return (
    <div>
     {!isLandingPage && <Navbar />}
      <main>
        <ToastContainer/>
        <Routes>
          {/* landing page */}
         <Route path="/" element={isLoggedin ? <Navigate to="/home" /> : <LandingPage />}/>
          {/*home page*/}
          <Route path="/home" element={<Home />} />

          {/* Careers */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/domain/:id" element={<Domain />} />
          <Route path="/career-detail/:id/:career" element={<SubCareerDetail />} />

          {/* AI Features */}
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
          <Route path="/ai-chat" element={<AICareerChat />} />
          <Route path="/ai-resume" element={<AIResumeAnalyser />} />
          <Route path="/ai-roadmap" element={<CareerRoadmap />} />

<<<<<<< HEAD
          <Route path="/personality" element={<Personality />} />
          <Route path="/aptitude" element={<AptitudeTest />} />
          <Route path="/interest-form" element={<InterestForm />} />

          <Route path="/distance-online-learning" element={<DistanceOnline />} />
          <Route path="/institutions" element={<Institutions />} />
=======
          {/* Assessment */}
          <Route path="/personality" element={<Personality />} />
          <Route path="/aptitude" element={<AptitudeTest />} />
          <Route path="/interest-form" element={<InterestForm />} />
         
          <Route path="/distance-online-learning" element={<DistanceOnline />} />
          <Route path="/institutions" element={<Institutions />} />

          {/* Scholarships */}
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/gscholarships" element={<GovernmentScholarships />} />
          <Route path="/pscholarships" element={<PrivateScholarships />} />
          <Route path="/showscholarships" element={<ShowScholarship />} />
<<<<<<< HEAD

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profiledetails" element={<ProfileDetails />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path="*" element={<Home />} />
=======
          {/* authentication routes */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
           <Route path="/changePassword" element={<ChangePassword/>}/>
          {/* -------------------------- */}
          <Route path="*" element={<Home />} />

>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6

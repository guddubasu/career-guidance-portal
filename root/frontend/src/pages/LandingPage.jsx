import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage({ onEnter }) {
  const navigate = useNavigate();

  const handleStart = () => {
    if (onEnter) onEnter();
    navigate("/home");
  };

  return (
    <div className="landing-container">
      <div className="left-section">
        <h1 className="hero-title">
          Welcome to,<br />
          <span className="highlight">CareerCompass</span>
        </h1>
        <p className="hero-subtitle">Find your ideal career with AI-powered tools.</p>
        <button className="get-started-btn" onClick={handleStart}>
          Get Started
        </button>
      </div>
      <div className="right-section">
        <div className="image-grid">
          <img src="/images/img2.jpg" alt="Career 1" className="career-img" />
          <img src="/images/img1.jpg" alt="Career 2" className="career-img" />
          <img src="/images/img3.jpg" alt="Career 3" className="career-img" />
          <img src="/images/img4.jpg" alt="Career 4" className="career-img" />
        </div>
      </div>
    </div>
  );
}

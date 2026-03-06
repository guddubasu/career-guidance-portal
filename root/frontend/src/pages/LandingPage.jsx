import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage({ onEnter }) {
  const navigate = useNavigate();

  const handleStart = () => {
    // Call the onEnter callback if provided (for first-time landing logic)
    if (onEnter) onEnter();

    // Navigate to home page (you can handle auth here if needed)
    navigate("/home");
  };

  return (
    <div className="landing-container">
      <div className="left-section">
        <h1>
          Welcome to,<br />
          <span>CareerCompass</span>
        </h1>

        <p>Find your ideal career with AI-powered tools.</p>

        <button className="start-btn" onClick={handleStart}>
          Get Started
        </button>
      </div>

      <div className="right-section">
        <div className="image-grid">
          <img src="/images/img2.jpg" alt="Career 1" />
          <img src="/images/img1.jpg" alt="Career 2" />
          <img src="/images/img3.jpg" alt="Career 3" />
          <img src="/images/img4.jpg" alt="Career 4" />
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage({ onEnter }) {
  const navigate = useNavigate();

const handleStart = () => {
    navigate("/home");//changing it to implement authentication
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
          <img src="/images/img2.jpg" alt="" />
          <img src="/images/img1.jpg" alt="" />
          <img src="/images/img3.jpg" alt="" />
          <img src="/images/img4.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

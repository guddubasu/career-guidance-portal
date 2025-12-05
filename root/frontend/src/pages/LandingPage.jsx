import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <h1>
          Welcome to,<br />
          <span>Career Guidance Portal</span>
        </h1>

        <p>Find your ideal career with AI-powered tools.</p>

        <button className="start-btn" onClick={() => navigate("/home")}>
          Get Started
        </button>
      </div>

      {/* RIGHT SECTION – IMAGE GRID */}
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

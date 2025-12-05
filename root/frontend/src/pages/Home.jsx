import React from "react";
import heroImage from "../assets/hero.png"; 
import careerImage from "../assets/career.png";
import careersearchImage from "../assets/careersearch.png";
import personalityImage from "../assets/personality.png";
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">500 Roads to Success</h1>
          <p className="hero-subtitle">Navigating life after school</p>
          <p className="hero-description">
            Education, especially quality education, is a privilege and a power. 
            This website aims to help young minds comprehend the power at hand 
            and guide them on how to wield it for themselves and the country’s advancement. 
            Choose a domain that interests you the most to explore further.
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Career guidance illustration" />
        </div>
      </section>

      {/* Cards Section */}
      <section className="quick-links-section">
        <div className="quick-links-cards">
          <Link to="/careers" className="card-link">
            <div className="card">
              <img src={careerImage} alt="Careers" className="card-image" />
              <h3>VIEW ALL CAREER CARDS</h3>
            </div>
          </Link>

          {/*<Link to="/institutions" className="card-link">
            <div className="card">
              <img src={careersearchImage} alt="careersearch" className="card-image" />
              <h3>SEE CAREERS BASED ON YOUR INTERESTS</h3>
            </div>
          </Link>*/}

          <Link to="/interest-form" className="card-link">
  <div className="card">
    <img src={careersearchImage} alt="careersearch" className="card-image" />
    <h3>SEE CAREERS BASED ON YOUR INTERESTS</h3>
  </div>
</Link>



          {/* <Link to="/personality" className="card-link">
            <div className="card">
              <img src={personalityImage} alt="personality" className="card-image" />
              <h3>TAKE THE RIASEC PERSONALITY TEST</h3>
            </div>
          </Link> */}
          <Link to="/aptitude" className="card-link">
            <div className="card">
              <img src={personalityImage} alt="aptitude" className="card-image" />
              <h3>TAKE THE APTITUDE TEST</h3>
            </div>
          </Link>
          
        </div>
      </section>
      {/* AI Help Section */}
      <section className="ai-help-section">
      <h2 className="ai-help-title">Get Help with AI</h2>
      <div className="ai-cards">
      <Link to="/ai-chat" className="ai-card">
        <h3>AI Career Q&amp;A Chat</h3>
      </Link>
      <Link to="/ai-resume" className="ai-card">
        <h3>AI Resume Analyser</h3>
      </Link>
      <Link to="/ai-roadmap" className="ai-card">
        <h3>Career Roadmap Generator</h3>
      </Link>
  </div>
</section>

    </div>
  );
}

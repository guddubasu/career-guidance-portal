import React, { useContext } from "react";
import heroImage from "../assets/hero.png";
import careerImage from "../assets/career.png";
import careersearchImage from "../assets/careersearch.png";
import personalityImage from "../assets/personality.png";
import { Link } from "react-router-dom";
import "./Home.css";
import { Appcontext } from "../context/AppContext";

export default function Home() {
  const { isLoggedin } = useContext(Appcontext);

  const cardData = [
    {
      title: "Explore Careers",
      image: careerImage,
      link: "/careers",
    },
    {
      title: "Find Careers For You",
      image: careersearchImage,
      link: "/career-assessment",
    },
    {
      title: "Take Aptitude Test",
      image: personalityImage,
      link: "/aptitude",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">CareerCompass</h1>

          <p className="hero-subtitle">
            Navigating life after school
          </p>

          <p className="hero-description">
            Education, especially quality education, is a privilege and a
            power. This website aims to help young minds comprehend the power
            at hand and guide them on how to wield it for themselves and the
            country’s advancement. Choose a domain that interests you the most
            to explore further.
          </p>
        </div>

        <div className="hero-image">
          <img
            src={heroImage}
            alt="Career guidance illustration"
          />
        </div>
      </section>

      {/* Cards Section */}
      {isLoggedin && (
        <section className="options-section">
          <div className="cards-container">
            {cardData.map((card, index) => (
              <Link
                to={card.link}
                className="option-card"
                key={index}
              >
                <div className="modern-card">
                  <div className="card-icon-wrapper">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="card-image"
                    />
                  </div>

                  <h3 className="card-title">
                    {card.title}
                  </h3>

                  <p className="card-description">
                    Click to explore more
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* AI Help Section */}
      {isLoggedin && (
        <section className="ai-help-section">
          <h2 className="ai-help-title">
            Get Help with AI
          </h2>

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
      )}
    </div>
  );
}
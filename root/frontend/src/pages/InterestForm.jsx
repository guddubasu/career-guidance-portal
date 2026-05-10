import React from "react";
import { useNavigate } from "react-router-dom";
import "./InterestForm.css";

export default function CareerCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "ACADEMIC",
      subtitle: "Guidance & Support",
      color: "#4CAF50",
      icon: "📚",
      path: "/academic",
    },
    {
      title: "PSYCHOLOGY",
      subtitle: "Counselling & Wellness",
      color: "#9C27B0",
      icon: "🧠",
      path: "/psychology",
    },
    {
      title: "CAREER AWARENESS",
      subtitle: "Career Planning",
      color: "#FF7043",
      icon: "💼",
      path: "/career-awareness",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div
          key={index}
          className="career-card"
          style={{ background: card.color }}
        >
          <div className="card-content">

            {/* Icon */}
            <div className="icon-box">
              <span className="card-icon">
                {card.icon}
              </span>
            </div>

            {/* Title */}
            <div className="title-box">
              <h2>{card.title}</h2>
              <p>{card.subtitle}</p>
            </div>

            {/* Explore Button */}
            <button
              className="explore-btn"
              onClick={() => navigate(card.path)}
            >
              Explore →
            </button>

          </div>

          {/* Footer */}
          <div className="footer-box">
            <span>↗</span>
          </div>
        </div>
      ))}
    </div>
  );
}
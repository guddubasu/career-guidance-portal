// src/components/QuestionCard.jsx
import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({ question, selectedAnswer, onAnswer }) => {
  return (
    <div className="question-card">
      <p className="question-text">{question.text}</p>

      <div className="scale">
        <span className="scale-label">{question.type === "career" ? "Dislike" : "Inaccurate"}</span>

        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="scale-option">
            <input
              type="radio"
              name={`q-${question.id}`}
              value={num}
              checked={selectedAnswer === num}
              onChange={() => onAnswer(num)}
            />
            <span className="circle"></span>
          </label>
        ))}

        <span className="scale-label">{question.type === "career" ? "Like" : "Accurate"}</span>
      </div>
    </div>
  );
};

export default QuestionCard;

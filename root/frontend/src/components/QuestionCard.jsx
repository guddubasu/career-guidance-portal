import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({ question, selectedAnswer, onAnswer }) => {
  return (
    <div className="question-card">
      <h3 className="question-text">
        {question.id}. {question.question}
      </h3>

      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedAnswer === index + 1 ? "selected" : ""
            }`}
            onClick={() => onAnswer(index + 1)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
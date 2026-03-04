import React, { useState } from "react";
import { questions } from "../data";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import "./AptitudeTest.css";

const questionsPerPage = [18, 18, 18, 20, 20]; // custom pagination

const AptitudeTest = () => {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  // Determine start and end index for current page
  const startIndex = questionsPerPage.slice(0, currentPage).reduce((a, b) => a + b, 0);
  const endIndex = startIndex + questionsPerPage[currentPage];
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswer = (questionId, answerIndex) => {
    if (answerIndex >= 1 && answerIndex <= 5) {
      setAnswers({ ...answers, [questionId]: answerIndex });
    }
  };

  const handleNext = () => {
    // Prevent next if any question on the page is unanswered
    const unanswered = currentQuestions.some(q => !answers[q.id]);
    if (unanswered) {
      alert("Please answer all questions on this page before proceeding.");
      return;
    }

    if (currentPage < questionsPerPage.length - 1) setCurrentPage(currentPage + 1);
    else alert("Test completed!");
  };

  const handleBack = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Rounded progress percentage
  const progress = Math.round(((startIndex + currentQuestions.length) / questions.length) * 100);

  return (
    <div className="test-container">
      <h1>Career Aptitude Test</h1>

      {/* Progress bar */}
      <ProgressBar current={progress} total={100} className="progress-container" />

      {/* Question range text */}
      <p className="question-range">
        Questions {startIndex + 1} - {Math.min(endIndex, questions.length)} of {questions.length}
      </p>

      {/* Questions */}
      {currentQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          selectedAnswer={answers[q.id]}
          onAnswer={(answerIndex) => handleAnswer(q.id, answerIndex)}
        />
      ))}

      {/* Navigation */}
      <div className="navigation-buttons">
        <button onClick={handleBack} disabled={currentPage === 0}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestions.some(q => !answers[q.id])}
        >
          {currentPage === questionsPerPage.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default AptitudeTest;

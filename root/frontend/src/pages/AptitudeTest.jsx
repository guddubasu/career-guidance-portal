import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import "./AptitudeTest.css";

const questionsPerPage = [5, 5, 5, 5];

const AptitudeTest = () => {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const startIndex = questionsPerPage
    .slice(0, currentPage)
    .reduce((a, b) => a + b, 0);

  const endIndex = startIndex + questionsPerPage[currentPage];
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswer = (questionId, answerIndex) => {
    if (answerIndex >= 1 && answerIndex <= 6) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex,
      }));
    }
  };

  const handleNext = async () => {
    console.log("Next button clicked");

    const unanswered = currentQuestions.some(
      (q) => answers[q.id] === undefined
    );

    console.log("Unanswered:", unanswered);

    if (unanswered) {
      alert("Please answer all questions before proceeding.");
      return;
    }

    if (currentPage < questionsPerPage.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      await submitTest();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const submitTest = async () => {
    setIsSubmitting(true);

    try {
      const answerValues = questions.map((q) =>
        Number(answers[q.id])
      );

      console.log("Submitting answers:", answerValues);

      const response = await fetch(
        "http://localhost:4000/api/aptitude/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: answerValues,
          }),
        }
      );

      const results = await response.json();

      console.log("Backend Results:", results);

      if (results.success) {
        navigate("/aptitude/results", {
          state: {
            scores: results.scores,
            recommendations: results.recommendations,
            summary: results.summary,
          },
        });
      } else {
        alert("Analysis failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Unable to connect to the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  return (
    <div className="test-container">
      <h1>🎯 Career Discovery Quiz</h1>

      <ProgressBar
        current={progress}
        total={100}
        className="progress-container"
      />

      <p className="question-range">
        Questions {startIndex + 1} -{" "}
        {Math.min(endIndex, questions.length)} of{" "}
        {questions.length}
      </p>

      {currentQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          selectedAnswer={answers[q.id]}
          onAnswer={(answerIndex) =>
            handleAnswer(q.id, answerIndex)
          }
        />
      ))}

      <div className="navigation-buttons">
        <button
          onClick={handleBack}
          disabled={currentPage === 0}
          className="btn-secondary"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={
            currentQuestions.some(
              (q) => answers[q.id] === undefined
            ) || isSubmitting
          }
          className="btn-primary"
        >
          {isSubmitting
            ? "🔄 Analyzing..."
            : currentPage === questionsPerPage.length - 1
            ? "🚀 Get My Results"
            : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default AptitudeTest;
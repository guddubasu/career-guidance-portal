import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data"; // Your 25 questions
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import "./AptitudeTest.css";

const questionsPerPage = [5, 5, 5, 5, 5];

const AptitudeTest = () => {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const startIndex = questionsPerPage.slice(0, currentPage).reduce((a, b) => a + b, 0);
  const endIndex = startIndex + questionsPerPage[currentPage];
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswer = (questionId, answerIndex) => {
    if (answerIndex >= 1 && answerIndex <= 5) {
      setAnswers({ ...answers, [questionId]: answerIndex });
    }
  };

  const handleNext = async () => {
    const unanswered = currentQuestions.some(q => !answers[q.id]);
    if (unanswered) {
      alert("Please answer all questions on this page before proceeding.");
      return;
    }

    if (currentPage < questionsPerPage.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // 🔥 FINAL PAGE - SUBMIT TO YOUR WORKING BACKEND
      await submitTest();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // ✅ PERFECT - Matches your curl test exactly!
  const submitTest = async () => {
    setIsSubmitting(true);
    try {
      const answerValues = Object.values(answers).map(Number); // [1,3,5,2,4...] - 25 answers
      
      console.log('🔥 Submitting 25 answers:', answerValues); // Debug log

      const response = await fetch('http://localhost:4000/api/aptitude/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answerValues })
      });

      const results = await response.json();
      
      if (results.success) {
        // 🎯 Navigate with COMPLETE data
        navigate('/aptitude/results', { 
          state: { 
            hollandCode: results.hollandCode,
            hollandScores: results.hollandScores,
            recommendations: results.recommendations 
          } 
        });
      } else {
        alert('Analysis failed. Please try again.');
      }
    } catch (error) {
      alert('Connection failed. Is backend running on port 4000?');
      console.error('❌ Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = Math.round(((startIndex + currentQuestions.length) / questions.length) * 100);

  return (
    <div className="test-container">
      <h1>🎯 Career Aptitude Test</h1>
      
      {/* <div className="page-indicator">
        Page {currentPage + 1} of 5 • {progress}% Complete
      </div> */}
      
      <ProgressBar current={progress} total={100} className="progress-container" />
      
      <p className="question-range">
        Questions {startIndex + 1}-{Math.min(endIndex, questions.length)} of 25
      </p>

      {currentQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          selectedAnswer={answers[q.id]}
          onAnswer={(answerIndex) => handleAnswer(q.id, answerIndex)}
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
          disabled={currentQuestions.some(q => !answers[q.id]) || isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? "🔄 Analyzing..." : 
           currentPage === questionsPerPage.length - 1 ? "🚀 Get My Results" : "Next →"}
        </button>
      </div>

      {/* 🔥 DEBUG INFO - Remove in production */}
      {/* <div className="debug-info">
        <small>
          Page {currentPage + 1} • Answers: {Object.keys(answers).length}/25
        </small>
      </div> */}
    </div>
  );
};

export default AptitudeTest;

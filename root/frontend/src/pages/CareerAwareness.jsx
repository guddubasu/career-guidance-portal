import React, { useState } from "react";
import "./CareerAwareness.css";
import axios from "axios";
import { toast } from "react-toastify";
const questions = [
  "I know about at least 5 careers that match my interests.",
  "I understand the skills needed for popular jobs such as AI engineer, doctor, lawyer, designer, etc.",
  "I can explain the pros and cons of Science, Commerce, and Arts streams.",
  "I know how board exam marks affect college admissions.",
  "I regularly follow career-related news such as job trends, reports, or government updates.",
  "I know about high-demand jobs in India such as IT, healthcare, finance, teaching, etc.",
  "I understand entrance exams such as JEE, NEET, CLAT, CUET, NDA, etc.",
  "I can explain the expected salary range for entry-level jobs in different fields.",
  "I know about alternative careers beyond engineering and medicine.",
  "I research career options before choosing a stream or subject.",
  "Have you attended a career fair?",
  "Have you completed an internship or shadowing?",
  "Have you taken online career courses?",
  "Have you spoken to a mentor?",
  "Have you learned from family profession?",
  "Have you visited a college?",
  "Have you attended job seminars?",
  "Have you read career blogs or podcasts?",
  "Have you spoken with alumni?",
  "Do external influences affect your decision?"
];

function CareerAwarenessQuestions() {
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const perPage = 10;
  const start = (page - 1) * perPage;
  const current = questions.slice(start, start + perPage);

  const handleSelect = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value
    }));
  };

  // FIXED VALIDATION
  const isComplete = () => {
    const end = Math.min(start + perPage, questions.length);

    for (let i = start; i < end; i++) {
      if (!answers[i]) return false;
    }
    return true;
  };

  const yesCount = Object.values(answers).filter(
    (v) => v === "yes"
  ).length;

 const handleSubmit = async (e) => {

  e.preventDefault();
 if (Object.keys(answers).length !== questions.length) {
    toast.error("Please answer all questions");
    return;
  }

  try {

   const formattedAnswers = Object.values(answers);

const careerData = {
  careerAwarenessAnswers: Object.values(answers),
  careerAwarenessScore: yesCount,
};

    const response = await axios.post(

      "http://localhost:4000/api/prediction/career-awareness",

      careerData,

      {
        withCredentials: true,
      }

    );
    setSubmitted(true);
    toast.success("Career Awarness Details Saved Successfully");

  } catch (error) {

    console.log(error);

   toast.error("Something went wrong");

  }

};

  return (
    <div className="career-page">
      <div className="career-card">

        {/* PROGRESS BAR */}
        <div className="progress">
          <div
            className="bar"
            style={{
              width: `${(Object.keys(answers).length / questions.length) * 100}%`
            }}
          />
        </div>

        <h2>Career Awareness & Exposure</h2>
        <p className="step">Page {page} of 2</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>

            {/* QUESTIONS */}
            {current.map((q, i) => {
              const index = start + i;

              return (
                <div className="question" key={index}>
                  <p>{index + 1}. {q}</p>

                  <div className="btn-group">

                    {/* YES */}
                    <label className={`btn yes ${answers[index] === "yes" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name={`q-${index}`}
                        onChange={() => handleSelect(index, "yes")}
                        checked={answers[index] === "yes"}
                        required
                      />
                      YES
                    </label>

                    {/* NO */}
                    <label className={`btn no ${answers[index] === "no" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name={`q-${index}`}
                        onChange={() => handleSelect(index, "no")}
                        checked={answers[index] === "no"}
                        required
                      />
                      NO
                    </label>

                  </div>
                </div>
              );
            })}

            {/* NAVIGATION */}
            <div className="nav">

              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Back
              </button>

              {page < 2 ? (
                <button
                  type="button"
                  disabled={!isComplete()}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isComplete()}
                >
                  Submit
                </button>
              )}

            </div>

          </form>
        ) : (
          <div className="success">
            <h3>✔ Submitted Successfully!</h3>
            <p>You answered YES to {yesCount} questions</p>

            <button onClick={() => window.location.reload()}>
              Restart
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CareerAwarenessQuestions;
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizePage.css";

import STEM from "../Data/QuizQuestions/STEM";
import healthcareQuestions from "../Data/QuizQuestions/healthcareQuestions";
import businessQuestions from "../Data/QuizQuestions/businessQuestions";

function QuizPage() {
const { id } = useParams();
const navigate = useNavigate();
const questionMap = {
"1": STEM,
"2": healthcareQuestions,
"3": businessQuestions,
};

const questions = questionMap[id] || [];
console.log("ID:", id);
console.log("Questions:", questions);
const [answers, setAnswers] = useState({});
const [recommendedCareers, setRecommendedCareers] = useState([]);
const [submitted, setSubmitted] = useState(false);

const handleAnswer = (questionId, optionIndex) => {
setAnswers({
...answers,
[questionId]: optionIndex,
});
};

const calculateResult = () => {
if (Object.keys(answers).length !== questions.length) {
alert("Please answer all questions before submitting.");
return;
}

let aCount = 0;
let bCount = 0;
let cCount = 0;

Object.values(answers).forEach((answer) => {
  if (answer === 0) aCount++;
  else if (answer === 1) bCount++;
  else if (answer === 2) cCount++;
});

let careers = [];

// ==========================
// STEM DOMAIN
// ==========================

if (id === "1") {

  if (aCount >= bCount && aCount >= cCount) {

    careers = [
      "Software Engineer",
      "AI Engineer",
      "Machine Learning Engineer"
    ];

  } else if (bCount >= aCount && bCount >= cCount) {

    careers = [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer"
    ];

  } else {

    careers = [
      "Research Scientist",
      "Data Scientist",
      "Academic Researcher"
    ];

  }

}

// ==========================
// HEALTHCARE DOMAIN
// ==========================

else if (id === "2") {

  if (aCount >= bCount && aCount >= cCount) {

    careers = [
      "Doctor (MBBS)",
      "Surgeon",
      "Dentist"
    ];

  } else if (bCount >= aCount && bCount >= cCount) {

    careers = [
      "Psychologist",
      "Psychiatrist",
      "Mental Health Counselor"
    ];

  } else {

    careers = [
      "Pharmacist",
      "Radiologist",
      "Medical Lab Technician"
    ];

  }

}

// ==========================
// BUSINESS DOMAIN
// ==========================

else if (id === "3") {

  if (aCount >= bCount && aCount >= cCount) {

    careers = [
      "Chartered Accountant",
      "Financial Analyst",
      "Investment Banker"
    ];

  } else if (bCount >= aCount && bCount >= cCount) {

    careers = [
      "Marketing Manager",
      "Human Resource Manager",
      "Brand Manager"
    ];

  } else {

    careers = [
      "Business Analyst",
      "Operations Manager",
      "Entrepreneur"
    ];

  }

}

setRecommendedCareers(careers);
setSubmitted(true);

};

const restartQuiz = () => {
setAnswers({});
setRecommendedCareers([]);
setSubmitted(false);
};

return (
  <div className="quiz-container">
    <button
  className="back-btn"
  onClick={() => navigate(-1)}
>
  ← Back
</button>
    <h1>Career Domain Quiz</h1>
    <h2>Domain ID: {id}</h2>
    <p>Total Questions: {questions.length}</p>
    {!submitted ? (
      <>
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <h3>{q.question}</h3>

            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(q.id, index)}
                style={{
                  backgroundColor:
                    answers[q.id] === index
                      ? "#dbeafe"
                      : "",
                  border:
                    answers[q.id] === index
                      ? "2px solid #2563eb"
                      : "",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ))}

        <button
          className="submit-btn"
          onClick={calculateResult}
        >
          Submit Quiz
        </button>
      </>
    ) : (
      <div className="result-box">
        <h2>🎯 Recommended Careers</h2>

        <div className="career-results">
          {recommendedCareers.map((career, index) => (
            <div
              key={index}
              className="career-card"
            >
              <h3>{career}</h3>
            </div>
          ))}
        </div>

        <button
          className="submit-btn"
          onClick={restartQuiz}
        >
          Retake Quiz
        </button>
      </div>
    )}
  </div>
);
}

export default QuizPage;

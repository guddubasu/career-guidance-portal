import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizePage.css";

import STEM from "../Data/QuizQuestions/STEM";
import healthcareQuestions from "../Data/QuizQuestions/healthcareQuestions";
import businessQuestions from "../Data/QuizQuestions/businessQuestions";
import artsQuestions from "../Data/QuizQuestions/artsQuestions";
import educationQuestions from "../Data/QuizQuestions/educationQuestions";
import lawQuestions from "../Data/QuizQuestions/lawQuestions";
import mediaQuestions from "../Data/QuizQuestions/mediaQuestions";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionMap = {
    "1": STEM,
    "2": healthcareQuestions,
    "3": businessQuestions,
    "5": lawQuestions,
    "6": artsQuestions,
    "7": mediaQuestions,
    "8": educationQuestions,
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

    // Build a deterministic answers array following the questions order
    const answersByIndex = questions.map((q) =>
      Object.prototype.hasOwnProperty.call(answers, q.id) ? answers[q.id] : null
    );

    answersByIndex.forEach((answer) => {
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
        careers = ["Software Engineer", "AI Engineer", "Machine Learning Engineer"];
      } else if (bCount >= aCount && bCount >= cCount) {
        careers = ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"];
      } else {
        careers = ["Research Scientist", "Data Scientist", "Academic Researcher"];
      }
    }

    // ==========================
    // HEALTHCARE DOMAIN
    // ==========================
    else if (id === "2") {
      if (aCount >= bCount && aCount >= cCount) {
        careers = ["Doctor (MBBS)", "Surgeon", "Dentist"];
      } else if (bCount >= aCount && bCount >= cCount) {
        careers = ["Psychologist", "Psychiatrist", "Mental Health Counselor"];
      } else {
        careers = ["Pharmacist", "Radiologist", "Medical Lab Technician"];
      }
    }

    // ==========================
    // BUSINESS DOMAIN
    // ==========================
    else if (id === "3") {
      if (aCount >= bCount && aCount >= cCount) {
        careers = ["Chartered Accountant", "Financial Analyst", "Investment Banker"];
      } else if (bCount >= aCount && bCount >= cCount) {
        careers = ["Marketing Manager", "Human Resource Manager", "Brand Manager"];
      } else {
        careers = ["Business Analyst", "Operations Manager", "Entrepreneur"];
      }
    }

    else if (id === "5") {
      // Career Scores
      const careerScores = {
        "Lawyer/Advocate": 0,
        Judge: 0,
        "Legal Advisor": 0,
        "Corporate Lawyer": 0,
        "Public Prosecutor": 0,
        "Legal Analyst": 0,
      };

      // Option Mapping
      answersByIndex.forEach((answer) => {
        switch (answer) {
          // Option 0 → Courtroom & Advocacy
          case 0:
            careerScores["Lawyer/Advocate"] += 3;
            careerScores["Public Prosecutor"] += 3;
            break;

          // Option 1 → Research & Analysis
          case 1:
            careerScores["Legal Advisor"] += 3;
            careerScores["Corporate Lawyer"] += 2;
            careerScores["Legal Analyst"] += 3;
            break;

          // Option 2 → Judgment & Governance
          case 2:
            careerScores["Judge"] += 3;
            break;

          default:
            break;
        }
      });

      // Additional Fine-Tuning (use question-order answers)
      if (answersByIndex[6] === 1) {
        careerScores["Corporate Lawyer"] += 3;
      }

      if (answersByIndex[7] === 2) {
        careerScores["Judge"] += 2;
      }

      if (answersByIndex[8] === 0) {
        careerScores["Public Prosecutor"] += 2;
        careerScores["Lawyer/Advocate"] += 2;
      }

      if (answersByIndex[8] === 1) {
        careerScores["Legal Analyst"] += 2;
        careerScores["Corporate Lawyer"] += 2;
      }

      // Ranking
      const recommendations5 = Object.entries(careerScores).sort((a, b) => b[1] - a[1]);
      console.log(recommendations5);
      careers = recommendations5.slice(0, 3).map((r) => r[0]);
    }

    else if (id === "6") {
      const careerScores = {
        "Graphic Designer": 0,
        "UI/UX Designer": 0,
        Animator: 0,
        "Fashion Designer": 0,
        "Interior Designer": 0,
        Photographer: 0,
        Filmmaker: 0,
        "Writer/Author": 0,
        "Content Creator": 0,
        "Video Editor": 0,
      };

      // Option Mapping
      answersByIndex.forEach((answer) => {
        switch (answer) {
          case 0:
            careerScores["Graphic Designer"] += 3;
            careerScores["UI/UX Designer"] += 3;
            break;
          case 1:
            careerScores["Animator"] += 2;
            careerScores["Photographer"] += 2;
            careerScores["Filmmaker"] += 3;
            careerScores["Writer/Author"] += 2;
            careerScores["Content Creator"] += 3;
            careerScores["Video Editor"] += 3;
            break;
          case 2:
            careerScores["Fashion Designer"] += 3;
            careerScores["Interior Designer"] += 3;
            break;
          default:
            break;
        }
      });

      // Fine-Tuning (question-order)
      if (answersByIndex[0] === 0) {
        careerScores["Graphic Designer"] += 2;
        careerScores["UI/UX Designer"] += 2;
      }

      if (answersByIndex[1] === 1) {
        careerScores["Animator"] += 2;
        careerScores["Filmmaker"] += 2;
      }

      if (answersByIndex[5] === 1) {
        careerScores["Photographer"] += 2;
        careerScores["Video Editor"] += 2;
      }

      if (answersByIndex[6] === 1) {
        careerScores["Writer/Author"] += 3;
        careerScores["Content Creator"] += 2;
      }

      if (answersByIndex[7] === 0) {
        careerScores["UI/UX Designer"] += 2;
      }

      if (answersByIndex[7] === 2) {
        careerScores["Fashion Designer"] += 2;
        careerScores["Interior Designer"] += 2;
      }

      if (answersByIndex[9] === 0) {
        careerScores["Graphic Designer"] += 3;
        careerScores["UI/UX Designer"] += 3;
      }

      if (answersByIndex[9] === 1) {
        careerScores["Animator"] += 2;
        careerScores["Photographer"] += 2;
        careerScores["Filmmaker"] += 3;
        careerScores["Writer/Author"] += 2;
        careerScores["Content Creator"] += 3;
        careerScores["Video Editor"] += 3;
      }

      if (answersByIndex[9] === 2) {
        careerScores["Fashion Designer"] += 3;
        careerScores["Interior Designer"] += 3;
      }

      const recommendations6 = Object.entries(careerScores).sort((a, b) => b[1] - a[1]);
      console.log(recommendations6);
      careers = recommendations6.slice(0, 3).map((r) => r[0]);
    }

    else if (id === "7") {
      const careerScores = {
        Journalist: 0,
        "News Anchor": 0,
        "Public Relations Specialist": 0,
        "Advertising Executive": 0,
        "Social Media Manager": 0,
        Actor: 0,
        Musician: 0,
        "Radio Jockey": 0,
        "Influencer / YouTuber": 0,
      };

      answersByIndex.forEach((answer) => {
        switch (answer) {
          case 0:
            careerScores["Journalist"] += 3;
            careerScores["News Anchor"] += 3;
            break;
          case 1:
            careerScores["Actor"] += 3;
            careerScores["Musician"] += 2;
            careerScores["Radio Jockey"] += 2;
            careerScores["Influencer / YouTuber"] += 3;
            break;
          case 2:
            careerScores["Public Relations Specialist"] += 3;
            careerScores["Advertising Executive"] += 3;
            careerScores["Social Media Manager"] += 3;
            break;
          default:
            break;
        }
      });

      // Fine-Tuning
      if (answersByIndex[0] === 0) careerScores["Journalist"] += 2;
      if (answersByIndex[0] === 1) careerScores["Influencer / YouTuber"] += 2;
      if (answersByIndex[0] === 2) careerScores["Advertising Executive"] += 2;

      if (answersByIndex[2] === 0) {
        careerScores["Journalist"] += 2;
        careerScores["News Anchor"] += 1;
      }

      if (answersByIndex[2] === 1) {
        careerScores["Actor"] += 2;
        careerScores["Radio Jockey"] += 2;
      }

      if (answersByIndex[2] === 2) {
        careerScores["Public Relations Specialist"] += 2;
      }

      if (answersByIndex[5] === 0) careerScores["Journalist"] += 2;
      if (answersByIndex[5] === 1) {
        careerScores["Actor"] += 2;
        careerScores["Musician"] += 2;
        careerScores["Influencer / YouTuber"] += 2;
      }
      if (answersByIndex[5] === 2) {
        careerScores["Advertising Executive"] += 2;
        careerScores["Public Relations Specialist"] += 2;
      }

      if (answersByIndex[7] === 0) {
        careerScores["Journalist"] += 2;
        careerScores["News Anchor"] += 2;
      }

      if (answersByIndex[7] === 1) {
        careerScores["Actor"] += 2;
        careerScores["Musician"] += 2;
        careerScores["Influencer / YouTuber"] += 2;
      }

      if (answersByIndex[7] === 2) {
        careerScores["Advertising Executive"] += 2;
        careerScores["Public Relations Specialist"] += 2;
        careerScores["Social Media Manager"] += 2;
      }

      if (answersByIndex[9] === 0) {
        careerScores["Journalist"] += 3;
        careerScores["News Anchor"] += 3;
      }

      if (answersByIndex[9] === 1) {
        careerScores["Actor"] += 3;
        careerScores["Musician"] += 3;
        careerScores["Radio Jockey"] += 3;
        careerScores["Influencer / YouTuber"] += 3;
      }

      if (answersByIndex[9] === 2) {
        careerScores["Public Relations Specialist"] += 3;
        careerScores["Advertising Executive"] += 3;
        careerScores["Social Media Manager"] += 3;
      }

      const recommendations7 = Object.entries(careerScores).sort((a, b) => b[1] - a[1]);
      console.log(recommendations7);
      careers = recommendations7.slice(0, 3).map((r) => r[0]);
    }

    else if (id === "8") {
      const careerScores = {
        "School Teacher": 0,
        "Professor/Lecturer": 0,
        "Education Consultant": 0,
        "Academic Researcher": 0,
        "Curriculum Designer": 0,
        "Online Tutor": 0,
      };

      answersByIndex.forEach((answer) => {
        switch (answer) {
          case 0:
            careerScores["School Teacher"] += 3;
            careerScores["Online Tutor"] += 3;
            break;
          case 1:
            careerScores["Professor/Lecturer"] += 3;
            careerScores["Academic Researcher"] += 3;
            break;
          case 2:
            careerScores["Education Consultant"] += 3;
            careerScores["Curriculum Designer"] += 3;
            break;
          default:
            break;
        }
      });

      // Fine-Tuning
      if (answersByIndex[0] === 0) careerScores["School Teacher"] += 2;
      if (answersByIndex[0] === 1) careerScores["Academic Researcher"] += 2;
      if (answersByIndex[0] === 2) careerScores["Curriculum Designer"] += 2;

      if (answersByIndex[2] === 0) {
        careerScores["School Teacher"] += 2;
        careerScores["Online Tutor"] += 2;
      }

      if (answersByIndex[2] === 1) {
        careerScores["Professor/Lecturer"] += 2;
        careerScores["Academic Researcher"] += 2;
      }

      if (answersByIndex[2] === 2) {
        careerScores["Curriculum Designer"] += 2;
      }

      if (answersByIndex[3] === 0) careerScores["School Teacher"] += 2;
      if (answersByIndex[3] === 1) careerScores["Academic Researcher"] += 3;
      if (answersByIndex[3] === 2) {
        careerScores["Education Consultant"] += 2;
        careerScores["Curriculum Designer"] += 2;
      }

      if (answersByIndex[5] === 0) {
        careerScores["School Teacher"] += 2;
        careerScores["Online Tutor"] += 2;
      }

      if (answersByIndex[5] === 1) {
        careerScores["Professor/Lecturer"] += 2;
        careerScores["Academic Researcher"] += 2;
      }

      if (answersByIndex[5] === 2) careerScores["Education Consultant"] += 2;

      if (answersByIndex[6] === 0) {
        careerScores["School Teacher"] += 2;
        careerScores["Online Tutor"] += 2;
      }

      if (answersByIndex[6] === 1) {
        careerScores["Academic Researcher"] += 2;
        careerScores["Professor/Lecturer"] += 1;
      }

      if (answersByIndex[6] === 2) careerScores["Curriculum Designer"] += 2;

      if (answersByIndex[7] === 0) {
        careerScores["Online Tutor"] += 3;
        careerScores["School Teacher"] += 1;
      }

      if (answersByIndex[7] === 1) careerScores["Academic Researcher"] += 3;
      if (answersByIndex[7] === 2) {
        careerScores["Curriculum Designer"] += 3;
        careerScores["Education Consultant"] += 2;
      }

      if (answersByIndex[9] === 0) {
        careerScores["School Teacher"] += 3;
        careerScores["Online Tutor"] += 3;
      }

      if (answersByIndex[9] === 1) {
        careerScores["Professor/Lecturer"] += 3;
        careerScores["Academic Researcher"] += 3;
      }

      if (answersByIndex[9] === 2) {
        careerScores["Education Consultant"] += 3;
        careerScores["Curriculum Designer"] += 3;
      }

      const recommendations8 = Object.entries(careerScores).sort((a, b) => b[1] - a[1]);
      console.log(recommendations8);
      careers = recommendations8.slice(0, 3).map((r) => r[0]);
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
      <button className="back-btn" onClick={() => navigate(-1)}>
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
                    backgroundColor: answers[q.id] === index ? "#dbeafe" : "",
                    border: answers[q.id] === index ? "2px solid #2563eb" : "",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}

          <button className="submit-btn" onClick={calculateResult}>
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="result-box">
          <h2>🎯 Recommended Careers</h2>

          <div className="career-results">
            {recommendedCareers.map((career, index) => (
              <div key={index} className="career-card">
                <h3>{career}</h3>
              </div>
            ))}
          </div>

          <button className="submit-btn" onClick={restartQuiz}>
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;

import React, { useState } from "react";
import "./AcademicFactors.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AcademicFactors() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      question: "What is your current academic performance?",
      options: ["Excellent", "Good", "Average", "Below Average"],
    },
    {
      question: "Which subject area do you enjoy the most?",
      options: ["Science", "Mathematics", "Commerce", "Arts/Humanities"],
    },
    {
      question: "How often do you complete your assignments on time?",
      options: ["Always", "Usually", "Sometimes", "Rarely"],
    },
    {
      question: "How confident are you in learning new concepts?",
      options: ["Very Confident", "Confident", "Neutral", "Not Confident"],
    },
    {
      question: "What is your preferred learning style?",
      options: ["Visual", "Auditory", "Reading/Writing", "Practical"],
    },
  ];

  // Handle Dropdown Change
  const handleChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  // Submit Form
  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions");
      return;
    }

    try {
      const academicData = {
        academicPerformance: answers[0],
        favoriteSubject: answers[1],
        assignmentCompletion: answers[2],
        learningConfidence: answers[3],
        learningStyle: answers[4],
      };

      const response = await axios.post(
        "http://localhost:4000/api/prediction/academic-factors",
        academicData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      toast.success("Academic Factors Saved");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="academic-container">
      <h1>Academic Factors</h1>

      {questions.map((q, index) => (
        <div className="question-card" key={index}>
          <h3>{q.question}</h3>

          <select
            className="dropdown"
            value={answers[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            <option value="">Select an option</option>

            {q.options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
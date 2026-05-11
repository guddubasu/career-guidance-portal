import React, { useState } from "react";
import "./PsychologicalFactors.css";

export default function PsychologicalFactors() {

  const [answers, setAnswers] = useState({});

  const questions = [
    {
      question:
        "Do you get energy from interaction with the world around you?",
      options: ["Extrovert", "Introvert"],
    },
    {
      question:
        "Do you find joy primarily from observing and measuring experiences?",
      options: ["Sensing", "Intuition"],
    },
    {
      question:
        "How do you make decisions in difficult situations?",
      options: ["Thinking", "Feeling"],
    },
    {
      question:
        "How do you approach situations and plans?",
      options: ["Judgement", "Perception"],
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
  const handleSubmit = () => {

    // Check all questions answered
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all 4 questions!");
      return;
    }

    console.log(answers);

    alert("Form Submitted Successfully!");
  };

  return (
    <div className="psychology-container">

      <h1>Psychological Factors</h1>

      {questions.map((q, index) => (
        <div className="question-card" key={index}>

          <h3>{q.question}</h3>

          <select
            className="dropdown"
            value={answers[index] || ""}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
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

      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        Submit
      </button>

    </div>
  );
}
import React, { useState } from "react";
import "./PsychologicalFactors.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function PsychologicalFactors() {
  const navigate = useNavigate();
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
 const handleSubmit = async () => {

  if (Object.keys(answers).length < questions.length) {
    alert("Please answer all questions");
    return;
  }

  try {

    const psychologicalData = {

      energySource: answers[0],
      informationProcessing: answers[1],
      decisionMaking: answers[2],
      lifestyleApproach: answers[3],

    };

    const response = await axios.post(

      "http://localhost:4000/api/prediction/psychological-factors",

      psychologicalData,

      {
        withCredentials: true,
      }

    );

    console.log(response.data);

    toast.success("Psychological Factors Saved");
    navigate(-1);

  } catch (error) {

    console.log(error);

    toast.error("Something went wrong");

  }

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
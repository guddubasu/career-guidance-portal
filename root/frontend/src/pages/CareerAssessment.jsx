import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./CareerAssessment.css";

// =====================================
// FACTORS
// =====================================

const factors = [
  "technology_interest",
  "business_interest",
  "arts_creativity",
  "helping_people",
  "research_interest",
  "entrepreneurship_mindset",
  "outdoor_preference",
  "public_speaking",
  "logical_reasoning",
  "creativity",
  "leadership",
  "sports_interest",
  "teaching_interest",
  "hands_on_work",
];

// =====================================
// QUESTIONS
// =====================================

const factorQuestions = {
  technology_interest:
    "How interested are you in technology, coding, computers, or building digital solutions?",

  business_interest:
    "How interested are you in business, management, finance, or running organizations?",

  arts_creativity:
    "How much do you enjoy creative activities such as design, writing, music, or art?",

  helping_people:
    "How strongly do you enjoy helping, guiding, or supporting other people?",

  research_interest:
    "How interested are you in researching, analyzing problems, or discovering new ideas?",

  entrepreneurship_mindset:
    "How interested are you in starting your own business or taking initiative?",

  outdoor_preference:
    "How much do you prefer working outdoors rather than at a desk?",

  public_speaking:
    "How comfortable are you speaking, presenting, or communicating in front of groups?",

  logical_reasoning:
    "How confident are you in solving logical problems or analytical thinking?",

  creativity: "How often do you think of new ideas or creative solutions?",

  leadership:
    "How comfortable are you leading teams or making decisions for others?",

  sports_interest:
    "How interested are you in sports, fitness, or physical activities?",

  teaching_interest:
    "How much do you enjoy teaching, mentoring, or explaining concepts to others?",

  hands_on_work:
    "How much do you enjoy practical work such as repairing, building, or operating equipment?",
};

// =====================================
// DOMAIN MAP
// =====================================

const domainMap = {
  STEM: 1,
  Healthcare_Medicine: 2,
  Healthcare: 2,

  Commerce_Business_Management: 3,
  Commerce_Business: 3,

  Law_Legal_Services: 4,
  Law: 4,

  Arts_Design: 5,
  Arts_Design_Creative_Fields: 5,

  Media_Entertainment: 6,
  Media_Communication_Entertainment: 6,

  Education: 7,
  Education_Teaching: 7,

  Government_Public_Services: 8,
  Government_Public_Service: 8,

  Finance_Banking: 9,

  Agriculture_Environment: 10,

  Travel_Tourism_Hospitality: 11,
  Travel_Hospitality: 11,

  Sports_Fitness: 12,

  Skilled_Trades: 13,
  Skilled_Trades_Vocational_Careers: 13,

  Psychology_Social_Work: 14,

  Administrative_Support: 15,
  Administrative_Support_Roles: 15,

  Emerging_Modern_Careers: 16,
  Emerging_Careers: 16,

  Entrepreneurship_Freelancing: 17,

  Pure_Sciences: 1,
  STEM: 1,

  Entrepreneurship: 17,
};

// =====================================
// COMPONENT
// =====================================

function CareerAssessment() {
  const navigate = useNavigate();

  // =====================================
  // INITIAL VALUES
  // =====================================

  const initialValues = {};

  factors.forEach((factor) => {
    initialValues[factor] = 0.5;
  });

  // =====================================
  // STATES
  // =====================================

  const [values, setValues] = useState(() => {
    const savedValues = localStorage.getItem("careerAssessmentValues");

    return savedValues ? JSON.parse(savedValues) : initialValues;
  });

  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState(null);

  const [validationErrors, setValidationErrors] = useState([]);

  // =====================================
  // RESTORE PREDICTION
  // =====================================

  useEffect(() => {
    const savedPrediction = localStorage.getItem("careerPrediction");

    if (savedPrediction) {
      setPrediction(JSON.parse(savedPrediction));
    }
  }, []);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (factor, value) => {
    const updatedValues = {
      ...values,

      [factor]: parseFloat(value),
    };

    setValues(updatedValues);

    localStorage.setItem(
      "careerAssessmentValues",

      JSON.stringify(updatedValues),
    );
  };

  // =====================================
  // HANDLE PREDICTION
  // =====================================

  const handlePredict = async () => {
    try {
      setLoading(true);

      setValidationErrors([]);

      const response = await fetch(
        "http://127.0.0.1:5000/predict",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(values),
        },
      );

      const data = await response.json();

      // =====================================
      // BACKEND ERROR
      // =====================================

      if (!response.ok) {
        if (data.validation?.issues) {
          setValidationErrors(data.validation.issues);
        } else if (data.issues) {
          setValidationErrors(data.issues);
        } else {
          setValidationErrors(["Backend request failed."]);
        }

        return;
      }

      // =====================================
      // VALIDATION FAILURE
      // =====================================

      if (!data.success) {
        if (data.validation?.issues) {
          setValidationErrors(data.validation.issues);
        } else {
          setValidationErrors(["Profile validation failed."]);
        }

        return;
      }

      // =====================================
      // PREDICTION CHECK
      // =====================================

      if (!data.predicted_domain) {
        setValidationErrors(["Prediction unavailable."]);

        return;
      }

      // =====================================
      // SUCCESS
      // =====================================

      setPrediction(data);

      localStorage.setItem(
        "careerPrediction",

        JSON.stringify(data),
      );
    } catch (error) {
      console.log(error);

      setValidationErrors(["Unable to connect to backend."]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // =========================
    // REMOVE SAVED DATA
    // =========================

    localStorage.removeItem("careerPrediction");

    localStorage.removeItem("careerAssessmentValues");

    // =========================
    // RESET STATES
    // =========================

    setPrediction(null);

    setValidationErrors([]);

    const resetValues = {};

    factors.forEach((factor) => {
      resetValues[factor] = 0.5;
    });

    setValues(resetValues);

    // =========================
    // SAVE RESET VALUES
    // =========================

    localStorage.setItem(
      "careerAssessmentValues",

      JSON.stringify(resetValues),
    );

    // =========================
    // SCROLL TO TOP
    // =========================

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="assessment-container">
      <h1>Career Assessment</h1>

      {factors.map((factor) => (
        <div key={factor} className="slider-box">
          <label>{factorQuestions[factor]}</label>

          <div className="slider-row">
            <span>0</span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={values[factor]}
              onChange={(e) =>
                handleChange(
                  factor,

                  e.target.value,
                )
              }
            />

            <span>1</span>
          </div>

          <p>{Number(values[factor] || 0).toFixed(1)}</p>
        </div>
      ))}

      {/* BUTTON */}

      <button
        className="predict-btn"
        onClick={handlePredict}
        disabled={loading}
      >
        {/* <button

    className="reset-btn"

    onClick={handleReset}
>

    Start New Assessment

</button> */}

        {loading ? "Predicting..." : "Predict Career"}
      </button>

      {/* VALIDATION */}

      {validationErrors.length > 0 && (
        <div className="error-box">
          <h3>⚠ Profile Issues</h3>

          {validationErrors.map((err, index) => (
            <div key={index} className="error-item">
              {err}
            </div>
          ))}
        </div>
      )}

      {/* PREDICTION */}

      {prediction && (
        <div className="prediction-box">
          <h2>🎯 Predicted Domain</h2>
          <p className="quiz-info">
          Explore career opportunities in each recommended domain. Take the domain-specific quiz to discover the top 3 career paths that best match your interests, strengths, and personality.
          </p>
          <h4 className="top-matches-heading">Top Matches</h4>

          <div className="match-list">
            {prediction?.top_matches?.map((item, index) => {
              const recommendation = prediction?.recommendations?.find(
                (recommendation) => recommendation.domain === item.domain,
              );

              return (
                <div key={`${item.domain}-${index}`} className="match-card">
                  {/* LEFT SIDE */}

                  <div className="card-left">
                    <h5 className="domain-title">
                      {item.domain?.replaceAll("_", " ")}
                    </h5>

                    {recommendation?.reasons?.length > 0 && (
                      <div className="recommendation-section">
                        <h6>Why it fits you</h6>

                        <ul>
                          {recommendation.reasons
                            .slice(0, 3)
                            .map((reason, reasonIndex) => (
                              <li key={reasonIndex}>
                                ✓{" "}
                                {reason
                                  .replace("High score in", "")
                                  .replace("supports this domain.", "")}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE */}

                  <div className="card-right">
                    <div className="score-area">
                      <div className="score-value">
                        {Number(item.score).toFixed(1)}%
                      </div>

                      <div className="match-label">Match Score</div>

                      <span
                        className={`score-badge ${
                          item.score >= 85
                            ? "excellent"
                            : item.score >= 70
                              ? "good"
                              : item.score >= 55
                                ? "moderate"
                                : "low"
                        }`}
                      >
                        {item.score >= 85
                          ? "Excellent"
                          : item.score >= 70
                            ? "Good"
                            : item.score >= 55
                              ? "Moderate"
                              : "Low"}
                      </span>
                    </div>

                    <div className="button-group">

  <button
    className="explore-btn"
    onClick={() => {
      const normalizedDomain = item.domain
        ?.trim()
        ?.replaceAll(" ", "_");

      const id = domainMap[normalizedDomain];

      if (id) {
        navigate(`/domain/${id}`);
      } else {
        alert(`No route mapped for ${item.domain}`);
      }
    }}
  >
    View Careers →
  </button>

  <button
    className="explore-btn"
    onClick={() => {
      const normalizedDomain = item.domain
        ?.trim()
        ?.replaceAll(" ", "_");

      const id = domainMap[normalizedDomain];

      if (id) {
        navigate(`/quiz/${id}`);
      }
    }}
  >
    Take Quiz
  </button>

</div>
                  </div>
                </div>
              );
            })}
            <button className="reset-btn" onClick={handleReset}>
              Start New Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerAssessment;

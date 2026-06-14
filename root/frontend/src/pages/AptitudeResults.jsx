import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AptitudeResults.css";

const AptitudeResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  React.useEffect(() => {
    if (!state) {
      navigate("/aptitude");
    }
  }, [state, navigate]);

  if (!state) {
    return <div className="loading">Loading results...</div>;
  }

  const {
    scores = {},
    recommendations = [],
    summary = "",
  } = state;

  // Domain Code → Full Name Mapping
  const domainNames = {
    TC: "Technical Domain",
    BM: "Business Management Domain",
    HS: "Healthcare Domain",
    CD: "Creative Design Domain",
    ED: "Education Domain",
    MC: "Media & Communication Domain",
  };

  // Domain Redirect Mapping
  const handleCardClick = (title) => {
    const name = title.toLowerCase();

    const domainMap = {
      "it & software": "1",
      "core engineering": "2",
      healthcare: "3",
      "commerce & business management": "4",
      "law & legal services": "5",
      "arts & design": "6",
      "media & communication": "7",
      "education & teaching": "8",
      "government services": "9",
      "finance & banking": "10",
      "agriculture & environment": "11",
      "travel & tourism": "12",
      "sports & fitness": "13",
      "psychology & social work": "14",
      "administrative support": "15",
      "emerging modern careers": "16",
      "pure sciences": "17",
      entrepreneurship: "18",
    };

    let matchedKey = Object.keys(domainMap).find((key) =>
      name.includes(key)
    );

    if (!matchedKey) {
      if (name.includes("media") || name.includes("communication"))
        matchedKey = "media & communication";
      else if (name.includes("arts") || name.includes("design"))
        matchedKey = "arts & design";
      else if (name.includes("engineering"))
        matchedKey = "core engineering";
      else if (name.includes("law") || name.includes("legal"))
        matchedKey = "law & legal services";
      else if (name.includes("software") || name.includes("it"))
        matchedKey = "it & software";
      else if (
        name.includes("business") ||
        name.includes("management") ||
        name.includes("commerce")
      )
        matchedKey = "commerce & business management";
      else if (
        name.includes("finance") ||
        name.includes("banking")
      )
        matchedKey = "finance & banking";
    }

    const domainId = matchedKey
      ? domainMap[matchedKey]
      : null;

    if (domainId) {
      navigate(`/domain/${domainId}`);
    } else {
      console.warn(
        `No explicit ID mapped for domain: "${title}". Redirecting to overview.`
      );
      navigate("/careers");
    }
  };

  return (
    <div className="results-container">
      <h1>🎯 Your Career Discovery Results</h1>

      {/* Summary */}
      <div className="summary-card">
        <h2>Career Summary</h2>
        <p>{summary}</p>
      </div>

      {/* Domain Scores */}
      <div className="results-section">
        <h2>Your Domain Scores</h2>

        {Object.entries(scores).map(([domain, score]) => (
          <div key={domain} className="score-item">
            <div className="score-header">
              <span>
                {domainNames[domain] || domain}
              </span>
              <span>{score}/50</span>
            </div>

            <div className="score-bar">
              <div
                className="score-fill"
                style={{
                  width: `${(score / 50) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Career Recommendations */}
      <div className="results-section">
        <h2>🏆 Best Career Matches</h2>

        <div className="career-grid">
          {recommendations.map((career, index) => (
            <div
              key={index}
              className="career-card clickable-result-card"
              role="button"
              tabIndex={0}
              onClick={() =>
                handleCardClick(career.title)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCardClick(career.title);
                }
              }}
            >
              <h3>
                #{index + 1} {career.title}
              </h3>

              <p>{career.summary}</p>

              <div className="match-score">
                Match Score: {career.matchScore}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="results-actions">
        <button
          className="btn-primary"
          onClick={() => navigate("/aptitude")}
        >
          🔄 Retake Quiz
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/")}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default AptitudeResults;
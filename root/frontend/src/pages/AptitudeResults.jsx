import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AptitudeResults.css'; // Create CSS below

const AptitudeResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Redirect if no data
  React.useEffect(() => {
    if (!state?.recommendations) {
      navigate('/aptitude');
    }
  }, [state, navigate]);

  if (!state) return <div className="loading">Analyzing your results...</div>;

  const { hollandCode, recommendations, hollandScores } = state;

  return (
    <div className="results-container">
      {/* 🎯 HEADER */}
      <div className="results-header">
        <h1>🎉 Your Career Results!</h1>
        <div className="holland-badge">
          <span className="holland-code">{hollandCode}</span>
          <p>Your Personality Type</p>
        </div>
      </div>

      {/* 🔥 TOP 5 CAREERS */}
      <div className="results-section">
        <h2>Top Career Matches</h2>
        <div className="careers-grid">
          {recommendations.map((career, index) => (
            <div 
              key={career.id} 
              className="career-card"
              style={{ 
                '--career-color': career.baseColor,
                background: `linear-gradient(135deg, var(--career-color)20, transparent)`
              }}
            >
              <div className="career-rank">#{index + 1}</div>
              <div className="career-header">
                <h3>{career.title}</h3>
                <div className="match-badge">
                  {career.matchScore}% Match
                </div>
              </div>
              <p>{career.summary}</p>
              <div className="career-actions">
                <button className="explore-btn">Explore Jobs</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 SCORES */}
      <div className="results-section">
        <h3>Your Personality Scores</h3>
        <div className="scores-bar">
          {Object.entries(hollandScores).map(([trait, score]) => (
            <div key={trait} className="score-item">
              <span>{trait}</span>
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${(score / 25) * 100}%` }}
                />
              </div>
              <span>{score}/25</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔄 ACTIONS */}
      <div className="results-actions">
        <button 
          className="btn-primary retake-btn"
          onClick={() => navigate('/aptitude')}
        >
          🔄 Retake Test
        </button>
        <button className="btn-secondary share-btn">
          📱 Share Results
        </button>
      </div>
    </div>
  );
};

export default AptitudeResults;

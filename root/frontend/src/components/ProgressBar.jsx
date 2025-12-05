// src/components/ProgressBar.jsx
import React from "react";
import "./ProgressBar.css"; // Make sure this contains the neutral CSS

const ProgressBar = ({ current, total, className }) => {
  // Calculate percentage (0-100), ensure it doesn't exceed 100
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className={className ? className : "progress-container"}>
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

import React, { useState } from "react";

import "./CareerRoadmap.css";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const App = () => {
  const [formData, setFormData] = useState({
    current_role: "",
    skills: "",
    target_role: "",
    time_commitment: "",
  });
  const [roadmap, setRoadmap] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setRoadmap("");

    axios
      .post("http://127.0.0.1:5000/roadmap-generate", formData)
      .then((res) => {
        setRoadmap(res.data.roadmap);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🚀 AI Career Roadmap Generator</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Current Role:</label>
            <select
              name="current_role"
              value={formData.current_role}
              onChange={handleChange}
              required
            >
              <option value="">Select your current role</option>
              <option value="Student">Student</option>
              <option value="Fresher">Fresher</option>
              <option value="Working Professional">Working Professional</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current Skills:</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., HTML, CSS, JavaScript, React"
              required
            />
          </div>

          <div className="form-group">
            <label>Target Role:</label>
            <input
              type="text"
              name="target_role"
              value={formData.target_role}
              onChange={handleChange}
              placeholder="e.g., Full Stack Developer, Data Analyst"
              required
            />
          </div>

          <div className="form-group">
            <label>Time Commitment (hours per week):</label>
            <input
              type="number"
              name="time_commitment"
              value={formData.time_commitment}
              onChange={handleChange}
              placeholder="e.g., 15"
              min="1"
              max="40"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>

        {error && (
          <div className="error">
            <p>❌ {error}</p>
          </div>
        )}

        {roadmap && (
          <div className="roadmap-container">
            <div className="roadmap-header">
              <h2>Your Personalized Career Roadmap</h2>
              <button onClick={() => window.print()} className="print-btn">
                📄Download
              </button>
            </div>

            <div className="roadmap-content">
              <Markdown remarkPlugins={[remarkGfm]}>{roadmap}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

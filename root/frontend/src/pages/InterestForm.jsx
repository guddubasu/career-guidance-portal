import React, { useState } from "react";
import "./InterestForm.css";

export default function InterestForm() {
  const [board, setBoard] = useState("");
  const [stream, setStream] = useState("");
  const [marks, setMarks] = useState({});
  const [optionalSubjects, setOptionalSubjects] = useState([]);

  // Subjects configuration
  const subjects = {
    CBSE: {
      class10: ["English", "Math", "Science", "Social Science", "Hindi"],
      class12: {
        compulsory: ["English", "Hindi"], // Hindi as mother tongue
        streams: {
          Science: ["Math", "Physics", "Chemistry"], // Math compulsory
          Commerce: ["Accountancy", "Business Studies", "Economics"],
          Arts: [] // All optional
        },
        optional: {
          Science: ["Biology", "Computer Science", "Psychology", "Geography", "Economics"],
          Commerce: ["Informatics Practices", "Entrepreneurship", "Mathematics"],
          Arts: ["History", "Geography", "Political Science", "Sociology", "Education", "EVS", "Psychology"]
        }
      }
    },
    WBCHSE: {
      class10: [
        "English",
        "Bengali",
        "Math",
        "Physical Science",
        "Life Science",
        "History",
        "Geography"
      ],
      class12: {
        compulsory: ["English", "Bengali"],
        streams: {
          Science: ["Physics", "Chemistry"],
          Commerce: ["Accountancy", "Business Studies", "Economics"],
          Arts: ["History", "Geography", "Political Science"]
        },
        optional: {
          Science: ["Math","Biology", "Computer Science", "Psychology", "Geography"],
          Commerce: ["Informatics Practices", "Entrepreneurship", "Mathematics"],
          Arts: ["Sociology", "Psychology", "Political Science Optional"]
        }
      }
    },
    ICSE: {
      class10: ["English", "Math", "Science", "Social Studies", "Hindi"],
      class12: {
        compulsory: ["English","Hindi"], // Compulsory papers
        streams: {
          Science: ["Math", "Physics", "Chemistry"], // Math is compulsory
          Commerce: ["Accountancy", "Business Studies", "Economics"],
          Arts: [] // All Arts subjects optional
        },
        optional: {
          Science: ["Biology", "Computer Science", "Psychology", "Geography", "Economics"],
          Commerce: ["Informatics Practices", "Entrepreneurship", "Mathematics"],
          Arts: ["History", "Geography", "Political Science", "Sociology", "Education", "EVS", "Psychology"]
        }
      }
    }
  };

  // Handle input for marks
  const handleChange = (subject, value) => {
    const num = Number(value);
    if (num >= 0 && num <= 100) {
      setMarks({ ...marks, [subject]: num });
    }
  };

  // Toggle optional subjects
  const handleOptionalToggle = (subject) => {
    if (optionalSubjects.includes(subject)) {
      setOptionalSubjects(optionalSubjects.filter((s) => s !== subject));
      const newMarks = { ...marks };
      delete newMarks[`12-${subject}`];
      setMarks(newMarks);
    } else {
      setOptionalSubjects([...optionalSubjects, subject]);
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Board:", board);
    console.log("Stream:", stream);
    console.log("Optional Subjects:", optionalSubjects);
    console.log("Marks:", marks);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="interest-form-container">
      <h2 className="form-title">Choose Your Board, Stream & Enter Marks</h2>

      <form onSubmit={handleSubmit} className="interest-form">
        {/* Board Selection */}
        <div className="form-group">
          <label>Select Board:</label>
          <select
            value={board}
            onChange={(e) => {
              setBoard(e.target.value);
              setStream("");
              setMarks({});
              setOptionalSubjects([]);
            }}
            className="form-select"
          >
            <option value="">-- Select --</option>
            <option value="CBSE">CBSE</option>
            <option value="WBCHSE">WBCHSE</option>
            <option value="ICSE">ICSE</option>
          </select>
        </div>

        {/* Class 10 Subjects */}
        {board && (
          <div className="marks-section">
            <h3 className="section-title">Class 10 Subjects</h3>
            {subjects[board].class10.map((subj) => (
              <div className="form-group" key={subj}>
                <label>{subj}:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 - 100"
                  className="form-input"
                  onChange={(e) => handleChange(`10-${subj}`, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Stream Selection */}
        {board && (
          <div className="form-group">
            <label>Select Class 12 Stream:</label>
            <select
              value={stream}
              onChange={(e) => {
                setStream(e.target.value);
                setMarks({});
                setOptionalSubjects([]);
              }}
              className="form-select"
            >
              <option value="">-- Select Stream --</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
        )}

        {/* Class 12 Subjects */}
        {board && stream && (
          <div className="marks-section">
            <h3 className="section-title">Class 12 Subjects</h3>

            {/* Compulsory subjects */}
            {subjects[board].class12.compulsory.map((subj) => (
              <div className="form-group" key={subj}>
                <label>{subj}:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 - 100"
                  className="form-input"
                  onChange={(e) => handleChange(`12-${subj}`, e.target.value)}
                />
              </div>
            ))}

            {/* Stream compulsory subjects */}
            {subjects[board].class12.streams[stream].map((subj) => (
              <div className="form-group" key={subj}>
                <label>{subj}:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 - 100"
                  className="form-input"
                  onChange={(e) => handleChange(`12-${subj}`, e.target.value)}
                />
              </div>
            ))}

            {/* Optional subjects */}
            {subjects[board].class12.optional[stream].map((subj) => (
              <div className="form-group" key={subj}>
                <label>
                  <input
                    type="checkbox"
                    checked={optionalSubjects.includes(subj)}
                    onChange={() => handleOptionalToggle(subj)}
                  />
                  {subj} (Optional)
                </label>

                {optionalSubjects.includes(subj) && (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0 - 100"
                    className="form-input"
                    onChange={(e) => handleChange(`12-${subj}`, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {board && stream && (
          <button type="submit" className="submit-btn">
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

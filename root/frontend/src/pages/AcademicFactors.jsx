import React, { useState } from "react";

export default function AcademicFactors() {
  const [selectedClass, setSelectedClass] = useState("");
  const [stream, setStream] = useState("");

  const [tenthSubjects, setTenthSubjects] = useState([
    { subject: "", marks: "" },
  ]);

  const [twelfthSubjects, setTwelfthSubjects] = useState([
    { subject: "", marks: "" },
  ]);

  const subjectOptions10 = [
    "Hindi",
    "Bengali",
    "English",
    "Sanskrit",
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Computer",
    "Computer Applications",
    "Information Technology",
    "Artificial Intelligence",
    "Painting",
    "Home Science",
    "Physical Education",
    "Art",
    "Environmental Science",
    "Performing Arts",
    "Technical Drawing",
  ];

  const streamSubjects = {
    science: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      "Computer Science",
      "English",
    ],
    arts: [
      "History",
      "Political Science",
      "Geography",
      "Sociology",
      "English",
    ],
    commerce: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Mathematics",
      "English",
    ],
    mixed: [
      "Physics",
      "Economics",
      "Computer Science",
      "Mathematics",
      "History",
      "English",
    ],
  };

  const favoriteSubjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Economics",
    "Computer Science",
    "Geography",
  ];

  const handle10thChange = (index, field, value) => {
    const updated = [...tenthSubjects];
    updated[index][field] = value;
    setTenthSubjects(updated);
  };

  const add10thSubject = () => {
    setTenthSubjects([
      ...tenthSubjects,
      { subject: "", marks: "" },
    ]);
  };

  const handle12thChange = (index, field, value) => {
    const updated = [...twelfthSubjects];
    updated[index][field] = value;
    setTwelfthSubjects(updated);
  };

  const add12thSubject = () => {
    setTwelfthSubjects([
      ...twelfthSubjects,
      { subject: "", marks: "" },
    ]);
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #eef2ff, #f5f3ff)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div
            className="card shadow-lg border-0 rounded-5 p-4"
            style={{
              background: "#ffffff",
            }}
          >
            <h1
              className="text-center fw-bold mb-5"
              style={{
                color: "#4f46e5",
                fontSize: "42px",
              }}
            >
              Academic Information
            </h1>

            {/* CLASS */}
            <div className="mb-5">
              <label className="form-label fw-bold fs-4 mb-3">
                Which Class?
              </label>

              <select
                className="form-select form-select-lg shadow-sm rounded-4"
                value={selectedClass}
                onChange={(e) =>
                  setSelectedClass(e.target.value)
                }
              >
                <option value="">Select Class</option>
                <option value="10">10th</option>
                <option value="12">12th</option>
              </select>
            </div>

            {/* 10TH SECTION */}
            {selectedClass === "10" && (
              <div className="mb-5">
                <div className="section-heading">
                  10th Class Subjects
                </div>

                {tenthSubjects.map((item, index) => (
                  <div
                    key={index}
                    className="row g-3 mb-3 align-items-center"
                  >
                    <div className="col-md-7">
                      <select
                        className="form-select rounded-4 shadow-sm"
                        value={item.subject}
                        onChange={(e) =>
                          handle10thChange(
                            index,
                            "subject",
                            e.target.value
                          )
                        }
                      >
                        <option value="">
                          Select Subject
                        </option>

                        {subjectOptions10.map((subject) => (
                          <option
                            key={subject}
                            value={subject}
                          >
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-5">
                      <input
                        type="number"
                        placeholder="Enter Marks"
                        className="form-control rounded-4 shadow-sm"
                        value={item.marks}
                        onChange={(e) =>
                          handle10thChange(
                            index,
                            "marks",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill px-4 mt-2"
                  onClick={add10thSubject}
                >
                  + Add Subject
                </button>
              </div>
            )}

            {/* 12TH SECTION */}
            {selectedClass === "12" && (
              <>
                <div className="mb-5">
                  <div className="section-heading">
                    12th Stream
                  </div>

                  <select
                    className="form-select form-select-lg rounded-4 shadow-sm"
                    value={stream}
                    onChange={(e) =>
                      setStream(e.target.value)
                    }
                  >
                    <option value="">
                      Select Stream
                    </option>
                    <option value="science">
                      Science
                    </option>
                    <option value="arts">Arts</option>
                    <option value="commerce">
                      Commerce
                    </option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                {stream && (
                  <div className="mb-5">
                    <div className="section-heading">
                      12th Subjects
                    </div>

                    {twelfthSubjects.map((item, index) => (
                      <div
                        key={index}
                        className="row g-3 mb-3 align-items-center"
                      >
                        <div className="col-md-7">
                          <select
                            className="form-select rounded-4 shadow-sm"
                            value={item.subject}
                            onChange={(e) =>
                              handle12thChange(
                                index,
                                "subject",
                                e.target.value
                              )
                            }
                          >
                            <option value="">
                              Select Subject
                            </option>

                            {streamSubjects[stream].map(
                              (subject) => (
                                <option
                                  key={subject}
                                  value={subject}
                                >
                                  {subject}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div className="col-md-5">
                          <input
                            type="number"
                            placeholder="Enter Marks"
                            className="form-control rounded-4 shadow-sm"
                            value={item.marks}
                            onChange={(e) =>
                              handle12thChange(
                                index,
                                "marks",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-pill px-4 mt-2"
                      onClick={add12thSubject}
                    >
                      + Add Subject
                    </button>
                  </div>
                )}
              </>
            )}

            {/* OVERALL PERCENTAGE */}
            <div className="mb-5">
              <div className="section-heading">
                Overall Percentage
              </div>

              <input
                type="number"
                placeholder="Enter Overall Percentage"
                className="form-control form-control-lg rounded-4 shadow-sm"
              />
            </div>

            {/* FAVORITE SUBJECTS */}
            <div className="mb-5">
              <div className="section-heading">
                Favorite Subjects (Top 3)
              </div>

              <select className="form-select rounded-4 shadow-sm mb-3">
                <option>Select Favorite Subject 1</option>

                {favoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <select className="form-select rounded-4 shadow-sm mb-3">
                <option>Select Favorite Subject 2</option>

                {favoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <select className="form-select rounded-4 shadow-sm">
                <option>Select Favorite Subject 3</option>

                {favoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* LEAST FAVORITE */}
            <div className="mb-4">
              <div className="section-heading">
                Least Favorite Subject
              </div>

              <select className="form-select rounded-4 shadow-sm">
                <option>
                  Select Least Favorite Subject
                </option>

                {favoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <div className="text-center mt-5">
              <button
                className="btn btn-lg px-5 py-3 rounded-pill fw-bold"
                style={{
                  background:
                    "linear-gradient(to right, #4f46e5, #7c3aed)",
                  color: "white",
                  border: "none",
                  fontSize: "18px",
                }}
              >
                Save Academic Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EXTRA STYLES */}
      <style>
        {`
          .section-heading{
            font-size: 26px;
            font-weight: 700;
            color: #5b21b6;
            margin-bottom: 20px;
            border-left: 6px solid #7c3aed;
            padding-left: 14px;
          }

          .form-control,
          .form-select{
            border: none;
            padding: 14px;
            font-size: 16px;
          }

          .form-control:focus,
          .form-select:focus{
            box-shadow: 0 0 0 0.2rem rgba(124,58,237,0.2);
            border-color: #7c3aed;
          }

          .card{
            transition: 0.3s;
          }

          .card:hover{
            transform: translateY(-3px);
          }
        `}
      </style>
    </div>
  );
}
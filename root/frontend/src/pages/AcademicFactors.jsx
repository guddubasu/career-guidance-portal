import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AcademicFactors() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [stream, setStream] = useState("");

  const [tenthSubjects, setTenthSubjects] = useState([
    { subject: "", marks: "" },
  ]);

  const [twelfthSubjects, setTwelfthSubjects] = useState([
    { subject: "", marks: "" },
  ]);
const [overallPercentage, setOverallPercentage] = useState("");

const [favoriteSubject1, setFavoriteSubject1] = useState("");
const [favoriteSubject2, setFavoriteSubject2] = useState("");
const [favoriteSubject3, setFavoriteSubject3] = useState("");

const [leastFavoriteSubject, setLeastFavoriteSubject] =useState("");
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

 const favoriteSubjects10 = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Political Science",
  "Economics",
  "Computer",
  "Artificial Intelligence",
  "Physical Education",
  "Art",
];

const favoriteSubjects12 = {
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
    "History",
    "Mathematics",
    "English",
  ],
};
useEffect(() => {

  setFavoriteSubject1("");
  setFavoriteSubject2("");
  setFavoriteSubject3("");
  setLeastFavoriteSubject("");

}, [selectedClass, stream]);
const availableFavoriteSubjects =
  selectedClass === "10"
    ? favoriteSubjects10
    : selectedClass === "12" && stream
    ? favoriteSubjects12[stream]
    : [];

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
const handleSaveAcademic = async () => {
 // CLASS VALIDATION
  if (!selectedClass) {
    toast.error("Please select class");
    return;
  }

  // 10TH VALIDATION
  if (selectedClass === "10") {

    for (let i = 0; i < tenthSubjects.length; i++) {

      if (!tenthSubjects[i].subject) {
        toast.error(`Please select subject for row ${i + 1}`);
        return;
      }

      if (!tenthSubjects[i].marks) {
        toast.error(`Please enter marks for row ${i + 1}`);
        return;
      }

    }

  }

  // 12TH VALIDATION
  if (selectedClass === "12") {

    if (!stream) {
      toast.error("Please select stream");
      return;
    }

    for (let i = 0; i < twelfthSubjects.length; i++) {

      if (!twelfthSubjects[i].subject) {
        toast.error(`Please select 12th subject for row ${i + 1}`);
        return;
      }

      if (!twelfthSubjects[i].marks) {
        toast.error(`Please enter 12th marks for row ${i + 1}`);
        return;
      }

    }

  }

  // OVERALL PERCENTAGE
  if (!overallPercentage) {
    toast.error("Please enter overall percentage");
    return;
  }

  // FAVORITE SUBJECTS
  if (!favoriteSubject1) {
    toast.error("Please select favorite subject 1");
    return;
  }

  if (!favoriteSubject2) {
    toast.error("Please select favorite subject 2");
    return;
  }

  if (!favoriteSubject3) {
    toast.error("Please select favorite subject 3");
    return;
  }

  // LEAST FAVORITE SUBJECT
  if (!leastFavoriteSubject) {
    toast.error("Please select least favorite subject");
    return;
  }
  try {

    const academicData = {

      selectedClass,
      stream,

      tenthSubjects,

      twelfthSubjects,

      overallPercentage,

      favoriteSubjects: [
        favoriteSubject1,
        favoriteSubject2,
        favoriteSubject3,
      ],

      leastFavoriteSubject,

    };

    const response = await axios.post(
      "http://localhost:4000/api/prediction/academic-factors",
      academicData,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
   toast.success("Academic Data Saved Successfully");
   navigate(-1);
  } catch (error) {
    console.log(error);
   toast.error("Something went wrong");

  }

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
                value={overallPercentage}
                onChange={(e) =>
                setOverallPercentage(e.target.value)
                  }
              />
            </div>

            {/* FAVORITE SUBJECTS */}
            <div className="mb-5">
              <div className="section-heading">
                Favorite Subjects (Top 3)
              </div>

              <select className="form-select rounded-4 shadow-sm mb-3" value={favoriteSubject1}
              onChange={(e) =>
              setFavoriteSubject1(e.target.value)
            }>
                <option>Select Favorite Subject 1</option>

                {availableFavoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <select className="form-select rounded-4 shadow-sm mb-3" value={favoriteSubject2}
              onChange={(e) =>
              setFavoriteSubject2(e.target.value)
                }>
                <option>Select Favorite Subject 2</option>

                {availableFavoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <select className="form-select rounded-4 shadow-sm"  value={favoriteSubject3}
              onChange={(e) =>
               setFavoriteSubject3(e.target.value)
                }>
                <option>Select Favorite Subject 3</option>

                {availableFavoriteSubjects.map((subject) => (
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

              <select className="form-select rounded-4 shadow-sm" value={leastFavoriteSubject}
              onChange={(e) =>
              setLeastFavoriteSubject(e.target.value)
              }>
                <option>
                  Select Least Favorite Subject
                </option>

                {availableFavoriteSubjects.map((subject) => (
                  <option key={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <div className="text-center mt-5">
              <button
              type="button"
                className="btn btn-lg px-5 py-3 rounded-pill fw-bold"
                style={{
                  background:
                    "linear-gradient(to right, #4f46e5, #7c3aed)",
                  color: "white",
                  border: "none",
                  fontSize: "18px",
                }}
                 onClick={handleSaveAcademic}
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
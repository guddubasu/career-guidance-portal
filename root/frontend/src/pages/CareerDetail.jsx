import React from "react";
import { useParams, Link } from "react-router-dom";

// Static career data
const careerData = {
  1: {
    title: "Software Engineer",
    summary: "Develop software applications and maintain systems.",
    requiredSubjects: ["Mathematics", "Computer Science", "Physics"],
  },
  2: {
    title: "Data Scientist",
    summary: "Analyze data and generate insights.",
    requiredSubjects: ["Mathematics", "Statistics", "Computer Science"],
  },
  3: {
    title: "Mechanical Engineer",
    summary: "Design and maintain mechanical systems.",
    requiredSubjects: ["Physics", "Mathematics", "Chemistry"],
  },
  4: {
    title: "Teacher",
    summary: "Educate students and create lesson plans.",
    requiredSubjects: ["Education", "Psychology", "English"],
  },
  5: {
    title: "Doctor",
    summary: "Provide medical care and save lives.",
    requiredSubjects: ["Biology", "Chemistry", "Physics"],
  },
};

export default function CareerDetail() {
  const { id } = useParams();
  const career = careerData[id];

  if (!career) return <p>Career not found.</p>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{career.title}</h1>
      <p>{career.summary}</p>

      {career.requiredSubjects?.length > 0 && (
        <>
          <h3>Required Subjects</h3>
          <ul>
            {career.requiredSubjects.map((sub, i) => (
              <li key={i}>{sub}</li>
            ))}
          </ul>
        </>
      )}

      <Link to="/careers" style={{ marginTop: "2rem", display: "inline-block", color: "#007BFF" }}>
        ⬅ Back to Careers
      </Link>
    </div>
  );
}

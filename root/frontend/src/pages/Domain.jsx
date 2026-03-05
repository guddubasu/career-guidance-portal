import React from "react";
import { useParams, Link } from "react-router-dom";
import domainData from "../Data/domainData";

export default function Domain() {
  const { id } = useParams();
  const domain = domainData[Number(id)];

  if (!domain) return <h2 style={{ padding: "40px" }}>Domain Not Found</h2>;

  return (
    <div>
      <div
        style={{
          background: domain.themeColor,
          padding: "50px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>{domain.title}</h1>
      </div>

      <div style={{ padding: "40px" }}>
        {domain.careers.map((career) => (
          <div
            key={career.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>{career.name}</h3>
            <Link to={`/career-detail/${id}/${career.id}`}>Explore →</Link>
          </div>
        ))}
      </div>

      <div style={{ padding: "40px", textAlign: "center" }}>
        <Link to="/careers">⬅ Back to Careers</Link>
      </div>
    </div>
  );
}
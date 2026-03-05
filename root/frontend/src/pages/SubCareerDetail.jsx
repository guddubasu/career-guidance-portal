import React from "react";
import { useParams, Link } from "react-router-dom";
import domainData from "../Data/domainData";

export default function SubCareerDetail() {
  const { id, career } = useParams();
  const domain = domainData[Number(id)];

  if (!domain) {
    return <h2 style={{ padding: "40px" }}>Domain Not Found</h2>;
  }

  const careerData = domain.careers.find(
    (item) => item.id === career
  );

  if (!careerData) {
    return <h2 style={{ padding: "40px" }}>Career Not Found</h2>;
  }

  return (
    <div>
      <div
        style={{
          background: domain.themeColor,
          padding: "50px",
          color: "white"
        }}
      >
        <h1>{careerData.name}</h1>
      </div>

      <div style={{ padding: "40px" }}>
        <p>{careerData.description}</p>

        <br />

        <Link to={`/domain/${id}`}>
          ⬅ Back to {domain.title}
        </Link>
      </div>
    </div>
  );
}
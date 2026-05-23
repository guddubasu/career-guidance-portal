import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Appcontext } from "../context/AppContext";
import "./Domain.css"; // import CSS

export default function Domain() {
  const { backendUrl } = useContext(Appcontext);
  const [careerData, setCareerData] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "/getCareerData")
      .then((res) => setCareerData(res.data))
      .catch((err) => console.log(err));
  }, [backendUrl]);

  const { id } = useParams();

  const domain = careerData.find(
    (item) => item.domain_id === Number(id)
  );

  if (!domain)
    return <h2 style={{ padding: "40px" }}>Domain Not Found</h2>;

  return (
    <div className="domain-container">

      {/* Banner */}
      <div
        className="domain-banner"
        style={{ background: domain.themeColor }}
      >
        <h1>{domain.domain_name}</h1>
      </div>


      {/* Career List */}
      {domain.careers.map((career) => (

        <div
          key={career.career_id}
          className="career-item"
        >
          <h3>{career.career_name}</h3>

          <Link
            className="explore-btn"
            to={`/career-detail/${id}/${career.career_id}`}
          >
            Explore →
          </Link>

        </div>

      ))}


      {/* Back button */}
      <div className="back-section">

        <Link
          to="/careers"
          className="back-btn"
        >
          ← Back to Careers
        </Link>

      </div>

    </div>
  );
}
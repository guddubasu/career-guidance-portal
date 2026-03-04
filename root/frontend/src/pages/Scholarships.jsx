import React from "react";
import "./Scholarships.css";
import { Link } from 'react-router-dom';
export default function Scholarships() {
  return (
    <div>
      <h1 className="heading">Scholarships</h1>
      <div className="cardContainer">
        <Link to="/gscholarships" style={{textDecoration: "none"}}>
        <div className="Card">
          <h2>Government Scholarships</h2>
        </div>
        </Link>
        <Link to="/pscholarships"  style={{textDecoration: "none"}}>
        <div className="Card">
          <h2>Private Scholarships</h2>
        </div>
        </Link>
      </div>
    </div>
  );
}

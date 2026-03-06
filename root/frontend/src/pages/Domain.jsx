import React, { useEffect,useContext,useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { Appcontext } from "../context/AppContext";
export default function Domain() {
  const {backendUrl}=useContext(Appcontext);
  const[careerData,setCareerData]=useState([]);
  useEffect(()=>{
    axios.get(backendUrl+'/getCareerData')
    .then(career_data=>setCareerData(career_data.data))
    .catch(err=> console.log(err))
  },[backendUrl]);

  const { id } = useParams();
  const domain = careerData.find(
  (item) => item.domain_id === Number(id)
);

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
        <h1>{domain.domain_name}</h1>
      </div>

      <div style={{ padding: "40px" }}>
        {domain.careers.map((career) => (
          <div
            key={career.career_id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>{career.career_name}</h3>
            <Link to={`/career-detail/${id}/${career.career_id}`}>Explore →</Link>
          </div>
        ))}
      </div>

      <div style={{ padding: "40px", textAlign: "center" }}>
        <Link to="/careers">⬅ Back to Careers</Link>
      </div>
    </div>
  );
}
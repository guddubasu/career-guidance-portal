import {useContext,useState,useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { Appcontext } from "../context/AppContext";
export default function SubCareerDetail() {
  const {backendUrl}=useContext(Appcontext);
  const[subcareerData,setSubCareerData]=useState([]);
    useEffect(()=>{
      axios.get(backendUrl+'/getCareerData')
      .then(career_data=>setSubCareerData(career_data.data))
      .catch(err=> console.log(err))
    },[backendUrl]);
  const { id, career } = useParams();
  const domain = subcareerData.find(
  (item) => item.domain_id === Number(id)
);
  if (!domain) {
    return <h2 style={{ padding: "40px" }}>Domain Not Found</h2>;
  }

  const careerData = domain.careers.find(
    (item) => item.career_id === career
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
        <h1>{careerData.career_name}</h1>
      </div>

      <div style={{ padding: "40px" }}>
        <h4>Career Description</h4>
        <p>{careerData.career_description}</p>
        <h4>Personal Competencies</h4>
        <p>{careerData.personal_competencies.map((el)=><li>{el}</li>)}</p>
        <h4>Entry Pathway</h4>
        <p>{careerData.entry_pathway.map((el)=><li>{el}</li>)}</p>
        <h4>Where will you study</h4>
        <p>{careerData.where_will_you_study_description}</p>
        <h5>Government Institutes</h5>
        <p>{careerData.government_institutes.map((el)=><li>{el}</li>)}</p>
        <h5>Private Institutes</h5>
        <p>{careerData.private_institutes.map((el)=><li>{el}</li>)}</p>
        <h4>Fees</h4>
        <p>{careerData.fees}</p>
        <h4>Scholarships and Loans</h4>
        <p>static for every page</p>
        <h4>Where will you work</h4>
        <p>{careerData.place_of_work}</p>
        <h4>Where will you work</h4>
        <h5>Place of work</h5>
        <p>{careerData.place_of_work}</p>
        <h5>work environment</h5>
        <p>{careerData.work_environment}</p>
        <h4>Expected Growth Path</h4>
        <p>{careerData. expected_growth_path.map((el)=><li>{el}</li>)}</p>
        <h4>Expected Income</h4>
        <p>{careerData.expected_income}</p>
        <br />
        <Link to={`/domain/${id}`}>
          ⬅ Back to {domain.domain_name}
        </Link>
      </div>
    </div>
  );
}
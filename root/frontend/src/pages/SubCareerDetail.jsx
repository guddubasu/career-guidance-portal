import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Appcontext } from "../context/AppContext";
import "./SubCareerDetail.css";

export default function SubCareerDetail() {

  const { backendUrl } = useContext(Appcontext);
  const [subcareerData, setSubCareerData] = useState([]);

  useEffect(() => {
    axios.get(backendUrl + "/getCareerData")
      .then((career_data) => setSubCareerData(career_data.data))
      .catch((err) => console.log(err));
  }, [backendUrl]);

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

      {/* Banner */}
      <div
        className="subcareer-banner"
        style={{ background: domain.themeColor }}
      >
        <h1>{careerData.career_name}</h1>
      </div>

      {/* Layout with Sidebar */}
      <div className="subcareer-layout">

        {/* Sidebar Navigation */}
        <div className="sidebar">
          <h3>Quick Navigation</h3>
          <ul>
            <li><a href="#description">Career Description</a></li>
            <li><a href="#competencies">Personal Competencies</a></li>
            <li><a href="#entry">Entry Pathway</a></li>
            <li><a href="#study">Where to Study</a></li>
            <li><a href="#fees">Fees</a></li>
            <li><a href="#work">Work Environment</a></li>
            <li><a href="#growth">Expected Growth</a></li>
            <li><a href="#income">Expected Income</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="subcareer-container">

          <section id="description">
            <h4 className="section-title">Career Description</h4>
            <p>{careerData.career_description}</p>
          </section>

          <section id="competencies">
            <h4 className="section-title">Personal Competencies</h4>
            <ul className="subcareer-list">
              {careerData.personal_competencies.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          </section>

          <section id="entry">
            <h4 className="section-title">Entry Pathway</h4>
            <ul className="subcareer-list">
              {careerData.entry_pathway.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          </section>

          <section id="study">
            <h4 className="section-title">Where will you study</h4>
            <p>{careerData.where_will_you_study_description}</p>

            <h5>Government Institutes</h5>
            <ul className="subcareer-list">
              {careerData.government_institutes.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>

            <h5>Private Institutes</h5>
            <ul className="subcareer-list">
              {careerData.private_institutes.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          </section>

          <section id="fees">
            <h4 className="section-title">Fees</h4>
            <p>{careerData.fees}</p>
          </section>
          <section id="work">
            <h4 className="section-title">Where will you work</h4>

            <h5>Place of Work</h5>
            <p>{careerData.place_of_work}</p>

            <h5>Work Environment</h5>
            <p>{careerData.work_environment}</p>
          </section>

          <section id="growth">
            <h4 className="section-title">Expected Growth Path</h4>
            <ul className="subcareer-list">
              {careerData.expected_growth_path.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          </section>

          <section id="income">
            <h4 className="section-title">Expected Income</h4>
            <p>{careerData.expected_income}</p>
          </section>

          <br />

          <Link className="back-btn" to={`/domain/${id}`}>
            ⬅ Back to {domain.domain_name}
          </Link>

        </div>
      </div>

    </div>
  );
}
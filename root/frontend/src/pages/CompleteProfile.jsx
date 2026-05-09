import React, { useEffect, useState, useContext  } from "react";
//options for multiselect fields
import { skillOptions } from "../data/skillOptions";
import { incomeOptions } from "../data/incomeOptions";
// components
import SkillSelect from "../components/SkillSelect";
import EnvironmentalFactors from "../components/EnvironmentalFactors";
import { Appcontext } from "../context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CompleteProfile(){
  const { userData, getUserData } = useContext(Appcontext);
  const navigate = useNavigate();
{/*environmental and socio-economic factors */}
const [familyIncome, setFamilyIncome] = useState(null);
const [location, setLocation] = useState("");
const [educationBudget, setEducationBudget] = useState(500000);
{/*skills and competencies */}
const [communicationSkills, setCommunicationSkills] = useState([]);
const [criticalThinkingSkills, setCriticalThinkingSkills] = useState([]);
const [timeManagementSkills, setTimeManagementSkills] = useState([]);
const [technicalSkills, setTechnicalSkills] = useState([]);
const [creativeSkills, setCreativeSkills] = useState([]);
const [practicalLifeSkills, setPracticalLifeSkills] = useState([]);
const [leadershipSkills, setLeadershipSkills] = useState([]);
const [academicSkills, setAcademicSkills] = useState([]);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const profileData = {
      familyIncome: familyIncome?.value,
      educationBudget,
      location,
      communicationSkills:
        communicationSkills.map(item => item.value),
      criticalThinkingSkills:
        criticalThinkingSkills.map(item => item.value),
      timeManagementSkills:
        timeManagementSkills.map(item => item.value),
      technicalSkills:
        technicalSkills.map(item => item.value),
      creativeSkills:
        creativeSkills.map(item => item.value),
      practicalLifeSkills:
        practicalLifeSkills.map(item => item.value),
      leadershipSkills:
        leadershipSkills.map(item => item.value),
      academicSkills:
        academicSkills.map(item => item.value),
    };
    const response = await axios.post(
      "http://localhost:4000/api/user/complete-profile",
      profileData
    );
    toast.success("Profile Saved Successfully");
   await getUserData();
navigate("/profile");

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
        // Convert coordinates into actual address
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        setLocation(
          `${data.address.city || data.address.town || data.address.village}, ${data.address.state}`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
   useEffect(() => {
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
          const handleSubmit = (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
    
            form.classList.add('was-validated');
          };
    
          form.addEventListener('submit', handleSubmit);
          return () => {
            form.removeEventListener('submit', handleSubmit);
          };
        });
      }, []);
      useEffect(() => {
  if(userData){
    setEducationBudget(
      userData.educationBudget || 500000
    );
    setLocation(
      userData.location || ""
    );
    setFamilyIncome(
      incomeOptions.find(
        item => item.value === userData.familyIncome
      )
    );
    setCommunicationSkills(
      skillOptions.communicationAndInterpersonalSkills.filter(
        item =>
          userData.communicationSkills?.includes(item.value)
      )
    );
    setCriticalThinkingSkills(
      skillOptions.criticalThinkingAndProblemSolving.filter(
        item =>
          userData.criticalThinkingSkills?.includes(item.value)
      )
    );
    setTimeManagementSkills(
      skillOptions.timeAndSelfManagement.filter(
        item =>
          userData.timeManagementSkills?.includes(item.value)
      )
    );
    setTechnicalSkills(
      skillOptions.technicalAndDigitalSkills.filter(
        item =>
          userData.technicalSkills?.includes(item.value)
      )
    );
    // Creative Skills
    setCreativeSkills(
      skillOptions.creativeAndArtisticSkills.filter(
        item =>
          userData.creativeSkills?.includes(item.value)
      )
    );
    // Practical Life Skills
    setPracticalLifeSkills(
      skillOptions.practicalAndLifeSkills.filter(
        item =>
          userData.practicalLifeSkills?.includes(item.value)
      )
    );
    // Leadership Skills
    setLeadershipSkills(
      skillOptions.leadershipAndTeamSkills.filter(
        item =>
          userData.leadershipSkills?.includes(item.value)
      )
    );
    // Academic Skills
    setAcademicSkills(
      skillOptions.academicAndSubjectSpecific.filter(
        item =>
          userData.academicSkills?.includes(item.value)
      )
    );
  }
}, [userData]);
    return (
      <div className="row">
      <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate onSubmit={handleSubmit}>
        <h1 className="mb-3"style={{color:"#004aad"}}>Complete Your Profile</h1>
        <div className="mb-3">
        <h4 className="mb-3 fw-bold" style={{
    color: "#6200ad",
    fontSize: "28px",
    letterSpacing: "0.5px",
    textTransform: "capitalize",
    borderLeft: "5px solid #6200ad",
    paddingLeft: "12px",
    fontFamily: "Poppins, sans-serif"
  }}
>
  Environmental and Social Factors
</h4>
<div className="mb-4">
<EnvironmentalFactors
incomeOptions={incomeOptions}
familyIncome={familyIncome}
setFamilyIncome={setFamilyIncome}
educationBudget={educationBudget}
setEducationBudget={setEducationBudget}
location={location}
setLocation={setLocation}
/>
    </div>
  </div>
      <div className="mb-3">
    <h4
  className="mb-3 fw-bold"
  style={{
    color: "#6200ad",
    fontSize: "28px",
    letterSpacing: "0.5px",
    textTransform: "capitalize",
    borderLeft: "5px solid #6200ad",
    paddingLeft: "12px",
    fontFamily: "Poppins, sans-serif"
  }}
>Skills and Competencies
</h4>
  </div>
<div className="mb-4">
 <SkillSelect
  label="Communication & Interpersonal Skills"
  options={skillOptions.communicationAndInterpersonalSkills}
  value={communicationSkills}
  setValue={setCommunicationSkills}
/>
<SkillSelect
  label="Critical Thinking & Problem Solving"
  options={skillOptions.criticalThinkingAndProblemSolving}
  value={criticalThinkingSkills}
  setValue={setCriticalThinkingSkills}
/>
<SkillSelect
  label="Time & Self-Management"
  options={skillOptions.timeAndSelfManagement}
  value={timeManagementSkills}
  setValue={setTimeManagementSkills}
/>
<SkillSelect
  label="Technical & Digital Skills"
  options={skillOptions.technicalAndDigitalSkills}
  value={technicalSkills}
  setValue={setTechnicalSkills}
/>
<SkillSelect
  label="Creative & Artistic Skills"
  options={skillOptions.creativeAndArtisticSkills}
  value={creativeSkills}
  setValue={setCreativeSkills}
/>
<SkillSelect
  label="Practical & Life Skills"
  options={skillOptions.practicalAndLifeSkills}
  value={practicalLifeSkills}
  setValue={setPracticalLifeSkills}
/>
<SkillSelect
  label="Leadership & Team Skills"
  options={skillOptions.leadershipAndTeamSkills}
  value={leadershipSkills}
  setValue={setLeadershipSkills}
/>
<SkillSelect
  label="Academic & Subject-Specific Skills"
  options={skillOptions.academicAndSubjectSpecific}
  value={academicSkills}
  setValue={setAcademicSkills}
/>
</div>
      <button type="submit" className="offset-3 col-6 btn btn-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 ">Save</button>
      </form>
    </div>
    );
}
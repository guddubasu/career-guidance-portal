import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
export default function Profile(){
    return (
        <div>
        <div className="card row mb-3 border-4 border-primary mb-2 border-opacity-10 col-6 offset-3">
        <div className="card-body text-start">
       <p className="col-12 fs-1" style={{color:"#0c3973ff"}}>Pammy Banerjee</p>
      <p className="fs-4 col-3" style={{color:"#004aad"}}>Email</p>
      <p className="border border-3 border-primary px-3 py-2 mb-2 border-opacity-25 rounded-4 col-10 fs-5 text-start">Email</p>

      <p className="fs-4 col-3" style={{color:"#004aad"}}>Username</p>
      <p className="border border-3 border-primary px-3 py-2 mb-2 border-opacity-25 rounded-4 col-10 fs-5 text-start">Username</p>
        
        <p className="fs-4 col-4" style={{color:"#004aad"}}>Phone Number</p>
      <p className="border border-3 border-primary px-3 py-2 mb-2 border-opacity-25 rounded-4 col-10 fs-5 text-start">number</p>

      <p className="fs-4 col-3" style={{color:"#004aad"}}>Gender</p>
      <p className="border border-3 border-primary px-3 py-2 mb-2 border-opacity-25 rounded-4 col-10 fs-5 text-start">Gender</p>

      <p className="fs-4 col-3" style={{color:"#004aad"}}>Location</p>
      <p className="border border-3 border-primary px-3 py-2 mb-2 border-opacity-25 rounded-4 col-10 fs-5 text-start">location</p>
      <Link to="/profildetails"><button className="btn btn-primary fs-5 mt-4">Complete Profile</button></Link>
      <h2></h2>
    
  </div>
</div>
        </div>
    );
}
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function Signup() {
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
  return (<div className="row">
    <form className="offset-3 col-5 mb-3 needs-validation" noValidate>
      <h1 className="mb-3"style={{color:"#004aad"}}>Create new account</h1>
      <div className="row">
        <div className="mb-3 col-6">
           <label htmlFor="firstname" className="form-label fs-5">First Name</label>
            <input type="text" className="form-control" id="firstname" placeholder="Pammy" required/>
           <div className="invalid-feedback fs-6">
            please enter your first name.
          </div>
        </div>
      <div className="mb-3 col-6">
      <label htmlFor="lastname" className="form-label fs-5">Surname</label>
            <input type="text" className="form-control" id="lastname" placeholder="Banerjee"required/>
            <div className="invalid-feedback fs-6">
            please enter your last name.
          </div>
          </div>
      </div>
        <label className="form-label fs-5">Gender</label>
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="female" value="female" required/>
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="male" value="male"/>
              <label className="form-check-label" htmlFor="male" >Male</label>
            </div>
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="notsaid" value="notmentioned" />
              <label className="form-check-label" htmlFor="notsaid">Prefer not to say</label>
            </div>
          </div>
          <label className="form-label fs-5">Date of birth</label>
          <div className="row g-2 mb-3">
            <div className="col">
              <select className="form-select"  required>
                {[...Array(31)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-select"  required>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
                  <option key={i}>{month}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-select"  required>
                {[...Array(100)].map((_, i) => (
                  <option key={i}>{2025 - i}</option>
                ))}
              </select>
            </div>
            <div className="invalid-feedback fs-6">
            please enter your DOB
          </div>
          </div>
      <div className="mb-3">
       <label htmlFor="email" className="form-label fs-5">Email address</label>
       <input type="email" className="form-control" id="email" placeholder="name@gmail.com"  required/>
         <div className="invalid-feedback fs-6">
            please enter a valid email
          </div>
      </div>
      <div className="mb-3">
      <label htmlFor="username" className="form-label fs-5">Username</label>
      <input type="text" className="form-control" id="username" placeholder="username"  required/>
        <div className="invalid-feedback fs-6">
            please enter a valid username
          </div>
      </div>
      <div className="mb-3">
      <label htmlFor="password" className="form-label fs-5">Password</label>
      <input type="password" id="password" className="form-control" required/>
      <div className="invalid-feedback fs-6">
            please enter a valid password
          </div>
      </div>
      
      <button className="btn btn-outline-primary mt-3 px-5 py-2 fs-5 col-8 offset-2 mb-2">Signup</button>
    </form>
  </div>);
}

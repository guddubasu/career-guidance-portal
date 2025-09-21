import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function Signup() {
  return <div className="row">
    <form className="offset-3 col-5 mb-3">
      <h1 className="mb-3"style={{color:"#004aad"}}>Create new account</h1>
      <div className="row">
        <div className="mb-3 col-6">
           <label htmlFor="firstname" className="form-label fs-5">First Name</label>
            <input type="email" className="form-control" id="firstname" placeholder="Pammy"/>
        </div>
      <div className="mb-3 col-6">
      <label htmlFor="lastname" className="form-label fs-5">Surname</label>
            <input type="email" className="form-control" id="lastname" placeholder="Banerjee"/>
          </div>
      </div>
        <label className="form-label fs-5">Gender</label>
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="female" value="male"/>
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="male" value="male"/>
              <label className="form-check-label" htmlFor="male" >Male</label>
            </div>
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="others" value="male" />
              <label className="form-check-label" htmlFor="others">Others</label>
            </div>
            <div className="form-check form-check-inline fs-5">
              <input className="form-check-input" type="radio" name="gender" id="notsaid" value="male" />
              <label className="form-check-label" htmlFor="notsaid">Prefer not to say</label>
            </div>
          </div>
          <label className="form-label fs-5">Date of birth <i className="bi bi-question-circle"></i></label>
          <div className="row g-2 mb-3">
            <div className="col">
              <select className="form-select">
                {[...Array(31)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-select">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
                  <option key={i}>{month}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-select">
                {[...Array(100)].map((_, i) => (
                  <option key={i}>{2025 - i}</option>
                ))}
              </select>
            </div>
          </div>
      <div className="mb-3">
       <label htmlFor="email" className="form-label fs-5">Email address</label>
       <input type="email" className="form-control" id="email" placeholder="name@gmail.com"/>
      </div>
      <div className="mb-3">
      <label htmlFor="username" className="form-label fs-5">Username</label>
      <input type="email" className="form-control" id="username" placeholder="username"/>
      </div>
      <label htmlFor="password" className="form-label fs-5">Password</label>
      <input type="password" id="password" className="form-control" aria-describedby="passwordHelpBlock"/>
      <button type="button" className="btn btn-outline-primary mt-3 px-5 py-2 fs-5 col-8 offset-2 mb-2">Signup</button>
    </form>
  </div>;
}

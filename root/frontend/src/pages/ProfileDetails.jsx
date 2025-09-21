import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function ProfileDetails(){
    return (
           <div className="row">
      <form className="col-5 offset-3 mb-3 mt-3 border-2px">
        <h1 className="mb-3"style={{color:"#004aad"}}>Complete Your Profile</h1>
        <div className="mb-3">
        <label htmlFor="phone" className="form-label fs-5">Enter Phone Number</label>
        <input type="number" className="form-control" id="phone"/>
      </div>
      <label htmlFor="location" className="form-label fs-5">Enter Location</label>
       <input type="password" id="location" className="form-control"/>
      <button type="button" className="offset-3 col-6 btn btn-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 ">Save</button>
      </form>
    </div>
    );
}
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import Signup from './Signup.jsx';
export default function Login(){
  return (
    <div className="row">
      <form className="col-5 offset-3 mb-3 mt-3 border-2px">
        <h1 className="mb-3"style={{color:"#004aad"}}>Login</h1>
        <div className="mb-3">
        <label htmlFor="email" className="form-label fs-5">Enter email or username</label>
        <input type="text" className="form-control" id="email" placeholder="name@gmail.com/username"/>
      </div>
      <label htmlFor="password" className="form-label fs-5">Password</label>
       <input type="password" id="password" className="form-control" aria-describedby="passwordHelpBlock"/>
      <button type="button" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3">Login</button>
      <h4 className="mb-3">don't have an account?    <Link to="/signup">Signup</Link></h4>
      </form>
    </div>
  );
}
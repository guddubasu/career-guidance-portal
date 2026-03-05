<<<<<<< HEAD
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

export default function Login() {

=======
import React, { useEffect, useState,useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link, useNavigate } from 'react-router-dom';
import { Appcontext } from "../context/AppContext";
import axios from "axios";
import {toast} from 'react-toastify';
export default function Login() {
  //state variables
  const [state,setstate]=useState('Sign Up');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const onSubHandler=async(e)=>{
    try {
      e.preventDefault();
      axios.defaults.withCredentials=true;
      if(state=== 'Sign Up'){
        const {data}=await axios.post(backendUrl +'/api/auth/register',{name,email,password});
        if(data.success){
          setisLoggedin(true);
          getUserData();
           toast.success("Login successful 🎉");
         setTimeout(() => {
    navigate('/home');
  }, 1000);
        }else{
         toast.error(data.message);
        }
      }else{
        const {data}=await axios.post(backendUrl +'/api/auth/login',{email,password});
        if(data.success){
          setisLoggedin(true);
          getUserData();
          toast.success("Login successful 🎉");
          setTimeout(() => {
    navigate('/home');
  }, 1000);
        }else{
         toast.error(data.message);
        }
      }
    } catch (error) {
         toast.error(error.message);
    }
  }
  // navigation
  const navigate=useNavigate();
  const {backendUrl,setisLoggedin,getUserData}=useContext(Appcontext);
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
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

  return (
    <div className="row">
<<<<<<< HEAD
      <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate>
        <h1 className="mb-3" style={{ color: "#004aad" }}>Login</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5">Enter email or username</label>
=======
      <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate onSubmit={onSubHandler}>
        <h1 className="mb-3" style={{ color: "#004aad" }}>{state === 'Sign Up'?'Create Your Account' : 'Login to your account!'}</h1>
      {/* fullname */}
      {state==='Sign Up' && (<div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">Enter Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Pammy Banerjee"
            required
            onChange={e=>setName(e.target.value)}
            value={name}
          />
          <div className="invalid-feedback fs-6">
            Please enter a valid name.
          </div>
        </div>)}
        
      {/* email */}
      <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5">Enter Email</label>
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
          <input
            type="text"
            className="form-control"
            id="email"
<<<<<<< HEAD
            placeholder="name@gmail.com/username"
            required
          />
          <div className="invalid-feedback fs-6">
            Please enter a valid username or email.
          </div>
        </div>

=======
            placeholder="example@gmail.com"
            required
            onChange={e=>setEmail(e.target.value)}
            value={email}
          />
          <div className="invalid-feedback fs-6">
            Please enter a valid email.
          </div>
        </div>
      {/* password */}
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
<<<<<<< HEAD
=======
            onChange={e=>setPassword(e.target.value)}
            value={password}
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
          />
          <div className="invalid-feedback fs-6">
            Please enter a valid password.
          </div>
        </div>
<<<<<<< HEAD

        <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-8 offset-2">
          Login
        </button>

        <h4 className="mb-3 col-7 offset-4 fs-5">
          Forgot password? <Link to="/resetpassword">Reset</Link>
        </h4>
        <h4 className="mb-3 col-7 offset-3 fs-5">
          Don't have an account? <Link to="/signup">Signup</Link>
        </h4>
=======
        {/* forget password */}
        <h4 className="mb-3 col-7 offset-4 fs-5">
          Forgot password? <Link to="/resetpassword">Reset</Link>
        </h4>
      {/* changing according to state */}
        <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-8 offset-2">
          {state}
        </button>
        {/* login and signup*/}
        {state==='Sign Up'?(<h4 className="mb-3 col-7 offset-3 fs-5">
          Already have an account?<span onClick={()=>setstate("Log in")} className="text-primary text-decoration-underline" role="button">Login here</span>
        </h4>):(<h4 className="mb-3 col-7 offset-3 fs-5">
          Don't have an account? <span onClick={()=>setstate("Sign Up")} className="text-primary text-decoration-underline" role="button">SignUp here</span>
        </h4>)}
>>>>>>> 178bb3e08ec2f1d7e3aff9be230106ba9777cbd6
      </form>
    </div>
  );
}

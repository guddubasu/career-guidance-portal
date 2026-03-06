import React, { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link, useNavigate } from 'react-router-dom';
import { Appcontext } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Login() {
  // State variables
  const [state, setState] = useState('Sign Up'); // Toggle between Sign Up / Log in
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, setisLoggedin, getUserData } = useContext(Appcontext);

  const onSubHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (data.success) {
          setisLoggedin(true);
          getUserData();
          toast.success("Signup successful 🎉");
          setTimeout(() => navigate('/home'), 1000);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
          setisLoggedin(true);
          getUserData();
          toast.success("Login successful 🎉");
          setTimeout(() => navigate('/home'), 1000);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      return () => form.removeEventListener('submit', handleSubmit);
    });
  }, []);

  return (
    <div className="row">
      <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate onSubmit={onSubHandler}>
        <h1 className="mb-3" style={{ color: "#004aad" }}>
          {state === 'Sign Up' ? 'Create Your Account' : 'Login to your account!'}
        </h1>

        {/* Full Name for Sign Up */}
        {state === 'Sign Up' && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-5">Enter Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Pammy Banerjee"
              required
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <div className="invalid-feedback fs-6">Please enter a valid name.</div>
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5">Enter Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            required
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <div className="invalid-feedback fs-6">Please enter a valid email.</div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <div className="invalid-feedback fs-6">Please enter a valid password.</div>
        </div>

        {/* Forget password */}
        <h4 className="mb-3 col-7 offset-4 fs-5">
          Forgot password? <Link to="/resetpassword">Reset</Link>
        </h4>

        {/* Submit Button */}
        <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-8 offset-2">
          {state}
        </button>

        {/* Toggle between Login / Sign Up */}
        {state === 'Sign Up' ? (
          <h4 className="mb-3 col-7 offset-3 fs-5">
            Already have an account?{' '}
            <span onClick={() => setState("Log in")} className="text-primary text-decoration-underline" role="button">
              Login here
            </span>
          </h4>
        ) : (
          <h4 className="mb-3 col-7 offset-3 fs-5">
            Don't have an account?{' '}
            <span onClick={() => setState("Sign Up")} className="text-primary text-decoration-underline" role="button">
              Sign Up here
            </span>
          </h4>
        )}
      </form>
    </div>
  );
}
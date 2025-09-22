import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

export default function Login() {

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
      <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate>
        <h1 className="mb-3" style={{ color: "#004aad" }}>Login</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5">Enter email or username</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="name@gmail.com/username"
            required
          />
          <div className="invalid-feedback fs-6">
            Please enter a valid username or email.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
          />
          <div className="invalid-feedback fs-6">
            Please enter a valid password.
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-8 offset-2">
          Login
        </button>

        <h4 className="mb-3 col-7 offset-4 fs-5">
          Forget password? <Link to="/resetpassword">Reset</Link>
        </h4>
        <h4 className="mb-3 col-7 offset-3 fs-5">
          Don't have an account? <Link to="/signup">Signup</Link>
        </h4>
      </form>
    </div>
  );
}

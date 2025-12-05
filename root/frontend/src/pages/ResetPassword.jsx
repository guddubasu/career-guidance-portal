import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect } from "react";
export default function ResetPassword(){
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
        <div>
            <form className="needs-validation" noValidate>
            <h5 className="offset-3">A 6-digit otp is sent to your email</h5>
            <div className="mb-3 col-6 offset-3">
           <label htmlFor="otp" className="form-label fs-5 "style={{color:"#004aad"}}>Enter OTP</label>
            <input type="number" className="form-control" id="otp" required/>
            <div className="invalid-feedback fs-5">
                enter the valid otp
            </div>
        </div>
            <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-4 offset-4 fs-5">Change Password</button>
        </form>
        </div>
    );
}
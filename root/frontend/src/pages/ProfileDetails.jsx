import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function ProfileDetails(){
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
        <h1 className="mb-3"style={{color:"#004aad"}}>Complete Your Profile</h1>
        <div className="mb-3">
        <label htmlFor="phone" className="form-label fs-5">Enter Phone Number</label>
        <input type="number" className="form-control" id="phone" required/>
        <div className="invalid-feedback fs-6">
          please enter a valid phone number
        </div>
      </div>
      <div className="mb-3">
      <label htmlFor="location" className="form-label fs-5">Enter Location</label>
       <input type="text" id="location" className="form-control" required/>
       <div className="invalid-feedback fs-6">
          please enter a valid location
        </div>
       </div>
      <button type="submit" className="offset-3 col-6 btn btn-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 ">Save</button>
      </form>
    </div>
    );
}
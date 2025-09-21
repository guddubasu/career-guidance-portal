import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function ResetPassword(){
    return (
        <div>
            <h5 className="offset-3">A 6-digit otp is sent to your email</h5>
            <div className="mb-3 col-6 offset-3">
           <label htmlFor="otp" className="form-label fs-5 "style={{color:"#004aad"}}>Enter OTP</label>
            <input type="email" className="form-control" id="otp"/>
            <button type="button" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-8 offset-2 fs-5">Change Password</button>
        </div>
        </div>
    );
}
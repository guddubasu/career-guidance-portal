import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect,useState,useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { Appcontext } from '../context/AppContext';
import axios from "axios";
import { toast } from "react-toastify";
export default function ResetPassword(){
  const inputRefs=React.useRef([]);
    //get the backendUrl from our context file
    const {backendUrl,isLoggedin,userData,setuserData,getUserData}=useContext(Appcontext);
    axios.defaults.withCredentials=true;
    //to move forward automatically without using cursor
    const handleInput =(e,index)=>{
            if(e.target.value.length>0 && index<inputRefs.current.length-1){
              inputRefs.current[index+1].focus();
            }
          }
    //to remove the otp using backspace
    const handleKeyDown=(e,index)=>{
      if(e.key === 'Backspace' && e.target.value === '' && index>0){
        inputRefs.current[index-1].focus();
      }
    }
    //to paste the entire otp
    const handlePaste=(e)=>{
      e.preventDefault();
      const paste=e.clipboardData.getData('text');
      const pasteArray=paste.split('');
      pasteArray.forEach((char,index)=>{
        if(inputRefs.current[index]){
          inputRefs.current[index].value=char;
        }
      });
    }    
    //email submit form handler
    const onSubmitEmail=async(e)=>{
      e.preventDefault();
      try{
        const {data}=await axios.post(backendUrl+'/api/auth/sent-reset-otp',{email});
        data.success?toast.success(data.message):toast.error(data.message);
        data.success && setIsEmailSent(true);
      }catch(error){
        toast.error(error.message);
      }
    }
    //otp entering form handler
    const onSubmitOtp=async(e)=>{
      e.preventDefault();
      const otpArray=inputRefs.current.map(e=>e.value);
      setOtp(otpArray.join(''));
      setIsOtpSubmitted(true);

    }
    //new password submission form handler
    const onSubmitNewPassword=async(e)=>{
      e.preventDefault();
      try {
        const {data}=await axios.post(backendUrl+'/api/auth/reset-password',{email,otp,newPassword:password});
         data.success?toast.success(data.message):toast.error(data.message);
         data.success && navigate('/login');
      } catch (error) {
        toast.error(error.message);
      }
    }
    //state variables
            const navigate=useNavigate();
            const [email,setEmail]=useState('');
            const [password,setPassword]=useState('');
            const [isEmailSent,setIsEmailSent]=useState(false);
            const [otp,setOtp]=useState(0);
            const [isOtpSubmitted,setIsOtpSubmitted]=useState(false);
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
          {!isEmailSent && <div>
            <h1 className="mb-3"style={{color:"#004aad"}}>Change Your Password</h1>
            <form className="needs-validation" noValidate onSubmit={onSubmitEmail}>
            <h5 className="offset-3">Enter your registered email id: </h5>
            <div className="mb-3 col-6 offset-3">
           <label htmlFor="email_id" className="form-label fs-5 "style={{color:"#004aad"}}>Enter Email</label>
            <input type="email" className="form-control" id="email_id" required value={email} onChange={e=>setEmail(e.target.value)}/>
            <div className="invalid-feedback fs-5">
                enter the otp
            </div>
        </div>
            <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-4 offset-4 fs-5">Request OTP</button>
        </form>
          </div> }
          
        {/* otp entering form*/}
        {!isOtpSubmitted && isEmailSent &&  <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate onSubmit={onSubmitOtp}>
        <h1 className="mb-3"style={{color:"#004aad"}}>Reset Password OTP</h1>
        <h5 className="offset-3 mb-3">Enter 6-digit code sent to your email</h5>
        <div className="d-flex justify-content-center gap-3" onPaste={ handlePaste}>
        <label htmlFor="otp" className="form-label fs-5 mt-2" style={{color:"#004aad"}}>Enter the OTP: </label>
        {Array(6).fill(0).map((_,index)=>(
          <input type="text" maxLength='1' key={index} className="form-control text-center fw-bold" required style={{ width: "50px", height: "50px" }}
          ref={e=>inputRefs.current[index]=e}
          onInput={(e)=> handleInput(e,index)}
          onKeyDown={(e)=>handleKeyDown(e,index)}
          
          />
        ))}
        <div className="invalid-feedback fs-6">
          please enter a valid otp
        </div>
      </div>
      <button type="submit" className="offset-3 col-6 btn btn-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 ">Submit</button>
      </form>}
      {/* enter new password */}
      {isOtpSubmitted && isEmailSent && <form className="needs-validation" noValidate onSubmit={onSubmitNewPassword}>
            <h1 className="mb-3"style={{color:"#004aad"}}>New Password</h1>
            <h5 className="offset-3">enter the new password</h5>
            <div className="mb-3 col-6 offset-3">
           <label htmlFor="new_password" className="form-label fs-5 "style={{color:"#004aad"}}>Enter New Password</label>
            <input type="password" className="form-control" id="new_pasword" required value={password} onChange={e=>setPassword(e.target.value)}/>
            <div className="invalid-feedback fs-5">
                enter the otp
            </div>
        </div>
            <button type="submit" className="btn btn-outline-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 col-4 offset-4 fs-5">Change Password</button>
        </form>}
        </div>
    );
}
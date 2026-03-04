import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Appcontext } from "../context/AppContext";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function ProfileDetails(){
  //sending cookies
   axios.defaults.withCredentials=true;
  //navigation
  const navigate=useNavigate();

  const inputRefs=React.useRef([]);
  //get the backendUrl from our context file
  const {backendUrl,isLoggedin,userData,setuserData,getUserData}=useContext(Appcontext);
  
 
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
  //form submission handler
  const onSubmitHandler=async(e)=>{
    try {
       e.preventDefault();
       const otpArray=inputRefs.current.map(e =>e.value);
       const otp=otpArray.join('');
       const {data}=await axios.post(backendUrl+'/api/auth/verify-account',{otp});
       if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/home');
       }else{
        toast.error(data.message);
       }
    } catch (error) {
      toast.error(error.message);
    }
  }
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
      useEffect(()=>{
        isLoggedin && userData && userData.isAccountVerified && navigate('/home');
      },[isLoggedin,userData]);
    return (
      <div className="row">
      <form className="col-5 offset-3 mb-3 mt-3 border-2px needs-validation" noValidate onSubmit={onSubmitHandler}>
        <h1 className="mb-3"style={{color:"#004aad"}}>Verify Your Email</h1>
        <h5 className="offset-3 mb-3">A 6-digit otp is sent to your email</h5>
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
      <button type="submit" className="offset-3 col-6 btn btn-primary mt-2 px-5 py-2 fs-5 mt-3 mb-3 ">Verify</button>
      </form>
    </div>
    );
}
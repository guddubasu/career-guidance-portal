import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Appcontext } from '../context/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
export default function Profile(){
    const {userData,backendUrl,setuserData,setisLoggedin} =useContext(Appcontext);
    const navigate=useNavigate();
    const sendVerificationOtp=async()=>{
        try{
            //sending cookies
            axios.defaults.withCredentials=true;
            //making api call on the api-endpoint
            const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp');
            if(data.success){
                navigate('/verifyemail');
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }
    }
    return (
        <div>
        <div className="card row mb-3 border-4 border-primary mb-2 border-opacity-10 col-6 offset-3">
        <div className="card-body text-start">
       <p className="col-12 fs-1" style={{color:"#0c3973ff"}}>{userData?userData.name:"Unknown"}</p>
      <p className="fs-4 " style={{color:"#004aad"}}>Welcome to your Career Journey!</p>
      <p className="border border-3 border-primary px-3 py-2 mb-2 border-opacity-25 rounded-4  fs-5 text-start">We hope this platform helps you find the perfect career that aligns with your passion and potential. Explore, learn, grow, and build the future you’ve always dreamed of. The right guidance can change everything!</p>
      {!userData.isAccountVerified && <Link to="/verifyemail"><button onClick={sendVerificationOtp} className="btn btn-primary fs-5 mt-4">Verify Email</button></Link>}
  </div>
</div>
        </div>
    );
}
import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import './Navbar.css';
import { Appcontext } from "../context/AppContext";
import {toast} from 'react-toastify';
import axios from "axios";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {userData,backendUrl,setuserData,setisLoggedin}=useContext(Appcontext);
  const navigate=useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);
  const logout=async()=>{
        try{
            axios.defaults.withCredentials=true;
            const {data}=await axios.post(backendUrl +'/api/auth/logout');
            data.success && setisLoggedin(false);
            data.success && setuserData(null);
            toast.success("Logout successful 🎉");
                     setTimeout(() => {
                navigate('/');
              }, 1000);
        }catch(error){
          toast.error(error.message);
        }
    }
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">CareerCompass</Link>
      </div>
      {userData? <div className="d-flex align-items-center ms-auto gap-4">
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link>
        <Link to="/distance-online-learning" onClick={() => setIsOpen(false)}>Distance & Online Learning</Link>
        <Link to="/institutions" onClick={() => setIsOpen(false)}>Institutions</Link>
        <Link to="/scholarships" onClick={() => setIsOpen(false)}>Scholarships</Link>
        <Link to="/login" onClick={logout}>Logout</Link>
        <Link className="d-flex justify-content-center align-items-center rounded-circle bg-light text-dark fw-bold text-decoration-none"  style={{ width: "40px", height: "40px" }} to="/profile" onClick={()=> setIsOpen(false)}>{userData.name[0].toUpperCase()}</Link>
      </div>:<div className="ms-auto">
         {/* <Link className="nav-link d-inline text-white me-3" to="/" onClick={() => setIsOpen(false)}>Home</Link> */}
         <Link className="nav-link d-inline text-white"  to="/login" onClick={() => setIsOpen(false)}>Signup</Link>
        </div>}
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
}

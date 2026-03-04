import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
export const Appcontext=createContext();
export const AppcontextProvider=(props)=>{
    axios.defaults.withCredentials=true;

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setisLoggedin]=useState(false);
    const [userData,setuserData]=useState(null);
    const getAuthState=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/auth/is-auth");
            if(data.success){
                setisLoggedin(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getUserData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/user/data");
            data.success?setuserData(data.userData):toast.error(data.message);

        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getAuthState();
    },[])
     const value={
        backendUrl,
        isLoggedin,setisLoggedin,
        userData,setuserData,
        getUserData
     };
    return(
       
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; 
export  const Logout=()=>{
    const navigate=useNavigate();
    // useEffect(() => {
       
         localStorage.clear();
        localStorage.removeItem("user");
        localStorage.removeItem("usertype");
    //     navigate('/', { replace: true });
    //   }, [navigate]);
      const { logout } = useContext(AuthContext);

      useEffect(() => {
        logout();
        console.log('logout');
        navigate("/", { replace: true }); // redirect if needed
      }, []);
return(

    <div>
Logging out...
    </div>
);
}
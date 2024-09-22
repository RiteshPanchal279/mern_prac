import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHander=({setIsAuthenticate})=>{
   const loction = useLocation();
   const navigate = useNavigate();
   useEffect(()=>{
      if(localStorage.getItem('token')){
         setIsAuthenticate(true);
         if(location.pathname === '/'||
            location.pathname === '/login'||
            location.pathname === '/signup'
         ){
            navigate('/home',{replace:false});
         }
      }
   },[loction,navigate,setIsAuthenticate])
   return (
      null
   )
}
export default RefreshHander;
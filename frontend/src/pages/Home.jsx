import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import {ToastContainer} from 'react-toastify'

const Home=()=>{

   const [loggedInUser,setLoggedInUser] =useState("");
   const[product,setProduct]=useState("");
   const navigate = useNavigate();
   useEffect(()=>{
      setLoggedInUser(localStorage.getItem('loggedInUser'));
   },[])
   const handleLogout=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('loggedInUser')
      handleSuccess("User Logout");
      setTimeout(() => {
         navigate('/login');
      }, 1000);
   }

   const fetchproducts =async ()=>{
      try {
         const url="https://loginprac-7js1inhmg-ritesh-panchals-projects.vercel.app/product";
         const headers={
            headers:{
               'Authorization':localStorage.getItem('token')
            }
         }
         const responce=await fetch(url,headers);
         const result = await responce.json();
         // console.log(result);
         setProduct(result);
      } catch (err) {
         handleError(err);
      }
   }
   useEffect(()=>{
      fetchproducts();
   })




   return <>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
         {
            product&& product?.map((item,index)=>(
               <ul key={index}>
                  <li>{item.name}:{item.price}</li>
               </ul>
            ))
         }
      </div>
      <ToastContainer/>
   </>
}
export default Home;

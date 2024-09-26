import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import {handleError,handleSuccess} from '../utils'
const Signup = () => {

   const [signupInfo,setSignupInfo]=useState({
      name:'',
      email:'',
      password:''
   })

   const navigate = useNavigate();

   const handleChange=(e)=>{
      const {name,value} =e.target;
      const copySignupInfo = {...signupInfo};
      copySignupInfo[name] = value
      setSignupInfo(copySignupInfo);
   }
   console.log('info',signupInfo)

   const handleSignup=async(e)=>{
      e.preventDefault();
      const {name,email,password} = signupInfo;
      if(!name || !email || !password){
         return handleError('Name , Email and Password is required')
      }

      try {
         const url="https://loginpracba.vercel.app/auth/signup";
         const responce = await fetch(url,{
            method:"POST",
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify(signupInfo)
         })
         const result = await responce.json();
         const{success,message,error} = result;
         if(success){
            handleSuccess(message);
            setTimeout(()=>{
               navigate('/login')
            },1000)
         }else if(error){
          const details=error?.details[0].message;
          handleError(details);
         }else if(!success){
          handleError(message);
         }
        //  console.log(result)
      } catch (err) {
         handleError(err);
      }
   }

  return (
    <>
      <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
            onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
            />
          </div>
          <div>
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email..."
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password..."
            />
          </div>
          <button >Signup</button>
          <span>Already hava an account ?
            <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
     
    </>
  );
};
export default Signup;

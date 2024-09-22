import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };
  console.log("info", loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and Password is required");
    }
    try {
      const url = "https://loginprac-7js1inhmg-ritesh-panchals-projects.vercel.app/auth/login";
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await responce.json();
      const { success, message,jwtToken,name ,error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('loggedInUser',name)
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      //  console.log(result)
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email..."
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>
          <button>login</button>
          <span>
            Doesn't hava an account ?<Link to="/signup">Singup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;

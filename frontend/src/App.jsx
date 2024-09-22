import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import RefreshHander from "./RefreshHandler";

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticate ? element : <Navigate to={"/login"} />;
  };

  return (
    <div>
      <RefreshHander setIsAuthenticate={setIsAuthenticate} />
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;

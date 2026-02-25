import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import welcomeImage from "./images/login-image.jpg";
function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = isLogin
      ? "https://mern-login-app-q2ml.onrender.com"
      : "https://mern-login-app-q2ml.onrender.com";

    try {
      const res = await axios.post(url, { email, password });

      if (isLogin) {
        alert("Login Successful");
        localStorage.setItem("token", res.data.token);
        navigate("/welcome"); // 🔥 redirect
      } else {
        alert("Registered Successfully");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}

function Welcome() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Thank You For Login 🎉</h1>

      <img
        src={welcomeImage}
        alt="Welcome"
        style={{
          width: "300px",
          height:"auto",
          marginTop: "20px",
          
        }}
      />
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
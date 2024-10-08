import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Ensure this CSS file is correctly imported
import { FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons from react-icons

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message on new submit

    try {
      const response = await fetch("https://backend-of-dhan-lakshmi.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.message === "login-successful") {
        navigate("/form");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {message && <div className="error-message">{message}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="register-link">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/Register")}
            className="link-button"
          >
            Register here.
          </button>
        </div>
      </div>
    </div>
  );
};

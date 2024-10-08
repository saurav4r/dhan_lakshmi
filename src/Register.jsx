import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Ensure this CSS file is correctly imported
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons from react-icons

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message on new submit
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("https://backend-of-dhan-lakshmi.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage(`${data.message} Click on the login here button.`);
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during registration. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="username"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
              minLength={2}
              maxLength={50}
            />
          </div>
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
              minLength={6}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {message && <div className="message">{message}</div>}
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="login-link">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="link-button"
          >
            Login here.
          </button>
        </div>
      </div>
    </div>
  );
};

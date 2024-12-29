import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpIn.css";

const SignUpIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleForm = () => setIsSignUp((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "/signup" : "/signin";

    try {
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData
      );
      alert(response.data.message);

      if (isSignUp) {
        setIsSignUp(false); // Switch to Sign In after successful Sign Up
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response?.data.message || "Something went wrong");
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              className="signininput"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            className="signininput"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="signininput"
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <p className="alternative">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggleForm}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
        <button className="google-btn" onClick={googleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpIn;
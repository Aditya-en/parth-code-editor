import React, { useState } from 'react';
import './Signup.css'; // Assuming your CSS is still needed
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  const navigate = useNavigate();

  console.log(formData);
  const { email, password, confirmPassword } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form handling logic here, such as sending data to the server
    console.log(formData);
    axios.post("http://localhost:3001/signup",{email,password,confirmPassword})
    .then(result => {
      if (result.status === 201) {
          navigate("/login");
      }
  })
  .catch(err => {
      if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Please use a different email.");
      } else {
          console.log(err);
      }
  });
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Signup</h2>
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <button type="submit" onSubmit={handleSubmit} className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp
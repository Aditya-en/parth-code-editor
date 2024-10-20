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
  const navigate=useNavigate()
  

  const handleSubmit = (e) => {
    // e.preventDefault();
    const { email, password, confirmPassword } = formData;
    console.log(formData)
    // Ensure proper parentheses closing for axios.post
    // axios.post("http://localhost:5000/signup", { email, password, confirmPassword })
    //   .then(result => {
    //     console.log(result);
    //     // Navigate after a successful result
    //     navigate("/login");
    //   })
    //   .catch(err => console.log(err));

  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Signup</h2>
        <form id="signupForm" action="http://localhost:5000/signup"
        method='POST'
        onSubmit={handleSubmit}>
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
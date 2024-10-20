import React, { useState } from 'react';
import './Login.css'; // Assuming the CSS file is still used

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, like an API request
    console.log(formData);
    
    // Optional: Disable the button after form submission
    const button = e.target.querySelector('button');
    button.disabled = true;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
};

export default Login;

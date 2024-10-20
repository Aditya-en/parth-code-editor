import React, { useState } from 'react';
import './Login.css'; // Assuming the CSS file is still used
import { useNavigate } from 'react-router';
import axios from 'axios';

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

    const navigate=useNavigate()
    
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the form from submitting the default way

      // const email = document.getElementById('login-email').value;
      // const password = document.getElementById('login-password').value;
      const { password, email } = formData
  
      fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
      })
      
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if (data.token) {
              // Save the token (if needed)
              localStorage.setItem('token', data.token);
              // Redirect to the desired URL
              window.location.href = data.redirect;
          } else {
              // Handle login errors
              alert(data.msg); // Display the error message to the user
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.'); // Fallback error message
      });
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

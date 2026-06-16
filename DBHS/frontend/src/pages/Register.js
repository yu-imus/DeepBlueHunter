// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents browser GET request
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', formData);
        alert(res.data.message);
        console.log('Registration successful:', res.data);
        navigate('/');
    } catch (err) {
        alert(err.response?.data?.error || 'Registration failed');
        console.log('Registration error:', err.response?.data || err.message);
    }
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />
          
          <input 
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange}
            required
          />
          
          
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="admin assistant">Admin Assistant</option>
            <option value="plant manager">Plant Manager</option>
          </select>
          <button type="submit">Register</button>
        </div>
      </form> 

      <p>Already have an account? <a href="/">Login here</a></p>

    </div>
  );
}

export default Register;

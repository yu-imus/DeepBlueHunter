import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; // shared CSS for Login & Register

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
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
      </form>
      <p>Already have an account? <a href="/">Login here</a></p>
    </div>
  );
}

export default Register;

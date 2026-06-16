import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; // shared CSS for Login & Register

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { email, password, role })
      .then(res => {
        console.log(res.data.message);
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        }
      })
      .catch(err => {
        console.error(err.response?.data?.error || 'Login failed');
        alert(err.response?.data?.error || 'Login failed');
      });
  };

  return (
    <div className="auth-container">
      <h2>DeepBlueHunter Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="admin assistant">Admin Assistant</option>
          <option value="plant manager">Plant Manager</option>
        </select>
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login( { setUser } ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login', { email, password, role })
      .then(res => {
        // console.log(res.data.message);
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data)); 
          localStorage.setItem("token", res.data.token);
          // console.log(res.data);
          setUser(res.data);
          navigate('/dashboard');
        }
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Login failed');
        // alert(err.response?.data?.error || 'Login failed');
      });
  };

  return (
    <div className="auth-container">
      <h2>DeepBlueHunter Login</h2>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          autocomplete="off"
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

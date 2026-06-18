// src/App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Payroll from './pages/Payroll';
import Vehicles from './pages/Vehicles';
import Trucking from './pages/Trucking';
import UserProfile from './pages/UserProfile';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
        if (token) {
          try{
            const res = await axios.get('api/auth/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setUser(res.data);
          } catch (err) {
            setError('Failed to fetch user data');
            localStorage.removeItem('token');
          }
        }
    }
    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/trucking" element={<Trucking />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
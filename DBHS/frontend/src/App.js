import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Payroll from './pages/Payroll';
import Trucking from './pages/Trucking/Trucking';
import UserProfile from './pages/UserProfile';
import axios from 'axios';
import MainLayout from './pages/MainLayout';
import VehiclesPage from './pages/Trucking/VehiclesPage';
import VehicleDetails from './pages/Trucking/VehicleDetails';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
        if (token) {
          try{
            const res = await axios.get('http://localhost:5000/api/users/me', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser(res.data);
          } catch (err) {
            setError('Failed to fetch user data');
            localStorage.removeItem('token');
          }
        } else {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
    <div className="min-h-screen bg-gray-900 items-center justify-center">
      <div className="text-xl text-white">Loading...</div>
    </div>
    )
  }

  return (
  <>
    <Router>
      <Routes>
        { /* Public */ }
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        
        {/* Protected Routes */}
        <Route element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetails/>} />
          <Route path="/trucking" element={<Trucking />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
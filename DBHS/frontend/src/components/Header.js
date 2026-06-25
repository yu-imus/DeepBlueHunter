import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles//Header.css';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <span className="company-name">JL-U1 Enterprise</span>
      </div>

      <div className="header-right">
        <div className="user-info" onClick={() => setOpen(!open)}>
          <FaUserCircle className="user-icon" />
          <div className="user-details">
            <span className="user-name">{user?.username}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        {open && (
          <div className="dropdown">
            <button onClick={() => navigate('/userprofile')}>User Page</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles//Header.css';

function Header({ userName = "John Doe", userRole = "Admin" }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/logo.png" alt="JL-U1 Logo" className="company-logo" />
        <span className="company-name">JL-U1 Enterprise</span>
      </div>

      <div className="header-right">
        <div className="user-info" onClick={() => setOpen(!open)}>
          <FaUserCircle className="user-icon" />
          <div className="user-details">
            <span className="user-name">{userName}</span>
            <span className="user-role">{userRole}</span>
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
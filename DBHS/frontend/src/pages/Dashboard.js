
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/JLU1-logo.png';
import '../styles/Dashboard.css';

function Dashboard({ user, error, setUser }) {
  const navigate = useNavigate();
  document.title = "JLU1 | Dashboard";

  return (
  <>

    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={logo} alt="Company Logo" className="dashboard-logo" />
        <h2>JACKLORD AND YUAN ENTERPRISE</h2>
      </div>

      <div className="dashboard-sections">
          <button className="dashboard-card" onClick={() => navigate('/payroll')}>
            <h3>Driver Payroll</h3>
            <p>View and manage driver payroll records here.</p>
          </button>

          <button className="dashboard-card" onClick={() => navigate('/vehicles')}>
            <h3>Vehicles</h3>
            <p>Manage vehicle records and details.</p>
          </button>

          <button className="dashboard-card" onClick={() => navigate('/trucking')}>
            <h3>Trucking</h3>
            <p>Manage trucking operations and related information.</p>
          </button>

          <button className="dashboard-card" onClick={() => navigate('/sardines')}>
            <h3>Sardines Production</h3>
            <p>Manage sardines production operations and related information.</p>
          </button>

          <button className="dashboard-card" onClick={() => navigate('/crab')}>
            <h3>Crab Production</h3>
            <p>Manage crab production operations and related information.</p>
          </button>

          <button className="dashboard-card" onClick={() => navigate('/coldstorage')}>
            <h3>Cold Storage Production</h3>
            <p>Manage cold storage operations and related information.</p>
          </button>

          <button className="dashboard-card" onClick={() => navigate('/employees')}>
            <h3>Employees</h3>
            <p>Manage employee information.</p>
          </button>

        </div>
    </div>
  </>    
  );
}

export default Dashboard;

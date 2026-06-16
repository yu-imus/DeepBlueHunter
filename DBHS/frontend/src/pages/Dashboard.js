
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Header from '../components/Header';

function Dashboard() {
  const navigate = useNavigate();

  return (
  <>
  <Header />

    <div className="dashboard-container">
      <h2>DeepBlueHunter Dashboard</h2>
      <div className="dashboard-sections">
          <button className="dashboard-card" onClick={() => navigate('/payroll')}>
            <h3>Payroll</h3>
            <p>View and manage payroll records here.</p>
          </button>
          <button className="dashboard-card" onClick={() => navigate('/vehicles')}>
            <h3>Vehicles</h3>
            <p>Manage vehicle records and details.</p>
          </button>
          <button className="dashboard-card" onClick={() => navigate('/business-categories')}>
            <h3>Business Categories</h3>
            <p>Manage business categories and their details.</p>
          </button>
        </div>
    </div>
  </>    
  );
}

export default Dashboard;

import React from 'react';
import Header from '../components/Header';
import '../styles/Page.css';

function Vehicles() {
  return (
    <>
      <Header />
      <div className="page-container">
        <h2>Vehicle Management</h2>
        <p>Manage vehicle records, details, and assignments here.</p>
        <button className="primary-btn">Register New Vehicle</button>
      </div>
    </>
  );
}

export default Vehicles;
import React from 'react';
import '../styles/Page.css';

function VehiclesDetails() {
  return (
    <>
      <div className="page-container">
        <h2>Detailed Vehicle Page</h2>
        <p>Register, track, and manage company vehicles and assignments here.</p>
        <button className="primary-btn">Register New Vehicle</button>
      </div>
    </>
  );
}

export default VehiclesDetails;
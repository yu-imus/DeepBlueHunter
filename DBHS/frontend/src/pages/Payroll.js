import React from 'react';
import '../styles/Page.css';

function Payroll() {
  return (
    <>
      
      <div className="page-container">
        <h2>Driver Payroll</h2>
        <p>Here you can view, manage, and process payroll records for employees.</p>
        <button className="primary-btn">Add New Payroll</button>
      </div>
    </>
  );
}

export default Payroll;
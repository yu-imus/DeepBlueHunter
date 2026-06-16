import React from 'react';
import Header from '../components/Header';
import '../styles/Page.css';

function Payroll() {
  return (
    <>
      <Header />
      <div className="page-container">
        <h2>Payroll Management</h2>
        <p>Here you can view, manage, and process payroll records for employees.</p>
        <button className="primary-btn">Add New Payroll</button>
      </div>
    </>
  );
}

export default Payroll;
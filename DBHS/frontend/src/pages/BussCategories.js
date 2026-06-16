import React from 'react';
import Header from '../components/Header';
import '../styles/Page.css';

function BussCategories() {
  return (
    <>
      <Header />
      <div className="page-container">
        <h2>Business Categories</h2>
        <p>Organize and manage business categories and their details here.</p>
        <button className="primary-btn">Add New Category</button>
      </div>
    </>
  );
}

export default BussCategories;
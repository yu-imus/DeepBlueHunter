import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Page.css';
import '../../styles/Trucking.css';

function Trucking() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-container">
        <h2>Trucking Management</h2>
        <p>Select an option below to manage vehicles or trips.</p>

        <div className="trucking-options">
          <button 
            className="primary-btn" 
            onClick={() => navigate('/vehicles')}
          >
            Vehicles
          </button>

          <button 
            className="primary-btn" 
            onClick={() => navigate('/trips')}
          >
            Trips
          </button>
        </div>
      </div>
    </>
  );
}

export default Trucking;
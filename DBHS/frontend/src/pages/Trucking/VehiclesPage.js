import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import VehicleCard from '../../components/VehicleCard';
import VehicleModal from '../../components/VehicleModal';
import { useOutletContext } from "react-router-dom";
import '../../styles/VehiclesPage.css';

function VehiclesPage( ) {
  const { user } = useOutletContext();
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  useEffect(() => {
    axios.get('/vehicles').then(res => setVehicles(res.data));
  }, []);

  const handleRegister = (vehicle, isEdit = false) => {
    if (isEdit) {
      setVehicles(vehicles.map(v => v._id === vehicle._id ? vehicle : v));
    } else {
      setVehicles([...vehicles, vehicle]);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/vehicles/${id}`);
    setVehicles(vehicles.filter(v => v._id !== id));
  };

  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle);
    setShowModal(true);
  };

  const handleCardClick = (vehicle) => {
    window.location.href = `/vehicle/${vehicle.vehicleId}`;
  };

  return (
    <div className="vehicles-page">
      <header>
        <h1>JL-U1 Enterprise Vehicles</h1>
        <div className="actions">
          <button onClick={() => { setEditVehicle(null); setShowModal(true); }}>
            Register New Vehicle
          </button>
        </div>
      </header>

      {vehicles.length === 0 ? (
        <div className="no-vehicles">No Registered Vehicles</div>
      ) : (
        <div className="vehicle-list">
          {vehicles.map(v => (
            <VehicleCard
              key={v._id}
              vehicle={v}
              onClick={handleCardClick}
              onDelete={handleDelete}
              onEdit={handleEdit}
              userRole={user?.role?.toLowerCase()} 
            />
          ))}
        </div>
      )}

      {showModal && (
        <VehicleModal
          onClose={() => setShowModal(false)}
          onRegister={handleRegister}
          editVehicle={editVehicle}
        />
      )}
    </div>
  );
}

export default VehiclesPage;

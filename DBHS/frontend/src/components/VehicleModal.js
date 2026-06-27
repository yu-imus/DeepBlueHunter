import { useState } from 'react';
import axios from '../api/axios';
import './modal.css';

function VehicleModal({ onClose, onRegister, editVehicle }) {
  const [form, setForm] = useState(
    editVehicle || { vehicleId: "", vehicleName: "", plateNumber: "" }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editVehicle) {
      const res = await axios.put(`/vehicles/${editVehicle._id}`, form);
      // Replace updated vehicle in list
      onRegister(res.data, true);
    } else {
      const res = await axios.post('/vehicles', form);
      onRegister(res.data, false);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editVehicle ? "Edit Vehicle" : "Register New Vehicle"}</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Vehicle ID" value={form.vehicleId}
            onChange={e => setForm({ ...form, vehicleId: e.target.value })} required />
          <input placeholder="Vehicle Name" value={form.vehicleName}
            onChange={e => setForm({ ...form, vehicleName: e.target.value })} required />
          <input placeholder="Plate Number" value={form.plateNumber}
            onChange={e => setForm({ ...form, plateNumber: e.target.value })} required />
          <div className="modal-actions">
            <button type="submit">{editVehicle ? "Save Changes" : "Register"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehicleModal;

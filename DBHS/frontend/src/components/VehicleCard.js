import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiTruckTrailerFill } from "react-icons/pi";
import { useState } from "react";
import "../styles/VehiclesPage.css";

function VehicleCard({ vehicle, onClick, onDelete, onEdit, userRole }) {
  const [showOptions, setShowOptions] = useState(false);
  console.log("VehicleCard userRole:", userRole);
  return (
    <div className="vehicle-card" onClick={() => onClick(vehicle)}>
      <div className="vehicle-icon">
        <PiTruckTrailerFill size={40} color="navy" />
      </div>
      <h3>{vehicle.vehicleName}</h3>
      <p>Plate: {vehicle.plateNumber}</p>

      {userRole === "admin" && (
        <div className="card-options">
          <IoMdInformationCircleOutline
            size={22}
            className="info-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          />
          {showOptions && (
            <div className="options-menu">
              <button onClick={(e) => { e.stopPropagation(); onEdit(vehicle); }}>Edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(vehicle._id); }}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VehicleCard;

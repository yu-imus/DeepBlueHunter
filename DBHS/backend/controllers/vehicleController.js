import Vehicle from '../models/Vehicle.js';

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

//Register Vehicle
export const registerVehicle = async (req, res) => {
  const { vehicleId, vehicleName, plateNumber } = req.body;
  try {
    const newVehicle = await Vehicle.create({ vehicleId, vehicleName, plateNumber });
    res.status(201).json(newVehicle);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: "Duplicate vehicleId or plateNumber" });
    } else {
      res.status(400).json({ error: "Error registering vehicle", details: err.message });
    }
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    await Vehicle.findByIdAndDelete(id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting vehicle", details: err.message });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleId, vehicleName, plateNumber } = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { vehicleId, vehicleName, plateNumber },
      { new: true, runValidators: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ error: "Error updating vehicle", details: err.message });
  }
};
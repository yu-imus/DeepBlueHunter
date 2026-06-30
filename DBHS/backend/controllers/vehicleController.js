import Vehicle from '../models/Vehicle.js';
import Entry from '../models/Entry.js';

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

// Get single vehicle by id
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Get entries for a vehicle filtered by month (month format: YYYY-MM)
export const getVehicleEntries = async (req, res) => {
  try {
    const { id } = req.params;
    const { month } = req.query;

    // Validate vehicle exists
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    let filter = { vehicle: id };

    if (month) {
      // month expected as "YYYY-MM"
      const [yearStr, monthStr] = month.split('-');
      const year = Number(yearStr);
      const monthIndex = Number(monthStr) - 1;
      const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
      const end = new Date(Date.UTC(year, monthIndex + 1, 1, 0, 0, 0));
      filter.date = { $gte: start, $lt: end };
    }

    const entries = await Entry.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries', details: err.message });
  }
};

// Create entry for a vehicle
export const createVehicleEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, details, tripIncome = 0, maintenanceCost = 0, date } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    const entry = await Entry.create({
      vehicle: id,
      type,
      details,
      tripIncome: Number(tripIncome) || 0,
      maintenanceCost: Number(maintenanceCost) || 0,
      date: date ? new Date(date) : new Date()
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create entry', details: err.message });
  }
};

// Delete entry
export const deleteVehicleEntry = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const entry = await Entry.findOneAndDelete({ _id: entryId, vehicle: id });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete entry', details: err.message });
  }
};

// Optional: update entry
export const updateVehicleEntry = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const { type, details, tripIncome, maintenanceCost, date } = req.body;
    const updated = await Entry.findOneAndUpdate(
      { _id: entryId, vehicle: id },
      { type, details, tripIncome, maintenanceCost, date },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Entry not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update entry', details: err.message });
  }
};
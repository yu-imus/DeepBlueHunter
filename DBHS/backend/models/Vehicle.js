import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  vehicleName: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true }
});

export default mongoose.model('Vehicle', vehicleSchema);
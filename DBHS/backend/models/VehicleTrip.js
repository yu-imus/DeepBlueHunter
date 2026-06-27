import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  tripId: String,
  route: String,
  tripDate: Date,
  rate: Number,
  vehicleId: String,
  driverId: String,
});
export default mongoose.model('VehicleTrip', tripSchema);
import mongoose from 'mongoose'

const metricsSchema = new mongoose.Schema({
  vehicleId: String,
  vehicleName: String,
  metricDetail: String,
  maintenance: Number,
  tripIncome: Number,
  netIncome: Number,
  monthlyMaintenance: Number,
  monthlyTripIncome: Number,
  monthlyNetIncome: Number,
});

export default mongoose.model('VehicleMetrics', metricsSchema);
import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  driverId: String,
  vehicleId: String,
  tripDate: Date,
  route: String,
  driverRate: Number,
  deductions: Number,
  deductionDetails: String,
  salary: Number,
});
export default mongoose.model('DriverPayroll', payrollSchema);
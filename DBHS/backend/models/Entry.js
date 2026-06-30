import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  type: { type: String, enum: ['trip', 'maintenance'], required: true },
  details: { type: String, default: '' },
  tripIncome: { type: Number, default: 0 },
  maintenanceCost: { type: Number, default: 0 },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Entry = mongoose.model('Entry', entrySchema);
export default Entry;

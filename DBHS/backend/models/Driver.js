import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema ({
    driverId: String,
    name: String,    
});

export default mongoose.model('Driver', driverSchema)
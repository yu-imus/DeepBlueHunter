import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // allow requests from React dev server

app.use('/api/users', authRoutes);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('DeepBlueHunter backend running...');
});

const uri = process.env.MONGO_URI;
async function connectMongo() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 5000;
connectMongo().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});



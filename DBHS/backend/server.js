const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

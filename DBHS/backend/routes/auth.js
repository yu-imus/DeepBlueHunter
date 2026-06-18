import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log('Register request:', req.body);
  
    try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password, role });
    const token = generateToken(user._id);
    res.status(201).json({
      message: 'User registered successfully',
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) 
      {return res
        .status(400)
        .json({ error: 'Please fill in all fields' });
      }
      const user = await User.findOne({email});


      if (!user || !(await user.matchPassword(password))) {
        return res
        .status(401)
        .json({ error: 'Invalid credentials' });
      }
      const token = generateToken(user._id);
      res.status(200).json({
        id:user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      }
      );
    
    // if (user.role !== role) {
    //   return res.status(400).json({ error: 'Role does not match assigned role' });
    // }
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

//Me
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user)
});

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}


export default router;

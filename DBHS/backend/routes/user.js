import express from 'express';
import multer from 'multer';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, role, yearJoined, birthdate } = req.body;
    const updateData = { name, role, yearJoined, birthdate };

    if (req.file) {
      updateData.profilePicture = req.file.path; // store file path
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
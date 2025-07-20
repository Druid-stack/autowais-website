const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Users route is working!' });
});

// GET /api/users - list all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/users - create a new user
router.post('/', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = new User({ email, password, name, role });
    await user.save();
    res.status(201).json({ message: 'User created', user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router; 
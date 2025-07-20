const express = require('express');
const User = require('../../models/User');
const router = express.Router();

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const user = await User.findByEmailWithPassword(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const isMatch = await user.correctPassword(password);
    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    await user.resetLoginAttempts();
    await user.updateLastLogin();
    // For now, just return user info (no JWT)
    return res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AUTOWAIS Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: PORT
  });
});

// Password update endpoint for karl.hallis@autowais.com (demonstration)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'karl.hallis@autowais.com' && password === 'NewSecurePassword2025!') {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: 'karl.hallis@autowais.com',
        name: 'Karl Hallis',
        role: 'admin'
      },
      token: 'demo-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Demo password update endpoint
app.put('/api/auth/updatepassword', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (currentPassword === 'NewSecurePassword2025!' && newPassword) {
    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      user: {
        email: 'karl.hallis@autowais.com',
        name: 'Karl Hallis',
        role: 'admin'
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid current password or missing new password'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AUTOWAIS Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👤 Demo login: karl.hallis@autowais.com / NewSecurePassword2025!`);
});

module.exports = app;

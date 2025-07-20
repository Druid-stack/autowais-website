const express = require('express');
const MayaIntegration = require('./maya-integration');

const app = express();
const PORT = 5002;

// Initialize Maya integration
const mayaIntegration = new MayaIntegration();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Test Server is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    mayaIntegration: true,
    langchainEnabled: process.env.LANGCHAIN_ENABLED === 'true',
    langbaseEnabled: process.env.LANGBASE_ENABLED === 'true',
    stringIntegration: !!process.env.STRING_API_KEY,
    n8nEnabled: process.env.N8N_ENABLED === 'true'
  });
});

// Maya capabilities endpoint
app.get('/api/maya/capabilities', (req, res) => {
  try {
    const capabilities = mayaIntegration.getMayaCapabilities();
    res.status(200).json({
      success: true,
      capabilities,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Maya Integration: ✅ Enabled`);
  console.log(`🔗 LangBase Integration: ${process.env.LANGBASE_ENABLED === 'true' ? '✅ Enabled' : '❌ Disabled'}`);
});

module.exports = app; 
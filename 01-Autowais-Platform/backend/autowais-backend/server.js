const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { StringAgentManager, AUTOWAIS_AGENT_TEMPLATES } = require('./string-integration');
const MayaIntegration = require('./maya-integration');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// AdminJS setup
const AdminJS = require('adminjs');
const { buildAuthenticatedRouter } = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const formidableMiddleware = require('express-formidable');
const User = require('./models/User');

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [
    { resource: User, options: { properties: { password: { isVisible: false } } } },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'AUTOWAIS',
    softwareBrothers: false,
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@autowais.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

const adminRouter = buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'supersecret',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Initialize String.com agent manager
const stringManager = new StringAgentManager();

// Initialize Maya integration
const mayaIntegration = new MayaIntegration();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// AdminJS router must come BEFORE body parsing middleware
app.use(adminJs.options.rootPath, adminRouter);

// Body parsing middleware (move AFTER AdminJS router)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection with graceful fallback
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.log('⚠️  MongoDB connection failed, but server will still start for API testing');
  console.log('❌ MongoDB error:', error.message);
  console.log('📝 To use full functionality, please set up MongoDB');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AUTOWAIS Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: PORT,
    stringIntegration: !!process.env.STRING_API_KEY,
    mayaIntegration: true,
    langchainEnabled: process.env.LANGCHAIN_ENABLED === 'true',
    langbaseEnabled: process.env.LANGBASE_ENABLED === 'true',
    n8nEnabled: process.env.N8N_ENABLED === 'true'
  });
});

// Maya Machine Integration Endpoints

// Initialize Maya platform
app.post('/api/maya/initialize', async (req, res) => {
  try {
    const result = await mayaIntegration.initialize();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get Maya machine capabilities
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

// Get Maya health status
app.get('/api/maya/health', async (req, res) => {
  try {
    const health = await mayaIntegration.getMayaHealth();
    res.status(200).json({
      success: true,
      health,
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

// Get Maya platform statistics
app.get('/api/maya/stats', (req, res) => {
  try {
    const stats = mayaIntegration.getMayaStats();
    res.status(200).json({
      success: true,
      stats,
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

// Get agent templates
app.get('/api/maya/templates', (req, res) => {
  try {
    const templates = mayaIntegration.getAgentTemplates();
    res.status(200).json({
      success: true,
      templates,
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

// Create agent from template
app.post('/api/maya/agents/template', async (req, res) => {
  try {
    const { templateName, customizations } = req.body;
    
    if (!templateName) {
      return res.status(400).json({
        success: false,
        message: 'templateName is required'
      });
    }

    const agent = await mayaIntegration.createAgentFromTemplate(templateName, customizations);
    res.status(201).json({
      success: true,
      agent,
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

// Create custom agent
app.post('/api/maya/agents', async (req, res) => {
  try {
    const agentConfig = req.body;
    
    if (!agentConfig.name || !agentConfig.description) {
      return res.status(400).json({
        success: false,
        message: 'name and description are required'
      });
    }

    const agent = await mayaIntegration.mayaPlatform.createAgent(agentConfig);
    res.status(201).json({
      success: true,
      agent,
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

// List all agents
app.get('/api/maya/agents', (req, res) => {
  try {
    const agents = mayaIntegration.listAgents();
    res.status(200).json({
      success: true,
      agents,
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

// Get agent details
app.get('/api/maya/agents/:agentId', (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = mayaIntegration.getAgent(agentId);
    res.status(200).json({
      success: true,
      agent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Execute agent
app.post('/api/maya/agents/:agentId/execute', async (req, res) => {
  try {
    const { agentId } = req.params;
    const { input, context } = req.body;
    
    if (!input) {
      return res.status(400).json({
        success: false,
        message: 'input is required'
      });
    }

    const result = await mayaIntegration.executeAgent(agentId, input, context);
    res.status(200).json({
      success: true,
      result,
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

// Update agent
app.put('/api/maya/agents/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const updates = req.body;
    
    const agent = await mayaIntegration.updateAgent(agentId, updates);
    res.status(200).json({
      success: true,
      agent,
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

// Delete agent
app.delete('/api/maya/agents/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await mayaIntegration.deleteAgent(agentId);
    res.status(200).json({
      success: true,
      result,
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

// Create Maya workflow
app.post('/api/maya/workflows', async (req, res) => {
  try {
    const workflowConfig = req.body;
    
    if (!workflowConfig.name || !workflowConfig.description) {
      return res.status(400).json({
        success: false,
        message: 'name and description are required'
      });
    }

    const workflow = await mayaIntegration.createMayaWorkflow(workflowConfig);
    res.status(201).json({
      success: true,
      workflow,
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

// Execute Maya workflow
app.post('/api/maya/workflows/:workflowId/execute', async (req, res) => {
  try {
    const { workflowId } = req.params;
    const { input, context } = req.body;
    
    const result = await mayaIntegration.executeMayaWorkflow(workflowId, input, context);
    res.status(200).json({
      success: true,
      result,
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

// String.com AI Agent Endpoints

// Execute an agent
app.post('/api/string/execute', async (req, res) => {
  try {
    const { agentId, input, context } = req.body;
    
    if (!agentId || !input) {
      return res.status(400).json({
        success: false,
        message: 'agentId and input are required'
      });
    }

    const result = await stringManager.executeAgent(agentId, input, context);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// List all agents
app.get('/api/string/agents', async (req, res) => {
  try {
    const result = await stringManager.listAgents();
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get agent details
app.get('/api/string/agents/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await stringManager.getAgent(agentId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Create a new agent
app.post('/api/string/agents', async (req, res) => {
  try {
    const agentConfig = req.body;
    
    if (!agentConfig.name || !agentConfig.description) {
      return res.status(400).json({
        success: false,
        message: 'name and description are required'
      });
    }

    const result = await stringManager.createAgent(agentConfig);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get agent templates
app.get('/api/string/templates', (req, res) => {
  res.status(200).json({
    success: true,
    templates: AUTOWAIS_AGENT_TEMPLATES,
    timestamp: new Date().toISOString()
  });
});

// Quick agent execution with templates
app.post('/api/string/quick-execute', async (req, res) => {
  try {
    const { template, input, context } = req.body;
    
    if (!template || !input) {
      return res.status(400).json({
        success: false,
        message: 'template and input are required'
      });
    }

    // For demo purposes, we'll simulate agent execution
    // In production, you'd use actual String.com agent IDs
    const demoResponse = {
      success: true,
      data: {
        output: `[${template.toUpperCase()}] Processed: ${input}`,
        actions: [`Executed ${template} template`],
        metadata: {
          template: template,
          processing_time: '2.3s'
        }
      },
      timestamp: new Date().toISOString()
    };

    res.status(200).json(demoResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
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

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(error.errors).map(err => err.message)
    });
  }
  
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AUTOWAIS Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Maya Integration: ✅ Enabled`);
  console.log(`🔗 String.com Integration: ${process.env.STRING_API_KEY ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`🔗 LangChain Integration: ${process.env.LANGCHAIN_ENABLED === 'true' ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`🔗 LangBase Integration: ${process.env.LANGBASE_ENABLED === 'true' ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`🔗 n8n Integration: ${process.env.N8N_ENABLED === 'true' ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`👤 Demo login: karl.hallis@autowais.com / NewSecurePassword2025!`);
});

module.exports = app;

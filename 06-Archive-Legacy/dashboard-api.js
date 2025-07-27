const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
let db;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/articshorex';

// Connect to MongoDB
MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('✅ Connected to MongoDB');
    db = client.db('articshorex');
    
    // Start monitoring for changes
    startChangeStreams();
  })
  .catch(error => {
    console.error('❌ MongoDB connection error:', error);
  });

// WebSocket connections
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('📱 Dashboard client connected');
  
  ws.on('close', () => {
    clients.delete(ws);
    console.log('📱 Dashboard client disconnected');
  });
});

// Broadcast to all connected clients
function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Dashboard API Routes

// Get dashboard metrics
app.get('/api/metrics', async (req, res) => {
  try {
    const timeRange = req.query.range || '24h';
    const metrics = await getDashboardMetrics(timeRange);
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get recent AI agent activity
app.get('/api/activity', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const activity = await getRecentActivity(limit);
    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Get performance analytics
app.get('/api/analytics', async (req, res) => {
  try {
    const timeRange = req.query.range || '24h';
    const analytics = await getAnalytics(timeRange);
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get customer insights
app.get('/api/insights', async (req, res) => {
  try {
    const timeRange = req.query.range || '24h';
    const insights = await getCustomerInsights(timeRange);
    res.json(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// Webhook endpoint for n8n workflow updates
app.post('/api/webhook/agent-activity', async (req, res) => {
  try {
    const activityData = req.body;
    
    // Store in database
    await db.collection('agent_activity').insertOne({
      ...activityData,
      timestamp: new Date(),
      processed: true
    });
    
    // Broadcast to dashboard clients
    broadcast({
      type: 'new_activity',
      data: activityData
    });
    
    console.log('📊 New agent activity recorded:', activityData.ticketId);
    res.json({ success: true, message: 'Activity recorded' });
  } catch (error) {
    console.error('Error recording activity:', error);
    res.status(500).json({ error: 'Failed to record activity' });
  }
});

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'articshorex-dashboard.html'));
});

// Dashboard data functions
async function getDashboardMetrics(timeRange) {
  const timeFilter = getTimeFilter(timeRange);
  
  const [
    totalReplies,
    avgResponseTime,
    resolutionRate,
    aiConfidence,
    customerSatisfaction,
    escalationRate
  ] = await Promise.all([
    db.collection('support_tickets').countDocuments(timeFilter),
    getAverageResponseTime(timeFilter),
    getResolutionRate(timeFilter),
    getAverageAIConfidence(timeFilter),
    getCustomerSatisfaction(timeFilter),
    getEscalationRate(timeFilter)
  ]);

  return {
    totalReplies,
    avgResponseTime,
    resolutionRate,
    aiConfidence,
    customerSatisfaction,
    escalationRate,
    timestamp: new Date()
  };
}

async function getRecentActivity(limit) {
  const activities = await db.collection('support_tickets')
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return activities.map(activity => ({
    id: activity._id,
    ticketId: activity.ticketId,
    customer: activity.customerName,
    email: activity.customerEmail,
    subject: activity.subject,
    category: activity.category,
    priority: activity.priority,
    status: activity.status,
    channel: activity.channel,
    sentiment: activity.aiAnalysis?.sentiment || 'neutral',
    intent: activity.aiAnalysis?.intent || 'unknown',
    confidence: activity.aiAnalysis?.confidence || 0,
    responseTime: activity.metadata?.responseTime || 'N/A',
    createdAt: activity.createdAt,
    resolvedAt: activity.resolvedAt,
    aiModel: activity.metadata?.aiModel || 'unknown'
  }));
}

async function getAnalytics(timeRange) {
  const timeFilter = getTimeFilter(timeRange);
  
  // Get hourly data for charts
  const hourlyData = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: {
          hour: { $hour: '$createdAt' },
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
        },
        count: { $sum: 1 },
        avgResponseTime: { $avg: { $toDouble: '$metadata.responseTime' } },
        avgConfidence: { $avg: '$aiAnalysis.confidence' }
      }
    },
    { $sort: { '_id.date': 1, '_id.hour': 1 } }
  ]).toArray();

  // Get intent distribution
  const intentData = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: '$aiAnalysis.intent',
        count: { $sum: 1 }
      }
    }
  ]).toArray();

  // Get sentiment distribution
  const sentimentData = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: '$aiAnalysis.sentiment',
        count: { $sum: 1 }
      }
    }
  ]).toArray();

  return {
    hourlyData,
    intentData,
    sentimentData,
    timestamp: new Date()
  };
}

async function getCustomerInsights(timeRange) {
  const timeFilter = getTimeFilter(timeRange);
  
  const [
    vipCustomers,
    newCustomers,
    repeatInquiries,
    bookingModifications
  ] = await Promise.all([
    db.collection('support_tickets').countDocuments({
      ...timeFilter,
      'customerVIP': true
    }),
    db.collection('support_tickets').countDocuments({
      ...timeFilter,
      'customerType': 'new'
    }),
    getRepeatInquiriesCount(timeFilter),
    db.collection('support_tickets').countDocuments({
      ...timeFilter,
      'category': 'booking-modification'
    })
  ]);

  return {
    vipCustomers,
    newCustomers,
    repeatInquiries,
    bookingModifications,
    timestamp: new Date()
  };
}

// Helper functions
function getTimeFilter(timeRange) {
  const now = new Date();
  let startTime;

  switch (timeRange) {
    case '1h':
      startTime = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case '24h':
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  return {
    createdAt: { $gte: startTime }
  };
}

async function getAverageResponseTime(timeFilter) {
  const result = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: null,
        avgResponseTime: { $avg: { $toDouble: '$metadata.responseTime' } }
      }
    }
  ]).toArray();

  return result.length > 0 ? result[0].avgResponseTime : 0;
}

async function getResolutionRate(timeFilter) {
  const total = await db.collection('support_tickets').countDocuments(timeFilter);
  const resolved = await db.collection('support_tickets').countDocuments({
    ...timeFilter,
    status: 'resolved'
  });

  return total > 0 ? (resolved / total) * 100 : 0;
}

async function getAverageAIConfidence(timeFilter) {
  const result = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: null,
        avgConfidence: { $avg: '$aiAnalysis.confidence' }
      }
    }
  ]).toArray();

  return result.length > 0 ? result[0].avgConfidence * 100 : 0;
}

async function getCustomerSatisfaction(timeFilter) {
  const result = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: null,
        avgSatisfaction: { $avg: '$satisfactionScore' }
      }
    }
  ]).toArray();

  return result.length > 0 ? result[0].avgSatisfaction : 0;
}

async function getEscalationRate(timeFilter) {
  const total = await db.collection('support_tickets').countDocuments(timeFilter);
  const escalated = await db.collection('support_tickets').countDocuments({
    ...timeFilter,
    escalationRequired: true
  });

  return total > 0 ? (escalated / total) * 100 : 0;
}

async function getRepeatInquiriesCount(timeFilter) {
  const result = await db.collection('support_tickets').aggregate([
    { $match: timeFilter },
    {
      $group: {
        _id: '$customerEmail',
        count: { $sum: 1 }
      }
    },
    {
      $match: { count: { $gt: 1 } }
    },
    {
      $count: 'repeatCustomers'
    }
  ]).toArray();

  return result.length > 0 ? result[0].repeatCustomers : 0;
}

// Change streams for real-time updates
function startChangeStreams() {
  if (!db) return;

  const changeStream = db.collection('support_tickets').watch();
  
  changeStream.on('change', (change) => {
    console.log('📊 Database change detected:', change.operationType);
    
    // Broadcast real-time update to dashboard
    broadcast({
      type: 'database_change',
      operation: change.operationType,
      data: change.fullDocument
    });
  });

  changeStream.on('error', (error) => {
    console.error('❌ Change stream error:', error);
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    mongodb: db ? 'connected' : 'disconnected',
    websocket_clients: clients.size
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 ArticShorex Dashboard API running on port ${PORT}`);
  console.log(`📊 Dashboard available at: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server running for real-time updates`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app; 
# ArticShorex AI Agent Dashboard Setup Guide

## 🚀 Overview

The ArticShorex AI Agent Dashboard provides real-time monitoring and analytics for your AI customer support system. This comprehensive dashboard tracks agent performance, customer interactions, response times, and provides actionable insights.

## 📋 Prerequisites

- Node.js 16+ and npm 8+
- MongoDB 4.4+ (local or cloud)
- n8n instance running
- OpenRouter API key
- SMTP credentials for email notifications

## 🛠️ Installation Steps

### 1. Dashboard Setup

```bash
# Create dashboard directory
mkdir articshorex-dashboard
cd articshorex-dashboard

# Copy dashboard files
cp ../articshorex-dashboard.html .
cp ../dashboard-api.js .
cp ../dashboard-package.json package.json

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 2. Environment Configuration

Create `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/articshorex
MONGODB_API_URL=http://localhost:5000/api/v1
MONGODB_API_KEY=your-mongodb-api-key

# Dashboard Configuration
DASHBOARD_SECRET=your-dashboard-secret-key
WEBSOCKET_PORT=3001

# Email Configuration (for alerts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@articshorex.com
SMTP_PASS=your-email-password

# Security
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:3000

# n8n Integration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/dashboard-updates
N8N_API_KEY=your-n8n-api-key

# OpenRouter Configuration
OPENROUTER_API_KEY=your-openrouter-api-key
```

### 3. Database Setup

```bash
# Start MongoDB (if running locally)
mongod --dbpath /path/to/your/db

# Create database and collections
node -e "
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
client.connect().then(() => {
  const db = client.db('articshorex');

  // Create collections
  db.createCollection('support_tickets');
  db.createCollection('agent_activity');
  db.createCollection('customer_data');
  db.createCollection('dashboard_metrics');

  // Create indexes for performance
  db.collection('support_tickets').createIndex({ 'createdAt': 1 });
  db.collection('support_tickets').createIndex({ 'customerEmail': 1 });
  db.collection('support_tickets').createIndex({ 'status': 1 });
  db.collection('agent_activity').createIndex({ 'timestamp': 1 });

  console.log('✅ Database setup complete');
  client.close();
});
"
```

### 4. n8n Workflow Integration

1. **Import the Dashboard-Integrated Workflow:**

   ```bash
   # Copy the workflow file
   cp ../arctic-shorex-dashboard-integrated-workflow.json .

   # Import into n8n via UI or API
   curl -X POST http://localhost:5678/api/v1/workflows \
     -H "Content-Type: application/json" \
     -H "X-N8N-API-KEY: your-n8n-api-key" \
     -d @arctic-shorex-dashboard-integrated-workflow.json
   ```

2. **Configure Webhook Endpoints:**
   - Dashboard Activity: `http://localhost:3000/api/webhook/agent-activity`
   - Completion Metrics: `http://localhost:3000/api/webhook/completion-metrics`

### 5. Start the Dashboard

```bash
# Development mode
npm run dev

# Production mode
npm start

# With PM2 (recommended for production)
npm install -g pm2
pm2 start dashboard-api.js --name "articshorex-dashboard"
pm2 startup
pm2 save
```

## 🔧 Configuration Options

### Dashboard Settings

The dashboard can be configured through environment variables:

```env
# Auto-refresh intervals (seconds)
DEFAULT_REFRESH_INTERVAL=30
MAX_REFRESH_INTERVAL=300

# Data retention (days)
METRICS_RETENTION_DAYS=90
ACTIVITY_RETENTION_DAYS=365

# Alert thresholds
RESPONSE_TIME_THRESHOLD=5.0
CONFIDENCE_THRESHOLD=0.85
ESCALATION_RATE_THRESHOLD=10

# UI Settings
DASHBOARD_THEME=dark
CHART_ANIMATION=true
REAL_TIME_UPDATES=true
```

### MongoDB API Configuration

If using MongoDB Atlas or external MongoDB:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/articshorex
MONGODB_API_URL=https://your-api-gateway.com/api/v1
MONGODB_API_KEY=your-secure-api-key
```

## 📊 Dashboard Features

### Real-time Metrics

- **Total Replies**: Count of AI responses
- **Average Response Time**: Mean processing time
- **Resolution Rate**: Percentage of resolved tickets
- **AI Confidence**: Average confidence scores
- **Customer Satisfaction**: Predicted satisfaction ratings
- **Escalation Rate**: Percentage requiring human intervention

### Analytics Charts

- **Reply Volume & Response Times**: Hourly trends
- **Intent Categories**: Distribution of inquiry types
- **Sentiment Analysis**: Customer emotion tracking
- **Performance Metrics**: AI model accuracy

### Activity Feed

- Real-time customer interactions
- Response details and confidence scores
- Channel-specific activity (email, webhook)
- Escalation alerts and priorities

### Customer Insights

- VIP customer tracking
- New vs returning customers
- Repeat inquiry patterns
- Booking modification requests

## 🔍 Monitoring & Alerts

### Health Checks

```bash
# Check dashboard health
curl http://localhost:3000/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "mongodb": "connected",
  "websocket_clients": 2
}
```

### Alert Configuration

Configure alerts in the dashboard settings:

```javascript
// Alert thresholds
const alertConfig = {
  responseTime: {
    warning: 3.0, // seconds
    critical: 5.0,
  },
  confidence: {
    warning: 0.8,
    critical: 0.7,
  },
  escalationRate: {
    warning: 15, // percentage
    critical: 25,
  },
};
```

## 🔐 Security Considerations

### Authentication

- JWT-based authentication for API endpoints
- Role-based access control
- Session management with secure cookies

### Data Protection

- Encrypted database connections
- API key rotation
- Rate limiting on endpoints
- CORS configuration

### Monitoring

- Request logging with Morgan
- Error tracking and alerting
- Performance monitoring
- Security audit logs

## 🚀 Production Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["node", "dashboard-api.js"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  dashboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/articshorex
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/articshorex-dashboard
server {
    listen 80;
    server_name dashboard.articshorex.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📱 Mobile Responsiveness

The dashboard is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- Large displays/TVs for monitoring rooms

## 🔧 Troubleshooting

### Common Issues

1. **Dashboard not loading**

   ```bash
   # Check if server is running
   curl http://localhost:3000/api/health

   # Check logs
   tail -f logs/dashboard.log
   ```

2. **MongoDB connection issues**

   ```bash
   # Test MongoDB connection
   node -e "
   const { MongoClient } = require('mongodb');
   MongoClient.connect('mongodb://localhost:27017')
     .then(() => console.log('✅ Connected'))
     .catch(err => console.error('❌ Error:', err));
   "
   ```

3. **WebSocket connection problems**
   ```bash
   # Check WebSocket server
   curl -H "Connection: Upgrade" \
        -H "Upgrade: websocket" \
        -H "Sec-WebSocket-Key: test" \
        -H "Sec-WebSocket-Version: 13" \
        http://localhost:3000/ws
   ```

### Performance Optimization

1. **Database Indexing**

   ```javascript
   // Create performance indexes
   db.support_tickets.createIndex({ createdAt: 1, status: 1 });
   db.support_tickets.createIndex({ customerEmail: 1, createdAt: -1 });
   db.agent_activity.createIndex({ timestamp: 1 });
   ```

2. **Caching Strategy**

   ```javascript
   // Redis caching for frequently accessed data
   const redis = require("redis");
   const client = redis.createClient();

   // Cache dashboard metrics for 30 seconds
   app.get("/api/metrics", cache(30), async (req, res) => {
     // metrics logic
   });
   ```

## 📞 Support

For support and questions:

- 📧 Email: support@articshorex.com
- 📱 Dashboard: http://localhost:3000
- 📚 Documentation: /docs
- 🐛 Issues: GitHub Issues

## 🎯 Next Steps

1. **Customize the dashboard** to match your branding
2. **Set up alerts** for critical metrics
3. **Configure backup** strategies
4. **Implement user authentication** if needed
5. **Add custom metrics** specific to your business

---

**Dashboard URL**: http://localhost:3000
**API Documentation**: http://localhost:3000/api/docs
**Health Check**: http://localhost:3000/api/health

The dashboard is now ready to monitor your ArticShorex AI Agent performance! 🚀

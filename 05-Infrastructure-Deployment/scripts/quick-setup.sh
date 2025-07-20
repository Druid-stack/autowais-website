#!/bin/bash

# ArticShorex AI Agent Dashboard Quick Setup Script
# This script sets up the complete dashboard and workflow environment

echo "🚀 ArticShorex AI Agent Dashboard Setup"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/articshorex
MONGODB_API_URL=http://localhost:5000/api/v1
MONGODB_API_KEY=your-mongodb-api-key-here

# Dashboard Configuration
DASHBOARD_SECRET=your-dashboard-secret-key-here
WEBSOCKET_PORT=3001

# Email Configuration (for alerts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@articshorex.com
SMTP_PASS=your-email-password-here

# Security
JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=http://localhost:3000

# n8n Integration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/dashboard-updates
N8N_API_KEY=your-n8n-api-key-here

# OpenRouter Configuration
OPENROUTER_API_KEY=your-openrouter-api-key-here
EOL
    echo "✅ .env file created. Please update with your actual API keys."
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install express cors mongodb ws dotenv helmet express-rate-limit compression morgan joi moment lodash uuid nodemailer bcryptjs jsonwebtoken --save

# Install dev dependencies
echo "📦 Installing dev dependencies..."
npm install nodemon jest supertest eslint prettier concurrently --save-dev

echo "✅ Dependencies installed successfully"

# Create package.json if it doesn't exist
if [ ! -f package.json ]; then
    echo "📝 Creating package.json..."
    cp dashboard-package.json package.json
    echo "✅ package.json created"
fi

# Run workflow validation
echo "🧪 Running workflow validation..."
node workflow-tester.js

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    echo "📊 MongoDB is available"
    if pgrep mongod > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Start it with: mongod"
    fi
else
    echo "⚠️  MongoDB is not installed locally. Using remote MongoDB or MongoDB Atlas."
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📋 Next Steps:"
echo "1. Update .env file with your actual API keys"
echo "2. Start MongoDB if using local instance"
echo "3. Start the dashboard: npm start"
echo "4. Import the workflow into n8n:"
echo "   - File: arctic-shorex-dashboard-integrated-workflow.json"
echo "   - Dashboard webhook: http://localhost:3000/api/webhook/agent-activity"
echo ""
echo "📊 Dashboard will be available at: http://localhost:3000"
echo "🔧 API health check: http://localhost:3000/api/health"
echo ""
echo "📚 Documentation:"
echo "- Setup Guide: DASHBOARD-SETUP-GUIDE.md"
echo "- Test Report: workflow-test-report.json"
echo ""
echo "🚀 Ready to deploy your AI agent dashboard!" 
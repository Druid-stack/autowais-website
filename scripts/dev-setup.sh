#!/bin/bash

# AUTOWAIS Development Setup Script
echo "🚀 Setting up AUTOWAIS development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📄 Creating .env.local file..."
    cat > .env.local << EOL
# AUTOWAIS Environment Variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
EOL
    echo "✅ .env.local created. Please update with your values."
fi

# Clean any existing build
echo "🧹 Cleaning previous builds..."
npm run clean

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🔧 Running linter..."
npm run lint

echo "✅ Development environment setup complete!"
echo "🎯 Run 'npm run dev' to start the development server" 
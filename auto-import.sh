#!/bin/bash

echo "🚀 Arctic Shorex Workflow Auto-Import"
echo "====================================="
echo ""

# Check if n8n is running
if ! lsof -i :5678 | grep -q LISTEN; then
    echo "❌ n8n is not running. Please start n8n first."
    exit 1
fi

echo "✅ n8n is running on port 5678"

# Create the workflow using a direct JSON payload
echo "📤 Attempting to create workflow..."

# Method 1: Try to import via file copy to browser downloads
echo "📁 Copying workflow file to Downloads for easy access..."
cp arctic-shorex-fixed-workflow.json ~/Downloads/

# Method 2: Create a simple curl command to test the endpoint
echo "🧪 Testing webhook endpoint creation..."

# First, let's try to create a simple test
cat > test-workflow.json << 'EOF'
{
  "name": "Arctic Shorex Test",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "arctic-test",
        "options": {}
      },
      "id": "test-webhook",
      "name": "Test Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [300, 200]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "Hello from Arctic Shorex! Your request was received.",
        "options": {}
      },
      "id": "test-response",
      "name": "Test Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [500, 200]
    }
  ],
  "connections": {
    "Test Webhook": {
      "main": [
        [
          {
            "node": "Test Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  }
}
EOF

echo ""
echo "📋 Import Instructions:"
echo "1. Open n8n: http://localhost:5678"
echo "2. Click 'Create workflow'"
echo "3. Click menu (⋮) → 'Import from file'"
echo "4. Choose file from Downloads: arctic-shorex-fixed-workflow.json"
echo "5. Click 'Import'"
echo "6. Click 'Save'"
echo "7. Toggle 'Active' switch"
echo ""
echo "🧪 Test command after activation:"
echo "curl -X POST http://localhost:5678/webhook/arctic-support \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"message\": \"I want to see the Northern Lights!\"}'"
echo ""
echo "🌐 Opening n8n in browser..."
open http://localhost:5678

echo ""
echo "✅ Files ready:"
echo "   - Main workflow: arctic-shorex-fixed-workflow.json"
echo "   - In Downloads: ~/Downloads/arctic-shorex-fixed-workflow.json"
echo "   - Test workflow: test-workflow.json" 
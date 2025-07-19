#!/bin/bash

echo "🔧 Setting up n8n MCP Control System"
echo "===================================="
echo ""

# Check if n8n is running
if ! lsof -i :5678 | grep -q LISTEN; then
    echo "❌ n8n is not running. Starting n8n..."
    n8n start &
    sleep 5
fi

echo "✅ n8n is running on port 5678"

# Create API key setup instructions
echo ""
echo "🔑 API Key Setup Required:"
echo "1. Go to: http://localhost:5678/settings/api"
echo "2. Click 'Create API Key'"
echo "3. Name: 'MCP Control Key'"
echo "4. Copy the generated key"
echo ""

# Create MCP configuration
echo "📝 Creating MCP configuration..."

cat > ~/.n8n/mcp-config.json << 'EOF'
{
  "mcpServers": {
    "n8n-management": {
      "command": "node",
      "args": ["--experimental-modules", "mcp-n8n-server.js"],
      "env": {
        "N8N_API_URL": "http://localhost:5678/api/v1",
        "N8N_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
EOF

# Create workflow deployment script
cat > deploy-workflow.js << 'EOF'
const fs = require('fs');
const https = require('https');
const http = require('http');

class N8nWorkflowManager {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async createWorkflow(workflowData) {
        const options = {
            hostname: 'localhost',
            port: 5678,
            path: '/api/v1/workflows',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-N8N-API-KEY': this.apiKey
            }
        };

        return new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                });
            });

            req.on('error', reject);
            req.write(JSON.stringify(workflowData));
            req.end();
        });
    }

    async activateWorkflow(workflowId) {
        const options = {
            hostname: 'localhost',
            port: 5678,
            path: `/api/v1/workflows/${workflowId}/activate`,
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': this.apiKey
            }
        };

        return new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => resolve(data));
            });

            req.on('error', reject);
            req.end();
        });
    }

    async deployArcticshorexWorkflow() {
        const workflowData = JSON.parse(fs.readFileSync('arctic-shorex-fixed-workflow.json', 'utf8'));
        
        try {
            console.log('🚀 Deploying Arctic Shorex workflow...');
            const result = await this.createWorkflow(workflowData);
            console.log('✅ Workflow created:', result.id);
            
            console.log('🔄 Activating workflow...');
            await this.activateWorkflow(result.id);
            console.log('✅ Workflow activated!');
            
            return result;
        } catch (error) {
            console.error('❌ Deployment failed:', error);
            throw error;
        }
    }
}

// Export for use
if (require.main === module) {
    const apiKey = process.env.N8N_API_KEY;
    if (!apiKey) {
        console.error('❌ N8N_API_KEY environment variable not set');
        process.exit(1);
    }

    const manager = new N8nWorkflowManager('http://localhost:5678/api/v1', apiKey);
    manager.deployArcticshorexWorkflow()
        .then(() => console.log('🎉 Arctic Shorex workflow deployed successfully!'))
        .catch(console.error);
}

module.exports = N8nWorkflowManager;
EOF

# Create test script
cat > test-workflow.js << 'EOF'
const http = require('http');

function testArcticshorexWorkflow() {
    const testData = JSON.stringify({
        name: "John Doe",
        email: "john@example.com", 
        message: "I want to see the Northern Lights!"
    });

    const options = {
        hostname: 'localhost',
        port: 5678,
        path: '/webhook/arctic-support',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(testData)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('🧪 Test Response:');
            console.log(JSON.stringify(JSON.parse(data), null, 2));
        });
    });

    req.on('error', (error) => {
        console.error('❌ Test failed:', error);
    });

    req.write(testData);
    req.end();
}

testArcticshorexWorkflow();
EOF

echo ""
echo "📋 Setup Complete! Next steps:"
echo ""
echo "1. Create API Key:"
echo "   - Go to: http://localhost:5678/settings/api"
echo "   - Create new API key"
echo "   - Copy the key"
echo ""
echo "2. Set API Key:"
echo "   export N8N_API_KEY='your_api_key_here'"
echo ""
echo "3. Deploy workflow:"
echo "   node deploy-workflow.js"
echo ""
echo "4. Test workflow:"
echo "   node test-workflow.js"
echo ""
echo "🌐 Opening n8n settings..."
open "http://localhost:5678/settings/api"

echo ""
echo "✅ Files created:"
echo "   - deploy-workflow.js (workflow deployment)"
echo "   - test-workflow.js (workflow testing)"
echo "   - ~/.n8n/mcp-config.json (MCP configuration)" 
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

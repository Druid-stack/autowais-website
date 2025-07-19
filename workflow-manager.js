const http = require('http');
const fs = require('fs');

class N8nWorkflowManager {
    constructor() {
        this.baseUrl = 'http://localhost:5678';
        this.apiKey = process.env.N8N_API_KEY || 'temp-key';
    }

    async makeRequest(path, method = 'GET', data = null) {
        const options = {
            hostname: 'localhost',
            port: 5678,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (this.apiKey && this.apiKey !== 'temp-key') {
            options.headers['X-N8N-API-KEY'] = this.apiKey;
        }

        return new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => responseData += chunk);
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(responseData);
                        resolve({ status: res.statusCode, data: parsed });
                    } catch (e) {
                        resolve({ status: res.statusCode, data: responseData });
                    }
                });
            });

            req.on('error', reject);
            
            if (data) {
                req.write(JSON.stringify(data));
            }
            req.end();
        });
    }

    async listWorkflows() {
        console.log('📋 Listing workflows...');
        const response = await this.makeRequest('/api/v1/workflows');
        
        if (response.status === 200) {
            const workflows = response.data.data || response.data;
            console.log(`Found ${workflows.length} workflows:`);
            workflows.forEach(wf => {
                console.log(`  - ${wf.name} (ID: ${wf.id}) - ${wf.active ? '✅ Active' : '❌ Inactive'}`);
            });
            return workflows;
        } else {
            console.log('❌ Failed to list workflows:', response.data);
            return [];
        }
    }

    async createWorkflow(workflowData) {
        console.log('🚀 Creating workflow...');
        const response = await this.makeRequest('/api/v1/workflows', 'POST', workflowData);
        
        if (response.status === 201 || response.status === 200) {
            console.log('✅ Workflow created successfully');
            return response.data;
        } else {
            console.log('❌ Failed to create workflow:', response.data);
            throw new Error('Workflow creation failed');
        }
    }

    async activateWorkflow(workflowId) {
        console.log(`🔄 Activating workflow ${workflowId}...`);
        const response = await this.makeRequest(`/api/v1/workflows/${workflowId}/activate`, 'POST');
        
        if (response.status === 200) {
            console.log('✅ Workflow activated successfully');
            return response.data;
        } else {
            console.log('❌ Failed to activate workflow:', response.data);
            throw new Error('Workflow activation failed');
        }
    }

    async testWorkflow() {
        console.log('🧪 Testing Arctic Shorex workflow...');
        
        const testData = {
            name: "John Doe",
            email: "john@example.com",
            message: "I want to see the Northern Lights!"
        };

        const response = await this.makeRequest('/webhook/arctic-support', 'POST', testData);
        
        if (response.status === 200) {
            console.log('✅ Test successful!');
            console.log('Response:', JSON.stringify(response.data, null, 2));
        } else {
            console.log('❌ Test failed:', response.data);
        }
        
        return response;
    }

    async deployArcticshorexWorkflow() {
        try {
            // First, list existing workflows
            const existingWorkflows = await this.listWorkflows();
            
            // Check if Arctic Shorex workflow already exists
            const existingWorkflow = existingWorkflows.find(wf => 
                wf.name.includes('Arctic Shorex') || wf.name.includes('arctic-shorex')
            );

            if (existingWorkflow) {
                console.log('🔄 Arctic Shorex workflow already exists, activating...');
                await this.activateWorkflow(existingWorkflow.id);
                return existingWorkflow;
            }

            // Load workflow data
            const workflowData = JSON.parse(fs.readFileSync('arctic-shorex-fixed-workflow.json', 'utf8'));
            
            // Create new workflow
            const newWorkflow = await this.createWorkflow(workflowData);
            
            // Activate the workflow
            if (newWorkflow.id) {
                await this.activateWorkflow(newWorkflow.id);
            }
            
            return newWorkflow;
            
        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            throw error;
        }
    }

    async fullDeployAndTest() {
        console.log('🎯 Full Arctic Shorex Deployment & Test');
        console.log('=====================================');
        
        try {
            // Deploy workflow
            const workflow = await this.deployArcticshorexWorkflow();
            
            // Wait a moment for activation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Test the workflow
            await this.testWorkflow();
            
            console.log('🎉 Arctic Shorex workflow is fully deployed and tested!');
            
        } catch (error) {
            console.error('❌ Full deployment failed:', error.message);
        }
    }
}

// Command line interface
const command = process.argv[2];
const manager = new N8nWorkflowManager();

switch (command) {
    case 'list':
        manager.listWorkflows();
        break;
    case 'deploy':
        manager.deployArcticshorexWorkflow();
        break;
    case 'test':
        manager.testWorkflow();
        break;
    case 'full':
    default:
        manager.fullDeployAndTest();
        break;
}

module.exports = N8nWorkflowManager; 
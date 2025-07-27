const { MockDataGenerator, MockAPIServer, testScenarios } = require('./dashboard-mock-data');
const fs = require('fs').promises;
const path = require('path');

class WorkflowTester {
  constructor() {
    this.mockServer = new MockAPIServer();
    this.testResults = [];
    this.workflow = null;
    this.errors = [];
    this.warnings = [];
    this.performance = {};
  }

  async loadWorkflow(filePath = './arctic-shorex-dashboard-integrated-workflow.json') {
    try {
      const workflowData = await fs.readFile(filePath, 'utf8');
      this.workflow = JSON.parse(workflowData);
      console.log('✅ Workflow loaded successfully');
      return true;
    } catch (error) {
      this.errors.push(`Failed to load workflow: ${error.message}`);
      console.error('❌ Failed to load workflow:', error.message);
      return false;
    }
  }

  validateWorkflowStructure() {
    console.log('\n🔍 Validating workflow structure...');
    
    if (!this.workflow) {
      this.errors.push('No workflow loaded');
      return false;
    }

    // Check required fields
    const requiredFields = ['name', 'nodes', 'connections'];
    for (const field of requiredFields) {
      if (!this.workflow[field]) {
        this.errors.push(`Missing required field: ${field}`);
      }
    }

    // Validate nodes
    if (!Array.isArray(this.workflow.nodes)) {
      this.errors.push('Nodes must be an array');
      return false;
    }

    if (this.workflow.nodes.length === 0) {
      this.errors.push('Workflow must contain at least one node');
      return false;
    }

    // Check each node
    this.workflow.nodes.forEach((node, index) => {
      this.validateNode(node, index);
    });

    // Validate connections
    this.validateConnections();

    console.log(`✅ Structure validation complete: ${this.errors.length} errors, ${this.warnings.length} warnings`);
    return this.errors.length === 0;
  }

  validateNode(node, index) {
    const requiredNodeFields = ['id', 'name', 'type', 'typeVersion', 'position', 'parameters'];
    
    for (const field of requiredNodeFields) {
      if (!node[field] && field !== 'parameters') {
        this.errors.push(`Node ${index} missing required field: ${field}`);
      }
    }

    // Check node ID uniqueness
    const duplicateIds = this.workflow.nodes.filter(n => n.id === node.id);
    if (duplicateIds.length > 1) {
      this.errors.push(`Duplicate node ID: ${node.id}`);
    }

    // Validate specific node types
    this.validateNodeType(node, index);
  }

  validateNodeType(node, index) {
    switch (node.type) {
      case 'n8n-nodes-base.webhook':
        this.validateWebhookNode(node, index);
        break;
      case 'n8n-nodes-base.emailReadImap':
        this.validateEmailNode(node, index);
        break;
      case 'n8n-nodes-base.httpRequest':
        this.validateHttpRequestNode(node, index);
        break;
      case 'n8n-nodes-base.openAi':
        this.validateOpenAINode(node, index);
        break;
      case 'n8n-nodes-base.code':
        this.validateCodeNode(node, index);
        break;
      case 'n8n-nodes-base.emailSend':
        this.validateEmailSendNode(node, index);
        break;
      case 'n8n-nodes-base.merge':
        this.validateMergeNode(node, index);
        break;
      case 'n8n-nodes-base.if':
        this.validateIfNode(node, index);
        break;
      default:
        this.warnings.push(`Unknown node type: ${node.type} in node ${index}`);
    }
  }

  validateWebhookNode(node, index) {
    if (!node.parameters.path) {
      this.errors.push(`Webhook node ${index} missing path parameter`);
    }
    if (node.parameters.path && !node.parameters.path.startsWith('/')) {
      this.warnings.push(`Webhook node ${index} path should start with /`);
    }
  }

  validateEmailNode(node, index) {
    if (!node.credentials || !node.credentials.imap) {
      this.errors.push(`Email node ${index} missing IMAP credentials`);
    }
    if (!node.parameters.pollTimes) {
      this.warnings.push(`Email node ${index} missing poll times configuration`);
    }
  }

  validateHttpRequestNode(node, index) {
    if (!node.parameters.url) {
      this.errors.push(`HTTP Request node ${index} missing URL parameter`);
    }
    
    // Check for environment variables
    if (node.parameters.url && node.parameters.url.includes('$env.')) {
      const envVars = node.parameters.url.match(/\$env\.([A-Z_]+)/g);
      if (envVars) {
        envVars.forEach(envVar => {
          this.warnings.push(`HTTP Request node ${index} uses environment variable: ${envVar}`);
        });
      }
    }

    // Check authentication
    if (node.parameters.authentication === 'genericCredentialType') {
      if (!node.parameters.genericAuthType) {
        this.errors.push(`HTTP Request node ${index} missing auth type`);
      }
    }
  }

  validateOpenAINode(node, index) {
    if (!node.parameters.model) {
      this.errors.push(`OpenAI node ${index} missing model parameter`);
    }
    if (!node.parameters.prompt) {
      this.errors.push(`OpenAI node ${index} missing prompt parameter`);
    }
    if (!node.credentials || !node.credentials.openAiApi) {
      this.errors.push(`OpenAI node ${index} missing API credentials`);
    }
  }

  validateCodeNode(node, index) {
    if (!node.parameters.jsCode) {
      this.errors.push(`Code node ${index} missing JavaScript code`);
    }
    
    // Basic syntax validation
    if (node.parameters.jsCode) {
      try {
        new Function(node.parameters.jsCode);
      } catch (error) {
        this.errors.push(`Code node ${index} syntax error: ${error.message}`);
      }
    }
  }

  validateEmailSendNode(node, index) {
    const requiredParams = ['fromEmail', 'toEmail', 'subject', 'message'];
    requiredParams.forEach(param => {
      if (!node.parameters[param]) {
        this.errors.push(`Email Send node ${index} missing ${param} parameter`);
      }
    });
    
    if (!node.credentials || !node.credentials.smtp) {
      this.errors.push(`Email Send node ${index} missing SMTP credentials`);
    }
  }

  validateMergeNode(node, index) {
    if (!node.parameters.merge) {
      this.warnings.push(`Merge node ${index} using default merge strategy`);
    }
  }

  validateIfNode(node, index) {
    if (!node.parameters.conditions) {
      this.errors.push(`If node ${index} missing conditions`);
    }
  }

  validateConnections() {
    console.log('\n🔗 Validating connections...');
    
    if (!this.workflow.connections || typeof this.workflow.connections !== 'object') {
      this.errors.push('Invalid connections structure');
      return;
    }

    // Check if all referenced nodes exist
    const nodeIds = this.workflow.nodes.map(node => node.id);
    
    Object.keys(this.workflow.connections).forEach(sourceNodeId => {
      if (!nodeIds.includes(sourceNodeId)) {
        this.errors.push(`Connection references non-existent source node: ${sourceNodeId}`);
      }
      
      const connections = this.workflow.connections[sourceNodeId];
      if (connections.main && Array.isArray(connections.main)) {
        connections.main.forEach((outputConnections, outputIndex) => {
          if (Array.isArray(outputConnections)) {
            outputConnections.forEach(connection => {
              if (!nodeIds.includes(connection.node)) {
                this.errors.push(`Connection references non-existent target node: ${connection.node}`);
              }
            });
          }
        });
      }
    });

    // Check for orphaned nodes (nodes with no connections)
    const connectedNodes = new Set();
    Object.values(this.workflow.connections).forEach(nodeConnections => {
      if (nodeConnections.main) {
        nodeConnections.main.forEach(outputConnections => {
          if (Array.isArray(outputConnections)) {
            outputConnections.forEach(connection => {
              connectedNodes.add(connection.node);
            });
          }
        });
      }
    });

    // Add source nodes
    Object.keys(this.workflow.connections).forEach(nodeId => {
      connectedNodes.add(nodeId);
    });

    // Check for trigger nodes (should not be connected as targets except for specific cases)
    const triggerTypes = ['n8n-nodes-base.webhook', 'n8n-nodes-base.emailReadImap'];
    const triggerNodes = this.workflow.nodes.filter(node => triggerTypes.includes(node.type));
    
    triggerNodes.forEach(trigger => {
      if (!this.workflow.connections[trigger.id]) {
        this.warnings.push(`Trigger node ${trigger.id} has no outgoing connections`);
      }
    });

    console.log('✅ Connection validation complete');
  }

  async runWorkflowTests() {
    console.log('\n🧪 Running workflow tests...');
    
    const testResults = [];
    
    for (const scenario of testScenarios) {
      console.log(`\n📋 Testing scenario: ${scenario.name}`);
      
      const startTime = Date.now();
      const result = await this.simulateWorkflowExecution(scenario);
      const endTime = Date.now();
      
      result.executionTime = endTime - startTime;
      result.scenarioName = scenario.name;
      
      testResults.push(result);
      
      if (result.success) {
        console.log(`✅ ${scenario.name} - PASSED (${result.executionTime}ms)`);
      } else {
        console.log(`❌ ${scenario.name} - FAILED: ${result.error}`);
      }
    }
    
    this.testResults = testResults;
    return testResults;
  }

  async simulateWorkflowExecution(scenario) {
    try {
      // Generate test data
      const mockData = new MockDataGenerator();
      const ticket = mockData.generateMockTicket(scenario.input.customerEmail, scenario.input.scenario);
      
      // Simulate customer lookup
      const customerData = await this.mockServer.queryCustomers(ticket.customerEmail);
      if (customerData.error) {
        return { success: false, error: 'Customer not found' };
      }
      
      // Simulate AI processing
      const aiResponse = mockData.generateMockAIResponse(ticket);
      
      // Validate against expected output
      const validation = this.validateScenarioOutput(aiResponse, scenario.expectedOutput);
      
      // Simulate database operations
      const ticketCreated = await this.mockServer.createTicket({
        ...ticket,
        aiAnalysis: aiResponse,
        status: 'resolved'
      });
      
      const activityRecorded = await this.mockServer.recordActivity({
        ticketId: ticket.ticketId,
        customerEmail: ticket.customerEmail,
        action: 'ai_response_generated',
        confidence: aiResponse.confidence,
        escalationRequired: aiResponse.escalationRequired
      });
      
      return {
        success: validation.success,
        error: validation.error,
        data: {
          ticket,
          customerData,
          aiResponse,
          ticketCreated,
          activityRecorded
        },
        metrics: {
          confidence: aiResponse.confidence,
          escalationRequired: aiResponse.escalationRequired,
          responseTime: Math.random() * 2 + 0.5 // Simulated response time
        }
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  validateScenarioOutput(aiResponse, expectedOutput) {
    const errors = [];
    
    // Check intent
    if (expectedOutput.intent && aiResponse.intent !== expectedOutput.intent) {
      errors.push(`Expected intent ${expectedOutput.intent}, got ${aiResponse.intent}`);
    }
    
    // Check escalation
    if (expectedOutput.escalationRequired !== undefined && 
        aiResponse.escalationRequired !== expectedOutput.escalationRequired) {
      errors.push(`Expected escalation ${expectedOutput.escalationRequired}, got ${aiResponse.escalationRequired}`);
    }
    
    // Check confidence range
    if (expectedOutput.confidence) {
      const { min, max } = expectedOutput.confidence;
      if (aiResponse.confidence < min || aiResponse.confidence > max) {
        errors.push(`Confidence ${aiResponse.confidence} outside expected range ${min}-${max}`);
      }
    }
    
    // Check priority
    if (expectedOutput.priority && aiResponse.priority !== expectedOutput.priority) {
      errors.push(`Expected priority ${expectedOutput.priority}, got ${aiResponse.priority}`);
    }
    
    // Check sentiment
    if (expectedOutput.sentiment && aiResponse.sentiment !== expectedOutput.sentiment) {
      errors.push(`Expected sentiment ${expectedOutput.sentiment}, got ${aiResponse.sentiment}`);
    }
    
    return {
      success: errors.length === 0,
      error: errors.length > 0 ? errors.join('; ') : null
    };
  }

  checkEnvironmentVariables() {
    console.log('\n🔧 Checking environment variables...');
    
    const requiredEnvVars = [
      'MONGODB_API_URL',
      'MONGODB_API_KEY',
      'OPENROUTER_API_KEY'
    ];
    
    const missingVars = [];
    
    requiredEnvVars.forEach(envVar => {
      if (!process.env[envVar]) {
        missingVars.push(envVar);
      }
    });
    
    if (missingVars.length > 0) {
      this.warnings.push(`Missing environment variables: ${missingVars.join(', ')}`);
      console.log(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
    } else {
      console.log('✅ All required environment variables are set');
    }
    
    return missingVars.length === 0;
  }

  analyzePerformance() {
    console.log('\n📊 Analyzing performance...');
    
    if (this.testResults.length === 0) {
      console.log('No test results to analyze');
      return;
    }
    
    const executionTimes = this.testResults.map(result => result.executionTime);
    const avgExecutionTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;
    const maxExecutionTime = Math.max(...executionTimes);
    const minExecutionTime = Math.min(...executionTimes);
    
    const successRate = (this.testResults.filter(r => r.success).length / this.testResults.length) * 100;
    
    this.performance = {
      avgExecutionTime,
      maxExecutionTime,
      minExecutionTime,
      successRate,
      totalTests: this.testResults.length
    };
    
    console.log(`📈 Performance Metrics:`);
    console.log(`   Average Execution Time: ${avgExecutionTime.toFixed(2)}ms`);
    console.log(`   Max Execution Time: ${maxExecutionTime}ms`);
    console.log(`   Min Execution Time: ${minExecutionTime}ms`);
    console.log(`   Success Rate: ${successRate.toFixed(1)}%`);
    console.log(`   Total Tests: ${this.testResults.length}`);
    
    // Performance warnings
    if (avgExecutionTime > 5000) {
      this.warnings.push('Average execution time is high (>5s)');
    }
    if (successRate < 90) {
      this.warnings.push('Success rate is below 90%');
    }
  }

  generateReport() {
    console.log('\n📋 Generating comprehensive test report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      workflow: {
        name: this.workflow?.name || 'Unknown',
        nodeCount: this.workflow?.nodes?.length || 0,
        connectionCount: Object.keys(this.workflow?.connections || {}).length
      },
      validation: {
        structureValid: this.errors.length === 0,
        errors: this.errors,
        warnings: this.warnings
      },
      testing: {
        scenarios: this.testResults.length,
        passed: this.testResults.filter(r => r.success).length,
        failed: this.testResults.filter(r => !r.success).length,
        results: this.testResults
      },
      performance: this.performance,
      recommendations: this.generateRecommendations()
    };
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('🔴 Fix all validation errors before deployment');
    }
    
    if (this.warnings.length > 0) {
      recommendations.push('🟡 Review and address warnings for optimal performance');
    }
    
    if (this.performance.avgExecutionTime > 3000) {
      recommendations.push('⚡ Consider optimizing workflow for better response times');
    }
    
    if (this.performance.successRate < 95) {
      recommendations.push('🎯 Improve error handling for higher success rates');
    }
    
    if (this.testResults.some(r => r.data?.aiResponse?.confidence < 0.8)) {
      recommendations.push('🤖 Review AI prompts for better confidence scores');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Workflow is ready for deployment!');
    }
    
    return recommendations;
  }

  async saveReport(filename = 'workflow-test-report.json') {
    const report = this.generateReport();
    
    try {
      await fs.writeFile(filename, JSON.stringify(report, null, 2));
      console.log(`📄 Report saved to ${filename}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to save report:', error.message);
      return false;
    }
  }

  displaySummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 WORKFLOW TEST SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`\n📊 Structure Validation:`);
    console.log(`   Errors: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    console.log(`   Status: ${this.errors.length === 0 ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (this.testResults.length > 0) {
      console.log(`\n🧪 Scenario Testing:`);
      console.log(`   Total Tests: ${this.testResults.length}`);
      console.log(`   Passed: ${this.testResults.filter(r => r.success).length}`);
      console.log(`   Failed: ${this.testResults.filter(r => !r.success).length}`);
      console.log(`   Success Rate: ${this.performance.successRate?.toFixed(1)}%`);
      
      console.log(`\n⚡ Performance:`);
      console.log(`   Avg Response Time: ${this.performance.avgExecutionTime?.toFixed(2)}ms`);
      console.log(`   Max Response Time: ${this.performance.maxExecutionTime}ms`);
    }
    
    console.log(`\n💡 Recommendations:`);
    const recommendations = this.generateRecommendations();
    recommendations.forEach(rec => console.log(`   ${rec}`));
    
    console.log('\n' + '='.repeat(60));
    
    const overallStatus = this.errors.length === 0 && 
                         this.testResults.every(r => r.success) ? 
                         '🟢 READY FOR DEPLOYMENT' : 
                         '🔴 NEEDS ATTENTION';
    
    console.log(`🎯 OVERALL STATUS: ${overallStatus}`);
    console.log('='.repeat(60));
  }
}

// Main execution function
async function runWorkflowTests() {
  console.log('🚀 Starting ArticShorex Workflow Testing...\n');
  
  const tester = new WorkflowTester();
  
  // Load workflow
  const loaded = await tester.loadWorkflow();
  if (!loaded) {
    console.log('❌ Cannot proceed without workflow file');
    return;
  }
  
  // Check environment variables
  tester.checkEnvironmentVariables();
  
  // Validate structure
  tester.validateWorkflowStructure();
  
  // Run tests
  await tester.runWorkflowTests();
  
  // Analyze performance
  tester.analyzePerformance();
  
  // Display summary
  tester.displaySummary();
  
  // Save report
  await tester.saveReport();
  
  console.log('\n🎉 Testing complete! Check workflow-test-report.json for detailed results.');
}

// Export for use in other modules
module.exports = { WorkflowTester, runWorkflowTests };

// Run if called directly
if (require.main === module) {
  runWorkflowTests().catch(console.error);
} 
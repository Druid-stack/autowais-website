const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5001/api';

// Test functions
async function testHealthCheck() {
  console.log('🏥 Testing health check...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', {
      status: response.data.status,
      mayaIntegration: response.data.mayaIntegration,
      langchainEnabled: response.data.langchainEnabled,
      langbaseEnabled: response.data.langbaseEnabled,
      stringIntegration: response.data.stringIntegration,
      n8nEnabled: response.data.n8nEnabled
    });
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testMayaInitialization() {
  console.log('\n🤖 Testing Maya initialization...');
  try {
    const response = await axios.post(`${BASE_URL}/maya/initialize`);
    console.log('✅ Maya initialization successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Maya initialization failed:', error.message);
    return null;
  }
}

async function testMayaCapabilities() {
  console.log('\n🔧 Testing Maya capabilities...');
  try {
    const response = await axios.get(`${BASE_URL}/maya/capabilities`);
    console.log('✅ Maya capabilities:', response.data.capabilities);
    return response.data.capabilities;
  } catch (error) {
    console.error('❌ Maya capabilities test failed:', error.message);
    return null;
  }
}

async function testMayaHealth() {
  console.log('\n💚 Testing Maya health...');
  try {
    const response = await axios.get(`${BASE_URL}/maya/health`);
    console.log('✅ Maya health status:', response.data.health);
    return response.data.health;
  } catch (error) {
    console.error('❌ Maya health test failed:', error.message);
    return null;
  }
}

async function testMayaTemplates() {
  console.log('\n📋 Testing Maya agent templates...');
  try {
    const response = await axios.get(`${BASE_URL}/maya/templates`);
    console.log('✅ Maya templates retrieved:', {
      count: response.data.templates.count,
      categories: response.data.templates.categories
    });
    
    // Show available templates
    Object.keys(response.data.templates.templates).forEach(templateName => {
      const template = response.data.templates.templates[templateName];
      console.log(`  - ${templateName}: ${template.name} (${template.platform})`);
    });
    
    return response.data.templates;
  } catch (error) {
    console.error('❌ Maya templates test failed:', error.message);
    return null;
  }
}

async function testCreateAgentFromTemplate() {
  console.log('\n➕ Testing agent creation from template...');
  try {
    const response = await axios.post(`${BASE_URL}/maya/agents/template`, {
      templateName: 'customerSupport',
      customizations: {
        name: 'AUTOWAIS Test Customer Support Agent',
        description: 'A test customer support agent for Maya integration'
      }
    });
    console.log('✅ Agent created from template:', response.data.agent);
    return response.data.agent;
  } catch (error) {
    console.error('❌ Agent creation test failed:', error.message);
    return null;
  }
}

async function testCreateCustomAgent() {
  console.log('\n➕ Testing custom agent creation...');
  try {
    const response = await axios.post(`${BASE_URL}/maya/agents`, {
      name: 'Maya Test Agent',
      description: 'A custom test agent for Maya platform',
      capabilities: ['data_analysis', 'reporting'],
      platform: 'langchain',
      tools: ['database', 'analytics']
    });
    console.log('✅ Custom agent created:', response.data.agent);
    return response.data.agent;
  } catch (error) {
    console.error('❌ Custom agent creation test failed:', error.message);
    return null;
  }
}

async function testListAgents() {
  console.log('\n📋 Testing agent listing...');
  try {
    const response = await axios.get(`${BASE_URL}/maya/agents`);
    console.log('✅ Agents listed:', response.data.agents);
    return response.data.agents;
  } catch (error) {
    console.error('❌ Agent listing test failed:', error.message);
    return null;
  }
}

async function testExecuteAgent(agentId) {
  console.log('\n🚀 Testing agent execution...');
  try {
    const response = await axios.post(`${BASE_URL}/maya/agents/${agentId}/execute`, {
      input: 'Customer is asking about AI automation pricing and features',
      context: {
        customer_type: 'enterprise',
        urgency: 'high',
        inquiry_type: 'pricing'
      }
    });
    console.log('✅ Agent execution successful:', response.data.result);
    return response.data.result;
  } catch (error) {
    console.error('❌ Agent execution test failed:', error.message);
    return null;
  }
}

async function testCreateMayaWorkflow() {
  console.log('\n🔄 Testing Maya workflow creation...');
  try {
    const response = await axios.post(`${BASE_URL}/maya/workflows`, {
      name: 'Maya Test Workflow',
      description: 'A test workflow for Maya integration',
      steps: [
        'data_collection',
        'ai_analysis',
        'report_generation'
      ]
    });
    console.log('✅ Maya workflow created:', response.data.workflow);
    return response.data.workflow;
  } catch (error) {
    console.error('❌ Maya workflow creation test failed:', error.message);
    return null;
  }
}

async function testExecuteMayaWorkflow(workflowId) {
  console.log('\n🔄 Testing Maya workflow execution...');
  try {
    const response = await axios.post(`${BASE_URL}/maya/workflows/${workflowId}/execute`, {
      input: 'Process Q4 sales data and generate insights',
      context: {
        data_source: 'sales_database',
        time_period: 'Q4 2024'
      }
    });
    console.log('✅ Maya workflow execution successful:', response.data.result);
    return response.data.result;
  } catch (error) {
    console.error('❌ Maya workflow execution test failed:', error.message);
    return null;
  }
}

async function testMayaStats() {
  console.log('\n📊 Testing Maya statistics...');
  try {
    const response = await axios.get(`${BASE_URL}/maya/stats`);
    console.log('✅ Maya statistics:', response.data.stats);
    return response.data.stats;
  } catch (error) {
    console.error('❌ Maya statistics test failed:', error.message);
    return null;
  }
}

async function testStringIntegration() {
  console.log('\n🔗 Testing String.com integration...');
  try {
    const response = await axios.get(`${BASE_URL}/string/templates`);
    console.log('✅ String.com templates available:', response.data.templates);
    return response.data.templates;
  } catch (error) {
    console.error('❌ String.com integration test failed:', error.message);
    return null;
  }
}

async function testLangBaseIntegration() {
  console.log('\n🔗 Testing LangBase integration...');
  try {
    // Test LangBase agent creation
    const response = await axios.post(`${BASE_URL}/maya/agents`, {
      name: 'LangBase Test Agent',
      description: 'Testing LangBase advanced deployment capabilities',
      capabilities: ['advanced_deployment', 'custom_models', 'data_analysis'],
      platform: 'langbase',
      tools: ['custom_ml_models', 'advanced_analytics', 'real_time_processing']
    });
    console.log('✅ LangBase agent created:', response.data.agent);
    return response.data.agent;
  } catch (error) {
    console.error('❌ LangBase integration test failed:', error.message);
    return null;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Maya AI Agent Platform Integration Tests\n');
  
  // Test 1: Health check
  const healthOk = await testHealthCheck();
  if (!healthOk) {
    console.log('❌ Health check failed, stopping tests');
    return;
  }

  // Test 2: Maya initialization
  const mayaInit = await testMayaInitialization();
  
  // Test 3: Maya capabilities
  const capabilities = await testMayaCapabilities();
  
  // Test 4: Maya health
  const health = await testMayaHealth();
  
  // Test 5: Maya templates
  const templates = await testMayaTemplates();
  
  // Test 6: Create agent from template
  const templateAgent = await testCreateAgentFromTemplate();
  
  // Test 7: Create custom agent
  const customAgent = await testCreateCustomAgent();
  
  // Test 8: List agents
  const agents = await testListAgents();
  
  // Test 9: Execute agent (if we have one)
  let agentExecution = null;
  if (templateAgent && templateAgent.id) {
    agentExecution = await testExecuteAgent(templateAgent.id);
  }
  
  // Test 10: Create Maya workflow
  const workflow = await testCreateMayaWorkflow();
  
  // Test 11: Execute Maya workflow (if we have one)
  let workflowExecution = null;
  if (workflow && workflow.id) {
    workflowExecution = await testExecuteMayaWorkflow(workflow.id);
  }
  
  // Test 12: Maya statistics
  const stats = await testMayaStats();
  
  // Test 13: String.com integration
  const stringTemplates = await testStringIntegration();
  
  // Test 14: LangBase integration
  const langbaseAgent = await testLangBaseIntegration();

  console.log('\n📊 Test Summary:');
  console.log(`✅ Health Check: ${healthOk ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Maya Initialization: ${mayaInit ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Maya Capabilities: ${capabilities ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Maya Health: ${health ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Maya Templates: ${templates ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Agent Creation (Template): ${templateAgent ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Agent Creation (Custom): ${customAgent ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Agent Listing: ${agents ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Agent Execution: ${agentExecution ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Workflow Creation: ${workflow ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Workflow Execution: ${workflowExecution ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Maya Statistics: ${stats ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ String.com Integration: ${stringTemplates ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ LangBase Integration: ${langbaseAgent ? 'PASSED' : 'FAILED'}`);

  console.log('\n🎉 Maya AI Agent Platform integration test completed!');
  console.log('\n💡 Available Maya endpoints:');
  console.log('  GET  /api/maya/capabilities     - Get Maya machine capabilities');
  console.log('  GET  /api/maya/health           - Get Maya health status');
  console.log('  GET  /api/maya/templates        - Get agent templates');
  console.log('  POST /api/maya/agents/template  - Create agent from template');
  console.log('  POST /api/maya/agents           - Create custom agent');
  console.log('  GET  /api/maya/agents           - List all agents');
  console.log('  POST /api/maya/agents/:id/execute - Execute agent');
  console.log('  POST /api/maya/workflows        - Create Maya workflow');
  console.log('  POST /api/maya/workflows/:id/execute - Execute workflow');
  console.log('  GET  /api/maya/stats            - Get platform statistics');
  
  console.log('\n🔧 To enable full functionality:');
  console.log('1. Add LANGCHAIN_API_KEY to your .env file');
  console.log('2. Add LANGBASE_API_KEY to your .env file');
  console.log('3. Add STRING_API_KEY to your .env file');
  console.log('4. Set LANGCHAIN_ENABLED=true in your .env file');
  console.log('5. Set LANGBASE_ENABLED=true in your .env file');
  console.log('6. Set STRING_ENABLED=true in your .env file');
  console.log('7. Set N8N_ENABLED=true if using n8n workflows');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testMayaInitialization,
  testMayaCapabilities,
  testMayaHealth,
  testMayaTemplates,
  testCreateAgentFromTemplate,
  testCreateCustomAgent,
  testListAgents,
  testExecuteAgent,
  testCreateMayaWorkflow,
  testExecuteMayaWorkflow,
  testMayaStats,
  testStringIntegration,
  testLangBaseIntegration,
  runAllTests
}; 
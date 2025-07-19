const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5001/api';
const TEST_AGENT_ID = 'demo-agent-123';

// Test functions
async function testHealthCheck() {
  console.log('🏥 Testing health check...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testAgentTemplates() {
  console.log('\n📋 Testing agent templates...');
  try {
    const response = await axios.get(`${BASE_URL}/string/templates`);
    console.log('✅ Templates retrieved:', response.data.templates);
    return response.data.templates;
  } catch (error) {
    console.error('❌ Templates test failed:', error.message);
    return null;
  }
}

async function testQuickExecute() {
  console.log('\n⚡ Testing quick execute...');
  try {
    const response = await axios.post(`${BASE_URL}/string/quick-execute`, {
      template: 'customerSupport',
      input: 'Customer is asking about AI automation pricing',
      context: {
        customer_type: 'enterprise',
        urgency: 'high'
      }
    });
    console.log('✅ Quick execute successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Quick execute failed:', error.message);
    return null;
  }
}

async function testAgentExecution() {
  console.log('\n🤖 Testing agent execution...');
  try {
    const response = await axios.post(`${BASE_URL}/string/execute`, {
      agentId: TEST_AGENT_ID,
      input: 'Analyze our Q4 sales data and identify trends',
      context: {
        data_source: 'sales_database',
        time_period: 'Q4 2024'
      }
    });
    console.log('✅ Agent execution result:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Agent execution failed:', error.message);
    return null;
  }
}

async function testCreateAgent() {
  console.log('\n➕ Testing agent creation...');
  try {
    const agentConfig = {
      name: 'AUTOWAIS Test Agent',
      description: 'A test agent for AUTOWAIS integration',
      capabilities: [
        'Process customer inquiries',
        'Generate reports',
        'Analyze data'
      ],
      tools: ['email', 'database', 'analytics']
    };

    const response = await axios.post(`${BASE_URL}/string/agents`, agentConfig);
    console.log('✅ Agent creation successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Agent creation failed:', error.message);
    return null;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting String.com Integration Tests\n');
  
  // Test 1: Health check
  const healthOk = await testHealthCheck();
  if (!healthOk) {
    console.log('❌ Health check failed, stopping tests');
    return;
  }

  // Test 2: Agent templates
  const templates = await testAgentTemplates();
  
  // Test 3: Quick execute (works without real String.com API key)
  const quickResult = await testQuickExecute();
  
  // Test 4: Agent execution (requires real String.com API key)
  const executionResult = await testAgentExecution();
  
  // Test 5: Agent creation (requires real String.com API key)
  const creationResult = await testCreateAgent();

  console.log('\n📊 Test Summary:');
  console.log(`✅ Health Check: ${healthOk ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Templates: ${templates ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Quick Execute: ${quickResult ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Agent Execution: ${executionResult ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Agent Creation: ${creationResult ? 'PASSED' : 'FAILED'}`);

  console.log('\n🎉 String.com integration test completed!');
  console.log('\n💡 To use real String.com agents:');
  console.log('1. Sign up at string.com');
  console.log('2. Get your API key');
  console.log('3. Add STRING_API_KEY to your .env file');
  console.log('4. Restart the server');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testAgentTemplates,
  testQuickExecute,
  testAgentExecution,
  testCreateAgent,
  runAllTests
}; 
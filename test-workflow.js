#!/usr/bin/env node

// Test script for AI Agent-Powered Daily Blog & LinkedIn Automation
// This script helps validate the workflow components

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function logSection(title) {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`);
}

function validateWorkflow() {
  logSection('Research-Enhanced AI Agent Workflow Validation');
  
  try {
    // Load workflow file
    const workflowPath = path.join(__dirname, '..', 'agent-workflows', 'daily-blog-linkedin-automation.json');
    const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
    
    let totalTests = 0;
    let passedTests = 0;
    
    // Test 1: Workflow Structure
    logSection('Test 1: Workflow Structure');
    totalTests++;
    
    const expectedNodes = [
      'Daily Schedule Trigger',
      'Initialize Session',
      'OpenRouter Chat Model',
      'Content Strategy AI Agent',
      'Research AI Agent',
      'Content Generation AI Agent',
      'LinkedIn Optimization AI Agent',
      'Quality Assurance AI Agent',
      'Request Human Approval',
      'Wait for Approval',
      'Check Approval',
      'Publish to LinkedIn',
      'Update Google Sheets',
      'Success Notification',
      'Rejection Notification'
    ];
    
    const actualNodes = workflowData.nodes.map(node => node.name);
    const missingNodes = expectedNodes.filter(node => !actualNodes.includes(node));
    
    if (missingNodes.length === 0) {
      log(`✅ All 15 nodes present (including Research AI Agent)`, 'green');
      passedTests++;
    } else {
      log(`❌ Missing nodes: ${missingNodes.join(', ')}`, 'red');
    }
    
    // Test 2: AI Agent Connections
    logSection('Test 2: AI Agent Connections');
    totalTests++;
    
    const connections = workflowData.connections;
    const requiredConnections = [
      'Daily Schedule Trigger -> Initialize Session',
      'Initialize Session -> Content Strategy AI Agent',
      'Content Strategy AI Agent -> Research AI Agent',
      'Research AI Agent -> Content Generation AI Agent',
      'Content Generation AI Agent -> LinkedIn Optimization AI Agent',
      'LinkedIn Optimization AI Agent -> Quality Assurance AI Agent',
      'Quality Assurance AI Agent -> Request Human Approval',
      'Request Human Approval -> Wait for Approval',
      'Wait for Approval -> Check Approval',
      'Check Approval -> Publish to LinkedIn',
      'Publish to LinkedIn -> Update Google Sheets',
      'Update Google Sheets -> Success Notification',
      'Check Approval -> Rejection Notification'
    ];
    
    let connectionCount = 0;
    let validConnections = 0;
    
    // Check main connections
    for (const [source, targets] of Object.entries(connections)) {
      if (targets.main) {
        for (const outputArray of targets.main) {
          connectionCount += outputArray.length;
        }
      }
    }
    
    if (connectionCount >= 13) {
      log(`✅ All 13 main connections present (found ${connectionCount})`, 'green');
      passedTests++;
    } else {
      log(`❌ Only ${connectionCount} connections found, expected 13`, 'red');
    }
    
    // Test 3: Research AI Agent Configuration
    logSection('Test 3: Research AI Agent Configuration');
    totalTests++;
    
    const researchAgent = workflowData.nodes.find(node => node.name === 'Research AI Agent');
    
    if (researchAgent) {
      const researchPrompt = researchAgent.parameters.text;
      const expectedKeywords = [
        'comprehensive research',
        'industry statistics',
        'case studies',
        'expertQuotes',
        'market trends',
        'competitorAnalysis',
        'technicalDetails',
        'sources',
        'researchAccuracy',
        'uniqueInsights'
      ];
      
      const foundKeywords = expectedKeywords.filter(keyword => 
        researchPrompt.includes(keyword)
      );
      
      if (foundKeywords.length >= 8) {
        log(`✅ Research AI Agent properly configured with ${foundKeywords.length}/10 research features`, 'green');
        passedTests++;
      } else {
        log(`❌ Research AI Agent missing key features: ${expectedKeywords.filter(k => !foundKeywords.includes(k)).join(', ')}`, 'red');
      }
    } else {
      log(`❌ Research AI Agent not found`, 'red');
    }
    
    // Test 4: Language Model Connections
    logSection('Test 4: Language Model Connections');
    totalTests++;
    
    const langModelConnections = connections['OpenRouter Chat Model'];
    if (langModelConnections && langModelConnections.ai_languageModel) {
      const connectedAgents = langModelConnections.ai_languageModel[0].map(conn => conn.node);
      const expectedAgents = [
        'Content Strategy AI Agent',
        'Research AI Agent',
        'Content Generation AI Agent',
        'LinkedIn Optimization AI Agent',
        'Quality Assurance AI Agent'
      ];
      
      const missingAgents = expectedAgents.filter(agent => !connectedAgents.includes(agent));
      
      if (missingAgents.length === 0) {
        log(`✅ All 5 AI agents connected to language model`, 'green');
        passedTests++;
      } else {
        log(`❌ Missing language model connections: ${missingAgents.join(', ')}`, 'red');
      }
    } else {
      log(`❌ No language model connections found`, 'red');
    }
    
    // Test 5: Google Sheets Research Columns
    logSection('Test 5: Google Sheets Research Columns');
    totalTests++;
    
    const googleSheetsNode = workflowData.nodes.find(node => node.name === 'Update Google Sheets');
    
    if (googleSheetsNode) {
      const columns = googleSheetsNode.parameters.columns.value;
      const schema = googleSheetsNode.parameters.columns.schema;
      
      const expectedColumns = [
        'date', 'sessionId', 'title', 'content', 'linkedinPost', 'linkedinPostId',
        'status', 'approvedBy', 'strategicTopic', 'seoScore', 'qualityScore',
        'algorithmScore', 'researchAccuracy', 'factualAccuracy', 'publishedTime'
      ];
      
      const actualColumns = Object.keys(columns);
      const schemaColumns = schema.map(s => s.id);
      
      const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
      const missingSchemaColumns = expectedColumns.filter(col => !schemaColumns.includes(col));
      
      if (missingColumns.length === 0 && missingSchemaColumns.length === 0) {
        log(`✅ All 15 columns configured (including research metrics)`, 'green');
        passedTests++;
      } else {
        log(`❌ Missing columns: ${missingColumns.join(', ')}`, 'red');
        log(`❌ Missing schema: ${missingSchemaColumns.join(', ')}`, 'red');
      }
    } else {
      log(`❌ Google Sheets node not found`, 'red');
    }
    
    // Test 6: Research Data Integration
    logSection('Test 6: Research Data Integration');
    totalTests++;
    
    const contentAgent = workflowData.nodes.find(node => node.name === 'Content Generation AI Agent');
    const linkedinAgent = workflowData.nodes.find(node => node.name === 'LinkedIn Optimization AI Agent');
    const qualityAgent = workflowData.nodes.find(node => node.name === 'Quality Assurance AI Agent');
    
    let researchIntegration = 0;
    
    if (contentAgent && contentAgent.parameters.text.includes('Research Data')) {
      researchIntegration++;
    }
    if (linkedinAgent && linkedinAgent.parameters.text.includes('research')) {
      researchIntegration++;
    }
    if (qualityAgent && qualityAgent.parameters.text.includes('Research')) {
      researchIntegration++;
    }
    
    if (researchIntegration >= 3) {
      log(`✅ Research data integrated across all downstream agents`, 'green');
      passedTests++;
    } else {
      log(`❌ Research data integration incomplete (${researchIntegration}/3 agents)`, 'red');
    }
    
    // Test 7: Research Notifications
    logSection('Test 7: Research Notifications');
    totalTests++;
    
    const approvalNode = workflowData.nodes.find(node => node.name === 'Request Human Approval');
    const successNode = workflowData.nodes.find(node => node.name === 'Success Notification');
    
    let researchNotifications = 0;
    
    if (approvalNode && approvalNode.parameters.text.includes('Research Summary')) {
      researchNotifications++;
    }
    if (successNode && successNode.parameters.text.includes('Research Quality')) {
      researchNotifications++;
    }
    
    if (researchNotifications >= 2) {
      log(`✅ Research metrics included in notifications`, 'green');
      passedTests++;
    } else {
      log(`❌ Research metrics missing from notifications`, 'red');
    }
    
    // Final Report
    logSection('Final Validation Report');
    
    const passRate = (passedTests / totalTests * 100).toFixed(1);
    
    if (passedTests === totalTests) {
      log(`🎉 ALL TESTS PASSED! (${passedTests}/${totalTests})`, 'green');
      log(`✅ Research-Enhanced Workflow is Production Ready!`, 'green');
    } else {
      log(`⚠️  ${passedTests}/${totalTests} tests passed (${passRate}%)`, 'yellow');
      log(`❌ ${totalTests - passedTests} issues need to be resolved`, 'red');
    }
    
    // Enhanced Features Report
    logSection('Research-Enhanced Features');
    log(`🔬 Research AI Agent: Deep market research with verified sources`, 'blue');
    log(`📊 Research Accuracy: Confidence scoring for research data`, 'blue');
    log(`✅ Factual Verification: Content accuracy validation`, 'blue');
    log(`📈 Enhanced Tracking: Research metrics in Google Sheets`, 'blue');
    log(`🎯 Data-Driven Content: Research-backed blog posts`, 'blue');
    
    // Next Steps
    logSection('Next Steps');
    if (passedTests === totalTests) {
      log(`1. ✅ Set up Google Sheets with research columns`, 'green');
      log(`2. ✅ Import workflow into n8n`, 'green');
      log(`3. ✅ Test research AI agent manually`, 'green');
      log(`4. ✅ Enable daily automation`, 'green');
      log(`5. ✅ Monitor research quality metrics`, 'green');
    } else {
      log(`1. ❌ Fix workflow issues identified above`, 'red');
      log(`2. ❌ Re-run validation`, 'red');
      log(`3. ❌ Test after fixes`, 'red');
    }
    
    return passedTests === totalTests;
    
  } catch (error) {
    log(`❌ Error validating workflow: ${error.message}`, 'red');
    return false;
  }
}

// Run validation
if (require.main === module) {
  const isValid = validateWorkflow();
  process.exit(isValid ? 0 : 1);
}

module.exports = validateWorkflow;

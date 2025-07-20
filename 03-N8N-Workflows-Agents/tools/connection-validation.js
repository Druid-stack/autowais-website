const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function logSection(title) {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`);
}

function validateConnections() {
  logSection('🔗 DETAILED CONNECTION VALIDATION');
  
  try {
    // Load workflow file
    const workflowPath = path.join(__dirname, '..', 'agent-workflows', 'daily-blog-linkedin-automation.json');
    const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
    
    const connections = workflowData.connections;
    const nodes = workflowData.nodes;
    
    let totalConnections = 0;
    let validConnections = 0;
    let issues = [];
    
    // Expected connection mapping
    const expectedConnections = {
      'Daily Schedule Trigger': [
        { target: 'Initialize Session', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Initialize Session': [
        { target: 'Content Strategy AI Agent', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'OpenRouter Chat Model': [
        { target: 'Content Strategy AI Agent', type: 'ai_languageModel', outputIndex: 0, inputIndex: 0 },
        { target: 'Research AI Agent', type: 'ai_languageModel', outputIndex: 0, inputIndex: 0 },
        { target: 'Content Generation AI Agent', type: 'ai_languageModel', outputIndex: 0, inputIndex: 0 },
        { target: 'LinkedIn Optimization AI Agent', type: 'ai_languageModel', outputIndex: 0, inputIndex: 0 },
        { target: 'Quality Assurance AI Agent', type: 'ai_languageModel', outputIndex: 0, inputIndex: 0 }
      ],
      'Content Strategy AI Agent': [
        { target: 'Research AI Agent', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Research AI Agent': [
        { target: 'Content Generation AI Agent', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Content Generation AI Agent': [
        { target: 'LinkedIn Optimization AI Agent', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'LinkedIn Optimization AI Agent': [
        { target: 'Quality Assurance AI Agent', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Quality Assurance AI Agent': [
        { target: 'Request Human Approval', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Request Human Approval': [
        { target: 'Wait for Approval', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Wait for Approval': [
        { target: 'Check Approval', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Check Approval': [
        { target: 'Publish to LinkedIn', type: 'main', outputIndex: 0, inputIndex: 0 },
        { target: 'Rejection Notification', type: 'main', outputIndex: 1, inputIndex: 0 }
      ],
      'Publish to LinkedIn': [
        { target: 'Update Google Sheets', type: 'main', outputIndex: 0, inputIndex: 0 }
      ],
      'Update Google Sheets': [
        { target: 'Success Notification', type: 'main', outputIndex: 0, inputIndex: 0 }
      ]
    };
    
    // Validate each expected connection
    for (const [sourceNode, expectedTargets] of Object.entries(expectedConnections)) {
      log(`\n🔍 Validating ${sourceNode}:`, 'blue');
      
      if (!connections[sourceNode]) {
        issues.push(`❌ ${sourceNode} has no connections defined`);
        continue;
      }
      
      for (const expectedTarget of expectedTargets) {
        totalConnections++;
        const connectionType = expectedTarget.type;
        const targetNode = expectedTarget.target;
        
        if (!connections[sourceNode][connectionType]) {
          issues.push(`❌ ${sourceNode} missing ${connectionType} connections`);
          continue;
        }
        
        const actualConnections = connections[sourceNode][connectionType];
        if (!actualConnections[expectedTarget.outputIndex]) {
          issues.push(`❌ ${sourceNode} missing output ${expectedTarget.outputIndex} for ${connectionType}`);
          continue;
        }
        
        const outputConnections = actualConnections[expectedTarget.outputIndex];
        const targetConnection = outputConnections.find(conn => 
          conn.node === targetNode && conn.index === expectedTarget.inputIndex
        );
        
        if (targetConnection) {
          log(`  ✅ ${sourceNode} → ${targetNode} (${connectionType})`, 'green');
          validConnections++;
        } else {
          issues.push(`❌ ${sourceNode} → ${targetNode} connection not found`);
        }
      }
    }
    
    // Validate node existence
    logSection('📦 NODE EXISTENCE VALIDATION');
    const nodeNames = nodes.map(node => node.name);
    const requiredNodes = [
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
    
    let nodeIssues = [];
    for (const requiredNode of requiredNodes) {
      if (nodeNames.includes(requiredNode)) {
        log(`  ✅ ${requiredNode}`, 'green');
      } else {
        nodeIssues.push(`❌ Missing node: ${requiredNode}`);
      }
    }
    
    // Validate node types
    logSection('🔧 NODE TYPE VALIDATION');
    const nodeTypeValidation = [
      { name: 'Daily Schedule Trigger', expectedType: 'n8n-nodes-base.scheduleTrigger' },
      { name: 'Initialize Session', expectedType: 'n8n-nodes-base.set' },
      { name: 'OpenRouter Chat Model', expectedType: '@n8n/n8n-nodes-langchain.lmChatOpenRouter' },
      { name: 'Content Strategy AI Agent', expectedType: '@n8n/n8n-nodes-langchain.agent' },
      { name: 'Research AI Agent', expectedType: '@n8n/n8n-nodes-langchain.agent' },
      { name: 'Content Generation AI Agent', expectedType: '@n8n/n8n-nodes-langchain.agent' },
      { name: 'LinkedIn Optimization AI Agent', expectedType: '@n8n/n8n-nodes-langchain.agent' },
      { name: 'Quality Assurance AI Agent', expectedType: '@n8n/n8n-nodes-langchain.agent' },
      { name: 'Request Human Approval', expectedType: 'n8n-nodes-base.slack' },
      { name: 'Wait for Approval', expectedType: 'n8n-nodes-base.wait' },
      { name: 'Check Approval', expectedType: 'n8n-nodes-base.if' },
      { name: 'Publish to LinkedIn', expectedType: 'n8n-nodes-base.linkedIn' },
      { name: 'Update Google Sheets', expectedType: 'n8n-nodes-base.googleSheets' },
      { name: 'Success Notification', expectedType: 'n8n-nodes-base.slack' },
      { name: 'Rejection Notification', expectedType: 'n8n-nodes-base.slack' }
    ];
    
    let typeIssues = [];
    for (const validation of nodeTypeValidation) {
      const node = nodes.find(n => n.name === validation.name);
      if (node) {
        if (node.type === validation.expectedType) {
          log(`  ✅ ${validation.name}: ${node.type}`, 'green');
        } else {
          typeIssues.push(`❌ ${validation.name}: expected ${validation.expectedType}, got ${node.type}`);
        }
      }
    }
    
    // Validate credentials
    logSection('🔐 CREDENTIAL VALIDATION');
    const credentialNodes = [
      { name: 'OpenRouter Chat Model', expectedCred: 'openRouterApi' },
      { name: 'Request Human Approval', expectedCred: 'slackOAuth2Api' },
      { name: 'Publish to LinkedIn', expectedCred: 'linkedInOAuth2Api' },
      { name: 'Update Google Sheets', expectedCred: 'googleSheetsOAuth2Api' },
      { name: 'Success Notification', expectedCred: 'slackOAuth2Api' },
      { name: 'Rejection Notification', expectedCred: 'slackOAuth2Api' }
    ];
    
    let credentialIssues = [];
    for (const credCheck of credentialNodes) {
      const node = nodes.find(n => n.name === credCheck.name);
      if (node && node.credentials) {
        if (node.credentials[credCheck.expectedCred]) {
          log(`  ✅ ${credCheck.name}: ${credCheck.expectedCred}`, 'green');
        } else {
          credentialIssues.push(`❌ ${credCheck.name}: missing ${credCheck.expectedCred}`);
        }
      } else {
        credentialIssues.push(`❌ ${credCheck.name}: no credentials configured`);
      }
    }
    
    // Validate specific configurations
    logSection('⚙️ CONFIGURATION VALIDATION');
    
    // Check Google Sheets ID
    const sheetsNode = nodes.find(n => n.name === 'Update Google Sheets');
    if (sheetsNode) {
      const sheetId = sheetsNode.parameters.documentId?.value;
      if (sheetId === '17vD0SOfJojqdcBIXVm5kd0nlxydUfB_-VcCBU2N5caA') {
        log(`  ✅ Google Sheets ID correctly configured`, 'green');
      } else {
        issues.push(`❌ Google Sheets ID incorrect: ${sheetId}`);
      }
    }
    
    // Check Wait node webhook configuration
    const waitNode = nodes.find(n => n.name === 'Wait for Approval');
    if (waitNode) {
      const resumeType = waitNode.parameters.resume;
      const webhookSuffix = waitNode.parameters.options?.webhookSuffix;
      if (resumeType === 'webhook' && webhookSuffix === 'blog-approval') {
        log(`  ✅ Wait node webhook configured correctly`, 'green');
      } else {
        issues.push(`❌ Wait node webhook configuration incorrect`);
      }
    }
    
    // Check Check Approval condition
    const checkNode = nodes.find(n => n.name === 'Check Approval');
    if (checkNode) {
      const condition = checkNode.parameters.conditions?.conditions?.[0];
      if (condition && condition.rightValue === 'APPROVE-') {
        log(`  ✅ Check Approval condition configured correctly`, 'green');
      } else {
        issues.push(`❌ Check Approval condition incorrect`);
      }
    }
    
    // Final Report
    logSection('📊 FINAL CONNECTION VALIDATION REPORT');
    
    log(`🔗 Total Connections: ${totalConnections}`, 'blue');
    log(`✅ Valid Connections: ${validConnections}`, 'green');
    log(`❌ Connection Issues: ${issues.length}`, issues.length > 0 ? 'red' : 'green');
    log(`📦 Node Issues: ${nodeIssues.length}`, nodeIssues.length > 0 ? 'red' : 'green');
    log(`🔧 Type Issues: ${typeIssues.length}`, typeIssues.length > 0 ? 'red' : 'green');
    log(`🔐 Credential Issues: ${credentialIssues.length}`, credentialIssues.length > 0 ? 'red' : 'green');
    
    const allIssues = [...issues, ...nodeIssues, ...typeIssues, ...credentialIssues];
    
    if (allIssues.length === 0) {
      log(`\n🎉 PERFECT! All connections validated successfully!`, 'green');
      log(`✅ 15 nodes with 18 connections working perfectly`, 'green');
      log(`🚀 Workflow is ready for production deployment`, 'green');
    } else {
      log(`\n⚠️ Issues found:`, 'yellow');
      allIssues.forEach(issue => log(`  ${issue}`, 'red'));
    }
    
    // Connection Summary
    logSection('📋 CONNECTION SUMMARY');
    log(`🔄 Main Data Flow:`, 'blue');
    log(`   Trigger → Session → Strategy → Research → Content → LinkedIn → QA → Approval → Publish → Sheets → Success`, 'cyan');
    log(`🤖 AI Model Flow:`, 'blue');
    log(`   OpenRouter → [Strategy, Research, Content, LinkedIn, QA] Agents`, 'cyan');
    log(`✅ Approval Flow:`, 'blue');
    log(`   Approval → Wait → Check → [Publish/Reject] → [Success/Reject] Notification`, 'cyan');
    
    return allIssues.length === 0;
    
  } catch (error) {
    log(`❌ Error in connection validation: ${error.message}`, 'red');
    return false;
  }
}

// Run validation
if (require.main === module) {
  const isValid = validateConnections();
  process.exit(isValid ? 0 : 1);
}

module.exports = validateConnections; 
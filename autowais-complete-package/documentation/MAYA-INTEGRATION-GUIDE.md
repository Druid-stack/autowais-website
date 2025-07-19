# Maya AI Agent Platform Integration Guide

## Overview

**Maya** is your unified AI agent platform that integrates the best of all worlds:

- **LangChain** - Production-ready AI agents with 600+ integrations
- **String.com** - Simple web-based agents for quick prototyping
- **n8n** - Powerful workflow orchestration and automation
- **Custom Maya capabilities** - Machine-specific integrations

## Why Maya + LangChain + String.com + n8n?

### LangChain (Primary Platform)

- ✅ **#1 downloaded agent framework** (100k+ GitHub stars)
- ✅ **600+ integrations** with models, databases, and tools
- ✅ **Enterprise-grade** with companies like Google, GitLab, Cisco
- ✅ **Visual agent IDE** and templates
- ✅ **Production-ready** with observability and evaluation

### String.com (Secondary Platform)

- ✅ **Simple setup** for basic AI agents
- ✅ **Web interface** for non-technical users
- ✅ **Good for prototyping** and simple use cases

### n8n (Workflow Orchestration)

- ✅ **400+ integrations** for complex workflows
- ✅ **Visual workflow builder**
- ✅ **Advanced error handling** and retry logic
- ✅ **Real-time monitoring** and alerts

### Maya Machine (Unified Platform)

- ✅ **Intelligent platform selection** based on agent requirements
- ✅ **Unified API** for all platforms
- ✅ **Custom workflows** and integrations
- ✅ **Real-time monitoring** and analytics

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Maya Machine  │    │   LangChain     │    │   String.com    │
│                 │    │                 │    │                 │
│ • Platform      │◄──►│ • Production    │    │ • Simple        │
│   Selection     │    │   Agents        │    │   Agents        │
│ • Unified API   │    │ • 600+ Tools    │    │ • Web Interface │
│ • Monitoring    │    │ • Enterprise    │    │ • Prototyping   │
│ • Analytics     │    │   Ready         │    │ • Quick Setup   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│      n8n        │
│                 │
│ • Workflow      │
│   Orchestration │
│ • 400+          │
│   Integrations  │
│ • Visual        │
│   Builder       │
└─────────────────┘
```

## Setup Instructions

### 1. Environment Configuration

Add these variables to your `.env` file:

```bash
# Maya Machine Configuration
MAYA_MACHINE_ID=maya-001

# LangChain Configuration
LANGCHAIN_ENABLED=true
LANGCHAIN_API_KEY=your_langchain_api_key_here
LANGCHAIN_BASE_URL=https://api.langchain.com

# String.com Configuration
STRING_ENABLED=true
STRING_API_KEY=your_string_api_key_here

# n8n Configuration
N8N_ENABLED=true
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=your_n8n_api_key_here
```

### 2. Install Dependencies

```bash
cd autowais-backend
npm install axios
```

### 3. Test the Integration

```bash
# Test Maya integration
node test-maya-integration.js

# Test String.com integration
node test-string-integration.js
```

## Maya API Endpoints

### Core Maya Endpoints

```bash
# Initialize Maya platform
POST /api/maya/initialize

# Get Maya capabilities
GET /api/maya/capabilities

# Get Maya health status
GET /api/maya/health

# Get platform statistics
GET /api/maya/stats
```

### Agent Management

```bash
# Get agent templates
GET /api/maya/templates

# Create agent from template
POST /api/maya/agents/template
{
  "templateName": "customerSupport",
  "customizations": {
    "name": "Custom Agent Name",
    "description": "Custom description"
  }
}

# Create custom agent
POST /api/maya/agents
{
  "name": "Custom Agent",
  "description": "Agent description",
  "capabilities": ["data_analysis", "reporting"],
  "platform": "langchain",
  "tools": ["database", "analytics"]
}

# List all agents
GET /api/maya/agents

# Get agent details
GET /api/maya/agents/:agentId

# Execute agent
POST /api/maya/agents/:agentId/execute
{
  "input": "Your input here",
  "context": {
    "customer_type": "enterprise",
    "urgency": "high"
  }
}

# Update agent
PUT /api/maya/agents/:agentId
{
  "description": "Updated description",
  "capabilities": ["new_capability"]
}

# Delete agent
DELETE /api/maya/agents/:agentId
```

### Workflow Management

```bash
# Create Maya workflow
POST /api/maya/workflows
{
  "name": "Custom Workflow",
  "description": "Workflow description",
  "steps": ["step1", "step2", "step3"]
}

# Execute Maya workflow
POST /api/maya/workflows/:workflowId/execute
{
  "input": "Workflow input",
  "context": {
    "data_source": "database"
  }
}
```

## Agent Templates

Maya comes with pre-configured templates for your businesses:

### AUTOWAIS Business Templates

- **customerSupport** - Handle customer inquiries and support
- **contentGenerator** - Create marketing content and blog posts
- **dataAnalyst** - Analyze business data and generate insights
- **automationConsultant** - Identify automation opportunities

### Living Systems Intelligence Templates

- **lsiPatternRecognition** - Identify patterns across scales
- **lsiContentGenerator** - Generate YouTube scripts from ancient knowledge

### RetroFuture Gadgetry Templates

- **retrofutureDesign** - Generate steampunk gadget designs
- **retrofutureCustomerService** - Handle custom orders and inquiries

### Maya Machine Templates

- **mayaSystemMonitor** - Monitor Maya machine performance
- **mayaWorkflowOrchestrator** - Orchestrate complex workflows

## Platform Selection Logic

Maya automatically selects the best platform based on agent capabilities:

### LangChain (Preferred for)

- Complex workflows
- Enterprise applications
- Production environments
- Data analysis
- Pattern recognition

### String.com (Preferred for)

- Simple agents
- Web interface requirements
- Prototyping
- Quick setup needs

### n8n (Preferred for)

- Workflow orchestration
- Integration-heavy tasks
- Real-time monitoring
- Complex automation

## Usage Examples

### Example 1: Create a Customer Support Agent

```javascript
// Using Maya API
const response = await fetch("/api/maya/agents/template", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    templateName: "customerSupport",
    customizations: {
      name: "AUTOWAIS Enterprise Support",
      description: "Handles enterprise customer inquiries",
    },
  }),
});

const agent = await response.json();
console.log("Agent created:", agent.agent.id);
```

### Example 2: Execute an Agent

```javascript
// Execute the agent
const execution = await fetch(`/api/maya/agents/${agent.agent.id}/execute`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    input: "Customer is asking about AI automation pricing for enterprise",
    context: {
      customer_type: "enterprise",
      urgency: "high",
      inquiry_type: "pricing",
    },
  }),
});

const result = await execution.json();
console.log("Agent response:", result.result);
```

### Example 3: Create a LangChain Agent

```javascript
// Create a complex LangChain agent
const langchainAgent = await fetch("/api/maya/agents", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "LSI Pattern Recognition Agent",
    description: "Identifies patterns across scales for regenerative solutions",
    capabilities: [
      "pattern_recognition",
      "scientific_analysis",
      "content_generation",
    ],
    platform: "langchain",
    tools: ["scientific_databases", "pattern_library", "content_generation"],
  }),
});
```

### Example 4: Create a Maya Workflow

```javascript
// Create a custom workflow
const workflow = await fetch("/api/maya/workflows", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "LSI Content Pipeline",
    description: "Automated content generation from ancient knowledge",
    steps: [
      "pattern_recognition",
      "content_generation",
      "video_script_creation",
      "social_media_distribution",
    ],
  }),
});
```

## Integration with Your Businesses

### AUTOWAIS Business Integration

```javascript
// Automation Consultant Agent
const automationAgent = {
  templateName: "automationConsultant",
  customizations: {
    name: "AUTOWAIS Automation Consultant",
    description: "Analyzes client workflows for automation opportunities",
  },
};

// Data Analyst Agent
const dataAgent = {
  templateName: "dataAnalyst",
  customizations: {
    name: "AUTOWAIS Data Analyst",
    description: "Analyzes business metrics and generates insights",
  },
};
```

### Living Systems Intelligence Integration

```javascript
// Pattern Recognition Agent
const patternAgent = {
  templateName: "lsiPatternRecognition",
  customizations: {
    name: "LSI Pattern Recognition",
    description:
      "Identifies patterns in ancient knowledge about energy systems",
  },
};

// Content Generator Agent
const contentAgent = {
  templateName: "lsiContentGenerator",
  customizations: {
    name: "LSI Content Generator",
    description: "Generates YouTube scripts from ancient wisdom",
  },
};
```

### RetroFuture Gadgetry Integration

```javascript
// Design Agent
const designAgent = {
  templateName: "retrofutureDesign",
  customizations: {
    name: "RetroFuture Design Agent",
    description: "Generates steampunk USB drive designs",
  },
};

// Customer Service Agent
const serviceAgent = {
  templateName: "retrofutureCustomerService",
  customizations: {
    name: "RetroFuture Customer Service",
    description: "Handles custom orders and customer inquiries",
  },
};
```

## Monitoring and Analytics

### Maya Platform Statistics

```javascript
// Get platform statistics
const stats = await fetch("/api/maya/stats");
const platformStats = await stats.json();

console.log("Platform Statistics:", {
  totalAgents: platformStats.stats.agents.total,
  byPlatform: platformStats.stats.agents.byPlatform,
  executionStats: platformStats.stats.monitoring,
});
```

### Agent Performance Monitoring

```javascript
// Monitor agent performance
const agentStats = {
  agentExecutions: 0,
  successfulRuns: 0,
  failedRuns: 0,
  averageResponseTime: 0,
};

// Track in your application
function trackAgentExecution(agentId, success, responseTime) {
  agentStats.agentExecutions++;
  if (success) {
    agentStats.successfulRuns++;
  } else {
    agentStats.failedRuns++;
  }
  agentStats.averageResponseTime =
    (agentStats.averageResponseTime + responseTime) / 2;
}
```

## Best Practices

### 1. Platform Selection

- Use **LangChain** for complex, production-ready agents
- Use **String.com** for simple, web-based agents
- Use **n8n** for workflow orchestration and integration
- Let **Maya** auto-select the best platform

### 2. Agent Design

- Define clear capabilities and requirements
- Choose appropriate tools for each agent
- Test agents thoroughly before production
- Monitor performance and iterate

### 3. Error Handling

- Implement proper error handling for all API calls
- Use Maya's built-in error tracking
- Set up alerts for failed executions
- Have fallback strategies

### 4. Security

- Keep API keys secure in environment variables
- Validate all inputs to agents
- Sanitize agent outputs
- Implement proper access controls

## Troubleshooting

### Common Issues

1. **Maya not initializing**
   - Check environment variables
   - Verify API keys are valid
   - Check network connectivity

2. **Agent creation failing**
   - Verify template name is correct
   - Check required fields are provided
   - Ensure platform is available

3. **Agent execution errors**
   - Check agent is active
   - Verify input format
   - Check platform-specific requirements

4. **Platform integration issues**
   - Verify API keys are configured
   - Check platform health status
   - Ensure services are running

## Next Steps

### Week 1: Foundation

- [ ] Set up environment variables
- [ ] Test Maya integration
- [ ] Create your first agent
- [ ] Explore available templates

### Week 2: Integration

- [ ] Integrate with your existing workflows
- [ ] Create custom agents for your businesses
- [ ] Set up monitoring and alerts
- [ ] Test with real data

### Week 3: Production

- [ ] Deploy agents to production
- [ ] Set up automated workflows
- [ ] Implement error handling
- [ ] Train your team

### Week 4: Optimization

- [ ] Analyze agent performance
- [ ] Optimize for cost and efficiency
- [ ] Scale successful agents
- [ ] Plan future enhancements

## Resources

### Official Documentation

- [LangChain Documentation](https://docs.langchain.com)
- [String.com Documentation](https://docs.string.com)
- [n8n Documentation](https://docs.n8n.io)

### Maya Integration

- [Maya API Reference](#) (this guide)
- [Test Scripts](#) (included in codebase)
- [Example Workflows](#) (included in codebase)

---

## Conclusion

**Maya** gives you the best of all AI agent platforms:

1. **LangChain** for production-ready, enterprise-grade agents
2. **String.com** for simple, web-based agents
3. **n8n** for complex workflow orchestration
4. **Maya** for intelligent platform selection and unified management

Start with the templates, test the integration, and build your AI agent ecosystem with Maya!

**Ready to get started?** Run `node test-maya-integration.js` to test your Maya setup!

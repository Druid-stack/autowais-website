const axios = require('axios');

class StringAgentManager {
  constructor() {
    this.apiKey = process.env.STRING_API_KEY;
    this.baseUrl = 'https://api.string.com/v1';
    
    if (!this.apiKey) {
      console.warn('⚠️  STRING_API_KEY not found in environment variables');
    }
  }

  /**
   * Execute a String.com agent
   * @param {string} agentId - The String.com agent ID
   * @param {string} input - Input for the agent
   * @param {object} context - Additional context
   * @returns {Promise<object>} Agent response
   */
  async executeAgent(agentId, input, context = {}) {
    try {
      if (!this.apiKey) {
        throw new Error('String.com API key not configured');
      }

      const response = await axios.post(`${this.baseUrl}/agents/execute`, {
        agent_id: agentId,
        input: input,
        context: context
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('String.com agent execution error:', error.message);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Create a new String.com agent
   * @param {object} agentConfig - Agent configuration
   * @returns {Promise<object>} Created agent details
   */
  async createAgent(agentConfig) {
    try {
      if (!this.apiKey) {
        throw new Error('String.com API key not configured');
      }

      const response = await axios.post(`${this.baseUrl}/agents`, agentConfig, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        agent: response.data,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('String.com agent creation error:', error.message);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * List all available agents
   * @returns {Promise<object>} List of agents
   */
  async listAgents() {
    try {
      if (!this.apiKey) {
        throw new Error('String.com API key not configured');
      }

      const response = await axios.get(`${this.baseUrl}/agents`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return {
        success: true,
        agents: response.data,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('String.com agent listing error:', error.message);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get agent details
   * @param {string} agentId - The agent ID
   * @returns {Promise<object>} Agent details
   */
  async getAgent(agentId) {
    try {
      if (!this.apiKey) {
        throw new Error('String.com API key not configured');
      }

      const response = await axios.get(`${this.baseUrl}/agents/${agentId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return {
        success: true,
        agent: response.data,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('String.com agent retrieval error:', error.message);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Pre-configured agent templates for AUTOWAIS use cases
const AUTOWAIS_AGENT_TEMPLATES = {
  // Customer Support Agent
  customerSupport: {
    name: "AUTOWAIS Customer Support Agent",
    description: "Handles customer inquiries and support requests",
    capabilities: [
      "Answer product questions",
      "Process support tickets", 
      "Escalate complex issues",
      "Provide troubleshooting guidance"
    ],
    tools: ["email", "knowledge_base", "ticket_system"]
  },

  // Content Generation Agent
  contentGenerator: {
    name: "AUTOWAIS Content Generator",
    description: "Generates marketing content and blog posts",
    capabilities: [
      "Create blog posts",
      "Generate social media content",
      "Write product descriptions",
      "Create email campaigns"
    ],
    tools: ["web_search", "content_management", "social_media"]
  },

  // Data Analysis Agent
  dataAnalyst: {
    name: "AUTOWAIS Data Analyst",
    description: "Analyzes business data and generates insights",
    capabilities: [
      "Analyze sales data",
      "Generate reports",
      "Identify trends",
      "Create visualizations"
    ],
    tools: ["database", "analytics", "reporting"]
  },

  // Automation Consultant
  automationConsultant: {
    name: "AUTOWAIS Automation Consultant",
    description: "Analyzes workflows and suggests automation opportunities",
    capabilities: [
      "Analyze business processes",
      "Identify automation opportunities",
      "Create automation roadmaps",
      "Calculate ROI estimates"
    ],
    tools: ["process_analysis", "roi_calculator", "workflow_designer"]
  }
};

module.exports = {
  StringAgentManager,
  AUTOWAIS_AGENT_TEMPLATES
}; 
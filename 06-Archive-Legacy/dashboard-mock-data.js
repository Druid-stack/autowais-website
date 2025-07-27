// Mock Data Generator for ArticShorex Dashboard Testing
// Simple UUID generator for testing
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

class MockDataGenerator {
  constructor() {
    this.customers = this.generateCustomers();
    this.tickets = [];
    this.activities = [];
  }

  generateCustomers() {
    return [
      {
        id: 'cust_001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        vipStatus: 'VIP',
        loyaltyTier: 'Platinum',
        bookingHistory: [
          { id: 'book_001', tour: 'Northern Lights Expedition', date: '2024-01-10', status: 'completed' },
          { id: 'book_002', tour: 'Arctic Wildlife Safari', date: '2024-02-15', status: 'confirmed' }
        ],
        preferences: ['photography', 'wildlife'],
        joinDate: '2023-06-15',
        totalSpent: 4500
      },
      {
        id: 'cust_002',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        vipStatus: 'Standard',
        loyaltyTier: 'Gold',
        bookingHistory: [
          { id: 'book_003', tour: 'Glacier Hiking Adventure', date: '2024-03-20', status: 'pending' }
        ],
        preferences: ['adventure', 'hiking'],
        joinDate: '2024-01-20',
        totalSpent: 1200
      },
      {
        id: 'cust_003',
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@email.com',
        vipStatus: 'VIP',
        loyaltyTier: 'Diamond',
        bookingHistory: [
          { id: 'book_004', tour: 'Luxury Arctic Cruise', date: '2024-04-05', status: 'confirmed' },
          { id: 'book_005', tour: 'Private Northern Lights Tour', date: '2024-01-25', status: 'completed' },
          { id: 'book_006', tour: 'Arctic Photography Workshop', date: '2024-02-10', status: 'completed' }
        ],
        preferences: ['luxury', 'photography', 'private tours'],
        joinDate: '2023-03-10',
        totalSpent: 8900
      },
      {
        id: 'cust_004',
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        vipStatus: 'Standard',
        loyaltyTier: 'Silver',
        bookingHistory: [],
        preferences: ['budget-friendly', 'group tours'],
        joinDate: '2024-01-15',
        totalSpent: 0
      },
      {
        id: 'cust_005',
        name: 'Lisa Thompson',
        email: 'lisa.thompson@email.com',
        vipStatus: 'Standard',
        loyaltyTier: 'Bronze',
        bookingHistory: [
          { id: 'book_007', tour: 'Arctic Day Trip', date: '2024-03-15', status: 'completed' }
        ],
        preferences: ['day trips', 'wildlife'],
        joinDate: '2024-02-28',
        totalSpent: 350
      }
    ];
  }

  generateMockTicket(customerEmail, scenario = 'standard') {
    const customer = this.customers.find(c => c.email === customerEmail) || this.customers[0];
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const scenarios = {
      standard: {
        subject: 'Question about Northern Lights visibility',
        message: 'Hi, I have a booking for next week and wanted to know about the current weather conditions for Northern Lights viewing. Will we be able to see them?',
        channel: 'email',
        priority: 'medium',
        category: 'weather-inquiry'
      },
      urgent: {
        subject: 'URGENT: Need to modify booking immediately',
        message: 'I need to change my booking date due to a family emergency. This is very urgent as the tour is tomorrow. Please help!',
        channel: 'webhook',
        priority: 'urgent',
        category: 'booking-modification'
      },
      vip: {
        subject: 'VIP Customer - Special dietary requirements',
        message: 'As a VIP customer, I need to inform you about special dietary requirements for our upcoming luxury cruise. Please ensure gluten-free options are available.',
        channel: 'email',
        priority: 'high',
        category: 'tour-information'
      },
      complaint: {
        subject: 'Disappointed with recent tour experience',
        message: 'I am very disappointed with the tour quality. The guide was unprofessional and the equipment was outdated. I expect a refund.',
        channel: 'email',
        priority: 'high',
        category: 'general-support'
      },
      payment: {
        subject: 'Payment issue with booking',
        message: 'I am having trouble with the payment for my booking. The transaction failed but I was still charged. Please help resolve this.',
        channel: 'webhook',
        priority: 'medium',
        category: 'payment-issue'
      }
    };

    const selectedScenario = scenarios[scenario];
    
    return {
      ticketId,
      customerName: customer.name,
      customerEmail: customer.email,
      customerVIP: customer.vipStatus === 'VIP',
      customerType: customer.bookingHistory.length > 0 ? 'returning' : 'new',
      subject: selectedScenario.subject,
      message: selectedScenario.message,
      channel: selectedScenario.channel,
      priority: selectedScenario.priority,
      category: selectedScenario.category,
      createdAt: new Date().toISOString(),
      status: 'processing'
    };
  }

  generateMockAIResponse(ticket) {
    const responses = {
      'weather-inquiry': {
        intent: 'weather-inquiry',
        sentiment: 'neutral',
        confidence: 0.94,
        priority: 'medium',
        escalationRequired: false,
        category: 'weather-inquiry',
        response: {
          subject: `Re: ${ticket.subject}`,
          message: `Dear ${ticket.customerName},\n\nThank you for your inquiry about Northern Lights visibility. Based on current weather forecasts and aurora activity predictions, conditions look very promising for your tour next week.\n\nThe forecast shows clear skies with minimal cloud cover, and the aurora activity index is expected to be moderate to high (KP-index 4-5). This provides excellent viewing opportunities.\n\nOur experienced guides will take you to the best viewing locations and provide professional photography assistance. We also provide warm clothing and hot beverages during the tour.\n\n${ticket.customerVIP ? 'As a VIP customer, you have priority access to our premium viewing locations and complimentary professional photos.' : ''}\n\nWe look forward to providing you with an unforgettable Northern Lights experience!\n\nBest regards,\nArticShorex AI Support Team`,
          tone: 'professional-warm',
          personalization: ticket.customerVIP ? 'VIP-specific benefits mentioned' : 'Standard personalization'
        }
      },
      'booking-modification': {
        intent: 'booking-modification',
        sentiment: 'urgent',
        confidence: 0.92,
        priority: 'urgent',
        escalationRequired: true,
        category: 'booking-modification',
        response: {
          subject: `Re: ${ticket.subject}`,
          message: `Dear ${ticket.customerName},\n\nI understand this is an urgent matter and I want to help you immediately. I'm escalating your booking modification request to our human support team for immediate attention.\n\nIn the meantime, I've noted your request to change your booking date due to family emergency. Our team will contact you within the next 30 minutes to discuss available options.\n\n${ticket.customerVIP ? 'As a VIP customer, we will waive any change fees and provide flexible rebooking options.' : 'We will do our best to accommodate your request with minimal fees.'}\n\nYou will receive a call from our support team shortly.\n\nBest regards,\nArticShorex AI Support Team`,
          tone: 'urgent-supportive',
          personalization: 'Emergency response with escalation'
        }
      },
      'tour-information': {
        intent: 'tour-information',
        sentiment: 'positive',
        confidence: 0.96,
        priority: 'high',
        escalationRequired: false,
        category: 'tour-information',
        response: {
          subject: `Re: ${ticket.subject}`,
          message: `Dear ${ticket.customerName},\n\nThank you for informing us about your dietary requirements. We absolutely can accommodate gluten-free options for your upcoming luxury cruise.\n\nOur executive chef specializes in dietary accommodations and will prepare a special gluten-free menu for you. This includes:\n- Gluten-free breakfast options\n- Specially prepared lunch and dinner\n- Gluten-free snacks and beverages\n- Dedicated preparation area to prevent cross-contamination\n\n${ticket.customerVIP ? 'As our valued VIP customer, we will also provide a complimentary wine pairing with your meals and priority seating in our exclusive dining area.' : ''}\n\nI will personally ensure the kitchen staff is briefed about your requirements before your arrival.\n\nLooking forward to providing you with an exceptional dining experience!\n\nBest regards,\nArticShorex AI Support Team`,
          tone: 'professional-attentive',
          personalization: 'VIP dining experience with dietary accommodation'
        }
      },
      'general-support': {
        intent: 'general-support',
        sentiment: 'negative',
        confidence: 0.89,
        priority: 'high',
        escalationRequired: true,
        category: 'general-support',
        response: {
          subject: `Re: ${ticket.subject}`,
          message: `Dear ${ticket.customerName},\n\nI sincerely apologize for the disappointing experience you had with our tour. Your feedback is extremely important to us, and I want to make this right immediately.\n\nI'm escalating your case to our customer service manager who will personally review your experience and contact you within 2 hours to discuss:\n- A full investigation of the issues you encountered\n- Immediate refund processing\n- Complimentary future tour to restore your confidence in our services\n\nWe take service quality very seriously and will use your feedback to improve our training and equipment standards.\n\nA senior team member will contact you shortly to resolve this matter to your complete satisfaction.\n\nSincerely,\nArticShorex AI Support Team`,
          tone: 'apologetic-professional',
          personalization: 'Service recovery with immediate escalation'
        }
      },
      'payment-issue': {
        intent: 'payment-issue',
        sentiment: 'neutral',
        confidence: 0.91,
        priority: 'medium',
        escalationRequired: false,
        category: 'payment-issue',
        response: {
          subject: `Re: ${ticket.subject}`,
          message: `Dear ${ticket.customerName},\n\nI understand your concern about the payment issue and I'm here to help resolve this immediately.\n\nI've checked our payment system and can see the failed transaction. Here's what I'm doing to resolve this:\n\n1. Initiating an immediate refund for the duplicate charge\n2. Resending your booking confirmation with correct payment status\n3. Providing a 10% discount on your next booking for the inconvenience\n\nThe refund will appear in your account within 3-5 business days. I'll send you a confirmation email with the refund reference number.\n\nYour booking remains confirmed and no further payment is required.\n\nIf you have any questions about this resolution, please don't hesitate to contact us.\n\nBest regards,\nArticShorex AI Support Team`,
          tone: 'solution-focused',
          personalization: 'Payment resolution with compensation'
        }
      }
    };

    return responses[ticket.category] || responses['general-support'];
  }

  generateDashboardMetrics(timeRange = '24h') {
    const baseMetrics = {
      totalReplies: Math.floor(Math.random() * 500) + 800,
      avgResponseTime: Math.random() * 2 + 0.8,
      resolutionRate: Math.random() * 10 + 90,
      aiConfidence: Math.random() * 10 + 85,
      customerSatisfaction: Math.random() * 1 + 4,
      escalationRate: Math.random() * 8 + 2
    };

    // Generate hourly data for the last 24 hours
    const hourlyData = [];
    for (let i = 23; i >= 0; i--) {
      const hour = new Date();
      hour.setHours(hour.getHours() - i);
      
      hourlyData.push({
        timestamp: hour.toISOString(),
        replies: Math.floor(Math.random() * 50) + 10,
        responseTime: Math.random() * 3 + 0.5,
        confidence: Math.random() * 15 + 85,
        satisfaction: Math.random() * 1.5 + 3.5
      });
    }

    return {
      ...baseMetrics,
      hourlyData,
      intentDistribution: {
        'weather-inquiry': 35,
        'booking-modification': 28,
        'tour-information': 22,
        'payment-issue': 8,
        'general-support': 7
      },
      sentimentDistribution: {
        'positive': 65,
        'neutral': 28,
        'negative': 5,
        'urgent': 2
      },
      channelDistribution: {
        'email': 72,
        'webhook': 28
      }
    };
  }

  generateRecentActivity(count = 10) {
    const activities = [];
    const scenarios = ['standard', 'urgent', 'vip', 'complaint', 'payment'];
    
    for (let i = 0; i < count; i++) {
      const customer = this.customers[Math.floor(Math.random() * this.customers.length)];
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      const ticket = this.generateMockTicket(customer.email, scenario);
      const aiResponse = this.generateMockAIResponse(ticket);
      
      const activity = {
        id: `activity_${i + 1}`,
        ticketId: ticket.ticketId,
        customer: ticket.customerName,
        email: ticket.customerEmail,
        subject: ticket.subject,
        channel: ticket.channel,
        priority: ticket.priority,
        category: ticket.category,
        status: aiResponse.escalationRequired ? 'escalated' : 'resolved',
        sentiment: aiResponse.sentiment,
        intent: aiResponse.intent,
        confidence: aiResponse.confidence,
        responseTime: Math.random() * 2 + 0.5,
        customerVIP: ticket.customerVIP,
        customerType: ticket.customerType,
        escalationRequired: aiResponse.escalationRequired,
        satisfactionScore: aiResponse.sentiment === 'positive' ? 5 : 
                           aiResponse.sentiment === 'neutral' ? 3 : 2,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Random time in last hour
        aiModel: 'claude-3-opus',
        processingTime: Math.random() * 1000 + 500 // ms
      };
      
      activities.push(activity);
    }
    
    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}

// Mock API Server for testing
class MockAPIServer {
  constructor() {
    this.dataGenerator = new MockDataGenerator();
    this.customers = this.dataGenerator.customers;
    this.tickets = [];
    this.activities = [];
  }

  // Mock MongoDB API endpoints
  async queryCustomers(email) {
    const customer = this.customers.find(c => c.email === email);
    if (!customer) {
      return { error: 'Customer not found' };
    }
    return customer;
  }

  async createTicket(ticketData) {
    const ticket = {
      _id: `ticket_${Date.now()}`,
      ...ticketData,
      createdAt: new Date().toISOString()
    };
    this.tickets.push(ticket);
    return { success: true, ticketId: ticket._id };
  }

  async updateCustomer(email, updateData) {
    const customerIndex = this.customers.findIndex(c => c.email === email);
    if (customerIndex === -1) {
      return { error: 'Customer not found' };
    }
    
    this.customers[customerIndex] = { ...this.customers[customerIndex], ...updateData };
    return { success: true };
  }

  async recordActivity(activityData) {
    const activity = {
      _id: `activity_${Date.now()}`,
      ...activityData,
      timestamp: new Date().toISOString()
    };
    this.activities.push(activity);
    return { success: true, activityId: activity._id };
  }

  // Dashboard API endpoints
  getDashboardMetrics(timeRange = '24h') {
    return this.dataGenerator.generateDashboardMetrics(timeRange);
  }

  getRecentActivity(limit = 20) {
    return this.dataGenerator.generateRecentActivity(limit);
  }

  getCustomerInsights(timeRange = '24h') {
    const customers = this.customers;
    return {
      vipCustomers: customers.filter(c => c.vipStatus === 'VIP').length,
      newCustomers: customers.filter(c => c.bookingHistory.length === 0).length,
      repeatInquiries: Math.floor(Math.random() * 15) + 5,
      bookingModifications: Math.floor(Math.random() * 30) + 20,
      loyaltyTierDistribution: {
        'Diamond': customers.filter(c => c.loyaltyTier === 'Diamond').length,
        'Platinum': customers.filter(c => c.loyaltyTier === 'Platinum').length,
        'Gold': customers.filter(c => c.loyaltyTier === 'Gold').length,
        'Silver': customers.filter(c => c.loyaltyTier === 'Silver').length,
        'Bronze': customers.filter(c => c.loyaltyTier === 'Bronze').length
      }
    };
  }
}

// Test scenarios for workflow validation
const testScenarios = [
  {
    name: 'Standard Weather Inquiry',
    input: {
      customerEmail: 'sarah.johnson@email.com',
      scenario: 'standard'
    },
    expectedOutput: {
      intent: 'weather-inquiry',
      escalationRequired: false,
      confidence: { min: 0.9, max: 1.0 }
    }
  },
  {
    name: 'Urgent Booking Modification',
    input: {
      customerEmail: 'michael.chen@email.com',
      scenario: 'urgent'
    },
    expectedOutput: {
      intent: 'booking-modification',
      escalationRequired: true,
      priority: 'urgent'
    }
  },
  {
    name: 'VIP Customer Request',
    input: {
      customerEmail: 'emma.rodriguez@email.com',
      scenario: 'vip'
    },
    expectedOutput: {
      intent: 'tour-information',
      escalationRequired: false,
      vipTreatment: true
    }
  },
  {
    name: 'Customer Complaint',
    input: {
      customerEmail: 'james.wilson@email.com',
      scenario: 'complaint'
    },
    expectedOutput: {
      intent: 'general-support',
      escalationRequired: true,
      sentiment: 'negative'
    }
  },
  {
    name: 'Payment Issue',
    input: {
      customerEmail: 'lisa.thompson@email.com',
      scenario: 'payment'
    },
    expectedOutput: {
      intent: 'payment-issue',
      escalationRequired: false,
      confidence: { min: 0.85, max: 1.0 }
    }
  }
];

module.exports = {
  MockDataGenerator,
  MockAPIServer,
  testScenarios
};

// If run directly, start mock server
if (require.main === module) {
  const mockServer = new MockAPIServer();
  console.log('🚀 Mock API Server initialized');
  console.log('📊 Dashboard metrics:', mockServer.getDashboardMetrics());
  console.log('📱 Recent activity:', mockServer.getRecentActivity(5));
  console.log('👥 Customer insights:', mockServer.getCustomerInsights());
} 
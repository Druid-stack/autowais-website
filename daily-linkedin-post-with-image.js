const { execSync } = require('child_process');

// Daily LinkedIn posts with blog images
const dailyLinkedInPosts = [
  {
    day: 1,
    title: "AI Automation in 2024: Transforming Business Operations",
    content: `🚀 AI Automation in 2024: Transforming Business Operations

Discover how artificial intelligence is revolutionizing business automation and creating new opportunities for efficiency and growth.

💡 Key Insights:
• Artificial Intelligence (AI) automation is no longer a futuristic concept—it's a present reality that's transforming how businesses operate across every industry.

🔗 Read the full article: https://autowais.com/blog/ai-automation-2024

#ArtificialIntelligence #AI #Automation #Technology #BusinessStrategy #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "ai-automation.png",
    imagePath: "public/images/blog/ai-automation.png"
  },
  {
    day: 2,
    title: "Digital Transformation Roadmap: A Step-by-Step Guide",
    content: `🚀 Digital Transformation Roadmap: A Step-by-Step Guide for Modern Businesses

Learn how to create and execute a successful digital transformation strategy that drives real business results.

💡 Key Insights:
• Digital transformation is more than just adopting new technologies—it's about fundamentally changing how your business operates and delivers value to customers.

🔗 Read the full article: https://autowais.com/blog/digital-transformation-roadmap

#DigitalTransformation #Strategy #Technology #Business #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "digital-transformation.png",
    imagePath: "public/images/blog/digital-transformation.png"
  },
  {
    day: 3,
    title: "Cloud Migration Best Practices: Ensuring a Smooth Transition",
    content: `🚀 Cloud Migration Best Practices: Ensuring a Smooth Transition

Essential strategies and considerations for migrating your business systems to the cloud securely and efficiently.

💡 Key Insights:
• Cloud migration offers numerous benefits including cost savings, scalability, and improved disaster recovery. However, a successful migration requires careful planning and execution.

🔗 Read the full article: https://autowais.com/blog/cloud-migration-best-practices

#CloudComputing #Cloud #Migration #Infrastructure #Security #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "cloud-migration.png",
    imagePath: "public/images/blog/cloud-migration.png"
  },
  {
    day: 4,
    title: "API Integration Mastery: Connecting Your Business Systems",
    content: `🚀 API Integration Mastery: Connecting Your Business Systems

Master the art of API integration to create seamless connections between your business applications and services.

💡 Key Insights:
• APIs (Application Programming Interfaces) are the backbone of modern software integration, enabling different systems to communicate and share data effectively.

🔗 Read the full article: https://autowais.com/blog/api-integration-guide

#Integration #API #Integration #Development #Architecture #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "api-integration.png",
    imagePath: "public/images/blog/api-integration.png"
  },
  {
    day: 5,
    title: "Cybersecurity for Small Businesses: Essential Protection Strategies",
    content: `🚀 Cybersecurity for Small Businesses: Essential Protection Strategies

Protect your small business from cyber threats with practical, cost-effective security measures and best practices.

💡 Key Insights:
• Small businesses are increasingly targeted by cybercriminals, making robust cybersecurity measures essential for protecting data, customers, and business reputation.

🔗 Read the full article: https://autowais.com/blog/cybersecurity-small-business

#Cybersecurity #Security #SmallBusiness #Protection #RiskManagement #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "cybersecurity.png",
    imagePath: "public/images/blog/cybersecurity.png"
  },
  {
    day: 6,
    title: "Turning Data into Insights: A Business Intelligence Guide",
    content: `🚀 Turning Data into Insights: A Business Intelligence Guide

Learn how to leverage data analytics and business intelligence tools to make informed decisions and drive growth.

💡 Key Insights:
• In today's data-driven world, the ability to extract insights from data is crucial for business success. Business intelligence transforms raw data into actionable information.

🔗 Read the full article: https://autowais.com/blog/data-analytics-business-intelligence

#DataAnalytics #Analytics #BusinessIntelligence #Data #DecisionMaking #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "data-analytics.png",
    imagePath: "public/images/blog/data-analytics.png"
  },
  {
    day: 7,
    title: "Mobile App Development Trends Shaping 2024",
    content: `🚀 Mobile App Development Trends Shaping 2024

Explore the latest trends in mobile app development and how they're changing user experiences and business opportunities.

💡 Key Insights:
• Mobile app development continues to evolve rapidly, with new technologies and user expectations driving innovation in how we create and interact with mobile applications.

🔗 Read the full article: https://autowais.com/blog/mobile-app-development-trends

#MobileDevelopment #Mobile #AppDevelopment #Trends #Technology #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "mobile-development.png",
    imagePath: "public/images/blog/mobile-development.png"
  },
  {
    day: 8,
    title: "Workflow Automation: Streamlining Business Processes",
    content: `🚀 Workflow Automation: Streamlining Business Processes for Maximum Efficiency

Discover how to identify, design, and implement automated workflows that eliminate bottlenecks and boost productivity.

💡 Key Insights:
• Workflow automation is transforming how businesses operate, eliminating manual tasks and reducing errors while improving speed and consistency.

🔗 Read the full article: https://autowais.com/blog/automation-workflow-optimization

#ProcessAutomation #Automation #Workflow #Efficiency #ProcessImprovement #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "workflow-automation.png",
    imagePath: "public/images/blog/workflow-automation.png"
  },
  {
    day: 9,
    title: "Building a Modern E-commerce Technology Stack",
    content: `🚀 Building a Modern E-commerce Technology Stack

Learn how to choose and integrate the right technologies for a scalable, secure, and high-performing e-commerce platform.

💡 Key Insights:
• A well-designed technology stack is the foundation of successful e-commerce operations, supporting everything from user experience to backend operations.

🔗 Read the full article: https://autowais.com/blog/ecommerce-technology-stack

#E-commerce #E-commerce #TechnologyStack #WebDevelopment #OnlineBusiness #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "ecommerce-stack.png",
    imagePath: "public/images/blog/ecommerce-stack.png"
  },
  {
    day: 10,
    title: "Essential Technology Tools for Remote Work Success",
    content: `🚀 Essential Technology Tools for Remote Work Success

Discover the must-have tools and technologies that enable productive, secure, and collaborative remote work environments.

💡 Key Insights:
• Remote work has become a permanent fixture in modern business, requiring the right technology tools to maintain productivity, collaboration, and security.

🔗 Read the full article: https://autowais.com/blog/remote-work-technology-tools

#RemoteWork #RemoteWork #Productivity #Collaboration #TechnologyTools #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`,
    image: "remote-work-tools.png",
    imagePath: "public/images/blog/remote-work-tools.png"
  }
];

function copyToClipboard(text) {
  try {
    const process = require('child_process');
    const child = process.spawn('pbcopy');
    child.stdin.write(text);
    child.stdin.end();
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error.message);
    return false;
  }
}

function openLinkedIn() {
  try {
    execSync('open -a Firefox "https://www.linkedin.com/company/108178504/admin/dashboard/"');
    return true;
  } catch (error) {
    console.error('Error opening LinkedIn:', error.message);
    return false;
  }
}

function getCurrentDay() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  return dayOfYear;
}

async function main() {
  console.log('🎯 Daily LinkedIn Post with Image');
  console.log('==================================\n');
  
  const currentDay = getCurrentDay();
  const postIndex = (currentDay - 1) % dailyLinkedInPosts.length;
  const todayPost = dailyLinkedInPosts[postIndex];
  
  console.log(`📅 Day ${currentDay} of the year`);
  console.log(`📝 Today's Post: ${todayPost.title}`);
  console.log(`🖼️  Blog Image: ${todayPost.image}`);
  console.log('');
  
  // Open LinkedIn
  console.log('📱 Opening LinkedIn company page...');
  openLinkedIn();
  
  // Copy post content to clipboard
  console.log('📋 Copying post content to clipboard...');
  if (copyToClipboard(todayPost.content)) {
    console.log('✅ Post content copied to clipboard!');
    console.log(`📊 Character count: ${todayPost.content.length}`);
  } else {
    console.log('❌ Failed to copy post content');
  }
  
  console.log('');
  console.log('📋 Instructions for posting with image:');
  console.log('1. Go to Firefox with LinkedIn');
  console.log('2. Click "Create a post"');
  console.log('3. Press Cmd+V to paste the content');
  console.log('4. Click the image icon (📷) to add image');
  console.log('5. Upload the blog image from:', todayPost.imagePath);
  console.log('6. Click "Post" to publish');
  console.log('');
  console.log('🖼️  Image file to upload:', todayPost.image);
  console.log('📁 Image location:', todayPost.imagePath);
  console.log('');
  console.log('🎉 Ready to post! The content is in your clipboard.');
}

main().catch(console.error); 
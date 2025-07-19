const fs = require('fs');
const { execSync } = require('child_process');

// LinkedIn posts data (all 10 posts)
const linkedInPosts = [
  {
    title: "AI Automation in 2024: Transforming Business Operations",
    content: `🚀 AI Automation in 2024: Transforming Business Operations

Discover how artificial intelligence is revolutionizing business automation and creating new opportunities for efficiency and growth.

💡 Key Insights:
• Artificial Intelligence (AI) automation is no longer a futuristic concept—it's a present reality that's transforming how businesses operate across every industry.

🔗 Read the full article: https://autowais.com/blog/ai-automation-2024

#ArtificialIntelligence #AI #Automation #Technology #BusinessStrategy #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Digital Transformation Roadmap: A Step-by-Step Guide",
    content: `🚀 Digital Transformation Roadmap: A Step-by-Step Guide for Modern Businesses

Learn how to create and execute a successful digital transformation strategy that drives real business results.

💡 Key Insights:
• Digital transformation is more than just adopting new technologies—it's about fundamentally changing how your business operates and delivers value to customers.

🔗 Read the full article: https://autowais.com/blog/digital-transformation-roadmap

#DigitalTransformation #Strategy #Technology #Business #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Cloud Migration Best Practices: Ensuring a Smooth Transition",
    content: `🚀 Cloud Migration Best Practices: Ensuring a Smooth Transition

Essential strategies and considerations for migrating your business systems to the cloud securely and efficiently.

💡 Key Insights:
• Cloud migration offers numerous benefits including cost savings, scalability, and improved disaster recovery. However, a successful migration requires careful planning and execution.

🔗 Read the full article: https://autowais.com/blog/cloud-migration-best-practices

#CloudComputing #Cloud #Migration #Infrastructure #Security #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "API Integration Mastery: Connecting Your Business Systems",
    content: `🚀 API Integration Mastery: Connecting Your Business Systems

Master the art of API integration to create seamless connections between your business applications and services.

💡 Key Insights:
• APIs (Application Programming Interfaces) are the backbone of modern software integration, enabling different systems to communicate and share data effectively.

🔗 Read the full article: https://autowais.com/blog/api-integration-guide

#Integration #API #Integration #Development #Architecture #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Cybersecurity for Small Businesses: Essential Protection Strategies",
    content: `🚀 Cybersecurity for Small Businesses: Essential Protection Strategies

Protect your small business from cyber threats with practical, cost-effective security measures and best practices.

💡 Key Insights:
• Small businesses are increasingly targeted by cybercriminals, making robust cybersecurity measures essential for protecting data, customers, and business reputation.

🔗 Read the full article: https://autowais.com/blog/cybersecurity-small-business

#Cybersecurity #Security #SmallBusiness #Protection #RiskManagement #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Turning Data into Insights: A Business Intelligence Guide",
    content: `🚀 Turning Data into Insights: A Business Intelligence Guide

Learn how to leverage data analytics and business intelligence tools to make informed decisions and drive growth.

💡 Key Insights:
• In today's data-driven world, the ability to extract insights from data is crucial for business success. Business intelligence transforms raw data into actionable information.

🔗 Read the full article: https://autowais.com/blog/data-analytics-business-intelligence

#DataAnalytics #Analytics #BusinessIntelligence #Data #DecisionMaking #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Mobile App Development Trends Shaping 2024",
    content: `🚀 Mobile App Development Trends Shaping 2024

Explore the latest trends in mobile app development and how they're changing user experiences and business opportunities.

💡 Key Insights:
• Mobile app development continues to evolve rapidly, with new technologies and user expectations driving innovation in how we create and interact with mobile applications.

🔗 Read the full article: https://autowais.com/blog/mobile-app-development-trends

#MobileDevelopment #Mobile #AppDevelopment #Trends #Technology #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Workflow Automation: Streamlining Business Processes",
    content: `🚀 Workflow Automation: Streamlining Business Processes for Maximum Efficiency

Discover how to identify, design, and implement automated workflows that eliminate bottlenecks and boost productivity.

💡 Key Insights:
• Workflow automation is transforming how businesses operate, eliminating manual tasks and reducing errors while improving speed and consistency.

🔗 Read the full article: https://autowais.com/blog/automation-workflow-optimization

#ProcessAutomation #Automation #Workflow #Efficiency #ProcessImprovement #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Building a Modern E-commerce Technology Stack",
    content: `🚀 Building a Modern E-commerce Technology Stack

Learn how to choose and integrate the right technologies for a scalable, secure, and high-performing e-commerce platform.

💡 Key Insights:
• A well-designed technology stack is the foundation of successful e-commerce operations, supporting everything from user experience to backend operations.

🔗 Read the full article: https://autowais.com/blog/ecommerce-technology-stack

#E-commerce #E-commerce #TechnologyStack #WebDevelopment #OnlineBusiness #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  },
  {
    title: "Essential Technology Tools for Remote Work Success",
    content: `🚀 Essential Technology Tools for Remote Work Success

Discover the must-have tools and technologies that enable productive, secure, and collaborative remote work environments.

💡 Key Insights:
• Remote work has become a permanent fixture in modern business, requiring the right technology tools to maintain productivity, collaboration, and security.

🔗 Read the full article: https://autowais.com/blog/remote-work-technology-tools

#RemoteWork #RemoteWork #Productivity #Collaboration #TechnologyTools #Autowais #BusinessAutomation #DigitalTransformation

#AutowaisTeam #BusinessInsights`
  }
];

// Function to copy text to clipboard on macOS
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

// Function to open LinkedIn company page
function openLinkedIn() {
  try {
    execSync('open "https://www.linkedin.com/company/108178504/admin/dashboard/"');
    return true;
  } catch (error) {
    console.error('Error opening LinkedIn:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🎯 LinkedIn Clipboard Poster');
  console.log('=============================\n');
  
  console.log('📱 Opening LinkedIn company page...');
  openLinkedIn();
  
  console.log('⏳ Waiting 3 seconds for browser to open...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('\n📋 Ready to copy posts to clipboard!\n');
  console.log('Instructions:');
  console.log('1. Each post will be copied to your clipboard');
  console.log('2. Go to LinkedIn and click "Create a post"');
  console.log('3. Press Cmd+V to paste the content');
  console.log('4. Click "Post" to publish');
  console.log('5. Press Enter to copy the next post\n');
  
  for (let i = 0; i < linkedInPosts.length; i++) {
    const post = linkedInPosts[i];
    
    console.log(`📝 Post ${i + 1}/${linkedInPosts.length}: ${post.title}`);
    console.log('📋 Copying to clipboard...');
    
    if (copyToClipboard(post.content)) {
      console.log('✅ Copied to clipboard!');
      console.log(`📊 Character count: ${post.content.length}`);
      console.log('🔗 Blog URL:', `https://autowais.com/blog/${post.id}`);
      console.log('');
      
      if (i < linkedInPosts.length - 1) {
        console.log('⏳ Press Enter to copy the next post, or Ctrl+C to stop...');
        await new Promise(resolve => {
          process.stdin.once('data', () => {
            console.log('');
            resolve();
          });
        });
      }
    } else {
      console.log('❌ Failed to copy to clipboard');
    }
  }
  
  console.log('🎉 All posts have been prepared!');
  console.log('📱 You can now post them to LinkedIn at your own pace.');
}

// Run the script
main().catch(console.error); 
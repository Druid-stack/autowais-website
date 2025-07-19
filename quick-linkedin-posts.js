const { execSync } = require('child_process');

// LinkedIn posts ready for copy-paste
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

async function main() {
  console.log('🎯 Quick LinkedIn Posts - Copy to Clipboard');
  console.log('============================================\n');
  
  console.log('📱 Firefox should be open with LinkedIn company page');
  console.log('📋 Each post will be copied to your clipboard\n');
  
  for (let i = 0; i < linkedInPosts.length; i++) {
    const post = linkedInPosts[i];
    
    console.log(`📝 Post ${i + 1}/${linkedInPosts.length}: ${post.title}`);
    console.log('📋 Copying to clipboard...');
    
    if (copyToClipboard(post.content)) {
      console.log('✅ Copied to clipboard!');
      console.log(`📊 Character count: ${post.content.length}`);
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
  console.log('\n📋 Instructions:');
  console.log('1. Go to Firefox with LinkedIn');
  console.log('2. Click "Create a post"');
  console.log('3. Press Cmd+V to paste the content');
  console.log('4. Click "Post" to publish');
  console.log('5. Repeat for each post');
}

main().catch(console.error); 
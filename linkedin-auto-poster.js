const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// LinkedIn posts data
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
  }
];

async function postToLinkedIn() {
  console.log('🚀 Starting LinkedIn Auto Poster...');
  
  // Launch browser
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for production
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to LinkedIn company page
    console.log('📱 Navigating to LinkedIn...');
    await page.goto('https://www.linkedin.com/company/108178504/admin/dashboard/', {
      waitUntil: 'networkidle2'
    });
    
    // Wait for login if needed
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(3000);
    
    // Check if we need to login
    const isLoggedIn = await page.evaluate(() => {
      return !document.querySelector('input[name="session_key"]');
    });
    
    if (!isLoggedIn) {
      console.log('🔐 Please log in to LinkedIn in the browser window...');
      console.log('⏳ Waiting for login to complete...');
      
      // Wait for user to login manually
      await page.waitForFunction(() => {
        return !document.querySelector('input[name="session_key"]');
      }, { timeout: 300000 }); // 5 minutes timeout
    }
    
    // Post each content
    for (let i = 0; i < linkedInPosts.length; i++) {
      const post = linkedInPosts[i];
      console.log(`📝 Posting: ${post.title}`);
      
      try {
        // Click "Create a post" button
        await page.waitForSelector('button[aria-label="Create a post"], button:contains("Create a post")', { timeout: 10000 });
        await page.click('button[aria-label="Create a post"], button:contains("Create a post")');
        
        // Wait for post modal
        await page.waitForSelector('[data-placeholder="What do you want to talk about?"], [contenteditable="true"]', { timeout: 10000 });
        
        // Type the post content
        await page.type('[data-placeholder="What do you want to talk about?"], [contenteditable="true"]', post.content, { delay: 50 });
        
        // Wait a moment
        await page.waitForTimeout(2000);
        
        // Click Post button
        await page.click('button:contains("Post"), button[aria-label="Post"]');
        
        console.log(`✅ Posted: ${post.title}`);
        
        // Wait between posts
        if (i < linkedInPosts.length - 1) {
          console.log('⏳ Waiting 30 seconds before next post...');
          await page.waitForTimeout(30000);
        }
        
      } catch (error) {
        console.error(`❌ Error posting "${post.title}":`, error.message);
        continue;
      }
    }
    
    console.log('🎉 All posts completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Keep browser open for 10 seconds to see results
    console.log('⏳ Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    await browser.close();
  }
}

// Check if Puppeteer is installed
async function checkDependencies() {
  try {
    require('puppeteer');
    console.log('✅ Puppeteer is available');
    return true;
  } catch (error) {
    console.log('❌ Puppeteer not found. Installing...');
    return false;
  }
}

// Main execution
async function main() {
  const hasPuppeteer = await checkDependencies();
  
  if (!hasPuppeteer) {
    console.log('📦 Installing Puppeteer...');
    const { execSync } = require('child_process');
    try {
      execSync('npm install puppeteer', { stdio: 'inherit' });
      console.log('✅ Puppeteer installed successfully');
    } catch (error) {
      console.error('❌ Failed to install Puppeteer:', error.message);
      return;
    }
  }
  
  await postToLinkedIn();
}

// Run the script
main().catch(console.error); 
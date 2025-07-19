const puppeteer = require('puppeteer');

// LinkedIn posts data (first 3 posts)
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
  
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Navigate to LinkedIn company page
    console.log('📱 Navigating to LinkedIn...');
    await page.goto('https://www.linkedin.com/company/108178504/admin/dashboard/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('⏳ Page loaded. Waiting for user to login...');
    
    // Wait for user to login manually
    console.log('🔐 Please log in to LinkedIn in the browser window...');
    console.log('⏳ Waiting for login to complete...');
    
    // Wait for the page to be fully loaded after login
    await page.waitForFunction(() => {
      return document.querySelector('button[aria-label="Create a post"]') || 
             document.querySelector('button:contains("Create a post")') ||
             document.querySelector('[data-test-id="create-post-button"]');
    }, { timeout: 300000 }); // 5 minutes timeout
    
    console.log('✅ Login detected! Starting to post...');
    
    // Post each content
    for (let i = 0; i < linkedInPosts.length; i++) {
      const post = linkedInPosts[i];
      console.log(`📝 Posting ${i + 1}/${linkedInPosts.length}: ${post.title}`);
      
      try {
        // Click "Create a post" button
        const createPostButton = await page.waitForSelector(
          'button[aria-label="Create a post"], button:contains("Create a post"), [data-test-id="create-post-button"]',
          { timeout: 10000 }
        );
        await createPostButton.click();
        
        // Wait for post modal and text area
        await page.waitForTimeout(2000);
        
        // Find and fill the post text area
        const textArea = await page.waitForSelector(
          '[data-placeholder="What do you want to talk about?"], [contenteditable="true"], textarea',
          { timeout: 10000 }
        );
        
        // Clear and type the content
        await textArea.click();
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        
        // Type the content with delays
        await page.keyboard.type(post.content, { delay: 30 });
        
        await page.waitForTimeout(2000);
        
        // Find and click the Post button
        const postButton = await page.waitForSelector(
          'button:contains("Post"), button[aria-label="Post"], [data-test-id="post-button"]',
          { timeout: 10000 }
        );
        await postButton.click();
        
        console.log(`✅ Successfully posted: ${post.title}`);
        
        // Wait between posts
        if (i < linkedInPosts.length - 1) {
          console.log('⏳ Waiting 45 seconds before next post...');
          await page.waitForTimeout(45000);
        }
        
      } catch (error) {
        console.error(`❌ Error posting "${post.title}":`, error.message);
        console.log('🔄 Continuing with next post...');
        continue;
      }
    }
    
    console.log('🎉 All posts completed!');
    console.log('⏳ Keeping browser open for 30 seconds to see results...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
postToLinkedIn().catch(console.error); 
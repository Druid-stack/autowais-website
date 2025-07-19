const puppeteer = require('puppeteer');

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
  console.log('🚀 Starting Firefox LinkedIn Auto Poster...');
  
  // Launch Firefox browser
  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent for Firefox
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0');
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('📱 Navigating to LinkedIn company page...');
    await page.goto('https://www.linkedin.com/company/108178504/admin/dashboard/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('⏳ Page loaded. Waiting for manual login...');
    console.log('🔐 Please log in to LinkedIn in the Firefox window...');
    
    // Wait for user to login manually - look for various post button indicators
    await page.waitForFunction(() => {
      return document.querySelector('[data-test-id="create-post-button"]') || 
             document.querySelector('button[aria-label*="Create a post"]') ||
             document.querySelector('button[aria-label*="Start a post"]') ||
             document.querySelector('button:contains("Create a post")') ||
             document.querySelector('button:contains("Start a post")') ||
             document.querySelector('.artdeco-button[aria-label*="post"]');
    }, { timeout: 300000 }); // 5 minutes timeout
    
    console.log('✅ Login detected! Starting to post...');
    
    // Post each content
    for (let i = 0; i < linkedInPosts.length; i++) {
      const post = linkedInPosts[i];
      console.log(`\n📝 Posting ${i + 1}/${linkedInPosts.length}: ${post.title}`);
      
      try {
        // Try different selectors for the create post button
        const createPostButton = await page.waitForSelector([
          '[data-test-id="create-post-button"]',
          'button[aria-label*="Create a post"]',
          'button[aria-label*="Start a post"]',
          '.artdeco-button[aria-label*="post"]',
          'button:has-text("Create a post")',
          'button:has-text("Start a post")'
        ].join(','), { timeout: 15000 });
        
        await createPostButton.click();
        console.log('✅ Clicked create post button');
        
        // Wait for post modal to appear
        await page.waitForSelector([
          '[data-test-id="post-modal"]',
          '[role="dialog"]',
          '.artdeco-modal',
          'div[aria-label*="post"]',
          '.share-box'
        ].join(','), { timeout: 15000 });
        
        console.log('✅ Post modal opened');
        
        // Find the text area and type content
        const textArea = await page.waitForSelector([
          '[data-test-id="post-text-area"]',
          '[role="textbox"]',
          'textarea',
          'div[contenteditable="true"]',
          '.ql-editor',
          '.share-text'
        ].join(','), { timeout: 15000 });
        
        // Clear existing content and type new content
        await textArea.click();
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        
        // Type content with delays
        await textArea.type(post.content, { delay: 50 });
        console.log('✅ Content typed');
        
        // Wait a moment for content to process
        await page.waitForTimeout(3000);
        
        // Find and click the post button
        const postButton = await page.waitForSelector([
          '[data-test-id="post-button"]',
          'button:has-text("Post")',
          'button[aria-label*="Post"]',
          '.artdeco-button:has-text("Post")',
          '.share-actions__primary-action'
        ].join(','), { timeout: 15000 });
        
        await postButton.click();
        console.log('✅ Post button clicked');
        
        // Wait for post to be published
        await page.waitForTimeout(5000);
        
        console.log(`✅ Successfully posted: ${post.title}`);
        
        // Wait before next post
        if (i < linkedInPosts.length - 1) {
          console.log('⏳ Waiting 15 seconds before next post...');
          await page.waitForTimeout(15000);
        }
        
      } catch (error) {
        console.error(`❌ Error posting "${post.title}":`, error.message);
        console.log('🔄 Continuing with next post...');
        await page.waitForTimeout(5000);
      }
    }
    
    console.log('\n🎉 All posts completed!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  } finally {
    console.log('🔒 Keeping browser open for 30 seconds...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    await browser.close();
  }
}

// Run the script
postToLinkedIn().catch(console.error); 
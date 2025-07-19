const { execSync } = require('child_process');

// First LinkedIn post with blog image
const firstPost = {
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
};

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

async function main() {
  console.log('🎯 First LinkedIn Post with Image');
  console.log('==================================\n');
  
  console.log(`📝 Post: ${firstPost.title}`);
  console.log(`🖼️  Blog Image: ${firstPost.image}`);
  console.log('');
  
  // Open LinkedIn
  console.log('📱 Opening LinkedIn company page...');
  openLinkedIn();
  
  // Copy post content to clipboard
  console.log('📋 Copying post content to clipboard...');
  if (copyToClipboard(firstPost.content)) {
    console.log('✅ Post content copied to clipboard!');
    console.log(`📊 Character count: ${firstPost.content.length}`);
  } else {
    console.log('❌ Failed to copy post content');
  }
  
  console.log('');
  console.log('📋 Instructions for posting with image:');
  console.log('1. Go to Firefox with LinkedIn');
  console.log('2. Click "Create a post"');
  console.log('3. Press Cmd+V to paste the content');
  console.log('4. Click the image icon (📷) to add image');
  console.log('5. Upload the blog image from:', firstPost.imagePath);
  console.log('6. Click "Post" to publish');
  console.log('');
  console.log('🖼️  Image file to upload:', firstPost.image);
  console.log('📁 Image location:', firstPost.imagePath);
  console.log('');
  console.log('🎉 Ready to post! The content is in your clipboard.');
  console.log('');
  console.log('📝 Post Content Preview:');
  console.log('========================');
  console.log(firstPost.content);
}

main().catch(console.error); 
const LinkedInIntegration = require('./linkedin-integration');
require('dotenv').config();

async function testLinkedInPosting() {
  console.log('🔗 Testing LinkedIn Posting for Autowais\n');
  
  const linkedIn = new LinkedInIntegration();
  
  // Check if credentials are set
  if (!linkedIn.clientId || linkedIn.clientId === 'your_linkedin_client_id_here') {
    console.log('❌ Please update your .env file with your real LinkedIn credentials!');
    return;
  }
  
  console.log('✅ LinkedIn credentials found:');
  console.log(`   Client ID: ${linkedIn.clientId.substring(0, 10)}...`);
  console.log(`   Organization ID: ${linkedIn.organizationId}`);
  console.log(`   Access Token: ${linkedIn.accessToken.substring(0, 20)}...\n`);
  
  // Test blog post formatting
  console.log('📝 Testing blog post formatting...');
  const sampleBlog = {
    title: "Navigating Change Management in the Age of AI",
    excerpt: "Explore how businesses can overcome resistance and drive successful AI adoption across teams.",
    content: "In today's rapidly evolving business landscape, organizations face unprecedented challenges in implementing AI-driven automation. This blog explores the key obstacles and provides actionable strategies for successful change management.",
    tags: ["AI", "Automation", "Change Management", "Digital Transformation"],
    author: "Autowais Team"
  };
  
  const formattedContent = linkedIn.formatBlogForLinkedIn(sampleBlog);
  console.log('✅ Blog post formatted successfully');
  console.log('Preview:');
  console.log(formattedContent.substring(0, 200) + '...\n');
  
  // Test posting capability (without actually posting)
  console.log('🚀 Testing posting capability...');
  console.log('   Organization ID:', linkedIn.organizationId);
  console.log('   Share URL:', linkedIn.shareUrl);
  console.log('   Token valid:', linkedIn.accessToken ? 'Yes' : 'No');
  
  if (linkedIn.organizationId === 'your_linkedin_organization_id_here') {
    console.log('⚠️  Warning: Organization ID is still placeholder');
    console.log('   You need to update LINKEDIN_ORGANIZATION_ID in your .env file');
  } else {
    console.log('✅ Organization ID is set');
  }
  
  console.log('\n📋 Ready to post! To post your first blog:');
  console.log('   node post-blog-to-linkedin.js 1');
  console.log('\n📚 To see all available blogs:');
  console.log('   node post-blog-to-linkedin.js list');
  
  console.log('\n✅ LinkedIn posting test completed!');
}

if (require.main === module) {
  testLinkedInPosting().catch(console.error);
} 
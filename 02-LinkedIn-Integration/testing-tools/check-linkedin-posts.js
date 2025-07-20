const axios = require('axios');
require('dotenv').config();

async function checkLinkedInPosts() {
  console.log('🔍 Checking LinkedIn Posting History\n');
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  if (!accessToken || accessToken === 'your_linkedin_access_token_here') {
    console.log('❌ Please update your .env file with your real LinkedIn access token!');
    return;
  }
  
  console.log('✅ Access token found');
  console.log(`📊 Organization ID: ${organizationId}\n`);
  
  try {
    // Get recent posts from the organization
    const response = await axios.get(`https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${organizationId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    if (response.data && response.data.elements && response.data.elements.length > 0) {
      console.log('📈 Recent LinkedIn Posts:');
      response.data.elements.forEach((post, index) => {
        console.log(`   ${index + 1}. Post ID: ${post.shareId}`);
        console.log(`      Created: ${post.createdAt}`);
        console.log(`      Views: ${post.totalShareStatistics?.impressionCount || 'N/A'}`);
        console.log(`      Engagement: ${post.totalShareStatistics?.engagement || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('📭 No recent posts found');
      console.log('💡 This might mean:');
      console.log('   - No posts have been made yet');
      console.log('   - Posts are older than the API can retrieve');
      console.log('   - Different permissions are needed');
    }
    
  } catch (error) {
    console.log('❌ Error checking posts:', error.response?.data || error.message);
    console.log('\n💡 Alternative: Check manually on LinkedIn');
    console.log('   1. Go to your LinkedIn company page');
    console.log('   2. Check the "Posts" tab');
    console.log('   3. See what content has been published');
  }
  
  // Also check the blog posts file to see what's available
  console.log('\n📚 Available Blog Posts in System:');
  try {
    const fs = require('fs');
    const blogContent = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    
    // Extract blog titles
    const blogTitles = blogContent.match(/\d+\.\s+(.+?)(?=\n\d+\.|$)/g);
    if (blogTitles) {
      blogTitles.forEach((title, index) => {
        console.log(`   ${index + 1}. ${title.replace(/^\d+\.\s+/, '')}`);
      });
    }
  } catch (error) {
    console.log('   Could not read blog posts file');
  }
  
  console.log('\n🎯 To post a new blog:');
  console.log('   node post-blog-to-linkedin.js [number]');
  console.log('   node post-blog-to-linkedin.js random');
}

if (require.main === module) {
  checkLinkedInPosts().catch(console.error);
} 
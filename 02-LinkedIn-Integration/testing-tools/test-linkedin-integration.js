const LinkedInIntegration = require('../linkedin-integration');
require('dotenv').config();

// Sample blog post for testing
const sampleBlogPost = {
  title: "Navigating Change Management in the Age of AI",
  excerpt: "Explore how businesses can overcome resistance and drive successful AI adoption across teams.",
  content: `
    <p>AI adoption is not just a technical challenge—it's a human one. Many organizations struggle with change management as they introduce AI-driven processes.</p>
    <h2>Key Challenges</h2>
    <ul>
      <li>Employee resistance to automation</li>
      <li>Lack of AI literacy across teams</li>
      <li>Unclear ROI and business value</li>
    </ul>
    <h2>Solutions</h2>
    <p>Engage stakeholders early, provide hands-on training, and celebrate quick wins to build momentum for AI initiatives.</p>
  `,
  tags: ['AI', 'Change Management', 'Leadership', 'Automation']
};

async function testLinkedInIntegration() {
  console.log('🔗 Testing LinkedIn Integration for Autowais\n');

  const linkedIn = new LinkedInIntegration();

  // Test 1: Check configuration
  console.log('1. Checking configuration...');
  console.log(`   Client ID: ${linkedIn.clientId ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Client Secret: ${linkedIn.clientSecret ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Organization ID: ${linkedIn.organizationId ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Access Token: ${linkedIn.accessToken ? '✅ Set' : '❌ Missing'}\n`);

  // Test 2: Generate auth URL
  console.log('2. Generating OAuth URL...');
  const redirectUri = 'http://localhost:3000/api/auth/callback';
  const authUrl = linkedIn.getAuthUrl(redirectUri);
  console.log(`Updated Auth URL: ${authUrl}`);

  // Test 3: Test connection (if access token is available)
  if (linkedIn.accessToken) {
    console.log('3. Testing LinkedIn connection...');
    try {
      const connectionTest = await linkedIn.testConnection();
      if (connectionTest.success) {
        console.log('   ✅ LinkedIn connection successful');
        console.log(`   Profile: ${connectionTest.profile.localizedFirstName} ${connectionTest.profile.localizedLastName}`);
      } else {
        console.log('   ❌ LinkedIn connection failed');
        console.log(`   Error: ${connectionTest.error}`);
      }
    } catch (error) {
      console.log('   ❌ Connection test error:', error.message);
    }
    console.log('');

    // Test 4: Format blog post for LinkedIn
    console.log('4. Formatting blog post for LinkedIn...');
    const formattedContent = linkedIn.formatBlogForLinkedIn(sampleBlogPost);
    console.log('   ✅ Blog post formatted successfully');
    console.log('   Preview:');
    console.log('   ' + formattedContent.substring(0, 200) + '...\n');

    // Test 5: Test posting (commented out for safety)
    console.log('5. Ready to post to LinkedIn');
    console.log('   ⚠️  Posting is disabled for safety');
    console.log('   To enable posting, uncomment the code below\n');

    /*
    // Uncomment this section to actually post to LinkedIn
    console.log('5. Posting to LinkedIn...');
    try {
      const postResult = await linkedIn.postBlogContent(sampleBlogPost);
      if (postResult.success) {
        console.log('   ✅ Post published successfully');
        console.log(`   Post ID: ${postResult.postId}`);
      } else {
        console.log('   ❌ Post failed');
        console.log(`   Error: ${postResult.error}`);
      }
    } catch (error) {
      console.log('   ❌ Posting error:', error.message);
    }
    */
  } else {
    console.log('3. ⚠️  No access token available');
    console.log('   To get an access token:');
    console.log('   1. Visit the auth URL above');
    console.log('   2. Authorize the application');
    console.log('   3. Copy the authorization code from the redirect URL');
    console.log('   4. Use the getAccessToken() method to exchange it for an access token\n');
  }

  // Test 6: Show usage examples
  console.log('6. Usage Examples:');
  console.log('   // Post a simple text update');
  console.log('   const result = await linkedIn.postTextUpdate("Hello LinkedIn!");');
  console.log('');
  console.log('   // Post a formatted blog post');
  console.log('   const blogResult = await linkedIn.postBlogContent(blogPost);');
  console.log('');
  console.log('   // Schedule a post for later');
  console.log('   const scheduled = await linkedIn.schedulePost(content, scheduledTime);');
  console.log('');

  console.log('✅ LinkedIn integration test completed!\n');
}

// Helper function to get access token from authorization code
async function getAccessTokenFromCode(code) {
  const linkedIn = new LinkedInIntegration();
  
  try {
    console.log('🔄 Exchanging authorization code for access token...');
    const result = await linkedIn.getAccessToken(code);
    
    console.log('✅ Access token obtained successfully!');
    console.log(`   Access Token: ${result.accessToken.substring(0, 20)}...`);
    console.log(`   Refresh Token: ${result.refreshToken.substring(0, 20)}...`);
    console.log(`   Expires In: ${result.expiresIn} seconds`);
    
    console.log('\n📝 Add these to your .env file:');
    console.log(`LINKEDIN_ACCESS_TOKEN=${result.accessToken}`);
    console.log(`LINKEDIN_REFRESH_TOKEN=${result.refreshToken}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error getting access token:', error.message);
    throw error;
  }
}

// Helper function to refresh access token
async function refreshToken() {
  const linkedIn = new LinkedInIntegration();
  
  if (!linkedIn.refreshToken) {
    console.log('❌ No refresh token available');
    return;
  }
  
  try {
    console.log('🔄 Refreshing access token...');
    const result = await linkedIn.refreshAccessToken();
    
    console.log('✅ Access token refreshed successfully!');
    console.log(`   New Access Token: ${result.accessToken.substring(0, 20)}...`);
    console.log(`   New Refresh Token: ${result.refreshToken.substring(0, 20)}...`);
    
    console.log('\n📝 Update your .env file with the new tokens');
    
    return result;
  } catch (error) {
    console.error('❌ Error refreshing token:', error.message);
    throw error;
  }
}

// Export functions for use in other scripts
module.exports = {
  testLinkedInIntegration,
  getAccessTokenFromCode,
  refreshToken,
  LinkedInIntegration
};

// Run test if this file is executed directly
if (require.main === module) {
  testLinkedInIntegration().catch(console.error);
} 
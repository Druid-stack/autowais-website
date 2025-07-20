const LinkedInIntegration = require('./linkedin-integration');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getLinkedInToken() {
  console.log('🔗 LinkedIn Access Token Generator for Autowais\n');
  
  const linkedIn = new LinkedInIntegration();
  
  // Check if credentials are set
  if (!linkedIn.clientId || linkedIn.clientId === 'your_linkedin_client_id_here') {
    console.log('❌ Please update your .env file with your real LinkedIn credentials first!');
    console.log('   You need to replace:');
    console.log('   - your_linkedin_client_id_here');
    console.log('   - your_linkedin_client_secret_here');
    console.log('   - your_linkedin_organization_id_here');
    return;
  }
  
  console.log('✅ LinkedIn credentials found in .env file');
  console.log(`   Client ID: ${linkedIn.clientId.substring(0, 10)}...`);
  console.log(`   Organization ID: ${linkedIn.organizationId}\n`);
  
  // Generate authorization URL
  const authUrl = linkedIn.getAuthUrl();
  console.log('🔗 Step 1: Visit this URL to authorize:');
  console.log(authUrl);
  console.log('\n📋 Step 2: After authorization, you\'ll be redirected to a URL like:');
  console.log('   http://localhost:3000/api/auth/linkedin/callback?code=AQT...&state=...');
  console.log('\n📝 Step 3: Copy the "code" parameter from the URL\n');
  
  // Get authorization code from user
  rl.question('Enter the authorization code: ', async (code) => {
    try {
      console.log('\n🔄 Exchanging code for access token...');
      const result = await linkedIn.getAccessToken(code);
      
      console.log('\n✅ Success! Here are your tokens:\n');
      console.log('📝 Add these to your .env file:');
      console.log(`LINKEDIN_ACCESS_TOKEN=${result.accessToken}`);
      console.log(`LINKEDIN_REFRESH_TOKEN=${result.refreshToken}`);
      console.log('\n💡 After updating .env, you can post blogs with:');
      console.log('   node post-blog-to-linkedin.js 1');
      
    } catch (error) {
      console.error('\n❌ Error getting access token:', error.message);
      console.log('\n💡 Make sure:');
      console.log('1. You copied the code correctly');
      console.log('2. Your LinkedIn app is properly configured');
      console.log('3. The redirect URI matches your app settings');
    }
    
    rl.close();
  });
}

// Alternative: Manual token input
async function manualTokenInput() {
  console.log('\n🔑 Manual Token Input (Alternative Method)\n');
  console.log('If you already have an access token, you can enter it manually.\n');
  
  rl.question('Enter your LinkedIn access token: ', (token) => {
    console.log('\n📝 Add this to your .env file:');
    console.log(`LINKEDIN_ACCESS_TOKEN=${token}`);
    console.log('\n💡 After updating .env, you can post blogs with:');
    console.log('   node post-blog-to-linkedin.js 1');
    rl.close();
  });
}

// Main menu
async function main() {
  console.log('Choose an option:');
  console.log('1. Get token via OAuth (recommended)');
  console.log('2. Enter token manually');
  console.log('3. Exit');
  
  rl.question('\nEnter your choice (1-3): ', (choice) => {
    switch (choice) {
      case '1':
        getLinkedInToken();
        break;
      case '2':
        manualTokenInput();
        break;
      case '3':
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        rl.close();
    }
  });
}

if (require.main === module) {
  main().catch(console.error);
} 
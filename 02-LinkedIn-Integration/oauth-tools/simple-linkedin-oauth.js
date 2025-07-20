const axios = require('axios');
require('dotenv').config();

async function generateLinkedInToken() {
  console.log('🔗 Simple LinkedIn Token Generator\n');
  
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  
  if (!clientId || clientId === 'your_linkedin_client_id_here') {
    console.log('❌ Please update your .env file with your real LinkedIn credentials!');
    return;
  }
  
  console.log('✅ Using your LinkedIn credentials:');
  console.log(`   Client ID: ${clientId.substring(0, 10)}...`);
  console.log(`   Client Secret: ${clientSecret.substring(0, 10)}...\n`);
  
  console.log('🔗 Step 1: Visit this authorization URL in your browser:');
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/linkedin/callback')}&scope=r_liteprofile%20r_emailaddress%20w_member_social&state=autowais-blog-automation`;
  
  console.log(authUrl);
  console.log('\n📋 Step 2: After authorization, you\'ll be redirected to a URL like:');
  console.log('   http://localhost:3000/api/auth/linkedin/callback?code=AQT...&state=...');
  console.log('\n📝 Step 3: Copy the "code" parameter (starts with AQT...)');
  console.log('\n💡 Alternative: Use the LinkedIn Developer Console');
  console.log('   1. Go to https://www.linkedin.com/developers/apps');
  console.log('   2. Select your app');
  console.log('   3. Go to "Auth" tab');
  console.log('   4. Scroll down to "Generate access token"');
  console.log('   5. Select permissions: r_liteprofile, r_emailaddress, w_member_social');
  console.log('   6. Click "Generate"');
  console.log('   7. Copy the token\n');
  
  console.log('🎯 Once you have the token, update your .env file:');
  console.log('   LINKEDIN_ACCESS_TOKEN=your_actual_token_here');
  console.log('\n🚀 Then test with: node test-linkedin-integration.js');
}

// Check if we can find the generate token section
async function checkLinkedInApp() {
  console.log('🔍 Checking LinkedIn app configuration...\n');
  
  console.log('📋 What you should see in LinkedIn Developer Console:');
  console.log('   1. ✅ Authentication keys (you can see this)');
  console.log('   2. ✅ OAuth 2.0 settings (you can see this)');
  console.log('   3. ✅ OAuth 2.0 scopes (you can see this)');
  console.log('   4. 🔍 Generate access token (scroll down to find this)');
  console.log('   5. 🔍 Access tokens (might be in a different section)\n');
  
  console.log('💡 If you don\'t see "Generate access token":');
  console.log('   - Scroll down further on the Auth page');
  console.log('   - Check if your app needs verification');
  console.log('   - Look in the "Products" or "Tools" tabs');
  console.log('   - Try refreshing the page');
}

if (require.main === module) {
  console.log('Choose an option:');
  console.log('1. Generate OAuth URL');
  console.log('2. Check LinkedIn app configuration');
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\nEnter your choice (1-2): ', (choice) => {
    switch (choice) {
      case '1':
        generateLinkedInToken();
        break;
      case '2':
        checkLinkedInApp();
        break;
      default:
        console.log('Invalid choice. Running OAuth URL generator...');
        generateLinkedInToken();
    }
    rl.close();
  });
} 
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🔧 LinkedIn API Permissions - Direct Fix\n');

// Function to generate OAuth URL
function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  if (!clientId) {
    console.log('❌ LINKEDIN_CLIENT_ID not found');
    return null;
  }
  
  // All required scopes for posting
  const scopes = [
    'r_liteprofile',           // Read basic profile
    'r_emailaddress',          // Read email address
    'w_member_social',         // Write posts to personal profile
    'rw_organization_admin'    // Manage company page posts
  ].join(',');
  
  const redirectUri = 'http://localhost:3000';
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=direct_fix_${Date.now()}`;
  
  return authUrl;
}

// Function to exchange code for token
async function exchangeCodeForToken(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000';
  
  if (!clientId || !clientSecret) {
    console.log('❌ Missing LinkedIn credentials');
    return null;
  }
  
  try {
    console.log('🔄 Exchanging authorization code for access token...');
    
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    return response.data;
    
  } catch (error) {
    console.log('❌ Token exchange failed:', error.response?.data || error.message);
    return null;
  }
}

// Function to update .env file
function updateEnvFile(newToken) {
  try {
    let envContent = '';
    
    if (fs.existsSync('.env')) {
      envContent = fs.readFileSync('.env', 'utf8');
    }
    
    if (envContent.includes('LINKEDIN_ACCESS_TOKEN=')) {
      envContent = envContent.replace(
        /LINKEDIN_ACCESS_TOKEN=.*/,
        `LINKEDIN_ACCESS_TOKEN=${newToken}`
      );
    } else {
      envContent += `\nLINKEDIN_ACCESS_TOKEN=${newToken}`;
    }
    
    fs.writeFileSync('.env', envContent);
    console.log('✅ Updated .env file with new access token');
    return true;
    
  } catch (error) {
    console.log('❌ Failed to update .env:', error.message);
    return false;
  }
}

// Function to test new token
async function testNewToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('❌ No access token found');
    return false;
  }
  
  try {
    console.log('\n🧪 Testing new token permissions...');
    
    const response = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Token test successful!');
    console.log('Profile:', response.data.localizedFirstName, response.data.localizedLastName);
    console.log('ID:', response.data.id);
    
    return true;
    
  } catch (error) {
    console.log('❌ Token test failed:', error.response?.status);
    console.log('Error:', error.response?.data?.message || error.message);
    return false;
  }
}

// Function to post test blog
async function postTestBlog() {
  console.log('\n🎯 Testing blog posting with fixed permissions...\n');
  
  const tokenValid = await testNewToken();
  
  if (!tokenValid) {
    console.log('❌ Token still not valid. Cannot post blog.');
    return;
  }
  
  // Try to post using the direct simple approach
  const result = await require('./post-blog-direct-simple.js');
  
  if (result && result.success) {
    console.log('\n🎉 Blog posted successfully with fixed permissions!');
  } else {
    console.log('\n❌ Blog posting failed. Manual posting recommended.');
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node fix-permissions-direct.js auth        - Generate OAuth URL');
    console.log('  node fix-permissions-direct.js token <code> - Exchange code for token');
    console.log('  node fix-permissions-direct.js test        - Test permissions');
    console.log('  node fix-permissions-direct.js post        - Post test blog\n');
    
  } else if (args[0] === 'auth') {
    const authUrl = generateOAuthURL();
    
    if (authUrl) {
      console.log('🔗 OAuth URL with all required permissions:');
      console.log('='.repeat(80));
      console.log(authUrl);
      console.log('='.repeat(80));
      console.log('\n📋 Instructions:');
      console.log('1. Copy this URL and open in browser');
      console.log('2. Authorize with ALL requested permissions');
      console.log('3. Copy the "code" from the URL');
      console.log('4. Run: node fix-permissions-direct.js token <your_code>');
      console.log('\n💡 Make sure your LinkedIn app has redirect URI: http://localhost:3000');
    }
    
  } else if (args[0] === 'token' && args[1]) {
    const tokenData = await exchangeCodeForToken(args[1]);
    
    if (tokenData && tokenData.access_token) {
      console.log('✅ New token received!');
      console.log('Scopes:', tokenData.scope);
      
      if (updateEnvFile(tokenData.access_token)) {
        console.log('\n🎉 API permissions fixed! Testing new token...');
        await testNewToken();
      }
    } else {
      console.log('❌ Failed to get new token');
    }
    
  } else if (args[0] === 'test') {
    await testNewToken();
    
  } else if (args[0] === 'post') {
    await postTestBlog();
    
  } else {
    console.log('❌ Invalid command');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
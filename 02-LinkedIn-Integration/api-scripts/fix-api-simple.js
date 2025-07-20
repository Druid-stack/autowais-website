const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Function to test current token
async function testCurrentToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  console.log('🔍 Testing current LinkedIn token...\n');
  
  if (!accessToken) {
    console.log('❌ No access token found');
    return false;
  }
  
  try {
    const response = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Token is valid!');
    console.log('Profile:', response.data.localizedFirstName, response.data.localizedLastName);
    return true;
    
  } catch (error) {
    console.log('❌ Token test failed:', error.response?.status);
    return false;
  }
}

// Function to generate OAuth URL
function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  if (!clientId) {
    console.log('❌ LINKEDIN_CLIENT_ID not found in .env file');
    return null;
  }
  
  const scopes = [
    'r_liteprofile',
    'r_emailaddress', 
    'w_member_social',
    'rw_organization_admin'
  ].join(',');
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent('http://localhost:3000/callback')}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=fix_api_${Date.now()}`;
  
  return authUrl;
}

// Function to exchange code for token
async function exchangeCodeForToken(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.log('❌ Missing LinkedIn credentials');
    return null;
  }
  
  try {
    console.log('🔄 Exchanging code for token...');
    
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: 'http://localhost:3000/callback'
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
    console.log('✅ Updated .env file with new token');
    return true;
    
  } catch (error) {
    console.log('❌ Failed to update .env:', error.message);
    return false;
  }
}

// Function to post blog with fixed API
async function postBlogWithFixedAPI(blogNumber) {
  console.log('🎯 Testing API before posting...\n');
  
  const tokenOk = await testCurrentToken();
  
  if (!tokenOk) {
    console.log('❌ API not fixed yet. Please complete the OAuth flow first.');
    return false;
  }
  
  console.log('✅ API is working! Posting blog...\n');
  
  // Import the blog posting function
  const { postSpecificBlog } = require('./post-ugc-linkedin.js');
  return await postSpecificBlog(blogNumber);
}

// Main function
async function main() {
  console.log('🔧 LinkedIn API Fixer\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node fix-api-simple.js test        - Test current API');
    console.log('  node fix-api-simple.js auth        - Generate OAuth URL');
    console.log('  node fix-api-simple.js token <code> - Exchange code for token');
    console.log('  node fix-api-simple.js post <num>  - Post blog with fixed API\n');
    
  } else if (args[0] === 'test') {
    await testCurrentToken();
    
  } else if (args[0] === 'auth') {
    const authUrl = generateOAuthURL();
    
    if (authUrl) {
      console.log('🔗 OAuth URL with proper permissions:');
      console.log('='.repeat(80));
      console.log(authUrl);
      console.log('='.repeat(80));
      console.log('\n📋 Instructions:');
      console.log('1. Copy this URL and open in browser');
      console.log('2. Authorize with all permissions');
      console.log('3. Copy the "code" from the URL');
      console.log('4. Run: node fix-api-simple.js token <your_code>');
    }
    
  } else if (args[0] === 'token' && args[1]) {
    const tokenData = await exchangeCodeForToken(args[1]);
    
    if (tokenData && tokenData.access_token) {
      console.log('✅ New token received!');
      console.log('Scopes:', tokenData.scope);
      
      if (updateEnvFile(tokenData.access_token)) {
        console.log('\n🎉 API fixed! You can now post blogs.');
        console.log('Run: node fix-api-simple.js post 2');
      }
    } else {
      console.log('❌ Failed to get new token');
    }
    
  } else if (args[0] === 'post' && args[1]) {
    const blogNumber = parseInt(args[1]);
    
    if (isNaN(blogNumber)) {
      console.log('❌ Invalid blog number');
      return;
    }
    
    const result = await postBlogWithFixedAPI(blogNumber);
    
    if (result && result.success) {
      console.log('\n🎉 Blog posted successfully!');
    } else {
      console.log('\n❌ Failed to post blog');
    }
    
  } else {
    console.log('❌ Invalid command');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
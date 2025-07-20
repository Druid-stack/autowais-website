const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🔧 LinkedIn API Quick Fix\n');

// Check current environment
console.log('📋 Current Environment:');
console.log('Client ID:', process.env.LINKEDIN_CLIENT_ID ? '✅ Present' : '❌ Missing');
console.log('Client Secret:', process.env.LINKEDIN_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
console.log('Access Token:', process.env.LINKEDIN_ACCESS_TOKEN ? '✅ Present' : '❌ Missing');
console.log('Organization ID:', process.env.LINKEDIN_ORGANIZATION_ID ? '✅ Present' : '❌ Missing');

// Test current token
async function testCurrentToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('\n❌ No access token found');
    return false;
  }
  
  try {
    console.log('\n🔍 Testing current token...');
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
    console.log('Error:', error.response?.data?.message || error.message);
    return false;
  }
}

// Generate OAuth URL with correct redirect
function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  if (!clientId) {
    console.log('\n❌ LINKEDIN_CLIENT_ID not found');
    console.log('Please add your LinkedIn Client ID to .env file');
    return null;
  }
  
  const scopes = [
    'r_liteprofile',
    'r_emailaddress', 
    'w_member_social',
    'rw_organization_admin'
  ].join(',');
  
  // Use a simpler redirect URI
  const redirectUri = 'http://localhost:3000';
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=quick_fix_${Date.now()}`;
  
  return authUrl;
}

// Exchange code for token
async function exchangeCodeForToken(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000';
  
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

// Update .env file
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

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node quick-fix-api.js test        - Test current token');
    console.log('  node quick-fix-api.js auth        - Generate OAuth URL');
    console.log('  node quick-fix-api.js token <code> - Exchange code for token\n');
    
    // Test current token by default
    await testCurrentToken();
    
  } else if (args[0] === 'test') {
    await testCurrentToken();
    
  } else if (args[0] === 'auth') {
    const authUrl = generateOAuthURL();
    
    if (authUrl) {
      console.log('\n🔗 OAuth URL with proper permissions:');
      console.log('='.repeat(80));
      console.log(authUrl);
      console.log('='.repeat(80));
      console.log('\n📋 Instructions:');
      console.log('1. Copy this URL and open in browser');
      console.log('2. Authorize with all permissions');
      console.log('3. Copy the "code" from the URL');
      console.log('4. Run: node quick-fix-api.js token <your_code>');
      console.log('\n💡 Make sure your LinkedIn app has redirect URI: http://localhost:3000');
    }
    
  } else if (args[0] === 'token' && args[1]) {
    const tokenData = await exchangeCodeForToken(args[1]);
    
    if (tokenData && tokenData.access_token) {
      console.log('✅ New token received!');
      console.log('Scopes:', tokenData.scope);
      
      if (updateEnvFile(tokenData.access_token)) {
        console.log('\n🎉 API fixed! Testing new token...');
        await testCurrentToken();
      }
    } else {
      console.log('❌ Failed to get new token');
    }
    
  } else {
    console.log('❌ Invalid command');
  }
}

main().catch(console.error); 
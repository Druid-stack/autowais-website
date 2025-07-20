const axios = require('axios');
const fs = require('fs');
const express = require('express');
require('dotenv').config();

console.log('🔧 LinkedIn API Permissions Fixer\n');

// Function to check current environment
function checkEnvironment() {
  console.log('📋 Environment Check:');
  console.log('Client ID:', process.env.LINKEDIN_CLIENT_ID ? '✅ Present' : '❌ Missing');
  console.log('Client Secret:', process.env.LINKEDIN_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
  console.log('Access Token:', process.env.LINKEDIN_ACCESS_TOKEN ? '✅ Present' : '❌ Missing');
  console.log('Organization ID:', process.env.LINKEDIN_ORGANIZATION_ID ? '✅ Present' : '❌ Missing');
  
  return {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
    organizationId: process.env.LINKEDIN_ORGANIZATION_ID
  };
}

// Function to test current token permissions
async function testCurrentToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('\n❌ No access token found');
    return false;
  }
  
  console.log('\n🔍 Testing current token permissions...');
  
  try {
    // Test basic profile access
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Basic profile access: SUCCESS');
    console.log('Profile:', profileResponse.data.localizedFirstName, profileResponse.data.localizedLastName);
    
    // Test organization access
    const orgResponse = await axios.get('https://api.linkedin.com/v2/organizations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Organization access: SUCCESS');
    console.log('Available organizations:', orgResponse.data.elements?.length || 0);
    
    return true;
    
  } catch (error) {
    console.log('❌ Token test failed:', error.response?.status);
    console.log('Error:', error.response?.data?.message || error.message);
    
    if (error.response?.status === 403) {
      console.log('\n💡 403 Error - Missing permissions:');
      console.log('   - r_liteprofile (read profile)');
      console.log('   - w_member_social (write posts)');
      console.log('   - rw_organization_admin (manage company page)');
    } else if (error.response?.status === 401) {
      console.log('\n💡 401 Error - Token is invalid or expired');
    }
    
    return false;
  }
}

// Function to generate OAuth URL with all required permissions
function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  if (!clientId) {
    console.log('\n❌ LINKEDIN_CLIENT_ID not found');
    console.log('Please add your LinkedIn Client ID to .env file');
    return null;
  }
  
  // All required scopes for posting
  const scopes = [
    'r_liteprofile',           // Read basic profile
    'r_emailaddress',          // Read email address
    'w_member_social',         // Write posts to personal profile
    'rw_organization_admin'    // Manage company page posts
  ].join(',');
  
  const redirectUri = 'http://localhost:3000/callback';
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=fix_permissions_${Date.now()}`;
  
  return authUrl;
}

// Function to exchange code for token
async function exchangeCodeForToken(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/callback';
  
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

// Function to update .env file with new token
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

// Function to start OAuth server
function startOAuthServer() {
  const app = express();
  
  app.get('/callback', async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
      res.send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ OAuth Error</h1>
            <p>${error}</p>
            <p>Please try again.</p>
            <script>setTimeout(() => window.close(), 5000);</script>
          </body>
        </html>
      `);
      return;
    }
    
    if (code) {
      console.log('📥 Received authorization code');
      
      const tokenData = await exchangeCodeForToken(code);
      
      if (tokenData && tokenData.access_token) {
        console.log('✅ Access token received!');
        console.log('Scopes:', tokenData.scope);
        
        if (updateEnvFile(tokenData.access_token)) {
          res.send(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: green;">✅ Success!</h1>
                <p>Access token received and saved to .env file</p>
                <p>Scopes: ${tokenData.scope}</p>
                <p>You can close this window and return to the terminal</p>
                <script>setTimeout(() => window.close(), 3000);</script>
              </body>
            </html>
          `);
          
          // Test the new token
          setTimeout(async () => {
            console.log('\n🧪 Testing new token...');
            const tokenValid = await testCurrentToken();
            
            if (tokenValid) {
              console.log('\n🎉 API permissions fixed successfully!');
              console.log('You can now post blogs automatically.');
              console.log('Run: node post-blog-direct-simple.js 2');
            } else {
              console.log('\n❌ Token test failed. Please check your LinkedIn app permissions.');
            }
            
            process.exit(0);
          }, 2000);
          
        } else {
          res.send(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: red;">❌ Error</h1>
                <p>Failed to save access token</p>
                <script>setTimeout(() => window.close(), 3000);</script>
              </body>
            </html>
          `);
        }
      } else {
        res.send(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1 style="color: red;">❌ Error</h1>
              <p>Failed to get access token</p>
              <script>setTimeout(() => window.close(), 3000);</script>
            </body>
          </html>
        `);
      }
    }
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 OAuth server running on http://localhost:${PORT}`);
    console.log('📋 Ready to receive authorization code...\n');
  });
}

// Function to post test blog after fixing permissions
async function postTestBlog() {
  console.log('\n🎯 Testing blog posting with fixed permissions...\n');
  
  const tokenValid = await testCurrentToken();
  
  if (!tokenValid) {
    console.log('❌ Token still not valid. Please fix permissions first.');
    return;
  }
  
  // Import and use the posting function
  const { postSpecificBlog } = require('./post-ugc-linkedin.js');
  const result = await postSpecificBlog(2); // Blog 2: Breaking Down Data Silos
  
  if (result && result.success) {
    console.log('\n🎉 Blog posted successfully with fixed permissions!');
  } else {
    console.log('\n❌ Blog posting still failed. Manual posting recommended.');
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node fix-api-permissions.js check     - Check current permissions');
    console.log('  node fix-api-permissions.js auth      - Start OAuth flow');
    console.log('  node fix-api-permissions.js test      - Test blog posting\n');
    
    // Check current environment and permissions
    checkEnvironment();
    await testCurrentToken();
    
  } else if (args[0] === 'check') {
    checkEnvironment();
    await testCurrentToken();
    
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
      console.log('3. You will be redirected to localhost:3000/callback');
      console.log('4. The server will automatically capture the code');
      console.log('5. Your .env file will be updated with the new token');
      console.log('\n💡 Make sure your LinkedIn app has redirect URI: http://localhost:3000/callback');
      
      startOAuthServer();
    }
    
  } else if (args[0] === 'test') {
    await postTestBlog();
    
  } else {
    console.log('❌ Invalid command');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
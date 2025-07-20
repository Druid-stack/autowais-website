const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Function to test current token permissions
async function testCurrentToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  console.log('🔍 Testing current token permissions...\n');
  
  if (!accessToken) {
    console.log('❌ No access token found in .env file');
    return false;
  }
  
  try {
    // Test basic profile access
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Basic profile access: SUCCESS');
    console.log('Profile ID:', profileResponse.data.id);
    console.log('Name:', profileResponse.data.localizedFirstName, profileResponse.data.localizedLastName);
    
    // Test organization access
    const orgResponse = await axios.get('https://api.linkedin.com/v2/organizations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Organization access: SUCCESS');
    console.log('Available organizations:', orgResponse.data.elements?.length || 0);
    
    if (orgResponse.data.elements && orgResponse.data.elements.length > 0) {
      console.log('First organization:', orgResponse.data.elements[0].id);
    }
    
    return true;
    
  } catch (error) {
    console.log('❌ Token test failed');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Token is invalid or expired');
      console.log('You need to generate a new access token');
    } else if (error.response?.status === 403) {
      console.log('\n💡 Token lacks required permissions');
      console.log('You need a token with "w_member_social" scope');
    }
    
    return false;
  }
}

// Function to generate new OAuth URL with correct scopes
function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/callback';
  
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
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=random_state_string`;
  
  return authUrl;
}

// Function to exchange code for token
async function exchangeCodeForToken(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/callback';
  
  try {
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
    console.log('❌ Failed to exchange code for token');
    console.log('Error:', error.response?.data || error.message);
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
    
    // Update or add the access token
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
    
  } catch (error) {
    console.log('❌ Failed to update .env file:', error.message);
  }
}

// Function to start OAuth server
function startOAuthServer() {
  const express = require('express');
  const app = express();
  
  app.get('/callback', async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
      res.send(`
        <html>
          <body>
            <h1>OAuth Error</h1>
            <p>${error}</p>
            <script>setTimeout(() => window.close(), 3000);</script>
          </body>
        </html>
      `);
      return;
    }
    
    if (code) {
      console.log('📥 Received authorization code');
      
      const tokenData = await exchangeCodeForToken(code);
      
      if (tokenData && tokenData.access_token) {
        updateEnvFile(tokenData.access_token);
        
        res.send(`
          <html>
            <body>
              <h1>✅ Success!</h1>
              <p>Access token received and saved to .env file</p>
              <p>You can close this window and return to the terminal</p>
              <script>setTimeout(() => window.close(), 3000);</script>
            </body>
          </html>
        `);
        
        // Stop the server after 5 seconds
        setTimeout(() => {
          process.exit(0);
        }, 5000);
        
      } else {
        res.send(`
          <html>
            <body>
              <h1>❌ Error</h1>
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

// Function to post blog using fixed connection
async function postBlogWithFixedConnection(blogNumber) {
  console.log('🎯 Testing connection before posting...\n');
  
  const connectionOk = await testCurrentToken();
  
  if (!connectionOk) {
    console.log('\n❌ Connection test failed. Cannot post blog.');
    console.log('Please fix the connection first by running:');
    console.log('  node fix-linkedin-connection.js auth');
    return false;
  }
  
  console.log('\n✅ Connection test passed! Proceeding to post blog...\n');
  
  // Import and use the UGC posting function
  const { postSpecificBlog } = require('./post-ugc-linkedin.js');
  return await postSpecificBlog(blogNumber);
}

// Main function
async function main() {
  console.log('🔧 LinkedIn Connection Fixer\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node fix-linkedin-connection.js test        - Test current connection');
    console.log('  node fix-linkedin-connection.js auth        - Start OAuth flow');
    console.log('  node fix-linkedin-connection.js post <num>  - Post blog with fixed connection\n');
    
  } else if (args[0] === 'test') {
    await testCurrentToken();
    
  } else if (args[0] === 'auth') {
    const authUrl = generateOAuthURL();
    
    if (authUrl) {
      console.log('🔗 OAuth URL generated:');
      console.log(authUrl);
      console.log('\n📋 Please:');
      console.log('1. Open this URL in your browser');
      console.log('2. Authorize the application');
      console.log('3. You will be redirected to localhost:3000');
      console.log('4. The server will capture the authorization code\n');
      
      startOAuthServer();
    }
    
  } else if (args[0] === 'post' && args[1]) {
    const blogNumber = parseInt(args[1]);
    if (isNaN(blogNumber)) {
      console.log('❌ Invalid blog number');
      return;
    }
    
    const result = await postBlogWithFixedConnection(blogNumber);
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
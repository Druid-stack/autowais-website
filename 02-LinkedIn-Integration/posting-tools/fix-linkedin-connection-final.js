const axios = require('axios');
const fs = require('fs');
const express = require('express');
require('dotenv').config();

console.log('🔗 LinkedIn Connection Fix - Final Solution\n');

// Function to test current connection
async function testConnection() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('❌ No access token found');
    return false;
  }
  
  try {
    console.log('🔍 Testing LinkedIn connection...');
    
    // Test basic profile access
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Profile access: SUCCESS');
    console.log(`👤 Connected as: ${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`);
    
    // Test posting permissions
    try {
      const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
      
      // Try a test post (we won't actually publish it)
      const testPostData = {
        author: `urn:li:organization:${organizationId}`,
        lifecycleState: 'DRAFT', // Draft so it doesn't actually post
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: 'Test post - please ignore' },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };
      
      await axios.post('https://api.linkedin.com/v2/ugcPosts', testPostData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      
      console.log('✅ Posting permissions: SUCCESS');
      console.log('🎉 LinkedIn connection is fully working!');
      
      return true;
      
    } catch (postError) {
      console.log('❌ Posting permissions: FAILED');
      console.log(`Error: ${postError.response?.status} - ${postError.response?.data?.message || postError.message}`);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.response?.status);
    console.log('Error:', error.response?.data?.message || error.message);
    return false;
  }
}

// Function to exchange authorization code for token
async function exchangeCode(code, redirectUri) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  
  try {
    console.log('🔄 Exchanging authorization code for access token...');
    console.log('Redirect URI:', redirectUri);
    
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
    
    console.log('✅ Token exchange successful!');
    console.log('Scopes granted:', response.data.scope);
    console.log('Token expires in:', response.data.expires_in, 'seconds');
    
    return response.data;
    
  } catch (error) {
    console.log('❌ Token exchange failed');
    console.log('Error:', error.response?.data || error.message);
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
    
    // Update or add the token
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
    
    // Update the environment variable for immediate use
    process.env.LINKEDIN_ACCESS_TOKEN = newToken;
    
    return true;
    
  } catch (error) {
    console.log('❌ Failed to update .env file:', error.message);
    return false;
  }
}

// Function to start OAuth server
function startOAuthServer(port = 3000) {
  return new Promise((resolve) => {
    const app = express();
    let server;
    
    // Handle all possible callback routes
    const handleCallback = (req, res) => {
      const code = req.query.code;
      const error = req.query.error;
      const state = req.query.state;
      
      if (error) {
        console.log('❌ OAuth error:', error);
        res.send(`❌ Authorization failed: ${error}`);
        server.close();
        resolve({ success: false, error });
        return;
      }
      
      if (code) {
        console.log('✅ Authorization code received!');
        console.log('State:', state);
        
        res.send(`
          <html>
            <head><title>LinkedIn Authorization Success</title></head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1 style="color: green;">✅ Authorization Successful!</h1>
              <p>You can close this window now.</p>
              <p>Check your terminal for the next steps.</p>
            </body>
          </html>
        `);
        
        server.close();
        resolve({ success: true, code, redirectUri: req.originalUrl.split('?')[0] });
      } else {
        console.log('❌ No authorization code received');
        res.send('❌ No authorization code received');
        server.close();
        resolve({ success: false, error: 'No code' });
      }
    };
    
    // Set up routes for different possible callback URLs
    app.get('/callback', handleCallback);
    app.get('/api/auth/linkedin/callback', handleCallback);
    app.get('/', handleCallback);
    app.get('/auth/linkedin/callback', handleCallback);
    
    server = app.listen(port, () => {
      console.log(`🚀 OAuth server running on http://localhost:${port}`);
      console.log('📋 Waiting for authorization...');
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${port} is already in use`);
        resolve({ success: false, error: 'Port in use' });
      } else {
        console.log('❌ Server error:', err.message);
        resolve({ success: false, error: err.message });
      }
    });
  });
}

// Function to post the blog after successful connection
async function postBlog() {
  const blogContent = `🔗 **Breaking Down Data Silos: The Path to Seamless Integration**

Data silos are holding your business back. They prevent organizations from realizing the full potential of their information assets and create barriers to real-time insights.

**Industry Impact:**
• Delayed decision-making processes
• Duplicated efforts across departments
• Missed opportunities for automation

**How to Fix:**
✅ Invest in integration tools and platforms
✅ Standardize data formats across systems
✅ Foster a culture of collaboration
✅ Implement real-time data sharing

Integration platforms and APIs are essential for breaking down these barriers. The result? Faster decisions, better customer experiences, and improved operational efficiency.

Is your organization struggling with data silos? What's your biggest integration challenge?

#DataSilos #Integration #APIs #DigitalTransformation #BusinessIntelligence #DataManagement`;

  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  try {
    console.log('📝 Posting "Breaking Down Data Silos" to LinkedIn...');
    
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: blogContent },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ SUCCESS! Blog posted to LinkedIn!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log('🔗 Check your LinkedIn company page');
    
    return true;
    
  } catch (error) {
    console.log('❌ Blog posting failed:', error.response?.status);
    console.log('Error:', error.response?.data?.message || error.message);
    
    console.log('\n💡 Manual posting content:');
    console.log('='.repeat(80));
    console.log(blogContent);
    console.log('='.repeat(80));
    
    return false;
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  console.log('📋 Environment Status:');
  console.log('Client ID:', clientId ? '✅ Present' : '❌ Missing');
  console.log('Client Secret:', process.env.LINKEDIN_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
  console.log('Access Token:', process.env.LINKEDIN_ACCESS_TOKEN ? '✅ Present' : '❌ Missing');
  console.log('Organization ID:', process.env.LINKEDIN_ORGANIZATION_ID ? '✅ Present' : '❌ Missing');
  
  // Handle different commands
  if (args[0] === 'test') {
    await testConnection();
    return;
  }
  
  if (args[0] === 'post') {
    const connectionOk = await testConnection();
    if (connectionOk) {
      await postBlog();
    } else {
      console.log('\n❌ Connection not working. Fix connection first.');
    }
    return;
  }
  
  if (args[0] === 'token' && args[1] && args[2]) {
    const code = args[1];
    const redirectUri = args[2];
    
    const tokenData = await exchangeCode(code, redirectUri);
    
    if (tokenData && tokenData.access_token) {
      if (updateEnvFile(tokenData.access_token)) {
        console.log('\n🔄 Testing new connection...');
        const connectionOk = await testConnection();
        
        if (connectionOk) {
          console.log('\n🚀 Connection fixed! Posting blog automatically...');
          await postBlog();
        }
      }
    }
    return;
  }
  
  // Default: Fix connection
  console.log('\n🔄 Testing current connection...');
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    console.log('\n🎉 Connection is working! Posting blog now...');
    await postBlog();
  } else {
    console.log('\n🔧 FIXING LINKEDIN CONNECTION...');
    console.log('='.repeat(80));
    
    // Generate OAuth URLs with different redirect URIs
    const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
    const state = `fix_connection_${Date.now()}`;
    
    const redirectUris = [
      'http://localhost:3000/callback',
      'http://localhost:3000/api/auth/linkedin/callback',
      'http://localhost:3000',
      'http://localhost:3000/auth/linkedin/callback'
    ];
    
    console.log('\n📋 AUTOMATIC CONNECTION FIX:');
    console.log('1. I\'ll start an OAuth server');
    console.log('2. Try the OAuth URLs below until one works');
    console.log('3. The server will automatically fix your connection');
    
    console.log('\n🔗 OAuth URLs to try:');
    redirectUris.forEach((redirectUri, index) => {
      const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      console.log(`\n${index + 1}. ${redirectUri}`);
      console.log(`   ${oauthUrl}`);
    });
    
    console.log('\n🚀 Starting OAuth server...');
    
    try {
      const result = await startOAuthServer(3000);
      
      if (result.success && result.code) {
        console.log('\n✅ Authorization received! Fixing connection...');
        
        // Try to determine the correct redirect URI from the result
        let redirectUri = `http://localhost:3000${result.redirectUri}`;
        if (result.redirectUri === '/') {
          redirectUri = 'http://localhost:3000';
        }
        
        const tokenData = await exchangeCode(result.code, redirectUri);
        
        if (tokenData && tokenData.access_token) {
          if (updateEnvFile(tokenData.access_token)) {
            console.log('\n🔄 Testing fixed connection...');
            const newConnectionOk = await testConnection();
            
            if (newConnectionOk) {
              console.log('\n🎉 CONNECTION FIXED! Posting blog automatically...');
              await postBlog();
            }
          }
        }
      } else {
        console.log('\n❌ OAuth failed:', result.error);
        console.log('\n💡 Manual fix: node fix-linkedin-connection-final.js token <code> <redirect_uri>');
      }
      
    } catch (error) {
      console.log('\n❌ Server error:', error.message);
    }
    
    console.log('\n='.repeat(80));
    console.log('\n💡 IMMEDIATE SOLUTION - Post Manually:');
    console.log('Copy this content and post to LinkedIn:');
    console.log('\n🔗 **Breaking Down Data Silos: The Path to Seamless Integration**\n');
    console.log('Data silos are holding your business back. They prevent organizations from realizing the full potential of their information assets and create barriers to real-time insights.\n');
    console.log('**Industry Impact:**');
    console.log('• Delayed decision-making processes');
    console.log('• Duplicated efforts across departments');
    console.log('• Missed opportunities for automation\n');
    console.log('**How to Fix:**');
    console.log('✅ Invest in integration tools and platforms');
    console.log('✅ Standardize data formats across systems');
    console.log('✅ Foster a culture of collaboration');
    console.log('✅ Implement real-time data sharing\n');
    console.log('Integration platforms and APIs are essential for breaking down these barriers. The result? Faster decisions, better customer experiences, and improved operational efficiency.\n');
    console.log('Is your organization struggling with data silos? What\'s your biggest integration challenge?\n');
    console.log('#DataSilos #Integration #APIs #DigitalTransformation #BusinessIntelligence #DataManagement');
  }
  
  console.log('\n📋 Available Commands:');
  console.log('• node fix-linkedin-connection-final.js test  - Test connection');
  console.log('• node fix-linkedin-connection-final.js post  - Post blog if connection works');
  console.log('• node fix-linkedin-connection-final.js token <code> <redirect_uri>  - Fix with manual code');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
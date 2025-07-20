const axios = require('axios');
const fs = require('fs');
const express = require('express');
require('dotenv').config();

console.log('🔧 Complete LinkedIn API Fix & Blog Poster\n');

// Function to check current status
async function checkCurrentStatus() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log('📋 Environment Status:');
  console.log('Client ID:', clientId ? '✅ Present' : '❌ Missing');
  console.log('Client Secret:', clientSecret ? '✅ Present' : '❌ Missing');
  console.log('Access Token:', accessToken ? '✅ Present' : '❌ Missing');
  console.log('Organization ID:', organizationId ? '✅ Present' : '❌ Missing');
  
  if (!accessToken) {
    console.log('\n❌ No access token - need to authenticate');
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
    
    if (error.response?.status === 403) {
      console.log('\n💡 Token lacks required permissions:');
      console.log('   - r_liteprofile (read profile)');
      console.log('   - w_member_social (write posts)');
      console.log('   - rw_organization_admin (manage company page)');
    }
    
    return false;
  }
}

// Function to start OAuth flow
async function startOAuthFlow() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.log('❌ Missing LinkedIn credentials in .env file');
    return;
  }
  
  const app = express();
  const PORT = 3000;
  
  // Generate OAuth URL
  const scopes = [
    'r_liteprofile',
    'r_emailaddress', 
    'w_member_social',
    'rw_organization_admin'
  ].join(',');
  
  const redirectUri = `http://localhost:${PORT}/callback`;
  const state = `fix_api_${Date.now()}`;
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=${state}`;
  
  console.log('🔗 Starting OAuth flow...\n');
  console.log('='.repeat(80));
  console.log('📋 COPY THIS URL AND OPEN IN YOUR BROWSER:');
  console.log(authUrl);
  console.log('='.repeat(80));
  console.log('\n💡 The browser will redirect to localhost:3000/callback');
  console.log('🚀 OAuth server starting...\n');
  
  // Set up callback handler
  app.get('/callback', async (req, res) => {
    const { code, error, state: returnedState } = req.query;
    
    if (error) {
      res.send(`<h1>❌ OAuth Error</h1><p>${error}</p>`);
      console.log('❌ OAuth error:', error);
      return;
    }
    
    if (!code) {
      res.send('<h1>❌ No authorization code received</h1>');
      console.log('❌ No authorization code received');
      return;
    }
    
    console.log('📥 Authorization code received');
    
    try {
      // Exchange code for token
      console.log('🔄 Exchanging code for access token...');
      
      const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
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
      
      const tokenData = tokenResponse.data;
      console.log('✅ Access token received!');
      console.log('Scopes:', tokenData.scope);
      
      // Update .env file
      let envContent = '';
      if (fs.existsSync('.env')) {
        envContent = fs.readFileSync('.env', 'utf8');
      }
      
      if (envContent.includes('LINKEDIN_ACCESS_TOKEN=')) {
        envContent = envContent.replace(
          /LINKEDIN_ACCESS_TOKEN=.*/,
          `LINKEDIN_ACCESS_TOKEN=${tokenData.access_token}`
        );
      } else {
        envContent += `\nLINKEDIN_ACCESS_TOKEN=${tokenData.access_token}`;
      }
      
      fs.writeFileSync('.env', envContent);
      console.log('✅ Updated .env file with new token');
      
      // Test the new token
      process.env.LINKEDIN_ACCESS_TOKEN = tokenData.access_token;
      const tokenValid = await checkCurrentStatus();
      
      if (tokenValid) {
        console.log('\n🎉 API permissions fixed successfully!');
        
        // Automatically post the blog
        setTimeout(async () => {
          console.log('\n🚀 Posting blog automatically...');
          const result = await postBlogAutomatically();
          
          if (result.success) {
            res.send(`
              <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                  <h1 style="color: green;">✅ Complete Success!</h1>
                  <h2>LinkedIn API Fixed & Blog Posted!</h2>
                  <p>Access token updated with proper permissions</p>
                  <p>Blog "Breaking Down Data Silos" has been posted to LinkedIn!</p>
                  <p>Method used: ${result.method}</p>
                  <p>Post ID: ${result.postId}</p>
                  <p>You can close this window</p>
                  <script>setTimeout(() => window.close(), 3000);</script>
                </body>
              </html>
            `);
          } else {
            res.send(`
              <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                  <h1 style="color: orange;">⚠️ Partial Success</h1>
                  <p>API fixed but automatic posting failed</p>
                  <p>Check the console for blog content to post manually</p>
                  <script>setTimeout(() => window.close(), 5000);</script>
                </body>
              </html>
            `);
          }
          
          setTimeout(() => process.exit(0), 5000);
        }, 2000);
        
      } else {
        res.send(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1 style="color: orange;">⚠️ Partial Success</h1>
              <p>Token received but still has permission issues</p>
              <p>Check the console for details</p>
            </body>
          </html>
        `);
      }
      
    } catch (tokenError) {
      console.log('❌ Token exchange failed:', tokenError.response?.data || tokenError.message);
      res.send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ Token Exchange Failed</h1>
            <p>${tokenError.message}</p>
          </body>
        </html>
      `);
    }
  });
  
  // Start server
  const server = app.listen(PORT, () => {
    console.log(`✅ OAuth server running on http://localhost:${PORT}`);
    console.log('📋 Waiting for authorization...\n');
  });
  
  // Handle server shutdown
  process.on('SIGINT', () => {
    console.log('\n🔄 Shutting down OAuth server...');
    server.close();
    process.exit(0);
  });
}

// Function to get blog content
function getBlogContent(blogNumber) {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const sections = content.split('## Blog Post');
    
    if (blogNumber < 1 || blogNumber > sections.length - 1) {
      return null;
    }
    
    const section = sections[blogNumber];
    const lines = section.split('\n');
    const title = lines[0].replace(/^\d+:\s*/, '').trim();
    
    let linkedInContent = '';
    let inLinkedInPost = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line === '**LinkedIn Post:**') {
        inLinkedInPost = true;
        continue;
      }
      
      if (inLinkedInPost && line.startsWith('---')) {
        break;
      }
      
      if (inLinkedInPost && line) {
        linkedInContent += line + '\n';
      }
    }
    
    return {
      title: title,
      content: linkedInContent.trim()
    };
  } catch (error) {
    return null;
  }
}

// Function to post blog automatically
async function postBlogAutomatically() {
  const blogPost = getBlogContent(2); // Blog 2: Breaking Down Data Silos
  
  if (!blogPost) {
    console.log('❌ Could not load blog content');
    return { success: false };
  }
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  
  // Try multiple posting approaches
  const approaches = [
    {
      name: 'UGC API (Organization)',
      url: 'https://api.linkedin.com/v2/ugcPosts',
      data: {
        author: `urn:li:organization:${organizationId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: blogPost.content },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      }
    },
    {
      name: 'Share API (Organization)',
      url: 'https://api.linkedin.com/v2/shares',
      data: {
        owner: `urn:li:organization:${organizationId}`,
        subject: 'Autowais Blog Update',
        text: { text: blogPost.content }
      }
    }
  ];
  
  for (const approach of approaches) {
    try {
      console.log(`🔄 Trying ${approach.name}...`);
      
      const response = await axios.post(approach.url, approach.data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        timeout: 15000
      });
      
      console.log(`✅ Success with ${approach.name}!`);
      console.log(`📊 Post ID: ${response.data.id}`);
      console.log(`🔗 Check your LinkedIn company page`);
      
      return { success: true, method: approach.name, postId: response.data.id };
      
    } catch (error) {
      console.log(`❌ ${approach.name} failed: ${error.response?.status || error.message}`);
      
      if (error.response?.data) {
        console.log('   Error details:', JSON.stringify(error.response.data, null, 2));
      }
    }
  }
  
  console.log('\n❌ All automatic posting methods failed');
  console.log('💡 Blog content ready for manual posting:');
  console.log('='.repeat(80));
  console.log(blogPost.content);
  console.log('='.repeat(80));
  
  return { success: false };
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'fix') {
    console.log('🎯 Checking current API status...\n');
    
    const isValid = await checkCurrentStatus();
    
    if (isValid) {
      console.log('\n✅ API is already working! Posting blog...');
      await postBlogAutomatically();
    } else {
      console.log('\n🔄 Starting OAuth flow to fix API permissions...');
      await startOAuthFlow();
    }
    
  } else if (args[0] === 'test') {
    await checkCurrentStatus();
    
  } else if (args[0] === 'post') {
    const isValid = await checkCurrentStatus();
    if (isValid) {
      await postBlogAutomatically();
    } else {
      console.log('❌ API not working. Run without arguments to fix first.');
    }
    
  } else {
    console.log('Usage:');
    console.log('  node linkedin-api-fix-complete.js        - Fix API and post blog');
    console.log('  node linkedin-api-fix-complete.js fix    - Fix API and post blog');
    console.log('  node linkedin-api-fix-complete.js test   - Test current API status');
    console.log('  node linkedin-api-fix-complete.js post   - Post blog (if API works)');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
const axios = require('axios');
const fs = require('fs');
const express = require('express');
require('dotenv').config();

console.log('🔧 LinkedIn API Permissions - Final Fix\n');

// Function to test current token
async function testCurrentToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('❌ No access token found');
    return false;
  }
  
  try {
    console.log('🔍 Testing current token...');
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

// Function to exchange code for token
async function exchangeCodeForToken(code, redirectUri) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  
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

// Function to post blog
async function postBlog() {
  const blogPost = getBlogContent(2); // Blog 2: Breaking Down Data Silos
  
  if (!blogPost) {
    console.log('❌ Could not load blog content');
    return;
  }
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  
  // Try UGC API for organization
  try {
    console.log('🔄 Posting to LinkedIn company page...');
    
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
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
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Blog posted successfully!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log('🔗 Check your LinkedIn company page');
    
    return { success: true, postId: response.data.id };
    
  } catch (error) {
    console.log('❌ Posting failed:', error.response?.status, error.response?.data?.message);
    
    console.log('\n💡 Blog content for manual posting:');
    console.log('='.repeat(80));
    console.log(blogPost.content);
    console.log('='.repeat(80));
    
    return { success: false };
  }
}

// Function to start OAuth server
function startOAuthServer(port = 3000) {
  return new Promise((resolve, reject) => {
    const app = express();
    
    app.get('/callback', (req, res) => {
      const code = req.query.code;
      const error = req.query.error;
      
      if (error) {
        res.send(`❌ Authorization failed: ${error}`);
        resolve({ success: false, error });
        return;
      }
      
      if (code) {
        res.send('✅ Authorization successful! You can close this window. Check your terminal.');
        resolve({ success: true, code, redirectUri: `http://localhost:${port}/callback` });
      } else {
        res.send('❌ No authorization code received');
        resolve({ success: false, error: 'No code' });
      }
    });
    
    app.get('/api/auth/linkedin/callback', (req, res) => {
      const code = req.query.code;
      const error = req.query.error;
      
      if (error) {
        res.send(`❌ Authorization failed: ${error}`);
        resolve({ success: false, error });
        return;
      }
      
      if (code) {
        res.send('✅ Authorization successful! You can close this window. Check your terminal.');
        resolve({ success: true, code, redirectUri: `http://localhost:${port}/api/auth/linkedin/callback` });
      } else {
        res.send('❌ No authorization code received');
        resolve({ success: false, error: 'No code' });
      }
    });
    
    app.get('/', (req, res) => {
      const code = req.query.code;
      const error = req.query.error;
      
      if (error) {
        res.send(`❌ Authorization failed: ${error}`);
        resolve({ success: false, error });
        return;
      }
      
      if (code) {
        res.send('✅ Authorization successful! You can close this window. Check your terminal.');
        resolve({ success: true, code, redirectUri: `http://localhost:${port}` });
      } else {
        res.send('❌ No authorization code received');
        resolve({ success: false, error: 'No code' });
      }
    });
    
    const server = app.listen(port, () => {
      console.log(`🚀 OAuth server running on http://localhost:${port}`);
    });
    
    server.on('error', (err) => {
      reject(err);
    });
  });
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
  
  if (args[0] === 'test') {
    await testCurrentToken();
    return;
  }
  
  if (args[0] === 'post') {
    const tokenValid = await testCurrentToken();
    if (tokenValid) {
      await postBlog();
    } else {
      console.log('❌ Token not valid. Run without arguments to fix permissions.');
    }
    return;
  }
  
  if (args[0] === 'token' && args[1] && args[2]) {
    const code = args[1];
    const redirectUri = args[2];
    
    const tokenData = await exchangeCodeForToken(code, redirectUri);
    
    if (tokenData && tokenData.access_token) {
      console.log('✅ New token received!');
      console.log('Scopes:', tokenData.scope);
      
      if (updateEnvFile(tokenData.access_token)) {
        console.log('\n🎉 Token updated! Testing...');
        process.env.LINKEDIN_ACCESS_TOKEN = tokenData.access_token;
        const tokenValid = await testCurrentToken();
        
        if (tokenValid) {
          console.log('\n🚀 Posting blog automatically...');
          await postBlog();
        }
      }
    }
    return;
  }
  
  // Default: Fix API permissions
  console.log('\n🔄 Testing current token first...');
  const tokenValid = await testCurrentToken();
  
  if (tokenValid) {
    console.log('\n🎉 Great! Your token works. Posting blog now...');
    await postBlog();
    return;
  }
  
  console.log('\n🔧 Token needs fixing. Starting OAuth flow...');
  
  // Generate OAuth URLs for different redirect URIs
  const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
  const state = `fix_api_${Date.now()}`;
  
  const redirectURIs = [
    'http://localhost:3000/callback',
    'http://localhost:3000/api/auth/linkedin/callback',
    'http://localhost:3000'
  ];
  
  console.log('\n🔗 OAuth URLs (try these in order):');
  console.log('='.repeat(80));
  
  redirectURIs.forEach((redirectUri, index) => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `state=${state}`;
    
    console.log(`\n${index + 1}. ${redirectUri}`);
    console.log(`   ${authUrl}`);
  });
  
  console.log('\n='.repeat(80));
  console.log('\n📋 AUTOMATIC METHOD:');
  console.log('1. I\'ll start a server on localhost:3000');
  console.log('2. Try the URLs above until one works');
  console.log('3. The server will automatically catch the code and update your token');
  
  console.log('\n🚀 Starting OAuth server...');
  
  try {
    const result = await startOAuthServer(3000);
    
    if (result.success && result.code) {
      console.log('\n✅ Authorization code received!');
      
      const tokenData = await exchangeCodeForToken(result.code, result.redirectUri);
      
      if (tokenData && tokenData.access_token) {
        console.log('✅ New token received!');
        console.log('Scopes:', tokenData.scope);
        
        if (updateEnvFile(tokenData.access_token)) {
          console.log('\n🎉 Token updated! Testing...');
          process.env.LINKEDIN_ACCESS_TOKEN = tokenData.access_token;
          const newTokenValid = await testCurrentToken();
          
          if (newTokenValid) {
            console.log('\n🚀 Posting blog automatically...');
            await postBlog();
          }
        }
      }
    } else {
      console.log('\n❌ Authorization failed:', result.error);
    }
    
  } catch (error) {
    console.log('\n❌ Server error:', error.message);
    console.log('\n💡 Try manual method: node fix-linkedin-api-final.js token <code> <redirect_uri>');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
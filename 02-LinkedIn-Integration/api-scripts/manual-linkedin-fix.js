const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🔧 Manual LinkedIn API Fix\n');

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
    console.log('Using redirect URI:', redirectUri);
    
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
function getBlogContent() {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const sections = content.split('## Blog Post');
    
    // Get Blog 2: Breaking Down Data Silos
    const section = sections[2];
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
  const blogPost = getBlogContent();
  
  if (!blogPost) {
    console.log('❌ Could not load blog content');
    return;
  }
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  
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
      console.log('❌ Token not valid. Run without arguments to see fix instructions.');
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
  
  // Default: Show fix instructions
  console.log('\n🔄 Testing current token...');
  const tokenValid = await testCurrentToken();
  
  if (tokenValid) {
    console.log('\n🎉 Great! Your token works. Posting blog now...');
    await postBlog();
    return;
  }
  
  console.log('\n🔧 MANUAL FIX REQUIRED:');
  console.log('='.repeat(80));
  
  console.log('\n📋 STEP 1: Find Your LinkedIn App\'s Redirect URI');
  console.log('1. Go to: https://www.linkedin.com/developers/apps');
  console.log('2. Click on your app (Client ID: ' + clientId + ')');
  console.log('3. Go to "Auth" tab');
  console.log('4. Look at "Authorized redirect URLs"');
  console.log('5. Copy the EXACT redirect URI listed there');
  
  console.log('\n📋 STEP 2: Generate OAuth URL');
  console.log('Replace YOUR_REDIRECT_URI with the actual one from your app:');
  
  const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
  const state = `manual_fix_${Date.now()}`;
  const baseUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=`;
  
  console.log('\n' + baseUrl + 'YOUR_REDIRECT_URI');
  
  console.log('\n📋 STEP 3: Authorize and Get Code');
  console.log('1. Replace YOUR_REDIRECT_URI in the URL above');
  console.log('2. Open the URL in your browser');
  console.log('3. Authorize with ALL permissions');
  console.log('4. Copy the "code" parameter from the redirect URL');
  
  console.log('\n📋 STEP 4: Exchange Code for Token');
  console.log('Run this command with your code and redirect URI:');
  console.log('node manual-linkedin-fix.js token <your_code> <your_redirect_uri>');
  
  console.log('\n📋 COMMON REDIRECT URIs TO TRY:');
  console.log('If you\'re not sure, try these common ones:');
  console.log('• https://yourapp.com/auth/linkedin/callback');
  console.log('• https://yourapp.com/callback');
  console.log('• http://localhost:3000/callback');
  console.log('• http://localhost:8080/callback');
  
  console.log('\n='.repeat(80));
  
  // Show blog content for manual posting
  const blogPost = getBlogContent();
  if (blogPost) {
    console.log('\n💡 IMMEDIATE SOLUTION - Post Manually:');
    console.log('While fixing API, you can post this content manually to LinkedIn:');
    console.log('\n📝 Title: ' + blogPost.title);
    console.log('\n📄 Content:');
    console.log('-'.repeat(60));
    console.log(blogPost.content);
    console.log('-'.repeat(60));
    console.log('\n🔗 Just copy and paste to your LinkedIn company page!');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
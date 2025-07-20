const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🚀 LinkedIn Posting Fix - Complete Solution\n');

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

  return blogContent;
}

// Function to post to LinkedIn with multiple approaches
async function postToLinkedIn() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  const blogContent = getBlogContent();
  
  if (!accessToken) {
    console.log('❌ No access token available');
    return false;
  }
  
  console.log('📝 Posting "Breaking Down Data Silos" to LinkedIn...\n');
  
  // Approach 1: UGC API for Organization
  try {
    console.log('🔄 Trying UGC API (Organization)...');
    
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
      },
      timeout: 15000
    });
    
    console.log('✅ SUCCESS! Blog posted to LinkedIn company page!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log('🔗 Check your LinkedIn company page to see the post');
    
    return true;
    
  } catch (error) {
    console.log(`❌ UGC API failed: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
  
  // Approach 2: Try personal profile posting
  try {
    console.log('🔄 Trying personal profile posting...');
    
    // Get person URN first
    const meResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const personUrn = `urn:li:person:${meResponse.data.id}`;
    
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
      author: personUrn,
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
      },
      timeout: 15000
    });
    
    console.log('✅ SUCCESS! Blog posted to personal LinkedIn profile!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log('🔗 Check your personal LinkedIn profile to see the post');
    
    return true;
    
  } catch (error) {
    console.log(`❌ Personal posting failed: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
  
  // If both approaches fail, show manual posting content
  console.log('\n❌ Automatic posting failed. Here\'s the content for manual posting:');
  console.log('='.repeat(80));
  console.log(blogContent);
  console.log('='.repeat(80));
  console.log('\n📋 Manual posting steps:');
  console.log('1. Go to your LinkedIn company page or personal profile');
  console.log('2. Click "Start a post"');
  console.log('3. Copy and paste the content above');
  console.log('4. Click "Post"');
  console.log('5. Done! Your blog is live');
  
  return false;
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
  if (args[0] === 'post') {
    console.log('\n🚀 Attempting to post blog...');
    const tokenValid = await testCurrentToken();
    
    if (tokenValid) {
      await postToLinkedIn();
    } else {
      console.log('\n❌ Token not valid. Need to fix permissions first.');
      console.log('Run: node linkedin-post-fix.js');
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
          await postToLinkedIn();
        }
      }
    }
    return;
  }
  
  if (args[0] === 'test') {
    await testCurrentToken();
    return;
  }
  
  // Default: Check current status and provide fix instructions
  console.log('\n🔄 Checking current token status...');
  const tokenValid = await testCurrentToken();
  
  if (tokenValid) {
    console.log('\n🎉 Token is working! Posting blog now...');
    await postToLinkedIn();
  } else {
    console.log('\n🔧 LINKEDIN API FIX REQUIRED');
    console.log('='.repeat(80));
    
    console.log('\n📋 QUICK FIX STEPS:');
    console.log('1. Go to: https://www.linkedin.com/developers/apps');
    console.log('2. Click "Autowais Marketing Agent"');
    console.log('3. Go to "Auth" tab');
    console.log('4. Add this redirect URI: https://autowise.com/auth/linkedin/callback');
    console.log('5. Save the app');
    
    console.log('\n📋 THEN USE THIS OAUTH URL:');
    const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
    const state = `fix_${Date.now()}`;
    const redirectUri = 'https://autowise.com/auth/linkedin/callback';
    
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    console.log('\n' + oauthUrl);
    
    console.log('\n📋 AFTER AUTHORIZATION:');
    console.log('1. Copy the "code" from the redirect URL');
    console.log('2. Run: node linkedin-post-fix.js token <code> https://autowise.com/auth/linkedin/callback');
    
    console.log('\n='.repeat(80));
    console.log('\n💡 IMMEDIATE SOLUTION - Post Manually:');
    console.log('Copy this content and post to LinkedIn now:');
    console.log('\n' + getBlogContent());
    
    console.log('\n📋 Commands:');
    console.log('• node linkedin-post-fix.js post  - Try posting with current token');
    console.log('• node linkedin-post-fix.js test  - Test current token');
    console.log('• node linkedin-post-fix.js token <code> <redirect_uri>  - Exchange code for token');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🔧 Simple LinkedIn OAuth Fix\n');

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

// Function to test token
async function testToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  try {
    console.log('🔍 Testing token...');
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

// Function to post blog
async function postBlog() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
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

  try {
    console.log('🔄 Posting blog to LinkedIn...');
    
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
    
    console.log('✅ Blog posted successfully!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log('🔗 Check your LinkedIn company page');
    
  } catch (error) {
    console.log('❌ Posting failed:', error.response?.status, error.response?.data?.message);
    console.log('\n💡 Blog content for manual posting:');
    console.log('='.repeat(80));
    console.log(blogContent);
    console.log('='.repeat(80));
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
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
        const tokenValid = await testToken();
        
        if (tokenValid) {
          console.log('\n🚀 Posting blog automatically...');
          await postBlog();
        }
      }
    }
    return;
  }
  
  if (args[0] === 'test') {
    await testToken();
    return;
  }
  
  if (args[0] === 'post') {
    const tokenValid = await testToken();
    if (tokenValid) {
      await postBlog();
    } else {
      console.log('❌ Token not valid. Need to fix permissions first.');
    }
    return;
  }
  
  // Default: Show instructions
  console.log('📋 SIMPLE OAUTH FIX - No Server Required');
  console.log('='.repeat(80));
  
  console.log('\n📋 STEP 1: Check Your LinkedIn App');
  console.log('1. Go to: https://www.linkedin.com/developers/apps');
  console.log('2. Click on "Autowais Marketing Agent"');
  console.log('3. Go to "Auth" tab');
  console.log('4. Look at "Authorized redirect URLs"');
  console.log('5. Write down the EXACT URL you see there');
  
  console.log('\n📋 STEP 2: If No Redirect URI, Add One');
  console.log('If the field is empty or has a weird URL, add:');
  console.log('• https://autowise.com/auth/linkedin/callback');
  console.log('OR');
  console.log('• http://localhost:8080/callback');
  console.log('Then save the app settings.');
  
  console.log('\n📋 STEP 3: Create OAuth URL');
  console.log('Replace YOUR_REDIRECT_URI with what you found in Step 1:');
  
  const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
  const state = `simple_fix_${Date.now()}`;
  const baseUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=`;
  
  console.log('\n' + baseUrl + 'YOUR_REDIRECT_URI');
  
  console.log('\n📋 STEP 4: Authorize');
  console.log('1. Replace YOUR_REDIRECT_URI in the URL above');
  console.log('2. Open the URL in your browser');
  console.log('3. Click "Allow" for ALL permissions');
  console.log('4. Copy the "code" from the redirect URL');
  
  console.log('\n📋 STEP 5: Exchange Code');
  console.log('Run: node simple-oauth-fix.js token <code> <your_redirect_uri>');
  
  console.log('\n📋 EXAMPLE:');
  console.log('If your redirect URI is https://autowise.com/auth/linkedin/callback:');
  console.log('node simple-oauth-fix.js token AQT123... https://autowise.com/auth/linkedin/callback');
  
  console.log('\n='.repeat(80));
  console.log('\n💡 IMMEDIATE SOLUTION:');
  console.log('While fixing API, post this manually to LinkedIn:');
  console.log('\n🔗 **Breaking Down Data Silos: The Path to Seamless Integration**');
  console.log('\nData silos are holding your business back. They prevent organizations from realizing the full potential of their information assets and create barriers to real-time insights.');
  console.log('\n**Industry Impact:**');
  console.log('• Delayed decision-making processes');
  console.log('• Duplicated efforts across departments');
  console.log('• Missed opportunities for automation');
  console.log('\n**How to Fix:**');
  console.log('✅ Invest in integration tools and platforms');
  console.log('✅ Standardize data formats across systems');
  console.log('✅ Foster a culture of collaboration');
  console.log('✅ Implement real-time data sharing');
  console.log('\nIntegration platforms and APIs are essential for breaking down these barriers. The result? Faster decisions, better customer experiences, and improved operational efficiency.');
  console.log('\nIs your organization struggling with data silos? What\'s your biggest integration challenge?');
  console.log('\n#DataSilos #Integration #APIs #DigitalTransformation #BusinessIntelligence #DataManagement');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
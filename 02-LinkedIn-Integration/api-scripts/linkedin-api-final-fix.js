const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🔧 LinkedIn API Final Fix & Blog Poster\n');

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

// Function to generate OAuth URL with multiple redirect URI options
function generateOAuthURLs() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  if (!clientId) {
    console.log('❌ LINKEDIN_CLIENT_ID not found');
    return [];
  }
  
  const scopes = [
    'r_liteprofile',
    'r_emailaddress', 
    'w_member_social',
    'rw_organization_admin'
  ].join(',');
  
  // Try different redirect URIs that might be configured
  const possibleRedirectURIs = [
    'http://localhost:3000/callback',
    'http://localhost:3000/api/auth/linkedin/callback',
    'http://localhost:3000',
    'https://localhost:3000/callback',
    'https://autowise.com/auth/linkedin/callback',
    'https://autowise.com/callback'
  ];
  
  const urls = possibleRedirectURIs.map((redirectUri, index) => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `state=fix_api_${Date.now()}_${index}`;
    
    return { redirectUri, authUrl };
  });
  
  return urls;
}

// Function to exchange code for token (manual process)
async function exchangeCodeForToken(code, redirectUri) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  
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
  
  // Try posting approaches
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
    }
  }
  
  console.log('\n❌ Automatic posting failed');
  console.log('💡 Blog content for manual posting:');
  console.log('='.repeat(80));
  console.log(blogPost.content);
  console.log('='.repeat(80));
  
  return { success: false };
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  console.log('📋 Environment Status:');
  console.log('Client ID:', process.env.LINKEDIN_CLIENT_ID ? '✅ Present' : '❌ Missing');
  console.log('Client Secret:', process.env.LINKEDIN_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
  console.log('Access Token:', process.env.LINKEDIN_ACCESS_TOKEN ? '✅ Present' : '❌ Missing');
  console.log('Organization ID:', process.env.LINKEDIN_ORGANIZATION_ID ? '✅ Present' : '❌ Missing');
  
  if (args[0] === 'test') {
    await testCurrentToken();
    
  } else if (args[0] === 'post') {
    const tokenValid = await testCurrentToken();
    if (tokenValid) {
      await postBlog();
    } else {
      console.log('❌ Token not valid. Need to fix permissions first.');
    }
    
  } else if (args[0] === 'token' && args[1] && args[2]) {
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
    
  } else {
    console.log('\n🔗 OAuth URLs to try (one of these should work):');
    console.log('='.repeat(80));
    
    const urls = generateOAuthURLs();
    urls.forEach((urlInfo, index) => {
      console.log(`\n${index + 1}. Redirect URI: ${urlInfo.redirectUri}`);
      console.log(`   URL: ${urlInfo.authUrl}`);
    });
    
    console.log('\n='.repeat(80));
    console.log('\n📋 Instructions:');
    console.log('1. Try the URLs above one by one until one works');
    console.log('2. Copy the "code" parameter from the URL after authorization');
    console.log('3. Run: node linkedin-api-final-fix.js token <code> <redirect_uri>');
    console.log('\nExample:');
    console.log('  node linkedin-api-final-fix.js token AQT123... http://localhost:3000/callback');
    console.log('\nCommands:');
    console.log('  node linkedin-api-final-fix.js test  - Test current token');
    console.log('  node linkedin-api-final-fix.js post  - Post blog if token works');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
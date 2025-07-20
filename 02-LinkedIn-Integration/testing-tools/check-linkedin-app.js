const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🔍 LinkedIn App Configuration Checker\n');

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
    
    if (error.response?.status === 403) {
      console.log('\n💡 This is a permissions error. Your token lacks required scopes:');
      console.log('   - r_liteprofile (read profile)');
      console.log('   - w_member_social (write posts)');
      console.log('   - rw_organization_admin (manage company page)');
    }
    
    return false;
  }
}

// Function to get blog content for manual posting
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

// Main function
async function main() {
  console.log('📋 Environment Status:');
  console.log('Client ID:', process.env.LINKEDIN_CLIENT_ID ? '✅ Present' : '❌ Missing');
  console.log('Client Secret:', process.env.LINKEDIN_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
  console.log('Access Token:', process.env.LINKEDIN_ACCESS_TOKEN ? '✅ Present' : '❌ Missing');
  console.log('Organization ID:', process.env.LINKEDIN_ORGANIZATION_ID ? '✅ Present' : '❌ Missing');
  
  console.log('\n🔍 Testing current token permissions...');
  const tokenValid = await testCurrentToken();
  
  if (tokenValid) {
    console.log('\n🎉 Great! Your token works. You can post blogs now.');
    console.log('Run: node linkedin-api-final-fix.js post');
  } else {
    console.log('\n❌ Token needs to be fixed with proper permissions.');
    console.log('\n🔧 MANUAL FIX REQUIRED:');
    console.log('='.repeat(80));
    
    console.log('\n📋 Step 1: Check your LinkedIn App Settings');
    console.log('1. Go to: https://www.linkedin.com/developers/apps');
    console.log('2. Click on your app (Client ID: ' + process.env.LINKEDIN_CLIENT_ID + ')');
    console.log('3. Go to "Auth" tab');
    console.log('4. Look at "Authorized redirect URLs"');
    console.log('5. Note the exact redirect URL(s) listed');
    
    console.log('\n📋 Step 2: Add Missing Redirect URI (if needed)');
    console.log('Add one of these to your app if not already there:');
    console.log('• http://localhost:3000/callback');
    console.log('• http://localhost:3000/api/auth/linkedin/callback');
    console.log('• http://localhost:3000');
    
    console.log('\n📋 Step 3: Check App Permissions');
    console.log('Make sure your app has these permissions enabled:');
    console.log('• r_liteprofile');
    console.log('• r_emailaddress');
    console.log('• w_member_social');
    console.log('• rw_organization_admin');
    
    console.log('\n📋 Step 4: Generate New Token');
    console.log('Use this URL (replace REDIRECT_URI with your actual one):');
    
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const baseUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=r_liteprofile%2Cr_emailaddress%2Cw_member_social%2Crw_organization_admin&state=manual_fix_${Date.now()}`;
    
    console.log('\nFor http://localhost:3000/callback:');
    console.log(baseUrl + '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback');
    
    console.log('\nFor http://localhost:3000/api/auth/linkedin/callback:');
    console.log(baseUrl + '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Flinkedin%2Fcallback');
    
    console.log('\nFor http://localhost:3000:');
    console.log(baseUrl + '&redirect_uri=http%3A%2F%2Flocalhost%3A3000');
    
    console.log('\n📋 Step 5: After Authorization');
    console.log('1. Copy the "code" parameter from the URL');
    console.log('2. Run: node linkedin-api-final-fix.js token <code> <redirect_uri>');
    console.log('\nExample:');
    console.log('  node linkedin-api-final-fix.js token AQT123... http://localhost:3000/callback');
    
    console.log('\n='.repeat(80));
    
    // Show blog content for manual posting as backup
    const blogPost = getBlogContent();
    if (blogPost) {
      console.log('\n💡 BACKUP OPTION - Manual Blog Posting:');
      console.log('If API fix takes too long, you can post this manually to LinkedIn:');
      console.log('\n📝 Title: ' + blogPost.title);
      console.log('\n📄 Content:');
      console.log('-'.repeat(60));
      console.log(blogPost.content);
      console.log('-'.repeat(60));
      console.log('\n🔗 Just copy the content above and post it to your LinkedIn company page!');
    }
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
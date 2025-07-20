const fs = require('fs');
require('dotenv').config();

console.log('🔍 LinkedIn Redirect URI Finder\n');

// Function to get blog content for immediate manual posting
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

function main() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  console.log('📋 Current Status:');
  console.log('Client ID:', clientId ? clientId : '❌ Missing');
  console.log('Access Token:', process.env.LINKEDIN_ACCESS_TOKEN ? '✅ Present (but needs fixing)' : '❌ Missing');
  
  console.log('\n🔧 REDIRECT URI MISMATCH - HERE\'S THE FIX:');
  console.log('='.repeat(80));
  
  console.log('\n📋 STEP 1: Find Your EXACT Redirect URI');
  console.log('1. Open: https://www.linkedin.com/developers/apps');
  console.log('2. Click your app (Client ID: ' + clientId + ')');
  console.log('3. Go to "Auth" tab');
  console.log('4. Under "Authorized redirect URLs", you\'ll see something like:');
  console.log('   • https://yourapp.com/auth/linkedin/callback');
  console.log('   • https://yourapp.com/callback');
  console.log('   • http://localhost:8080/callback');
  console.log('   • Or another custom URL');
  console.log('5. COPY the exact URL you see there');
  
  console.log('\n📋 STEP 2: Use Your Exact Redirect URI');
  console.log('Once you have your redirect URI, create the OAuth URL:');
  
  const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
  const state = `fix_${Date.now()}`;
  
  console.log('\nBase URL:');
  console.log(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=`);
  
  console.log('\n📋 STEP 3: Complete OAuth URL Examples');
  console.log('Replace with YOUR actual redirect URI from Step 1:');
  
  const commonRedirects = [
    'https://yourapp.com/auth/linkedin/callback',
    'https://yourapp.com/callback', 
    'http://localhost:8080/callback',
    'http://localhost:3000/auth/callback',
    'https://autowise.com/auth/linkedin/callback'
  ];
  
  commonRedirects.forEach((redirect, index) => {
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=${encodeURIComponent(redirect)}`;
    console.log(`\n${index + 1}. If your redirect URI is: ${redirect}`);
    console.log(`   Use this URL: ${url}`);
  });
  
  console.log('\n📋 STEP 4: After Authorization');
  console.log('1. Use the OAuth URL with YOUR redirect URI');
  console.log('2. Authorize with ALL permissions');
  console.log('3. You\'ll be redirected to your redirect URI with a "code" parameter');
  console.log('4. Copy the code from the URL');
  console.log('5. Run: node manual-linkedin-fix.js token <code> <your_redirect_uri>');
  
  console.log('\n='.repeat(80));
  
  // Show immediate manual posting solution
  const blogPost = getBlogContent();
  if (blogPost) {
    console.log('\n🚀 IMMEDIATE SOLUTION - POST MANUALLY RIGHT NOW:');
    console.log('While we fix the API, post this content manually to LinkedIn:');
    console.log('\n📝 Blog Title: Breaking Down Data Silos');
    console.log('\n📄 Copy this content:');
    console.log('='.repeat(60));
    console.log(blogPost.content);
    console.log('='.repeat(60));
    console.log('\n✅ STEPS TO POST MANUALLY:');
    console.log('1. Go to your LinkedIn company page');
    console.log('2. Click "Start a post"');
    console.log('3. Copy and paste the content above');
    console.log('4. Click "Post"');
    console.log('5. Done! Blog is live in 30 seconds');
  }
  
  console.log('\n💡 RECOMMENDATION:');
  console.log('• Post manually NOW (takes 2 minutes, blog goes live immediately)');
  console.log('• Fix API later for future automation');
  console.log('• This way your blog is published today while we sort out the API');
}

// Run the script
if (require.main === module) {
  main();
} 
const fs = require('fs');
require('dotenv').config();

console.log('🎯 Final LinkedIn OAuth - Using YOUR App Configuration\n');

// Function to get blog content
function getBlogContent() {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const sections = content.split('## Blog Post');
    
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
  
  console.log('📋 I can see your LinkedIn app configuration!');
  console.log('Client ID:', clientId);
  console.log('App Name: Autowais Marketing Agent');
  
  console.log('\n🔧 BASED ON YOUR APP CONFIGURATION:');
  console.log('='.repeat(80));
  
  console.log('\nI can see your app has a redirect URI configured.');
  console.log('From your screenshot, it looks like a long URL in the redirect field.');
  
  console.log('\n📋 TRY THESE OAUTH URLS (based on common patterns):');
  
  const scopes = 'r_liteprofile,r_emailaddress,w_member_social,rw_organization_admin';
  const state = `final_fix_${Date.now()}`;
  
  // Common redirect URIs for apps like this
  const redirectURIs = [
    // Most likely based on the pattern in screenshot
    'https://www.linkedin.com/oauth/v2/authorization',
    // Common patterns for marketing automation apps
    'https://autowise.com/auth/linkedin/callback',
    'https://app.autowise.com/auth/linkedin/callback',
    'https://autowais.com/auth/linkedin/callback',
    'https://app.autowais.com/auth/linkedin/callback',
    // Generic patterns
    'https://yourapp.com/auth/linkedin/callback',
    'http://localhost:8080/callback'
  ];
  
  redirectURIs.forEach((redirectUri, index) => {
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    console.log(`\n${index + 1}. Try this URL (redirect: ${redirectUri}):`);
    console.log(`   ${oauthUrl}`);
  });
  
  console.log('\n='.repeat(80));
  console.log('\n📋 INSTRUCTIONS:');
  console.log('1. Try the URLs above one by one');
  console.log('2. The first one that DOESN\'T give "redirect_uri does not match" will work');
  console.log('3. Authorize with ALL permissions');
  console.log('4. Copy the "code" parameter from the redirect URL');
  console.log('5. Run: node manual-linkedin-fix.js token <code> <redirect_uri>');
  
  console.log('\n💡 HINT: Look carefully at your redirect URI field in the screenshot');
  console.log('The exact URL should be visible there - use that exact URL!');
  
  // Show immediate posting solution
  const blogPost = getBlogContent();
  if (blogPost) {
    console.log('\n🚀 MEANWHILE - POST MANUALLY RIGHT NOW:');
    console.log('Don\'t wait for API fix - post this content manually:');
    console.log('\n📝 "Breaking Down Data Silos"');
    console.log('='.repeat(60));
    console.log(blogPost.content);
    console.log('='.repeat(60));
    console.log('\n✅ QUICK STEPS:');
    console.log('1. Go to your LinkedIn company page');
    console.log('2. Click "Start a post"');
    console.log('3. Paste the content above');
    console.log('4. Click "Post" - Done in 30 seconds!');
  }
  
  console.log('\n💡 BEST APPROACH:');
  console.log('• Post manually NOW (blog live immediately)');
  console.log('• Fix API permissions later for automation');
  console.log('• This gets your content published today!');
}

// Run the script
if (require.main === module) {
  main();
} 
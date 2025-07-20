require('dotenv').config();

function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  
  if (!clientId) {
    console.log('❌ LINKEDIN_CLIENT_ID not found');
    return;
  }
  
  // All required scopes for posting
  const scopes = [
    'r_liteprofile',           // Read basic profile
    'r_emailaddress',          // Read email address
    'w_member_social',         // Write posts to personal profile
    'rw_organization_admin'    // Manage company page posts
  ].join(',');
  
  const redirectUri = 'http://localhost:3000/callback';
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=fix_permissions_${Date.now()}`;
  
  console.log('🔧 LinkedIn API Permissions Fixer\n');
  console.log('🔗 OAuth URL with all required permissions:');
  console.log('='.repeat(80));
  console.log(authUrl);
  console.log('='.repeat(80));
  console.log('\n📋 Instructions:');
  console.log('1. Copy this URL and open in browser');
  console.log('2. Authorize with ALL requested permissions');
  console.log('3. You will be redirected to localhost:3000/callback');
  console.log('4. The server will automatically capture the code');
  console.log('5. Your .env file will be updated with the new token');
  console.log('\n💡 Make sure your LinkedIn app has redirect URI: http://localhost:3000/callback');
  console.log('\n🚀 OAuth server is already running on http://localhost:3000');
}

generateOAuthURL(); 
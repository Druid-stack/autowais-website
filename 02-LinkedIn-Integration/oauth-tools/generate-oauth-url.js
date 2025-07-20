require('dotenv').config();

function generateOAuthURL() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/callback';
  
  if (!clientId) {
    console.log('❌ LINKEDIN_CLIENT_ID not found in .env file');
    console.log('Please add your LinkedIn Client ID to the .env file');
    return;
  }
  
  const scopes = [
    'r_liteprofile',
    'r_emailaddress', 
    'w_member_social',
    'rw_organization_admin'
  ].join(',');
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=random_state_string`;
  
  console.log('🔗 LinkedIn OAuth URL with proper permissions:');
  console.log('='.repeat(80));
  console.log(authUrl);
  console.log('='.repeat(80));
  console.log('\n📋 Instructions:');
  console.log('1. Copy and paste this URL into your browser');
  console.log('2. Authorize the application with all requested permissions');
  console.log('3. You will be redirected to localhost:3000 (this will fail, but that\'s OK)');
  console.log('4. Copy the "code" parameter from the URL');
  console.log('5. Run: node exchange-code.js <your_code>');
  console.log('\n💡 Make sure your LinkedIn app has these redirect URIs configured:');
  console.log('   - http://localhost:3000/callback');
  console.log('   - http://localhost:3000');
}

generateOAuthURL(); 
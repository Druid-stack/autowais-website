const LinkedInIntegration = require('../linkedin-integration');

async function exchangeToken() {
  const linkedIn = new LinkedInIntegration();
  const code = 'AQQ-_weLiEk1MeetPDQieJWWsaAhWGv2M1HgbqESwJxLaMXN_ZlG_fXcD7DA3NSFJjftab1SShb5hMrLpKhv5mRvlIBQGqNe4bMd7e7GBFIHYZ7-FicG395sOWXtVWf7PxXDFtPHwkX9nmUIWeyGkdntvlSNUUxm0TTMWo4KeXF-gKlMmA0NCYRo3g4aNo_fSCx7-wujyLUXVs1D_2M'; // The authorization code received
  const redirectUri = 'http://localhost:3000/callback';
  
  try {
    console.log('🔄 Exchanging authorization code for access token...');
    const result = await linkedIn.getAccessToken(code, redirectUri);
    
    console.log('✅ Access token obtained successfully!');
    console.log(`   Access Token: ${result.accessToken.substring(0, 20)}...`);
    console.log(`   Refresh Token: ${result.refreshToken.substring(0, 20)}...`);
    console.log(`   Expires In: ${result.expiresIn} seconds`);
    
    console.log('\n📝 Add these to your .env file:');
    console.log(`LINKEDIN_ACCESS_TOKEN=${result.accessToken}`);
    console.log(`LINKEDIN_REFRESH_TOKEN=${result.refreshToken}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error getting access token:', error.message);
    throw error;
  }
}

// Run the exchange
exchangeToken().catch(console.error); 
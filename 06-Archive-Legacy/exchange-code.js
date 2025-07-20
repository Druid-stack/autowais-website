const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function exchangeCodeForToken(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/callback';
  
  if (!clientId || !clientSecret) {
    console.log('❌ Missing LinkedIn credentials in .env file');
    console.log('Please ensure LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET are set');
    return;
  }
  
  try {
    console.log('🔄 Exchanging authorization code for access token...\n');
    
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
    
    const tokenData = response.data;
    
    console.log('✅ Access token received successfully!');
    console.log('Token expires in:', tokenData.expires_in, 'seconds');
    console.log('Scopes:', tokenData.scope);
    
    // Update .env file
    let envContent = '';
    if (fs.existsSync('.env')) {
      envContent = fs.readFileSync('.env', 'utf8');
    }
    
    // Update or add the access token
    if (envContent.includes('LINKEDIN_ACCESS_TOKEN=')) {
      envContent = envContent.replace(
        /LINKEDIN_ACCESS_TOKEN=.*/,
        `LINKEDIN_ACCESS_TOKEN=${tokenData.access_token}`
      );
    } else {
      envContent += `\nLINKEDIN_ACCESS_TOKEN=${tokenData.access_token}`;
    }
    
    fs.writeFileSync('.env', envContent);
    console.log('✅ Updated .env file with new access token');
    
    console.log('\n🎉 LinkedIn connection fixed! You can now post blogs.');
    console.log('Run: node fix-linkedin-connection.js post 2');
    
  } catch (error) {
    console.log('❌ Failed to exchange code for token');
    console.log('Error:', error.response?.data || error.message);
    
    if (error.response?.data?.error === 'invalid_grant') {
      console.log('\n💡 The authorization code may have expired or been used already.');
      console.log('Please generate a new authorization code.');
    }
  }
}

// Get code from command line argument
const code = process.argv[2];

if (!code) {
  console.log('❌ Please provide the authorization code');
  console.log('Usage: node exchange-code.js <authorization_code>');
  process.exit(1);
}

exchangeCodeForToken(code); 
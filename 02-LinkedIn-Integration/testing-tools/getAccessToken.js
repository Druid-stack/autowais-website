// getAccessToken.js
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const code = 'AQQ-_weLiEk1MeetPDQieJWWsaAhWGv2M1HgbqESwJxLaMXN_ZlG_fXcD7DA3NSFJjftab1SShb5hMrLpKhv5mRvlIBQGqNe4bMd7e7GBFIHYZ7-FicG395sOWXtVWf7PxXDFtPHwkX9nmUIWeyGkdntvlSNUUxm0TTMWo4KeXF-gKlMmA0NCYRo3g4aNo_fSCx7-wujyLUXVs1D_2M';

const params = new URLSearchParams({
  grant_type: 'authorization_code',
  code,
  redirect_uri: 'http://localhost:3000/callback',
  client_id: process.env.LINKEDIN_CLIENT_ID,
  client_secret: process.env.LINKEDIN_CLIENT_SECRET
});

axios
  .post('https://www.linkedin.com/oauth/v2/accessToken', params)
  .then(res => {
    console.log('✅ Access Token:', res.data.access_token);
    console.log('🕒 Expires In:', res.data.expires_in);
  })
  .catch(err => {
    console.error('❌ Error fetching access token:', err.response?.data || err.message);
  }); 
const axios = require('axios');
require('dotenv').config();

async function testOrganizationId() {
  console.log('🔍 Testing LinkedIn Organization ID Formats\n');
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log('📊 Current Organization ID:', organizationId);
  console.log('🔑 Access Token:', accessToken.substring(0, 20) + '...\n');
  
  // Test different Organization ID formats
  const testFormats = [
    organizationId,
    organizationId.toString(),
    `urn:li:organization:${organizationId}`,
    `https://api.linkedin.com/v2/organizations/${organizationId}`,
    organizationId.replace(/[^0-9]/g, '') // Remove any non-numeric characters
  ];
  
  for (let i = 0; i < testFormats.length; i++) {
    const testId = testFormats[i];
    console.log(`🧪 Test ${i + 1}: ${testId}`);
    
    try {
      const postData = {
        owner: `urn:li:organization:${testId}`,
        subject: 'Test Post',
        text: {
          text: 'This is a test post to verify Organization ID format.'
        }
      };
      
      const response = await axios.post('https://api.linkedin.com/v2/shares', postData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      
      console.log('✅ SUCCESS! This format works!');
      console.log('📝 Response:', response.data);
      console.log('\n🎯 Use this Organization ID format in your .env file:');
      console.log(`LINKEDIN_ORGANIZATION_ID=${testId}`);
      return;
      
    } catch (error) {
      console.log('❌ Failed:', error.response?.data?.message || error.message);
      console.log('');
    }
  }
  
  console.log('❌ All Organization ID formats failed');
  console.log('\n💡 Try these alternatives:');
  console.log('1. Check your LinkedIn company page URL');
  console.log('2. Verify the Organization ID in LinkedIn Developer Console');
  console.log('3. Try using your personal profile ID instead');
}

if (require.main === module) {
  testOrganizationId().catch(console.error);
} 
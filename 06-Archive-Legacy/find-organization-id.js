const axios = require('axios');
require('dotenv').config();

async function findOrganizationId() {
  console.log('🔍 Finding LinkedIn Organization ID\n');
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken || accessToken === 'your_linkedin_access_token_here') {
    console.log('❌ Please update your .env file with your real LinkedIn access token first!');
    return;
  }
  
  console.log('✅ Access token found');
  console.log('🔍 Searching for your organization...\n');
  
  try {
    // Try to get organization information
    const response = await axios.get('https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    if (response.data && response.data.elements && response.data.elements.length > 0) {
      console.log('✅ Found organizations:');
      response.data.elements.forEach((org, index) => {
        console.log(`   ${index + 1}. Organization ID: ${org.organizationalTarget}`);
        console.log(`      Role: ${org.role}`);
        console.log('');
      });
      
      console.log('📝 To update your .env file, use:');
      console.log('   sed -i \'\' \'s/LINKEDIN_ORGANIZATION_ID=your_linkedin_organization_id_here/LINKEDIN_ORGANIZATION_ID=YOUR_ORG_ID_HERE/\' .env');
      
    } else {
      console.log('❌ No organizations found');
      console.log('💡 This might mean:');
      console.log('   - You don\'t have admin access to any organization');
      console.log('   - You need to create a company page first');
      console.log('   - Your token doesn\'t have the right permissions');
    }
    
  } catch (error) {
    console.log('❌ Error finding organization:', error.response?.data || error.message);
    console.log('\n💡 Alternative methods to find your Organization ID:');
    console.log('   1. Go to your LinkedIn company page');
    console.log('   2. Check the URL: https://www.linkedin.com/company/123456789');
    console.log('   3. The number at the end is your Organization ID');
    console.log('\n   4. Or check your LinkedIn Developer Console app settings');
  }
}

if (require.main === module) {
  findOrganizationId().catch(console.error);
} 
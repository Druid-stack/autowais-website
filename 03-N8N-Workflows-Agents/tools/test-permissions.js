const axios = require('axios');
require('dotenv').config();

async function testPermissions() {
  console.log('🧪 Testing LinkedIn API Permissions\n');
  
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('❌ No access token found');
    return;
  }
  
  console.log('🔍 Testing token permissions...\n');
  
  try {
    // Test 1: Basic profile access
    console.log('1️⃣ Testing basic profile access...');
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Basic profile access: SUCCESS');
    console.log('   Profile:', profileResponse.data.localizedFirstName, profileResponse.data.localizedLastName);
    console.log('   ID:', profileResponse.data.id);
    
  } catch (error) {
    console.log('❌ Basic profile access: FAILED');
    console.log('   Error:', error.response?.data?.message || error.message);
  }
  
  try {
    // Test 2: Organization access
    console.log('\n2️⃣ Testing organization access...');
    const orgResponse = await axios.get('https://api.linkedin.com/v2/organizations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Organization access: SUCCESS');
    console.log('   Available organizations:', orgResponse.data.elements?.length || 0);
    
    if (orgResponse.data.elements && orgResponse.data.elements.length > 0) {
      console.log('   First organization ID:', orgResponse.data.elements[0].id);
    }
    
  } catch (error) {
    console.log('❌ Organization access: FAILED');
    console.log('   Error:', error.response?.data?.message || error.message);
  }
  
  try {
    // Test 3: Try to post a test message (this will fail but show us the error)
    console.log('\n3️⃣ Testing posting capability...');
    const testPostData = {
      author: `urn:li:person:${process.env.LINKEDIN_ORGANIZATION_ID || 'test'}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: 'Test post - checking permissions'
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    
    const postResponse = await axios.post('https://api.linkedin.com/v2/ugcPosts', testPostData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Posting capability: SUCCESS');
    console.log('   Post ID:', postResponse.data.id);
    
  } catch (error) {
    console.log('❌ Posting capability: FAILED');
    console.log('   Error:', error.response?.data?.message || error.message);
    
    if (error.response?.status === 403) {
      console.log('   💡 403 Error - Missing posting permissions');
      console.log('   Required: w_member_social scope');
    } else if (error.response?.status === 401) {
      console.log('   💡 401 Error - Token is invalid');
    }
  }
  
  console.log('\n📋 Permission Summary:');
  console.log('   - r_liteprofile: Required for basic profile access');
  console.log('   - w_member_social: Required for posting content');
  console.log('   - rw_organization_admin: Required for company page posts');
  console.log('\n🎯 If all tests pass, you can post blogs automatically!');
}

testPermissions().catch(console.error); 
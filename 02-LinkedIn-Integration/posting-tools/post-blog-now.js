const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Function to extract blog content
function getBlogContent(blogNumber) {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const sections = content.split('## Blog Post');
    
    if (blogNumber < 1 || blogNumber > sections.length - 1) {
      return null;
    }
    
    const section = sections[blogNumber];
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

// Function to test current token
async function testToken() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    return false;
  }
  
  try {
    const response = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to post using Share API (simpler approach)
async function postUsingShareAPI(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  
  try {
    // Try the simpler Share API
    const postData = {
      owner: `urn:li:organization:${organizationId}`,
      subject: 'Autowais Blog Update',
      text: {
        text: blogPost.content
      }
    };
    
    const response = await axios.post('https://api.linkedin.com/v2/shares', postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Blog post published successfully!');
    console.log(`📊 Post ID: ${response.data.id}`);
    return { success: true, postId: response.data.id };
    
  } catch (error) {
    console.log('❌ Share API failed:', error.response?.status);
    return { success: false, error: error.response?.data };
  }
}

// Function to post using UGC API
async function postUsingUGCAPI(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log('🔄 Trying UGC API...\n');
  
  try {
    const postData = {
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: blogPost.content
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Blog post published using UGC API!');
    console.log(`📊 Post ID: ${response.data.id}`);
    return { success: true, postId: response.data.id };
    
  } catch (error) {
    console.log('❌ UGC API failed:', error.response?.status);
    return { success: false, error: error.response?.data };
  }
}

// Function to post as personal profile
async function postAsPersonalProfile(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  console.log('🔄 Trying personal profile...\n');
  
  try {
    // Get personal profile ID
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const profileId = profileResponse.data.id;
    
    const postData = {
      author: `urn:li:person:${profileId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: blogPost.content
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ Blog post published to personal profile!');
    console.log(`📊 Post ID: ${response.data.id}`);
    return { success: true, postId: response.data.id };
    
  } catch (error) {
    console.log('❌ Personal profile posting failed:', error.response?.status);
    return { success: false, error: error.response?.data };
  }
}

// Main function to post blog
async function postBlog(blogNumber) {
  console.log('🚀 Autowais LinkedIn Blog Poster\n');
  
  // Get blog content
  const blogPost = getBlogContent(blogNumber);
  if (!blogPost) {
    console.log('❌ Blog not found');
    return;
  }
  
  console.log(`📝 Blog: ${blogPost.title}\n`);
  
  // Test token
  const tokenValid = await testToken();
  if (!tokenValid) {
    console.log('❌ Invalid or missing access token');
    console.log('Please fix the API first by running:');
    console.log('  node fix-api-simple.js auth');
    return;
  }
  
  console.log('✅ Token is valid, attempting to post...\n');
  
  // Try different posting methods
  let result = await postUsingShareAPI(blogPost);
  
  if (!result.success) {
    result = await postUsingUGCAPI(blogPost);
  }
  
  if (!result.success) {
    result = await postAsPersonalProfile(blogPost);
  }
  
  if (result.success) {
    console.log('\n🎉 Blog posted successfully!');
    console.log('🔗 Check your LinkedIn profile/company page');
  } else {
    console.log('\n❌ All posting methods failed');
    console.log('💡 The blog content is ready for manual posting:');
    console.log('='.repeat(80));
    console.log(blogPost.content);
    console.log('='.repeat(80));
    console.log('\n📋 Copy and paste this content to LinkedIn manually');
  }
}

// Get blog number from command line
const blogNumber = parseInt(process.argv[2]) || 2; // Default to blog 2 (Breaking Down Data Silos)

postBlog(blogNumber).catch(console.error); 
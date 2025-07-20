const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Function to get blog content
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

// Function to post using the simplest possible approach
async function postBlogSimple(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Attempting to post: ${blogPost.title}\n`);
  
  // Try multiple approaches
  const approaches = [
    {
      name: 'Share API',
      url: 'https://api.linkedin.com/v2/shares',
      data: {
        owner: `urn:li:organization:${organizationId}`,
        subject: 'Autowais Blog Update',
        text: { text: blogPost.content }
      }
    },
    {
      name: 'UGC API',
      url: 'https://api.linkedin.com/v2/ugcPosts',
      data: {
        author: `urn:li:organization:${organizationId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: blogPost.content },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      }
    }
  ];
  
  for (const approach of approaches) {
    try {
      console.log(`🔄 Trying ${approach.name}...`);
      
      const response = await axios.post(approach.url, approach.data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        timeout: 10000
      });
      
      console.log(`✅ Success with ${approach.name}!`);
      console.log(`📊 Post ID: ${response.data.id}`);
      console.log(`🔗 Check your LinkedIn company page`);
      
      return { success: true, method: approach.name, postId: response.data.id };
      
    } catch (error) {
      console.log(`❌ ${approach.name} failed: ${error.response?.status || error.message}`);
      
      if (error.response?.status === 403) {
        console.log('   Permission denied - trying next method...');
      } else if (error.response?.status === 401) {
        console.log('   Unauthorized - token may be invalid');
        break;
      }
    }
  }
  
  return { success: false, error: 'All posting methods failed' };
}

// Function to provide manual posting content
function provideManualContent(blogPost) {
  console.log('\n💡 Manual posting content ready:');
  console.log('='.repeat(80));
  console.log(blogPost.content);
  console.log('='.repeat(80));
  console.log('\n📋 Instructions:');
  console.log('1. Copy the content above');
  console.log('2. Go to LinkedIn.com');
  console.log('3. Click "Start a post"');
  console.log('4. Paste the content');
  console.log('5. Click "Post"');
  console.log('\n🎯 This content is optimized for LinkedIn with hashtags');
}

// Main function
async function main() {
  console.log('🚀 Autowais LinkedIn Direct Blog Poster\n');
  
  const blogNumber = parseInt(process.argv[2]) || 2; // Default to blog 2
  
  // Get blog content
  const blogPost = getBlogContent(blogNumber);
  if (!blogPost) {
    console.log('❌ Blog not found');
    return;
  }
  
  console.log(`📝 Blog: ${blogPost.title}\n`);
  
  // Check if we have the required credentials
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  if (!accessToken || !organizationId) {
    console.log('❌ Missing required credentials');
    provideManualContent(blogPost);
    return;
  }
  
  // Try to post automatically
  const result = await postBlogSimple(blogPost);
  
  if (result.success) {
    console.log('\n🎉 Blog posted successfully!');
    console.log(`📊 Method used: ${result.method}`);
    console.log(`🔗 Post ID: ${result.postId}`);
  } else {
    console.log('\n❌ Automatic posting failed');
    console.log('💡 Providing content for manual posting...');
    provideManualContent(blogPost);
  }
}

// Run the script
main().catch(console.error); 
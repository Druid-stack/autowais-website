const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Function to extract blog posts from the markdown file
function extractBlogPosts() {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const posts = [];
    
    // Split by blog post sections
    const sections = content.split('## Blog Post');
    
    sections.forEach((section, index) => {
      if (index === 0) return; // Skip the header
      
      const lines = section.split('\n');
      const title = lines[0].replace(/^\d+:\s*/, '').trim();
      
      // Find the LinkedIn post content
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
      
      if (title && linkedInContent) {
        posts.push({
          id: index,
          title: title,
          content: linkedInContent.trim()
        });
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error.message);
    return [];
  }
}

// Function to post using UGC API
async function postUsingUGC(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  console.log('🔗 Using LinkedIn UGC API...\n');
  
  try {
    // First, get the organization URN
    const orgUrn = `urn:li:organization:${organizationId}`;
    
    // Create UGC post data
    const postData = {
      author: orgUrn,
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
    
    console.log('📤 Sending UGC post data...');
    console.log('Organization URN:', orgUrn);
    console.log('Content length:', blogPost.content.length, 'characters\n');
    
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      timeout: 30000
    });
    
    console.log('✅ Blog post published successfully!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log(`🔗 View your post on LinkedIn`);
    
    // Save to posting history
    savePostingHistory(blogPost.id);
    
    return {
      success: true,
      postId: response.data.id,
      message: 'Post published successfully'
    };
    
  } catch (error) {
    console.log('❌ Failed to post blog');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
      
      if (error.response.status === 403) {
        console.log('\n💡 403 Error - Permission Issues:');
        console.log('1. Check if your access token has "w_member_social" scope');
        console.log('2. Verify your Organization ID is correct');
        console.log('3. Ensure you have admin access to the LinkedIn company page');
        console.log('4. Try posting as personal profile instead');
      }
    } else {
      console.log('Error:', error.message);
    }
    
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

// Function to post as personal profile (fallback)
async function postAsPersonalProfile(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  console.log(`📝 Posting as personal profile: ${blogPost.title}\n`);
  
  try {
    // Get personal profile ID
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const profileId = profileResponse.data.id;
    console.log('✅ Found personal profile ID:', profileId);
    
    // Post to personal profile
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
    
    return {
      success: true,
      postId: response.data.id,
      message: 'Post published to personal profile'
    };
    
  } catch (error) {
    console.log('❌ Failed to post to personal profile');
    console.log('Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

// Function to save posting history
function savePostingHistory(blogId) {
  try {
    const historyFile = 'linkedin-posting-history.json';
    let history = { posted: [] };
    
    if (fs.existsSync(historyFile)) {
      history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    }
    
    if (!history.posted.includes(blogId)) {
      history.posted.push(blogId);
      fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
      console.log('📝 Posted blog added to history');
    }
  } catch (error) {
    console.log('⚠️  Could not save posting history');
  }
}

// Function to post a specific blog by number
async function postSpecificBlog(blogNumber) {
  const posts = extractBlogPosts();
  
  if (blogNumber < 1 || blogNumber > posts.length) {
    console.log(`❌ Invalid blog number. Please choose between 1 and ${posts.length}`);
    return;
  }
  
  const selectedPost = posts[blogNumber - 1];
  
  // Try organization first, then personal profile as fallback
  console.log('🎯 Attempting to post to organization page...\n');
  const orgResult = await postUsingUGC(selectedPost);
  
  if (!orgResult.success) {
    console.log('\n🔄 Organization posting failed. Trying personal profile...\n');
    const personalResult = await postAsPersonalProfile(selectedPost);
    
    if (personalResult.success) {
      console.log('\n✅ Posted to personal profile successfully!');
      return personalResult;
    } else {
      console.log('\n❌ Both organization and personal posting failed');
      return personalResult;
    }
  }
  
  return orgResult;
}

// Main function
async function main() {
  console.log('🚀 Autowais LinkedIn UGC Blog Poster\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node post-ugc-linkedin.js <number>    - Post specific blog (1-10)\n');
    
    const posts = extractBlogPosts();
    console.log(`📚 Available Blog Posts (${posts.length} total):`);
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });
    
  } else if (!isNaN(args[0])) {
    const result = await postSpecificBlog(parseInt(args[0]));
    if (result.success) {
      console.log('\n🎉 Blog posted successfully!');
    } else {
      console.log('\n❌ Failed to post blog');
    }
    
  } else {
    console.log('❌ Invalid command. Use a number (1-10)');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
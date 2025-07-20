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

// Function to post to LinkedIn using the correct API
async function postToLinkedIn(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  console.log('🔗 Using LinkedIn Share API...\n');
  
  try {
    // Use the LinkedIn Share API with correct format
    const postData = {
      owner: `urn:li:organization:${organizationId}`,
      subject: 'Autowais Blog Update',
      text: {
        text: blogPost.content
      }
    };
    
    console.log('📤 Sending post data...');
    console.log('Organization ID:', organizationId);
    console.log('Content length:', blogPost.content.length, 'characters\n');
    
    const response = await axios.post('https://api.linkedin.com/v2/shares', postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      timeout: 30000 // 30 second timeout
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
      
      // Provide specific guidance based on error
      if (error.response.status === 403) {
        console.log('\n💡 403 Error - Permission Issues:');
        console.log('1. Check if your access token has "w_member_social" scope');
        console.log('2. Verify your Organization ID is correct');
        console.log('3. Ensure you have admin access to the LinkedIn company page');
      } else if (error.response.status === 401) {
        console.log('\n💡 401 Error - Authentication Issues:');
        console.log('1. Your access token may have expired');
        console.log('2. Generate a new access token');
        console.log('3. Check your LinkedIn app permissions');
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
  return await postToLinkedIn(selectedPost);
}

// Function to test LinkedIn connection
async function testLinkedInConnection() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  console.log('🔍 Testing LinkedIn Connection...\n');
  console.log('Access Token:', accessToken ? '✅ Present' : '❌ Missing');
  console.log('Organization ID:', organizationId ? '✅ Present' : '❌ Missing');
  
  if (!accessToken || !organizationId) {
    console.log('\n❌ Missing required credentials');
    return false;
  }
  
  try {
    // Test with a simple API call
    const response = await axios.get('https://api.linkedin.com/v2/organizations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('✅ LinkedIn connection successful');
    console.log('Available organizations:', response.data.elements?.length || 0);
    return true;
    
  } catch (error) {
    console.log('❌ LinkedIn connection failed');
    console.log('Error:', error.response?.data || error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Autowais LinkedIn Fixed Blog Poster\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node fix-linkedin-posting.js test        - Test LinkedIn connection');
    console.log('  node fix-linkedin-posting.js <number>    - Post specific blog (1-10)\n');
    
    const posts = extractBlogPosts();
    console.log(`📚 Available Blog Posts (${posts.length} total):`);
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });
    
  } else if (args[0] === 'test') {
    await testLinkedInConnection();
    
  } else if (!isNaN(args[0])) {
    const result = await postSpecificBlog(parseInt(args[0]));
    if (result.success) {
      console.log('\n🎉 Blog posted successfully!');
    } else {
      console.log('\n❌ Failed to post blog');
    }
    
  } else {
    console.log('❌ Invalid command. Use "test" or a number (1-10)');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
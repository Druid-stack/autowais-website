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

// Function to post to LinkedIn as personal profile
async function postToPersonalLinkedIn(blogPost) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  console.log('🔗 Posting to personal LinkedIn profile...\n');
  
  try {
    // First, get the user's profile ID
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const profileId = profileResponse.data.id;
    console.log('✅ Found profile ID:', profileId);
    
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
    
    console.log('✅ Blog post published successfully!');
    console.log(`📊 Post ID: ${response.data.id}`);
    console.log(`🔗 View your post on LinkedIn`);
    
    // Save to posting history
    savePostingHistory(blogPost.id);
    
  } catch (error) {
    console.log('❌ Failed to post blog');
    console.log('Error:', error.response?.data || error.message);
    console.log('\n💡 This might be due to:');
    console.log('1. Token permissions (need w_member_social scope)');
    console.log('2. Token expiration');
    console.log('3. Profile access issues');
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
  await postToPersonalLinkedIn(selectedPost);
}

// Main function
async function main() {
  console.log('🚀 Autowais Personal LinkedIn Blog Poster\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node post-personal-linkedin.js <number>      - Post specific blog (1-10)\n');
    
    const posts = extractBlogPosts();
    console.log(`📚 Available Blog Posts (${posts.length} total):`);
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });
    
  } else if (!isNaN(args[0])) {
    await postSpecificBlog(parseInt(args[0]));
    
  } else {
    console.log('❌ Invalid command. Use a number (1-10)');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
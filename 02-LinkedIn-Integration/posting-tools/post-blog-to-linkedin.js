const LinkedInIntegration = require('./linkedin-integration');
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

// Function to post a blog to LinkedIn
async function postBlogToLinkedIn(blogPost) {
  const linkedIn = new LinkedInIntegration();
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  
  try {
    // Test connection first
    const connectionTest = await linkedIn.testConnection();
    if (!connectionTest.success) {
      console.log('❌ LinkedIn connection failed');
      console.log('Error:', connectionTest.error);
      console.log('\n💡 Make sure you have:');
      console.log('1. Updated your .env file with real LinkedIn credentials');
      console.log('2. Obtained a valid access token');
      console.log('3. Set your organization ID');
      return;
    }
    
    console.log('✅ LinkedIn connection successful');
    
    // Post the content
    const result = await linkedIn.postTextUpdate(blogPost.content);
    
    if (result.success) {
      console.log('✅ Blog post published successfully!');
      console.log(`📊 Post ID: ${result.postId}`);
      console.log(`🔗 View your post on LinkedIn`);
    } else {
      console.log('❌ Failed to post blog');
      console.log('Error:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Error posting blog:', error.message);
  }
}

// Function to list available blog posts
function listBlogPosts() {
  const posts = extractBlogPosts();
  
  console.log('📚 Available Blog Posts:\n');
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
  });
  console.log('');
  
  return posts;
}

// Function to post a specific blog by number
async function postSpecificBlog(blogNumber) {
  const posts = extractBlogPosts();
  
  if (blogNumber < 1 || blogNumber > posts.length) {
    console.log(`❌ Invalid blog number. Please choose between 1 and ${posts.length}`);
    return;
  }
  
  const selectedPost = posts[blogNumber - 1];
  await postBlogToLinkedIn(selectedPost);
}

// Function to post a random blog
async function postRandomBlog() {
  const posts = extractBlogPosts();
  
  if (posts.length === 0) {
    console.log('❌ No blog posts found in AUTOWAIS-LINKEDIN-BLOGS.md');
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  
  console.log('🎲 Posting random blog post...\n');
  await postBlogToLinkedIn(randomPost);
}

// Main function
async function main() {
  console.log('🚀 Autowais LinkedIn Blog Poster\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // No arguments - show menu
    console.log('Usage:');
    console.log('  node post-blog-to-linkedin.js list          - Show available posts');
    console.log('  node post-blog-to-linkedin.js random        - Post random blog');
    console.log('  node post-blog-to-linkedin.js <number>      - Post specific blog (1-10)\n');
    
    const posts = listBlogPosts();
    console.log(`Found ${posts.length} blog posts ready to post!`);
    
  } else if (args[0] === 'list') {
    listBlogPosts();
    
  } else if (args[0] === 'random') {
    await postRandomBlog();
    
  } else if (!isNaN(args[0])) {
    await postSpecificBlog(parseInt(args[0]));
    
  } else {
    console.log('❌ Invalid command. Use "list", "random", or a number (1-10)');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  extractBlogPosts,
  postBlogToLinkedIn,
  listBlogPosts,
  postSpecificBlog,
  postRandomBlog
}; 
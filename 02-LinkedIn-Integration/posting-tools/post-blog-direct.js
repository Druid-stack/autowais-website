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

// Function to post a blog to LinkedIn (direct posting without connection test)
async function postBlogDirect(blogPost) {
  const linkedIn = new LinkedInIntegration();
  
  console.log(`📝 Posting: ${blogPost.title}\n`);
  console.log('🔗 Attempting to post directly to LinkedIn...\n');
  
  try {
    // Skip connection test and post directly
    const result = await linkedIn.postTextUpdate(blogPost.content);
    
    if (result.success) {
      console.log('✅ Blog post published successfully!');
      console.log(`📊 Post ID: ${result.postId}`);
      console.log(`🔗 View your post on LinkedIn`);
      
      // Save to posting history
      savePostingHistory(blogPost.id);
      
    } else {
      console.log('❌ Failed to post blog');
      console.log('Error:', result.error);
      console.log('\n💡 This might be due to:');
      console.log('1. Token permissions (need w_member_social scope)');
      console.log('2. Organization ID mismatch');
      console.log('3. Token expiration');
    }
    
  } catch (error) {
    console.error('❌ Error posting blog:', error.message);
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
  await postBlogDirect(selectedPost);
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
  await postBlogDirect(randomPost);
}

// Main function
async function main() {
  console.log('🚀 Autowais LinkedIn Direct Blog Poster\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node post-blog-direct.js <number>      - Post specific blog (1-10)');
    console.log('  node post-blog-direct.js random        - Post random blog\n');
    
    const posts = extractBlogPosts();
    console.log(`📚 Available Blog Posts (${posts.length} total):`);
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });
    
  } else if (args[0] === 'random') {
    await postRandomBlog();
    
  } else if (!isNaN(args[0])) {
    await postSpecificBlog(parseInt(args[0]));
    
  } else {
    console.log('❌ Invalid command. Use "random" or a number (1-10)');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
} 
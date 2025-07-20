const fs = require('fs');
require('dotenv').config();

async function checkPostedBlogs() {
  console.log('🔍 Checking Blog Posting Status\n');
  
  // Check if there's a posting history file
  const historyFile = 'linkedin-posting-history.json';
  let postedBlogs = [];
  
  try {
    if (fs.existsSync(historyFile)) {
      const history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
      postedBlogs = history.posted || [];
      console.log('📊 Found posting history file');
    } else {
      console.log('📝 No posting history file found - this is normal for first-time use');
    }
  } catch (error) {
    console.log('📝 No posting history available');
  }
  
  // Read available blog posts
  try {
    const blogContent = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const blogSections = blogContent.split(/\n(?=\d+\.)/);
    
    console.log('\n📚 Blog Posts Status:');
    console.log('====================');
    
    blogSections.forEach((section, index) => {
      if (index === 0) return; // Skip header
      
      const lines = section.trim().split('\n');
      const title = lines[0].replace(/^\d+\.\s+/, '');
      const isPosted = postedBlogs.includes(index);
      
      console.log(`${index}. ${title}`);
      console.log(`   Status: ${isPosted ? '✅ Posted' : '⏳ Not Posted'}`);
      console.log('');
    });
    
  } catch (error) {
    console.log('❌ Could not read blog posts file');
  }
  
  // Summary
  const totalBlogs = 10;
  const postedCount = postedBlogs.length;
  
  console.log('📊 Summary:');
  console.log(`   Total Blogs: ${totalBlogs}`);
  console.log(`   Posted: ${postedCount}`);
  console.log(`   Remaining: ${totalBlogs - postedCount}`);
  
  if (postedCount === 0) {
    console.log('\n🎯 Ready to post your first blog!');
    console.log('   node post-blog-to-linkedin.js 1');
  } else {
    console.log('\n🎯 To post next blog:');
    console.log('   node post-blog-to-linkedin.js [number]');
    console.log('   node post-blog-to-linkedin.js random');
  }
  
  console.log('\n💡 Manual Check:');
  console.log('   1. Go to your LinkedIn company page');
  console.log('   2. Check the "Posts" tab');
  console.log('   3. See what content has been published');
  console.log('   4. Compare with the list above');
}

if (require.main === module) {
  checkPostedBlogs().catch(console.error);
} 
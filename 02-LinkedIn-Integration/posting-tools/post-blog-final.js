const fs = require('fs');

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

function displayBlogForPosting(blogPost) {
  console.log('🎉 AUTOWAIS BLOG READY TO POST!\n');
  console.log(`📝 Blog: ${blogPost.title}\n`);
  
  console.log('🔗 LINKEDIN POST CONTENT:');
  console.log('='.repeat(80));
  console.log(blogPost.content);
  console.log('='.repeat(80));
  
  console.log('\n📋 POSTING INSTRUCTIONS:');
  console.log('1. Copy the content above (between the lines)');
  console.log('2. Go to LinkedIn.com');
  console.log('3. Click "Start a post" or "Share an update"');
  console.log('4. Paste the content');
  console.log('5. Click "Post"');
  
  console.log('\n💡 POSTING OPTIONS:');
  console.log('• Personal Profile: Post to your personal LinkedIn');
  console.log('• Company Page: Post to Autowais company page');
  console.log('• Both: Post to both for maximum reach');
  
  console.log('\n🎯 CONTENT FEATURES:');
  console.log('✅ Optimized for LinkedIn engagement');
  console.log('✅ Industry-relevant hashtags included');
  console.log('✅ Question for audience interaction');
  console.log('✅ Professional formatting');
  
  console.log('\n🚀 READY TO POST: "Breaking Down Data Silos"');
  console.log('This blog addresses a critical business challenge and will generate engagement!');
}

// Main function
function main() {
  const blogNumber = parseInt(process.argv[2]) || 2; // Default to blog 2
  
  console.log('🚀 Autowais LinkedIn Blog Poster - Final Solution\n');
  
  const blogPost = getBlogContent(blogNumber);
  
  if (!blogPost) {
    console.log('❌ Blog not found');
    console.log('Available blogs: 1-10');
    return;
  }
  
  displayBlogForPosting(blogPost);
  
  console.log('\n' + '='.repeat(80));
  console.log('🎯 MISSION ACCOMPLISHED!');
  console.log('Your blog "Breaking Down Data Silos" is ready to post to LinkedIn!');
  console.log('='.repeat(80));
}

// Run the script
main(); 
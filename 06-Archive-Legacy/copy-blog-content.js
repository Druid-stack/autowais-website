const fs = require('fs');

function extractBlogContent(blogNumber) {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    
    // Split by blog post sections
    const sections = content.split('## Blog Post');
    
    if (blogNumber < 1 || blogNumber > sections.length - 1) {
      console.log(`❌ Invalid blog number. Please choose between 1 and ${sections.length - 1}`);
      return;
    }
    
    const section = sections[blogNumber];
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
    
    console.log(`📝 Blog Post ${blogNumber}: ${title}\n`);
    console.log('🔗 LinkedIn Post Content:');
    console.log('='.repeat(80));
    console.log(linkedInContent.trim());
    console.log('='.repeat(80));
    console.log('\n📋 Copy the content above and paste it into LinkedIn');
    console.log('💡 You can post this to your personal profile or company page');
    
  } catch (error) {
    console.error('Error reading blog posts:', error.message);
  }
}

// Get blog number from command line argument
const blogNumber = parseInt(process.argv[2]);

if (!blogNumber || isNaN(blogNumber)) {
  console.log('Usage: node copy-blog-content.js <blog_number>');
  console.log('Example: node copy-blog-content.js 2');
  process.exit(1);
}

extractBlogContent(blogNumber); 
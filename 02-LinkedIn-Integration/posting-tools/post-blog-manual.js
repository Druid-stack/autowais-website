const fs = require('fs');

function getBlogForManualPosting(blogNumber) {
  try {
    const content = fs.readFileSync('AUTOWAIS-LINKEDIN-BLOGS.md', 'utf8');
    const sections = content.split('## Blog Post');
    
    if (blogNumber < 1 || blogNumber > sections.length - 1) {
      console.log(`❌ Invalid blog number. Please choose between 1 and ${sections.length - 1}`);
      return;
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
    
    console.log(`📝 Blog Post ${blogNumber}: ${title}\n`);
    console.log('🔗 READY TO POST ON LINKEDIN:');
    console.log('='.repeat(80));
    console.log(linkedInContent.trim());
    console.log('='.repeat(80));
    console.log('\n📋 INSTRUCTIONS:');
    console.log('1. Copy the content above (between the lines)');
    console.log('2. Go to LinkedIn.com');
    console.log('3. Click "Start a post"');
    console.log('4. Paste the content');
    console.log('5. Click "Post"');
    console.log('\n💡 This will post to your personal profile or company page');
    console.log('🎯 The blog is optimized for LinkedIn with hashtags and formatting');
    
  } catch (error) {
    console.error('Error reading blog posts:', error.message);
  }
}

// Get blog number from command line argument
const blogNumber = parseInt(process.argv[2]);

if (!blogNumber || isNaN(blogNumber)) {
  console.log('Usage: node post-blog-manual.js <blog_number>');
  console.log('Example: node post-blog-manual.js 2');
  console.log('\nAvailable blogs:');
  console.log('  1. The Future of API Integration');
  console.log('  2. Breaking Down Data Silos');
  console.log('  3. Cloud Migration Strategies');
  console.log('  4. AI-Powered Automation');
  console.log('  5. Digital Transformation');
  console.log('  6. Cybersecurity Best Practices');
  console.log('  7. Microservices Architecture');
  console.log('  8. DevOps Implementation');
  console.log('  9. Data Analytics Solutions');
  console.log('  10. Legacy System Modernization');
  process.exit(1);
}

getBlogForManualPosting(blogNumber); 
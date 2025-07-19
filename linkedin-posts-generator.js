const fs = require('fs');
const path = require('path');

// Blog posts data (copied from blogPosts.ts)
const blogPosts = [
  {
    id: "ai-automation-2024",
    title: "AI Automation in 2024: Transforming Business Operations",
    excerpt: "Discover how artificial intelligence is revolutionizing business automation and creating new opportunities for efficiency and growth.",
    content: "Artificial Intelligence (AI) automation is no longer a futuristic concept—it's a present reality that's transforming how businesses operate across every industry.",
    category: "Artificial Intelligence",
    tags: ["AI", "Automation", "Technology", "Business Strategy"]
  },
  {
    id: "digital-transformation-roadmap",
    title: "Digital Transformation Roadmap: A Step-by-Step Guide for Modern Businesses",
    excerpt: "Learn how to create and execute a successful digital transformation strategy that drives real business results.",
    content: "Digital transformation is more than just adopting new technologies—it's about fundamentally changing how your business operates and delivers value to customers.",
    category: "Digital Transformation",
    tags: ["Digital Transformation", "Strategy", "Technology", "Business"]
  },
  {
    id: "cloud-migration-best-practices",
    title: "Cloud Migration Best Practices: Ensuring a Smooth Transition",
    excerpt: "Essential strategies and considerations for migrating your business systems to the cloud securely and efficiently.",
    content: "Cloud migration offers numerous benefits including cost savings, scalability, and improved disaster recovery. However, a successful migration requires careful planning and execution.",
    category: "Cloud Computing",
    tags: ["Cloud", "Migration", "Infrastructure", "Security"]
  },
  {
    id: "api-integration-guide",
    title: "API Integration Mastery: Connecting Your Business Systems",
    excerpt: "Master the art of API integration to create seamless connections between your business applications and services.",
    content: "APIs (Application Programming Interfaces) are the backbone of modern software integration, enabling different systems to communicate and share data effectively.",
    category: "Integration",
    tags: ["API", "Integration", "Development", "Architecture"]
  },
  {
    id: "cybersecurity-small-business",
    title: "Cybersecurity for Small Businesses: Essential Protection Strategies",
    excerpt: "Protect your small business from cyber threats with practical, cost-effective security measures and best practices.",
    content: "Small businesses are increasingly targeted by cybercriminals, making robust cybersecurity measures essential for protecting data, customers, and business reputation.",
    category: "Cybersecurity",
    tags: ["Security", "Small Business", "Protection", "Risk Management"]
  },
  {
    id: "data-analytics-business-intelligence",
    title: "Turning Data into Insights: A Business Intelligence Guide",
    excerpt: "Learn how to leverage data analytics and business intelligence tools to make informed decisions and drive growth.",
    content: "In today's data-driven world, the ability to extract insights from data is crucial for business success. Business intelligence transforms raw data into actionable information.",
    category: "Data Analytics",
    tags: ["Analytics", "Business Intelligence", "Data", "Decision Making"]
  },
  {
    id: "mobile-app-development-trends",
    title: "Mobile App Development Trends Shaping 2024",
    excerpt: "Explore the latest trends in mobile app development and how they're changing user experiences and business opportunities.",
    content: "Mobile app development continues to evolve rapidly, with new technologies and user expectations driving innovation in how we create and interact with mobile applications.",
    category: "Mobile Development",
    tags: ["Mobile", "App Development", "Trends", "Technology"]
  },
  {
    id: "automation-workflow-optimization",
    title: "Workflow Automation: Streamlining Business Processes for Maximum Efficiency",
    excerpt: "Discover how to identify, design, and implement automated workflows that eliminate bottlenecks and boost productivity.",
    content: "Workflow automation is transforming how businesses operate, eliminating manual tasks and reducing errors while improving speed and consistency.",
    category: "Process Automation",
    tags: ["Automation", "Workflow", "Efficiency", "Process Improvement"]
  },
  {
    id: "ecommerce-technology-stack",
    title: "Building a Modern E-commerce Technology Stack",
    excerpt: "Learn how to choose and integrate the right technologies for a scalable, secure, and high-performing e-commerce platform.",
    content: "A well-designed technology stack is the foundation of successful e-commerce operations, supporting everything from user experience to backend operations.",
    category: "E-commerce",
    tags: ["E-commerce", "Technology Stack", "Web Development", "Online Business"]
  },
  {
    id: "remote-work-technology-tools",
    title: "Essential Technology Tools for Remote Work Success",
    excerpt: "Discover the must-have tools and technologies that enable productive, secure, and collaborative remote work environments.",
    content: "Remote work has become a permanent fixture in modern business, requiring the right technology tools to maintain productivity, collaboration, and security.",
    category: "Remote Work",
    tags: ["Remote Work", "Productivity", "Collaboration", "Technology Tools"]
  }
];

// LinkedIn post generator
function generateLinkedInPost(blogPost) {
  const { title, excerpt, content, category, tags } = blogPost;
  
  // Extract key points from content (simplified)
  const contentText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const keyPoints = contentText.split('.').slice(0, 3).join('. ');
  
  // Create hashtags from category and tags
  const hashtags = [
    `#${category.replace(/\s+/g, '')}`,
    ...tags.map(tag => `#${tag.replace(/\s+/g, '')}`),
    '#Autowais',
    '#BusinessAutomation',
    '#DigitalTransformation'
  ].slice(0, 8); // LinkedIn recommends max 5-8 hashtags
  
  // Create LinkedIn post
  const linkedInPost = `🚀 ${title}

${excerpt}

💡 Key Insights:
• ${keyPoints}

🔗 Read the full article: https://autowais.com/blog/${blogPost.id}

${hashtags.join(' ')}

#AutowaisTeam #BusinessInsights`;

  return {
    title,
    linkedInPost,
    hashtags,
    blogUrl: `https://autowais.com/blog/${blogPost.id}`,
    category
  };
}

// Generate LinkedIn posts for all blog posts
const linkedInPosts = blogPosts.map(generateLinkedInPost);

// Create output files
const outputDir = './linkedin-posts';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate individual post files
linkedInPosts.forEach((post, index) => {
  const fileName = `linkedin-post-${index + 1}-${post.title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 30)}.txt`;
  const filePath = path.join(outputDir, fileName);
  
  const content = `LINKEDIN POST #${index + 1}
=====================================
TITLE: ${post.title}
CATEGORY: ${post.category}
BLOG URL: ${post.blogUrl}

POST CONTENT:
${post.linkedInPost}

HASHTAGS: ${post.hashtags.join(', ')}

CHARACTER COUNT: ${post.linkedInPost.length}
=====================================`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Generated: ${fileName}`);
});

// Generate summary file
const summaryContent = `LINKEDIN POSTS SUMMARY
=======================
Generated ${linkedInPosts.length} LinkedIn posts from blog content.

POSTS:
${linkedInPosts.map((post, index) => 
  `${index + 1}. ${post.title} (${post.category})`
).join('\n')}

INSTRUCTIONS:
1. Copy each post content
2. Go to your LinkedIn company page: https://www.linkedin.com/company/108178504/admin/dashboard/
3. Click "Create a post"
4. Paste the content
5. Add the blog image if desired
6. Schedule or publish immediately

RECOMMENDED POSTING SCHEDULE:
- Post 1-2 times per week
- Best times: Tuesday-Thursday, 9-11 AM or 1-3 PM
- Space posts 2-3 days apart

=======================`;

fs.writeFileSync(path.join(outputDir, '00-LINKEDIN-POSTS-SUMMARY.txt'), summaryContent);

console.log('\n🎉 LinkedIn posts generated successfully!');
console.log(`📁 Check the '${outputDir}' folder for all posts.`);
console.log('📋 Use the summary file for posting schedule and instructions.'); 
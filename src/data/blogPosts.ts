export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "marketing-revolution-2025",
    title: "The 2025 Marketing Revolution: Why 73% of Companies Are Failing (And How to Win)",
    excerpt: "The marketing landscape has changed forever. While most companies are still playing catch-up with outdated strategies, the winners are already 3 steps ahead.",
    content: `
      <p>The marketing landscape has changed forever. While most companies are still playing catch-up with outdated strategies, the winners are already 3 steps ahead.</p>
      
      <h2>The Brutal Reality (2025 Research)</h2>
      <ul>
        <li><strong>73% of marketing campaigns fail to meet ROI expectations</strong> (Gartner)</li>
        <li><strong>89% of consumers expect personalized experiences</strong> (McKinsey)</li>
        <li><strong>67% of buying decisions happen before contacting sales</strong> (Forrester)</li>
        <li><strong>Only 23% of companies have truly integrated marketing automation</strong> (HubSpot)</li>
      </ul>
      
      <h2>The 3 Critical Shifts That Are Killing Traditional Marketing</h2>
      
      <h3>1. The Death of Generic Content</h3>
      <p>Gone are the days of "one-size-fits-all" marketing. Today's consumers expect hyper-personalized experiences. The companies winning are those using AI-driven personalization at scale.</p>
      
      <h3>2. The Rise of the "Zero-Click" Customer</h3>
      <p>67% of buying decisions happen before any human interaction. Your website, content, and digital presence ARE your sales team.</p>
      
      <h3>3. The Trust Economy</h3>
      <p>Consumers trust peer recommendations 92% more than traditional advertising. Authenticity and social proof are now your most valuable assets.</p>
      
      <h2>The Winning Formula (Based on 2025 Success Stories)</h2>
      
      <h3>Phase 1: Data-Driven Personalization</h3>
      <ul>
        <li>Implement AI-powered customer segmentation</li>
        <li>Create dynamic content that adapts to user behavior</li>
        <li>Use predictive analytics to anticipate customer needs</li>
      </ul>
      
      <h3>Phase 2: Omnichannel Integration</h3>
      <ul>
        <li>Seamless experience across all touchpoints</li>
        <li>Consistent messaging and branding</li>
        <li>Real-time data synchronization</li>
      </ul>
      
      <h3>Phase 3: Authentic Engagement</h3>
      <ul>
        <li>Human-centered content that builds trust</li>
        <li>Social proof and user-generated content</li>
        <li>Transparent communication and values alignment</li>
      </ul>
      
      <h2>The 5-Step Action Plan</h2>
      <ol>
        <li><strong>Audit Your Current State</strong> - What's working vs. what's failing, customer journey mapping, technology stack assessment</li>
        <li><strong>Implement AI-Powered Personalization</strong> - Customer data platforms, dynamic content creation, predictive analytics</li>
        <li><strong>Build Authentic Relationships</strong> - Human-centered content strategy, community building, trust signals and social proof</li>
        <li><strong>Optimize for Zero-Click Conversions</strong> - SEO and content optimization, self-service resources, clear value propositions</li>
        <li><strong>Measure What Matters</strong> - Customer lifetime value, engagement quality over quantity, long-term relationship metrics</li>
      </ol>
      
      <h2>The Hard Truth</h2>
      <p>If you're still using 2020 marketing strategies in 2025, you're already behind. The companies winning today started their transformation 2-3 years ago.</p>
      
      <h2>What's Next</h2>
      <p>The future belongs to companies that can combine human creativity with AI-powered precision. Those who adapt now will dominate their markets.</p>
    `,
    author: "Autowais Team",
    date: "2025-01-20",
    readTime: "8 min read",
    category: "Marketing Strategy",
    tags: ["Marketing Revolution", "Digital Transformation", "AI", "Personalization", "Customer Experience"],
    image: "/images/blog/marketing-revolution.png"
  },
  {
    id: "ai-automation-2025",
    title: "AI Automation in 2025: The Future is Now - What's Next for Business?",
    excerpt: "As we move deeper into 2025, artificial intelligence automation has evolved from a competitive advantage to a business necessity. Here's what's happening now and what's coming next.",
    content: `
      <p>As we move deeper into 2025, artificial intelligence automation has evolved from a competitive advantage to a business necessity. According to recent research from McKinsey & Company, AI automation adoption has increased by 67% since 2024, with 89% of businesses now using some form of AI in their operations.</p>
      
      <h2>The Current State of AI Automation in 2025</h2>
      <p>AI automation has evolved from simple rule-based systems to sophisticated machine learning algorithms that can understand context, learn from experience, and make intelligent decisions. This evolution is driving unprecedented efficiency gains and cost savings across industries.</p>
      
      <h2>Key Applications in Business</h2>
      <ul>
        <li><strong>Customer Service:</strong> AI-powered chatbots and virtual assistants provide 24/7 support, with 73% of customers preferring self-service options according to Gartner research</li>
        <li><strong>Data Processing:</strong> Automated data entry, validation, and analysis, reducing manual errors by up to 85%</li>
        <li><strong>Process Optimization:</strong> Intelligent workflow automation and decision-making, improving operational efficiency by 40-60%</li>
        <li><strong>Predictive Analytics:</strong> Forecasting trends and identifying opportunities with 92% accuracy in market predictions</li>
        <li><strong>Quality Control:</strong> Automated inspection and quality assurance, reducing defects by up to 90%</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>Successful AI automation requires careful planning, starting with identifying high-impact, repetitive processes that can benefit from automation. Focus on areas where AI can provide immediate value while building toward more complex applications.</p>
      
      <h2>Measuring Success</h2>
      <p>Track metrics like time savings, error reduction, cost savings, and employee satisfaction. AI automation should enhance human capabilities, not replace them entirely.</p>
      
      <h2>Future Outlook</h2>
      <p>As AI technology continues to advance, we'll see even more sophisticated automation capabilities, including autonomous decision-making, natural language processing, and predictive maintenance.</p>
    `,
    author: "Autowais Team",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Automation", "Technology", "Business Strategy"],
    image: "/images/blog/ai-automation.png"
  },
  {
    id: "digital-transformation-roadmap",
    title: "Digital Transformation Roadmap: A Step-by-Step Guide for Modern Businesses",
    excerpt: "Learn how to create and execute a successful digital transformation strategy that drives real business results.",
    content: `
      <p>Digital transformation is more than just adopting new technologies—it's about fundamentally changing how your business operates and delivers value to customers. According to recent research from Deloitte, 70% of organizations are currently undergoing digital transformation initiatives, with 89% reporting improved operational efficiency as a result.</p>
      
      <h2>Understanding Digital Transformation</h2>
      <p>Digital transformation involves integrating digital technology into all areas of business, fundamentally changing how you operate and deliver value to customers. It's also a cultural change that requires organizations to continually challenge the status quo.</p>
      
      <h2>Creating Your Roadmap</h2>
      <ol>
        <li><strong>Assess Current State:</strong> Evaluate existing systems, processes, and capabilities</li>
        <li><strong>Define Vision:</strong> Establish clear goals and success metrics</li>
        <li><strong>Identify Priorities:</strong> Focus on high-impact, achievable initiatives first</li>
        <li><strong>Build Capabilities:</strong> Invest in technology and talent</li>
        <li><strong>Execute Gradually:</strong> Implement changes in manageable phases</li>
      </ol>
      
      <h2>Common Challenges and Solutions</h2>
      <p>Many organizations struggle with change management, legacy system integration, and skill gaps. Success requires strong leadership commitment, clear communication, and continuous learning.</p>
      
      <h2>Measuring Success</h2>
      <p>Track both technical metrics (system performance, user adoption) and business outcomes (revenue growth, customer satisfaction, operational efficiency).</p>
    `,
    author: "Autowais Team",
    date: "2025-01-10",
    readTime: "10 min read",
    category: "Digital Transformation",
    tags: ["Digital Transformation", "Strategy", "Technology", "Business"],
    image: "/images/blog/digital-transformation.png"
  },
  {
    id: "cloud-migration-best-practices",
    title: "Cloud Migration Best Practices: Ensuring a Smooth Transition",
    excerpt: "Essential strategies and considerations for migrating your business systems to the cloud securely and efficiently.",
    content: `
      <p>Cloud migration offers numerous benefits including cost savings, scalability, and improved disaster recovery. However, a successful migration requires careful planning and execution. According to recent research from AWS, 94% of enterprises are now using cloud services, with 83% reporting significant cost savings and 78% experiencing improved performance.</p>
      
      <h2>Pre-Migration Planning</h2>
      <p>Before moving to the cloud, conduct a comprehensive assessment of your current infrastructure, applications, and data. Identify dependencies, security requirements, and compliance needs.</p>
      
      <h2>Migration Strategies</h2>
      <ul>
        <li><strong>Lift and Shift:</strong> Move applications as-is with minimal changes</li>
        <li><strong>Re-platforming:</strong> Make minor optimizations during migration</li>
        <li><strong>Refactoring:</strong> Redesign applications for cloud-native architecture</li>
        <li><strong>Hybrid Approach:</strong> Gradually migrate systems while maintaining on-premise components</li>
      </ul>
      
      <h2>Security Considerations</h2>
      <p>Implement robust security measures including encryption, access controls, and monitoring. Ensure compliance with industry regulations and data protection requirements.</p>
      
      <h2>Post-Migration Optimization</h2>
      <p>Monitor performance, optimize costs, and continuously improve your cloud infrastructure. Regular reviews help ensure you're maximizing the benefits of cloud technology.</p>
    `,
    author: "Autowais Team",
    date: "2025-01-08",
    readTime: "7 min read",
    category: "Cloud Computing",
    tags: ["Cloud", "Migration", "Infrastructure", "Security"],
    image: "/images/blog/cloud-migration.png"
  },
  {
    id: "api-integration-guide",
    title: "API Integration Mastery: Connecting Your Business Systems",
    excerpt: "Master the art of API integration to create seamless connections between your business applications and services.",
    content: `
      <p>APIs (Application Programming Interfaces) are the backbone of modern software integration, enabling different systems to communicate and share data effectively. According to recent research from Postman, 89% of developers use APIs in their work, with 67% reporting that APIs are critical to their organization's digital transformation efforts.</p>
      
      <h2>Understanding API Types</h2>
      <ul>
        <li><strong>REST APIs:</strong> Most common, using HTTP methods for web services</li>
        <li><strong>GraphQL:</strong> Flexible query language for APIs</li>
        <li><strong>SOAP APIs:</strong> Protocol-based for enterprise applications</li>
        <li><strong>Webhook APIs:</strong> Event-driven for real-time notifications</li>
      </ul>
      
      <h2>Integration Best Practices</h2>
      <p>Design integrations with error handling, retry logic, and proper authentication. Use API gateways for centralized management and monitoring.</p>
      
      <h2>Common Integration Patterns</h2>
      <ol>
        <li><strong>Point-to-Point:</strong> Direct connections between systems</li>
        <li><strong>Hub and Spoke:</strong> Central integration platform</li>
        <li><strong>Event-Driven:</strong> Asynchronous message-based communication</li>
      </ol>
      
      <h2>Testing and Monitoring</h2>
      <p>Implement comprehensive testing strategies and continuous monitoring to ensure reliable integrations. Use tools for API documentation and version management.</p>
    `,
    author: "Autowais Team",
    date: "2025-01-05",
    readTime: "9 min read",
    category: "Integration",
    tags: ["API", "Integration", "Development", "Architecture"],
    image: "/images/blog/api-integration.png"
  },
  {
    id: "cybersecurity-small-business",
    title: "Cybersecurity for Small Businesses: Essential Protection Strategies",
    excerpt: "Protect your small business from cyber threats with practical, cost-effective security measures and best practices.",
    content: `
      <p>Small businesses are increasingly targeted by cybercriminals, making robust cybersecurity measures essential for protecting data, customers, and business reputation. According to recent research from Verizon, 43% of cyber attacks target small businesses, with 60% of small companies going out of business within 6 months of a cyber attack.</p>
      
      <h2>Common Cyber Threats</h2>
      <ul>
        <li><strong>Phishing Attacks:</strong> Fraudulent emails designed to steal credentials</li>
        <li><strong>Ransomware:</strong> Malicious software that encrypts data for ransom</li>
        <li><strong>Data Breaches:</strong> Unauthorized access to sensitive information</li>
        <li><strong>Social Engineering:</strong> Manipulation tactics to gain access</li>
      </ul>
      
      <h2>Essential Security Measures</h2>
      <ol>
        <li><strong>Employee Training:</strong> Educate staff on security best practices</li>
        <li><strong>Multi-Factor Authentication:</strong> Add extra layers of security</li>
        <li><strong>Regular Updates:</strong> Keep software and systems current</li>
        <li><strong>Backup Strategy:</strong> Implement automated, tested backups</li>
        <li><strong>Network Security:</strong> Use firewalls and secure Wi-Fi</li>
      </ol>
      
      <h2>Creating a Security Culture</h2>
      <p>Make cybersecurity everyone's responsibility. Regular training, clear policies, and incident response procedures help create a security-conscious organization.</p>
      
      <h2>Budget-Friendly Solutions</h2>
      <p>Many effective security measures are affordable or free. Focus on high-impact, low-cost solutions like password managers, antivirus software, and employee education.</p>
    `,
    author: "Autowais Team",
    date: "2025-01-03",
    readTime: "6 min read",
    category: "Cybersecurity",
    tags: ["Security", "Small Business", "Protection", "Risk Management"],
    image: "/images/blog/cybersecurity.png"
  },
  {
    id: "data-analytics-business-intelligence",
    title: "Turning Data into Insights: A Business Intelligence Guide",
    excerpt: "Learn how to leverage data analytics and business intelligence tools to make informed decisions and drive growth.",
    content: `
      <p>In today's data-driven world, the ability to extract insights from data is crucial for business success. Business intelligence transforms raw data into actionable information. According to recent research from Gartner, organizations that use data-driven decision making are 23 times more likely to acquire customers and 6 times more likely to retain them.</p>
      
      <h2>The Data Analytics Process</h2>
      <ol>
        <li><strong>Data Collection:</strong> Gather relevant data from multiple sources</li>
        <li><strong>Data Cleaning:</strong> Ensure data quality and consistency</li>
        <li><strong>Data Analysis:</strong> Apply statistical methods and algorithms</li>
        <li><strong>Visualization:</strong> Present insights in understandable formats</li>
        <li><strong>Action:</strong> Make decisions based on findings</li>
      </ol>
      
      <h2>Key Metrics to Track</h2>
      <ul>
        <li><strong>Customer Metrics:</strong> Acquisition cost, lifetime value, churn rate</li>
        <li><strong>Financial Metrics:</strong> Revenue growth, profit margins, cash flow</li>
        <li><strong>Operational Metrics:</strong> Efficiency, productivity, quality</li>
        <li><strong>Marketing Metrics:</strong> ROI, conversion rates, engagement</li>
      </ul>
      
      <h2>Choosing the Right Tools</h2>
      <p>Select analytics tools based on your data volume, complexity, and team skills. Options range from Excel and Google Analytics to advanced platforms like Tableau and Power BI.</p>
      
      <h2>Building a Data-Driven Culture</h2>
      <p>Success requires more than tools—it needs organizational commitment to data-driven decision making and continuous learning.</p>
    `,
    author: "Autowais Team",
    date: "2025-01-01",
    readTime: "8 min read",
    category: "Data Analytics",
    tags: ["Analytics", "Business Intelligence", "Data", "Decision Making"],
    image: "/images/blog/data-analytics.png"
  },
  {
    id: "mobile-app-development-trends",
    title: "Mobile App Development Trends Shaping 2025",
    excerpt: "Explore the latest trends in mobile app development and how they're changing user experiences and business opportunities.",
    content: `
      <p>Mobile app development continues to evolve rapidly, with new technologies and user expectations driving innovation in how we create and interact with mobile applications. According to recent research from Statista, the global mobile app market is expected to reach $935 billion by 2025, with users spending an average of 4.8 hours per day on mobile apps.</p>
      
      <h2>Emerging Technologies</h2>
      <ul>
        <li><strong>5G Integration:</strong> Faster speeds enabling richer experiences</li>
        <li><strong>AR/VR Capabilities:</strong> Immersive user interfaces</li>
        <li><strong>AI-Powered Features:</strong> Personalization and intelligent automation</li>
        <li><strong>IoT Connectivity:</strong> Apps controlling smart devices</li>
      </ul>
      
      <h2>Development Approaches</h2>
      <p>Cross-platform frameworks like React Native and Flutter are gaining popularity, allowing developers to create apps for multiple platforms with shared codebases.</p>
      
      <h2>User Experience Trends</h2>
      <ol>
        <li><strong>Voice Interfaces:</strong> Speech recognition and voice commands</li>
        <li><strong>Gesture Controls:</strong> Intuitive touch and motion interactions</li>
        <li><strong>Dark Mode:</strong> Battery-saving and eye-friendly interfaces</li>
        <li><strong>Minimalist Design:</strong> Clean, focused user experiences</li>
      </ol>
      
      <h2>Security and Privacy</h2>
      <p>With increasing data privacy concerns, apps must implement robust security measures and transparent privacy practices to maintain user trust.</p>
      
      <h2>Future Outlook</h2>
      <p>As technology continues to advance, we'll see even more innovative mobile app capabilities, including advanced AI integration, enhanced AR/VR experiences, and seamless cross-platform functionality.</p>
    `,
    author: "Autowais Team",
    date: "2024-12-28",
    readTime: "7 min read",
    category: "Mobile Development",
    tags: ["Mobile", "App Development", "Trends", "Technology"],
    image: "/images/blog/mobile-trends.png"
  },
  {
    id: "automation-workflow-optimization",
    title: "Workflow Automation: Streamlining Business Processes for Maximum Efficiency",
    excerpt: "Discover how to identify, design, and implement automated workflows that eliminate bottlenecks and boost productivity.",
    content: `
      <p>Workflow automation is transforming how businesses operate, eliminating manual tasks and reducing errors while improving speed and consistency. According to recent research from Forrester, organizations that implement workflow automation see an average 40% increase in productivity and 60% reduction in processing time.</p>
      
      <h2>Understanding Workflow Automation</h2>
      <p>Workflow automation involves using technology to automate repetitive tasks and processes, allowing employees to focus on higher-value activities. This can include everything from simple email automation to complex business process management.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li><strong>Increased Efficiency:</strong> Reduce manual tasks and processing time</li>
        <li><strong>Improved Accuracy:</strong> Minimize human errors and inconsistencies</li>
        <li><strong>Better Compliance:</strong> Ensure consistent adherence to policies and procedures</li>
        <li><strong>Enhanced Scalability:</strong> Handle increased workloads without proportional staff increases</li>
        <li><strong>Cost Savings:</strong> Reduce operational costs and improve ROI</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <ol>
        <li><strong>Process Mapping:</strong> Document current workflows and identify automation opportunities</li>
        <li><strong>Technology Selection:</strong> Choose appropriate automation tools and platforms</li>
        <li><strong>Pilot Testing:</strong> Start with small, low-risk processes</li>
        <li><strong>Training and Adoption:</strong> Ensure team members understand and embrace new workflows</li>
        <li><strong>Continuous Improvement:</strong> Monitor performance and optimize processes</li>
      </ol>
      
      <h2>Common Use Cases</h2>
      <p>Workflow automation can be applied to various business functions including customer service, HR processes, financial operations, and marketing campaigns.</p>
      
      <h2>Measuring Success</h2>
      <p>Track metrics like processing time, error rates, cost savings, and employee satisfaction to measure the success of your automation initiatives.</p>
    `,
    author: "Autowais Team",
    date: "2024-12-25",
    readTime: "9 min read",
    category: "Process Automation",
    tags: ["Automation", "Workflow", "Efficiency", "Process Improvement"],
    image: "/images/blog/workflow-automation.png"
  },
  {
    id: "ecommerce-technology-stack",
    title: "Building a Modern E-commerce Technology Stack",
    excerpt: "Learn how to choose and integrate the right technologies for a scalable, secure, and high-performing e-commerce platform.",
    content: `
      <p>A well-designed technology stack is the foundation of successful e-commerce operations, supporting everything from user experience to backend operations. According to recent research from Shopify, the global e-commerce market is expected to reach $6.3 trillion by 2025, with mobile commerce accounting for 73% of all online sales.</p>
      
      <h2>Essential Components</h2>
      <ul>
        <li><strong>Frontend Framework:</strong> React, Vue.js, or Angular for dynamic user interfaces</li>
        <li><strong>Backend Platform:</strong> Node.js, Python, or PHP for server-side logic</li>
        <li><strong>Database:</strong> MySQL, PostgreSQL, or MongoDB for data storage</li>
        <li><strong>Payment Processing:</strong> Stripe, PayPal, or Square for secure transactions</li>
        <li><strong>Content Management:</strong> Headless CMS for flexible content management</li>
      </ul>
      
      <h2>Technology Selection Criteria</h2>
      <ol>
        <li><strong>Scalability:</strong> Can the technology handle growth and increased traffic?</li>
        <li><strong>Security:</strong> Does it provide robust security features and compliance?</li>
        <li><strong>Performance:</strong> Can it deliver fast loading times and smooth user experiences?</li>
        <li><strong>Integration:</strong> Does it work well with other systems and third-party services?</li>
        <li><strong>Cost:</strong> Is it affordable and provides good value for money?</li>
      </ol>
      
      <h2>Implementation Best Practices</h2>
      <p>Start with a solid foundation, implement security measures from the beginning, and plan for scalability and future growth.</p>
      
      <h2>Future Trends</h2>
      <p>As e-commerce continues to evolve, we'll see increased adoption of AI-powered personalization, AR/VR shopping experiences, and seamless omnichannel integration.</p>
    `,
    author: "Autowais Team",
    date: "2024-12-22",
    readTime: "8 min read",
    category: "E-commerce",
    tags: ["E-commerce", "Technology Stack", "Web Development", "Online Business"],
    image: "/images/blog/ecommerce-stack.png"
  },
  {
    id: "remote-work-technology-tools",
    title: "Essential Technology Tools for Remote Work Success",
    excerpt: "Discover the must-have tools and technologies that enable productive, secure, and collaborative remote work environments.",
    content: `
      <p>Remote work has become a permanent fixture in modern business, requiring the right technology tools to maintain productivity, collaboration, and security. According to recent research from Buffer, 98% of workers want to work remotely at least some of the time, with 97% of companies planning to continue offering remote work options.</p>
      
      <h2>Communication Tools</h2>
      <ul>
        <li><strong>Video Conferencing:</strong> Zoom, Microsoft Teams, or Google Meet for face-to-face communication</li>
        <li><strong>Instant Messaging:</strong> Slack, Microsoft Teams, or Discord for quick team communication</li>
        <li><strong>Email Platforms:</strong> Gmail, Outlook, or ProtonMail for formal communication</li>
        <li><strong>Project Management:</strong> Asana, Trello, or Monday.com for task and project tracking</li>
      </ul>
      
      <h2>Collaboration Platforms</h2>
      <ol>
        <li><strong>Document Sharing:</strong> Google Workspace, Microsoft 365, or Notion for collaborative document editing</li>
        <li><strong>File Storage:</strong> Dropbox, Google Drive, or OneDrive for secure file storage and sharing</li>
        <li><strong>Version Control:</strong> GitHub, GitLab, or Bitbucket for code and document version management</li>
        <li><strong>Virtual Whiteboards:</strong> Miro, Figma, or Lucidchart for visual collaboration</li>
      </ol>
      
      <h2>Security and Privacy</h2>
      <p>Implement robust security measures including VPNs, password managers, and multi-factor authentication to protect sensitive data and maintain privacy.</p>
      
      <h2>Productivity Tools</h2>
      <p>Use time tracking, task management, and automation tools to maintain productivity and work-life balance in remote environments.</p>
      
      <h2>Best Practices</h2>
      <p>Establish clear communication protocols, set up dedicated workspaces, and maintain regular check-ins to ensure successful remote work arrangements.</p>
    `,
    author: "Autowais Team",
    date: "2024-12-20",
    readTime: "7 min read",
    category: "Remote Work",
    tags: ["Remote Work", "Productivity", "Collaboration", "Technology Tools"],
    image: "/images/blog/remote-work-tools.png"
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = blogPosts.map(post => post.category);
  return Array.from(new Set(categories));
};

export const getFeaturedPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
}; 
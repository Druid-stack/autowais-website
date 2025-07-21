const LinkedInIntegration = require('../linkedin-integration');

async function testPost() {
  const linkedIn = new LinkedInIntegration();
  const blogContent = `How to Build Resilience in the Age of AI Disruption\n\nIn today’s rapidly evolving digital landscape, artificial intelligence is transforming industries at an unprecedented pace. While this brings exciting opportunities, it also means that professionals and organizations must become more resilient than ever before.\n\nHere are three ways to build resilience in the age of AI:\n\n1. Embrace Lifelong Learning:\nThe most resilient professionals are those who continuously upskill. Take advantage of online courses, webinars, and industry certifications to stay ahead of the curve.\n\n2. Cultivate Adaptability:\nChange is the only constant. Foster a growth mindset and be open to new roles, tools, and workflows. Adaptability is a superpower in the AI era.\n\n3. Leverage AI as a Partner:\nInstead of fearing automation, look for ways to use AI to enhance your work. Automate repetitive tasks, use data-driven insights, and focus on the uniquely human skills that AI can’t replicate.\n\nAI disruption is here to stay, but with the right mindset and strategies, you can not only survive—but thrive. How are you building resilience in your career or organization? Share your thoughts below!\n\n#AI #Resilience #FutureOfWork #CareerGrowth #DigitalTransformation`;

  try {
    console.log('🔄 Posting formatted blog content to LinkedIn...');
    const result = await linkedIn.postTextUpdate(blogContent);
    if (result.success) {
      console.log('✅ Post published successfully!');
      console.log(`   Post ID: ${result.postId}`);
    } else {
      console.log('❌ Post failed');
      console.log(`   Error: ${result.error}`);
    }
    return result;
  } catch (error) {
    console.error('❌ Error posting to LinkedIn:', error.message);
    throw error;
  }
}

testPost().catch(console.error); 
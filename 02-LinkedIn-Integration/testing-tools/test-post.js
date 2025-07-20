const LinkedInIntegration = require('../linkedin-integration');

async function testPost() {
  const linkedIn = new LinkedInIntegration();
  
  try {
    console.log('🔄 Testing LinkedIn post...');
    
    // Test with a simple text update
    const result = await linkedIn.postTextUpdate("Hello LinkedIn! This is a test post from Autowais integration.");
    
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

// Run the test
testPost().catch(console.error); 
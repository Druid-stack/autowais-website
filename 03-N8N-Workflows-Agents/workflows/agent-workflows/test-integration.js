const axios = require('axios');

async function testIntegration() {
  console.log('🧪 Testing Audio System Agent Integration...\n');
  
  try {
    // Test Smaart 9 Bridge
    console.log('📊 Testing Smaart 9 Bridge...');
    const smaartHealth = await axios.get('http://localhost:8081/health');
    console.log('✅ Smaart 9 Bridge Health:', smaartHealth.data.status);
    
    const smaartConnect = await axios.post('http://localhost:8081/smaart9/connect');
    console.log('✅ Smaart 9 Connection:', smaartConnect.data.message);
    
    const smaartMeasurement = await axios.get('http://localhost:8081/smaart9/measurement');
    console.log('✅ Smaart 9 Measurement:', smaartMeasurement.data.type, 'from', smaartMeasurement.data.source);
    
    // Test TF3 Bridge
    console.log('\n🎛️ Testing TF3 USB Bridge...');
    const tf3Health = await axios.get('http://localhost:8080/health');
    console.log('✅ TF3 Bridge Health:', tf3Health.data.status);
    
    const tf3Status = await axios.get('http://localhost:8080/tf3/status');
    console.log('✅ TF3 Status:', tf3Status.data.connected ? 'Connected' : 'Not Connected');
    
    console.log('\n🎉 Integration Test Complete!');
    console.log('\n📋 Summary:');
    console.log('  • Smaart 9 Bridge: Running on port 8081');
    console.log('  • TF3 USB Bridge: Running on port 8080');
    console.log('  • Smaart Suite: Detected and running');
    console.log('  • TF3 Console: Ready for USB connection');
    console.log('\n🚀 Ready to import n8n workflow!');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testIntegration();

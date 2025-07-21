const fs = require('fs');
const path = require('path');

// Function to update .env file with new credentials
function updateEnvFile(newClientId, newClientSecret) {
    const envPath = path.join(__dirname, '..', '.env');
    
    try {
        // Read current .env file
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update Client ID
        envContent = envContent.replace(
            /LINKEDIN_CLIENT_ID=.*/,
            `LINKEDIN_CLIENT_ID=${newClientId}`
        );
        
        // Update Client Secret
        envContent = envContent.replace(
            /LINKEDIN_CLIENT_SECRET=.*/,
            `LINKEDIN_CLIENT_SECRET=${newClientSecret}`
        );
        
        // Clear the access token since we'll need a new one
        envContent = envContent.replace(
            /LINKEDIN_ACCESS_TOKEN=.*/,
            `LINKEDIN_ACCESS_TOKEN=`
        );
        
        // Write updated content back to .env file
        fs.writeFileSync(envPath, envContent);
        
        console.log('✅ .env file updated successfully!');
        console.log(`   New Client ID: ${newClientId}`);
        console.log(`   New Client Secret: ${newClientSecret.substring(0, 10)}...`);
        console.log('   Access token cleared - you\'ll need to get a new one');
        
    } catch (error) {
        console.error('❌ Error updating .env file:', error.message);
    }
}

// Check if credentials were provided as command line arguments
const newClientId = process.argv[2];
const newClientSecret = process.argv[3];

if (!newClientId || !newClientSecret) {
    console.log('🔧 LinkedIn Credentials Update Tool');
    console.log('');
    console.log('Usage: node update-new-credentials.js <NEW_CLIENT_ID> <NEW_CLIENT_SECRET>');
    console.log('');
    console.log('Example:');
    console.log('  node update-new-credentials.js 86abc123def456 ghi789jkl012mno345pqr678stu901vwx234yz');
    console.log('');
    console.log('⚠️  Make sure you have created a new LinkedIn app and have the new credentials ready.');
} else {
    updateEnvFile(newClientId, newClientSecret);
} 
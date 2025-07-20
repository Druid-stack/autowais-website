const fs = require('fs');
const path = require('path');

// New access token obtained from the exchange
const newAccessToken = 'AQVD-B1o95xyoEvRp_6kX0s32RAvct48dm8bCn2UKGH7eqTuR9iazErzNm2PAo2GlQH1Tr2weXoT7lxBcDVuv0fqV7EPJs4CfgQEoBAc-vuk2Vb7oSfHmLS1KZFnUG6txy3YgjJ5AxJer98145uDrBZhgvo4NJ4N8wIju5hbJVKW8M2tZKlAiVsfQHRwQqHJokRVq3M-08smkj5qyZOmMJZ2BblbSlpCFQLy8nhgOsLQu9Pw4B8ay4msr1r8yCCDUbvA74dLWJzPZu9DtGFc3yluGvmBCrA8RBYHBTIJKs-WgVper25HASkKZlAUIH7pbOoPrJKfBxnTwJ5LOwfrAXMVzqbEDA';

// Path to .env file
const envPath = path.join(__dirname, '../../.env');

try {
  // Read the current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace the old access token with the new one
  envContent = envContent.replace(
    /LINKEDIN_ACCESS_TOKEN=.*/,
    `LINKEDIN_ACCESS_TOKEN=${newAccessToken}`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ .env file updated successfully with new access token!');
  console.log('🔄 Please restart your application to use the new token.');
  
} catch (error) {
  console.error('❌ Error updating .env file:', error.message);
} 
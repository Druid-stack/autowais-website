const fs = require('fs');
const path = require('path');

console.log('🔧 LinkedIn Scope Configuration Guide');
console.log('=====================================');
console.log('');

console.log('📋 Required Scopes for Your LinkedIn App:');
console.log('   ✅ r_liteprofile - Read basic profile information');
console.log('   ✅ w_member_social - Create, modify, and delete posts');
console.log('   ✅ openid - Use OpenID Connect for authentication');
console.log('   ✅ profile - Use your name and photo');
console.log('   ✅ email - Use your primary email address');
console.log('');

console.log('🚀 Steps to Add Missing Scopes:');
console.log('');
console.log('1. Go to LinkedIn Developer Portal:');
console.log('   https://www.linkedin.com/developers/apps');
console.log('');
console.log('2. Click on your app (Client ID: 77xms16r6c4n1x)');
console.log('');
console.log('3. Go to "OAuth 2.0" or "Auth" in the left navigation');
console.log('');
console.log('4. Find "OAuth 2.0 scopes" section');
console.log('');
console.log('5. Add these scopes if missing:');
console.log('   - r_liteprofile (CRITICAL - this is causing the error)');
console.log('   - w_member_social');
console.log('   - openid');
console.log('   - profile');
console.log('   - email');
console.log('');
console.log('6. Save the changes');
console.log('');
console.log('7. Test the OAuth flow again');
console.log('');

console.log('🔗 Current OAuth URL (ready to test):');
console.log('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77xms16r6c4n1x&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=r_liteprofile%2Cw_member_social%2Copenid%2Cprofile%2Cemail&state=autowais_' + Date.now());
console.log('');

console.log('⚠️  IMPORTANT: Make sure to add the r_liteprofile scope first!');
console.log('   This is the scope that was causing the "unauthorized_scope_error"'); 
# LinkedIn Integration

This workspace contains all tools and scripts for LinkedIn API integration, OAuth authentication, and automated posting.

## Structure

- **api-scripts/**: Core LinkedIn API integration scripts
- **oauth-tools/**: OAuth authentication and token management
- **posting-tools/**: Automated posting and content management
- **testing-tools/**: Testing utilities and validation scripts

## Environment Variables

Create a `.env` file in this directory with:

```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_ACCESS_TOKEN=your_access_token
LINKEDIN_ORGANIZATION_ID=your_org_id
```

## Quick Start

1. Set up your LinkedIn app in LinkedIn Developer Portal
2. Configure environment variables
3. Run OAuth flow: `node oauth-tools/simple-linkedin-oauth.js`
4. Test connection: `node testing-tools/test-linkedin-integration.js`
5. Post content: `node posting-tools/linkedin-post-fix.js`

## Key Files

- `api-scripts/linkedin-api-final-fix.js` - Main API handler
- `oauth-tools/final-linkedin-oauth.js` - OAuth authentication
- `posting-tools/linkedin-post-fix.js` - Content posting
- `testing-tools/check-linkedin-app.js` - App validation

## Usage

Each script can be run independently. Most scripts accept command-line arguments for different operations (test, post, etc.).

See individual script files for detailed usage instructions.

# Daily Blog & LinkedIn Automation Setup Guide

## Overview

This automated system will:

- ✅ **Generate high-quality blog content** daily using AI
- ✅ **Create LinkedIn posts** from blog content automatically
- ✅ **Post to LinkedIn** without manual intervention
- ✅ **Track all content** in Airtable for analytics
- ✅ **Send notifications** to Slack for monitoring
- ✅ **Create backups** of all generated content

**Schedule:** Daily at 9:00 AM (configurable)

## Prerequisites

You'll need accounts and API access for:

- ✅ n8n (workflow automation platform)
- ✅ OpenAI (for content generation)
- ✅ LinkedIn (for posting)
- ✅ Airtable (for content tracking)
- ✅ Slack (for notifications)

## Step 1: Setup API Credentials

### 1.1 OpenAI API

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)
4. **Billing:** Ensure you have credits for GPT-4 usage (~$0.30/day)

### 1.2 LinkedIn API

1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create a new app or use existing
3. Add these scopes:
   - `w_member_social` (for posting)
   - `r_basicprofile` (for profile access)
4. Generate OAuth 2.0 credentials
5. Note your `Client ID` and `Client Secret`

### 1.3 Airtable API

1. Go to [Airtable API](https://airtable.com/developers/web/api/introduction)
2. Create a new base called `content-tracking`
3. Create a table called `blog-posts` with these fields:
   - `date` (Date)
   - `title` (Single line text)
   - `content` (Long text)
   - `excerpt` (Single line text)
   - `tags` (Single line text)
   - `category` (Single line text)
   - `readTime` (Single line text)
   - `linkedinPost` (Long text)
   - `linkedinPostId` (Single line text)
   - `status` (Single select: draft, published, failed)
   - `platform` (Single line text)
   - `scheduledTime` (Date & time)
   - `publishedTime` (Date & time)
4. Get your Personal Access Token from Account settings

### 1.4 Slack API

1. Go to [Slack App Directory](https://api.slack.com/apps)
2. Create a new app or use existing
3. Add these Bot Token Scopes:
   - `chat:write` (to send messages)
   - `channels:read` (to access channels)
4. Install app to workspace
5. Copy the `Bot User OAuth Token`
6. Create channels: `#content-alerts` and `#alerts`

## Step 2: Import Workflow to n8n

### 2.1 Access n8n

1. Open your n8n instance
2. Go to **Workflows** > **Import from File**
3. Upload `agent-workflows/daily-blog-linkedin-automation.json`

### 2.2 Configure Credentials in n8n

#### OpenAI Credential

```
Type: OpenAI
Name: OPENAI_API_CREDENTIAL
API Key: [Your OpenAI API key]
```

#### LinkedIn Credential

```
Type: LinkedIn OAuth2 API
Name: LINKEDIN_API_CREDENTIAL
Client ID: [Your LinkedIn Client ID]
Client Secret: [Your LinkedIn Client Secret]
```

#### Airtable Credential

```
Type: Airtable Personal Access Token
Name: AIRTABLE_API_CREDENTIAL
Personal Access Token: [Your Airtable token]
```

#### Slack Credential

```
Type: Slack OAuth2 API
Name: SLACK_API_CREDENTIAL
Bot Token: [Your Slack Bot Token]
```

### 2.3 Set Environment Variables

In n8n Settings > Variables, add:

```
LINKEDIN_PERSON_ID: [Your LinkedIn Person/Profile ID]
```

**To find your LinkedIn Person ID:**

1. Go to LinkedIn, view your profile
2. Copy the profile URL
3. The ID is in the URL: `/in/your-profile-name/`
4. Use the profile name or numeric ID

## Step 3: Customize Content Settings

### 3.1 Business Topics

Edit the `businessTopics` array in the **Prepare Context Data** node:

```json
[
  "AI Automation",
  "Digital Transformation",
  "Workflow Optimization",
  "Business Intelligence",
  "API Integration",
  "Cloud Migration",
  "Data Analytics",
  "Cybersecurity",
  "Remote Work Tools",
  "E-commerce Solutions"
]
```

### 3.2 Content Prompts

Customize the AI prompts in:

- **Generate Blog Content** node: Modify system/user prompts
- **Create LinkedIn Post** node: Adjust LinkedIn formatting

### 3.3 Schedule Settings

In the **Daily Schedule Trigger** node:

- **Hour:** 9 (9 AM)
- **Minute:** 0
- **Days Between Triggers:** 1 (daily)

Change to your preferred posting time.

## Step 4: Test the Workflow

### 4.1 Manual Test

1. Click **Execute Workflow** button
2. Monitor each node execution
3. Check for errors in red nodes
4. Verify content generation quality

### 4.2 Verify Outputs

Check that:

- ✅ Blog content is generated (800-1200 words)
- ✅ LinkedIn post is formatted correctly
- ✅ Content is saved to Airtable
- ✅ Slack notifications are sent
- ✅ Backup files are created

### 4.3 Common Issues & Fixes

**LinkedIn API Errors:**

- Verify OAuth 2.0 scope permissions
- Check person ID format
- Ensure LinkedIn app is approved

**OpenAI Errors:**

- Check API key validity
- Verify sufficient credits
- Reduce maxTokens if needed

**Airtable Errors:**

- Confirm base and table names
- Check field names match exactly
- Verify Personal Access Token

## Step 5: Activate Automation

### 5.1 Activate Workflow

1. Toggle workflow to **Active**
2. Save the workflow
3. The schedule trigger will now run daily

### 5.2 Monitor Performance

- Check Slack `#content-alerts` for daily updates
- Review Airtable for content tracking
- Monitor `#alerts` for any failures

### 5.3 Analytics & Optimization

Track in Airtable:

- Content performance
- Topic popularity
- Engagement metrics
- Error patterns

## Advanced Features

### Content Variety

Add conditional logic to vary content types:

- Monday: Industry insights
- Wednesday: How-to guides
- Friday: Market analysis

### Multi-Platform Support

Extend to post on:

- Twitter/X
- Medium
- Your blog website
- Facebook Pages

### Content Enhancement

Add integrations for:

- Image generation (DALL-E)
- Market research (Google Trends)
- Competitor analysis
- SEO optimization

### Analytics Integration

Connect to:

- Google Analytics
- LinkedIn Analytics API
- Social media monitoring tools

## Troubleshooting

### Workflow Fails to Execute

1. Check all credentials are valid
2. Verify API rate limits
3. Check network connectivity
4. Review n8n logs

### Content Quality Issues

1. Adjust AI temperature settings
2. Refine system prompts
3. Add content filters
4. Implement human review step

### LinkedIn Posting Fails

1. Check LinkedIn API status
2. Verify post content format
3. Check character limits
4. Review LinkedIn community guidelines

## Maintenance

### Weekly Tasks

- Review generated content quality
- Check analytics in Airtable
- Update topic lists seasonally
- Monitor API usage/costs

### Monthly Tasks

- Analyze content performance
- Update AI prompts for trends
- Review and optimize schedule
- Check credential expiration dates

### Backup & Recovery

- Content backups saved automatically
- Export Airtable data monthly
- Keep credential backups secure
- Document workflow changes

## Cost Estimates

**Monthly Costs:**

- OpenAI GPT-4: ~$9-15 (daily posts)
- LinkedIn API: Free (standard tier)
- Airtable: Free (up to 1,200 records)
- Slack: Free (basic plan)
- n8n: $20+ (cloud) or Free (self-hosted)

**Total: ~$30-50/month** for complete automation

## Support & Resources

- [n8n Documentation](https://docs.n8n.io/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [LinkedIn API Docs](https://docs.microsoft.com/en-us/linkedin/)
- [Airtable API Docs](https://airtable.com/developers/web/api)

---

**🚀 Your automated content system is ready! Set it up once and generate consistent, high-quality content daily.**

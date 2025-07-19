# Daily Blog & LinkedIn Automation Setup Guide - With Google Sheets & Slack Approval

## Overview

This automated system will:

- ✅ **Generate high-quality blog content** daily using AI
- ✅ **Request human approval** via Slack before posting
- ✅ **Create LinkedIn posts** from approved blog content
- ✅ **Post to LinkedIn** only after approval
- ✅ **Track all content** in Google Sheets for analytics
- ✅ **Send notifications** to Slack for monitoring
- ✅ **Create backups** of all generated content

**Schedule:** Daily at 9:00 AM (configurable)
**Approval Required:** Yes, via Slack before posting

## Prerequisites

You'll need accounts and API access for:

- ✅ n8n (workflow automation platform)
- ✅ OpenAI (for content generation)
- ✅ LinkedIn (for posting)
- ✅ Google Sheets (for content tracking)
- ✅ Slack (for approvals and notifications)

## Step 1: Setup Google Sheets

### 1.1 Create Blog Tracking Sheet

1. **Create a new Google Sheet** called "Blog Content Tracking"
2. **Create a sheet tab** named "Blog Posts"
3. **Add these column headers** in row 1:

| A    | B     | C       | D       | E    | F        | G        | H            | I              | J      | K        | L          | M             | N             |
| ---- | ----- | ------- | ------- | ---- | -------- | -------- | ------------ | -------------- | ------ | -------- | ---------- | ------------- | ------------- |
| date | title | content | excerpt | tags | category | readTime | linkedinPost | linkedinPostId | status | platform | approvedBy | scheduledTime | publishedTime |

### 1.2 Get Google Sheets ID

1. **Open your sheet** in browser
2. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
   ```
3. **Save this ID** - you'll need it for the environment variable

## Step 2: Setup Slack Channels

### 2.1 Create Required Channels

Create these Slack channels:

- **#content-approval** - For approval requests
- **#content-alerts** - For success/rejection notifications
- **#alerts** - For error notifications

### 2.2 Set Up Slack Webhook

1. Go to [Slack Apps](https://api.slack.com/apps)
2. Create a new app or use existing
3. Add these scopes:
   - `channels:write`
   - `chat:write`
   - `users:read`
4. Install to your workspace
5. Copy the Bot User OAuth Token

## Step 3: Setup API Credentials

### 3.1 OpenAI API

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)
4. **Billing:** Ensure you have credits for GPT-4 usage (~$0.30/day)

### 3.2 LinkedIn API

1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create a new app or use existing
3. Add these scopes:
   - `w_member_social` (for posting)
   - `r_basicprofile` (for profile access)
4. Generate OAuth 2.0 credentials
5. Note your `Client ID` and `Client Secret`

### 3.3 Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google Sheets API
3. Create OAuth 2.0 credentials
4. Download credentials JSON
5. Note your `Client ID` and `Client Secret`

## Step 4: Configure n8n Environment Variables

Add these environment variables to your n8n instance:

```bash
# LinkedIn Configuration
LINKEDIN_PERSON_ID=your-linkedin-person-id

# Google Sheets Configuration
GOOGLE_SHEETS_BLOG_ID=your-google-sheets-id

# Slack Configuration
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

## Step 5: Setup n8n Credentials

### 5.1 Create Credentials in n8n

1. **OpenAI Credential**:
   - Type: OpenAI
   - Name: `OPENAI_API_CREDENTIAL`
   - API Key: Your OpenAI API key

2. **LinkedIn Credential**:
   - Type: LinkedIn OAuth2
   - Name: `LINKEDIN_API_CREDENTIAL`
   - Client ID: Your LinkedIn Client ID
   - Client Secret: Your LinkedIn Client Secret

3. **Google Sheets Credential**:
   - Type: Google Sheets OAuth2
   - Name: `GOOGLE_SHEETS_API_CREDENTIAL`
   - Client ID: Your Google Client ID
   - Client Secret: Your Google Client Secret

4. **Slack Credential**:
   - Type: Slack OAuth2
   - Name: `SLACK_API_CREDENTIAL`
   - Bot Token: Your Slack Bot Token

## Step 6: Import and Configure Workflow

### 6.1 Import Workflow

1. **Open your n8n instance**
2. **Import the workflow**:
   - Go to **Workflows** → **Import from File**
   - Select: `agent-workflows/daily-blog-linkedin-automation.json`
   - Click **Import**

### 6.2 Configure Webhook

1. **Find the "Wait for Approval" node**
2. **Copy the webhook URL** (it will look like):
   ```
   https://your-n8n-instance.com/webhook/blog-approval
   ```
3. **Add this webhook** to your Slack app's slash command or use for manual testing

## Step 7: Test the System

### 7.1 Test Workflow

1. **Execute the workflow** manually using the **Execute Workflow** button
2. **Check each node** runs successfully
3. **Verify** you receive approval request in Slack
4. **Test approval** by replying with `APPROVE-{ID}`

### 7.2 Approval Commands

When you receive a Slack approval request, reply with:

- **✅ To Approve**: `APPROVE-{APPROVAL_ID}`
- **❌ To Reject**: `REJECT-{APPROVAL_ID}`
- **📝 To Request Changes**: `EDIT-{APPROVAL_ID} [your feedback]`

## Step 8: Activate Automation

### 8.1 Final Activation

1. **Test successful** → **Activate** by toggling the switch to **Active**
2. **Verify schedule** is set to 9:00 AM daily
3. **Monitor** the first few runs

## 🎪 HOW THE APPROVAL SYSTEM WORKS

### **Daily Flow:**

1. **9:00 AM**: System generates blog content
2. **9:01 AM**: You receive Slack approval request in `#content-approval`
3. **Your Action**: Reply with `APPROVE-{ID}` to publish
4. **9:02 AM**: System posts to LinkedIn (if approved)
5. **9:03 AM**: Content tracked in Google Sheets
6. **9:04 AM**: Success notification sent to `#content-alerts`

### **Approval Message Format:**

```
📝 Daily Blog Content Ready for Approval - 2024-01-20

📖 Title: "AI Automation Transforms Business Operations"
📝 Excerpt: "Discover how AI automation is revolutionizing..."
🏷️ Category: Business Technology

📊 LinkedIn Post Preview:
🚀 Ready to transform your business operations?
AI automation isn't just a trend—it's the future...

---
💬 Actions:
✅ Reply APPROVE-2024-01-20-090000 to publish
❌ Reply REJECT-2024-01-20-090000 to cancel
📝 Reply EDIT-2024-01-20-090000 with changes

⏰ Auto-reject in 2 hours if no response
```

## 🎯 MONITORING & TRACKING

### **Google Sheets Tracking:**

- **Date** - When content was generated
- **Title** - Blog post title
- **Content** - Full blog post content
- **LinkedIn Post** - Social media version
- **Status** - Published/Rejected/Pending
- **Approved By** - Who approved it
- **Timestamps** - Schedule and publish times

### **Slack Notifications:**

- **#content-approval** - Daily approval requests
- **#content-alerts** - Success/rejection notifications
- **#alerts** - Error and system notifications

### **Local Backups:**

- **Daily backups** saved as JSON files
- **Includes** all content, approval data, and timestamps
- **Location**: Your n8n instance file system

## 🔧 TROUBLESHOOTING

### **Common Issues:**

1. **No approval request received**:
   - Check Slack webhook configuration
   - Verify #content-approval channel exists
   - Confirm Slack credentials

2. **Google Sheets not updating**:
   - Verify Google Sheets API enabled
   - Check sheet ID in environment variables
   - Confirm OAuth credentials

3. **LinkedIn posting fails**:
   - Check LinkedIn API credentials
   - Verify person ID variable
   - Confirm posting permissions

### **Support:**

**Maya is monitoring all systems!** 🤖

- Check `#alerts` for system notifications
- Review Google Sheets for tracking data
- Test individual nodes in n8n interface

**Your daily blog automation is ready to go live!** 🚀

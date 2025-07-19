# Slack Credentials Setup Guide for n8n

## Overview

Your workflow requires Slack credentials to send notifications and handle the approval system. There are two authentication methods available:

- **OAuth2** (Recommended for regular Slack nodes)
- **API Access Token** (Required for Slack Trigger nodes)

Since your workflow uses regular Slack nodes, we'll set up **OAuth2** credentials.

## Option 1: n8n Cloud Users (Easiest)

If you're using n8n Cloud, you can authenticate directly:

1. In your n8n workflow, click on any Slack node
2. Click on the **Credentials** dropdown
3. Select **Create New Credential**
4. Choose **Slack OAuth2 API**
5. Click **Connect my account**
6. Complete the authentication through your browser
7. Save the credential

## Option 2: Self-Hosted n8n (Manual Setup)

If you're self-hosting n8n, you'll need to create a Slack app:

### Step 1: Create a Slack App

1. Go to [Slack API Apps page](https://api.slack.com/apps)
2. Click **Create New App > From scratch**
3. Enter an **App Name** (e.g., "n8n Blog Automation")
4. Select your **Workspace**
5. Click **Create App**

### Step 2: Set Up OAuth & Permissions

1. In your Slack app, go to **Features > OAuth & Permissions**
2. In the **Redirect URLs** section, click **Add New Redirect URL**
3. **From your n8n credential**, copy the **OAuth Callback URL**
4. Paste it as the redirect URL in Slack
5. Click **Add** then **Save URLs**

### Step 3: Add Required Scopes

In the **Bot Token Scopes** section, add these scopes:

**Required Scopes:**

- `channels:read`
- `channels:write`
- `chat:write`
- `files:read`
- `files:write`
- `groups:read`
- `im:read`
- `mpim:read`
- `reactions:read`
- `reactions:write`
- `usergroups:read`
- `usergroups:write`
- `users:read`

### Step 4: Install App to Workspace

1. Go to **OAuth Tokens** section
2. Click **Install to Workspace**
3. Click **Allow**
4. Copy the **Client ID** and **Client Secret**

### Step 5: Create n8n Credential

1. In n8n, create a new **Slack OAuth2 API** credential
2. Enter the **Client ID** and **Client Secret**
3. Click the OAuth button to connect
4. Save the credential

## Step 6: Create Slack Channels

Your workflow requires these Slack channels:

1. **#content-approval** - For approval requests
2. **#content-alerts** - For success notifications
3. **#alerts** - For error notifications

Create these channels in your Slack workspace:

1. In Slack, click the **+** next to **Channels**
2. Select **Create a channel**
3. Name it (e.g., "content-approval")
4. Make it **Public** so the bot can access it
5. Click **Create**
6. Repeat for the other channels

## Step 7: Add Bot to Channels

1. Go to each channel (#content-approval, #content-alerts, #alerts)
2. Type `/invite @YourBotName` (replace with your actual bot name)
3. Or click **Add apps** and select your bot

## Step 8: Set Up Approval Webhook

Your workflow uses a webhook for approval responses. You'll need to:

1. **Copy the webhook URL** from your "Wait for Approval" node
2. **Set up a Slack slash command** or **interactive component** to send approval responses

### Option A: Manual Approval (Simple)

Users can respond in the #content-approval channel with:

- `APPROVE-{ID}` to approve
- `REJECT-{ID}` to reject

### Option B: Slack Slash Command (Advanced)

Create a slash command in your Slack app that posts to the webhook URL.

## Troubleshooting

### Common Issues:

1. **"Google hasn't verified this app"** - This is normal for custom apps
2. **Token expired** - Ensure token rotation is **disabled** in your Slack app
3. **Missing permissions** - Verify all required scopes are added
4. **Channel access** - Ensure the bot is added to all required channels

### Verification Steps:

1. Test each Slack node individually
2. Check bot permissions in each channel
3. Verify webhook URL is accessible
4. Test approval commands in #content-approval channel

## Production Notes

- **Keep credentials secure** - Never share Client ID/Secret
- **Monitor rate limits** - Slack has API rate limits
- **Channel permissions** - Ensure bot has write access to all channels
- **Token rotation** - Keep disabled for production use

## Next Steps

1. ✅ Set up Slack credentials
2. ✅ Create required channels
3. ✅ Add bot to channels
4. ✅ Test approval workflow
5. ✅ Configure webhook for approval responses

Your Slack integration is now ready for the blog automation workflow!

---

**Need help?** Check the [n8n Slack Documentation](https://docs.n8n.io/integrations/builtin/credentials/slack/) for more details.

# Slack Approval Webhook Setup Guide

## Overview

Your workflow now uses a **Wait** node with a webhook to handle approvals. This is more reliable than triggers and works perfectly with n8n Cloud.

## How It Works

1. **AI agents create content** → **Request approval in Slack** → **Wait for webhook response** → **Publish or reject**

2. **The approval message includes:**
   - Content preview and AI scores
   - Unique approval ID
   - Instructions to reply with commands

## Setup Steps

### 1. **Get Your Webhook URL**

When you run the workflow, the **Wait for Approval** node will generate a webhook URL like:

```
https://your-n8n-instance.app.n8n.cloud/webhook/blog-approval
```

### 2. **Create a Slack Slash Command**

1. Go to [Slack API](https://api.slack.com/apps)
2. Select your existing app (or create one)
3. Go to **"Slash Commands"** → **"Create New Command"**
4. Set up the command:
   - **Command**: `/approve`
   - **Request URL**: `https://your-n8n-instance.app.n8n.cloud/webhook/blog-approval`
   - **Short Description**: "Approve or reject blog content"
   - **Usage Hint**: `APPROVE-{ID} or REJECT-{ID}`

### 3. **Alternative: Use Regular Messages**

If you prefer not to use slash commands, you can simply:

1. **Reply to the approval message** with:
   - `APPROVE-{ID}` (where {ID} is from the message)
   - `REJECT-{ID}`

2. **Set up a webhook using a bot or automation tool** that forwards these messages to your n8n webhook

## Usage Examples

### **Approval:**

```
APPROVE-2024-01-20-090000
```

### **Rejection:**

```
REJECT-2024-01-20-090000
```

## Webhook Payload

The webhook expects this format:

```json
{
  "body": {
    "text": "APPROVE-2024-01-20-090000",
    "user_name": "john.doe"
  }
}
```

## Testing

1. **Run your workflow** manually
2. **Check the approval message** in Slack
3. **Use the slash command** or send a message with the approval format
4. **Verify the workflow continues** and publishes to LinkedIn

## Troubleshooting

### **Issue: Webhook not responding**

- Check the webhook URL is correct
- Ensure the payload format matches expected structure
- Verify the approval ID matches what's in the message

### **Issue: Approval not recognized**

- Make sure the text includes "APPROVE-" or "REJECT-"
- Check that the approval ID is exactly as shown in the message
- Verify the webhook payload includes the required fields

### **Issue: Workflow stuck on approval**

- The **Wait** node will wait indefinitely until the webhook is called
- You can manually resume the workflow in n8n if needed
- Check that the webhook URL is accessible

## Security Notes

- The webhook URL is publicly accessible but includes a random suffix
- Consider adding authentication if you need extra security
- The approval process ensures human oversight before publishing

## Next Steps

1. **Test the approval flow** with a sample run
2. **Set up Google Sheets credentials** for content tracking
3. **Configure LinkedIn credentials** for publishing
4. **Add any additional Slack channels** you want to use

This setup provides a robust approval system that ensures all content is reviewed by humans before publication while maintaining the benefits of AI-generated content.

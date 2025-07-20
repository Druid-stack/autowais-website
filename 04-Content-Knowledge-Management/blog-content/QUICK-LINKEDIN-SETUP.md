# Quick LinkedIn Blog Automation Setup

## 🚀 Fast Track Setup (10 minutes)

### Step 1: Get Your API Keys

#### OpenAI API Key (Required)

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. Save it somewhere safe

#### LinkedIn Access (Required)

For quick setup, we'll use LinkedIn's basic posting API:

1. Go to https://www.linkedin.com/developers/
2. Create an app (or use existing)
3. App name: "Autowais Content Automation"
4. Company: Select your company page
5. Get your credentials:
   - Client ID
   - Client Secret

### Step 2: Import Workflow to n8n

1. In n8n (https://n8n-main.7mioow.easypanel.host/), go to **Workflows**
2. Click **"Add Workflow"** → **"Import from File"**
3. Upload: `/agent-workflows/simple-blog-linkedin-immediate.json`

### Step 3: Configure Credentials

#### OpenAI:

1. In the workflow, click on "Generate Content" node
2. Click on "Credentials" → "Create New"
3. Enter your OpenAI API key
4. Save

#### LinkedIn:

1. Click on "Post to LinkedIn" node
2. Click on "Credentials" → "Create New"
3. Enter Client ID and Secret
4. Follow OAuth flow to authorize

### Step 4: Get Your LinkedIn Person ID

Easy way:

1. Go to your LinkedIn profile
2. Click "Contact Info"
3. Your profile URL contains your ID
4. Format: `urn:li:person:YOUR_ID`

### Step 5: Test It!

1. Click **"Execute Workflow"**
2. Watch the magic happen
3. Check your LinkedIn profile for the new post

## 🎯 What This Workflow Does

1. **Generates** professional blog content using AI
2. **Optimizes** it for LinkedIn engagement
3. **Posts** directly to your LinkedIn profile
4. **Tracks** success for future improvements

## 💡 Pro Tips

- Test with manual trigger first
- Once working, add schedule trigger for daily posts
- Customize topics in "Setup Data" node
- Adjust AI temperature for creativity

## 🆘 Troubleshooting

**"Invalid credentials"**

- Re-authenticate LinkedIn OAuth
- Check API key format

**"Rate limit exceeded"**

- OpenAI: Check your usage/billing
- LinkedIn: Max 25 posts/day

**"No content generated"**

- Check OpenAI credits
- Verify JSON parsing in nodes

## 📊 Next Steps

Once this works, you can:

1. Add scheduling (daily at 9 AM)
2. Connect Airtable for tracking
3. Add Slack notifications
4. Create content calendar

---

**Ready to automate your LinkedIn presence? Let's go! 🚀**

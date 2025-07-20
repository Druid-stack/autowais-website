# 🚀 Import Workflow to n8n - Quick Guide

## Steps to Import the Workflow

1. **Access your n8n instance**

   - Go to: https://n8n-main.7mioow.easypanel.host/
   - Log in with your credentials

2. **Import the Workflow**

   - Click on **"Workflows"** in the left sidebar
   - Click **"Add Workflow"** button (top right)
   - Select **"Import from File"** or **"Import from URL"**
   - Upload the file: `workflow-to-import.json` (in your current directory)

3. **Configure Credentials**
   After importing, you'll need to set up two credentials:

   ### OpenAI Credential:

   - Click on the "Generate Content" node
   - Click on "Credentials" → "Create New"
   - Name: `OpenAI API`
   - API Key: Your OpenAI API key (get it from https://platform.openai.com/api-keys)
   - Save

   ### LinkedIn Credential:

   - Click on the "Post to LinkedIn" node
   - Click on "Credentials" → "Create New"
   - Name: `LinkedIn OAuth2`
   - Follow the OAuth flow to authorize n8n to post to your LinkedIn

4. **Set Your LinkedIn Person ID**

   - In n8n, go to **Settings** → **Variables**
   - Add a new variable:
     - Key: `LINKEDIN_PERSON_ID`
     - Value: Your LinkedIn person ID (format: `urn:li:person:YOUR_ID`)

5. **Test the Workflow**
   - Click **"Execute Workflow"** button
   - Check if content is generated and posted to LinkedIn
   - View the execution to see results

## 🎯 What This Workflow Does

1. **Manual Trigger** - You click to start
2. **Setup Data** - Prepares topics and date
3. **Generate Content** - Uses OpenAI to create blog content
4. **Post to LinkedIn** - Publishes the content
5. **Success Result** - Shows completion status

## 📝 Customization Tips

- Edit the topics in the "Setup Data" node
- Adjust the AI prompt in "Generate Content" node
- Change the temperature for more/less creativity

## 🆘 Troubleshooting

**"Invalid credentials"**

- Re-authenticate your LinkedIn OAuth
- Check your OpenAI API key is valid

**"No content generated"**

- Verify OpenAI has credits
- Check the JSON parsing in nodes

**"Post failed"**

- Ensure LinkedIn OAuth has posting permissions
- Check character limits

---

**Ready? Import the workflow and start automating your LinkedIn content! 🎉**

---

## 1. Start AWS CLI Configuration

**In your terminal, run:**

```sh
aws configure
```

You will be prompted for:

- **AWS Access Key ID**
- **AWS Secret Access Key**
- **Default region name** (e.g., `us-east-1`)
- **Default output format** (e.g., `json` or `text`)

---

## 2. Where to Get Your AWS Credentials

- Log in to the AWS Console.
- Go to **IAM** > **Users** > [Your User] > **Security credentials**.
- Create or view your Access Key and Secret Key.

---

## 3. After Configuration

Once you’ve entered your credentials, try your command again:

```sh
aws ec2 describe-regions --query "Regions[].{Name:RegionName}" --output text --region us-east-1
```

---

**If you want me to automate this or help with a different “start” (such as starting a server, workflow, or something else), please specify!**

Would you like to proceed with AWS CLI setup, or is there another process you want to start?

---

To export your workflow to n8n, you need a workflow JSON file. Here’s how you can get or create it:

---

## 1. **If You Already Have a Workflow in n8n**

**To export:**

1. Open the n8n web interface.
2. Go to the workflow you want to export.
3. Click the three dots (•••) in the top right.
4. Select **Export** > **Download as file**.
5. This will download a `.json` file (e.g., `articshorex-workflow.json`) to your computer.

---

## 2. **If You Need a Template or Example Workflow File**

If you want a starting template, here’s a minimal example of an n8n workflow JSON file you can use and import:

```json
{
  "name": "Example Workflow for articshorex.com",
  "nodes": [
    {
      "parameters": {},
      "id": "1",
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [240, 300]
    }
  ],
  "connections": {},
  "active": false,
  "settings": {},
  "tags": []
}
```

**To use this:**

1. Copy the above JSON into a new file, e.g., `articshorex-workflow.json`.
2. Import it into n8n using the web UI (Workflows > Import > Upload file).

---

## 3. **If You Want a Specific Workflow File from Your Project**

If you have a workflow file in your project directory (for example, in `agent-workflows/`), you can upload that file directly in the n8n UI.

**Example files you might have:**

- `agent-workflows/simple-daily-blog-linkedin.json`
- `agent-workflows/living-systems-intelligence-content-generator.json`
- `agent-workflows/retrofuture-artisan-production-agent.json`
- etc.

---

## 4. **Next Steps**

- If you want me to generate a workflow file for a specific use case, let me know the details (e.g., what the workflow should do, which services it should connect to).
- If you want to use an existing file, just upload it via the n8n UI as described above.

---

**Let me know if you want a custom workflow file generated, or if you need help with a specific workflow from your project!**  
If you specify the use case or the filename, I can provide the exact JSON content for you.

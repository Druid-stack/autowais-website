# Google Drive & Sheets Integration Test Setup Guide

## Overview

This test workflow will:

- ✅ Create test blog content
- ✅ Save blog posts to Google Drive as text files
- ✅ Track all content in Google Sheets
- ✅ Provide success/error feedback
- ✅ Test the complete integration before full automation

## Prerequisites

### Required Accounts

- Google Account with Drive and Sheets access
- n8n instance (cloud or self-hosted)

### Required APIs

- Google Drive API
- Google Sheets API

## Step 1: Google Cloud Setup

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Note your project ID

### 1.2 Enable APIs

1. Navigate to "APIs & Services" > "Library"
2. Search and enable:
   - **Google Drive API**
   - **Google Sheets API**

### 1.3 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure consent screen if prompted
4. Choose "Web application"
5. Add authorized redirect URIs:
   - `https://your-n8n-instance.com/rest/oauth2-credential/callback`
   - For local n8n: `http://localhost:5678/rest/oauth2-credential/callback`
6. Save Client ID and Client Secret

## Step 2: Google Drive Setup

### 2.1 Create Blog Content Folder

1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder named "Blog Content"
3. Right-click folder > "Get link" > Copy folder ID from URL
   - URL format: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
4. Note the folder ID for later use

### 2.2 Set Folder Permissions

1. Right-click "Blog Content" folder
2. Click "Share"
3. Set to "Anyone with the link can view" (or more restrictive as needed)

## Step 3: Google Sheets Setup

### 3.1 Create Tracking Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet named "Blog Content Tracker"
3. In the first row, add these column headers:
   - `Date`
   - `Title`
   - `Content`
   - `LinkedIn_Post`
   - `Status`
   - `Platform`
   - `Drive_File_ID`
   - `Drive_File_URL`
   - `Created_Time`

### 3.2 Get Spreadsheet ID

1. Copy the spreadsheet URL
2. Extract the ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
3. Note the spreadsheet ID for later use

## Step 4: n8n Configuration

### 4.1 Import Test Workflow

1. Open your n8n instance
2. Go to "Workflows" > "Import from File"
3. Upload `test-google-drive-blog-workflow.json`

### 4.2 Configure Google Drive Credentials

1. In n8n, go to "Credentials"
2. Click "Add Credential"
3. Select "Google Drive OAuth2 API"
4. Enter your credentials:
   - **Client ID**: From Step 1.3
   - **Client Secret**: From Step 1.3
5. Click "Connect my account" and authorize
6. Save credential and note the ID

### 4.3 Configure Google Sheets Credentials

1. In n8n, go to "Credentials"
2. Click "Add Credential"
3. Select "Google Sheets OAuth2 API"
4. Enter your credentials:
   - **Client ID**: From Step 1.3
   - **Client Secret**: From Step 1.3
5. Click "Connect my account" and authorize
6. Save credential and note the ID

### 4.4 Update Workflow Configuration

In the imported workflow, update these values:

#### Google Drive Node:

- Replace `YOUR_GOOGLE_DRIVE_FOLDER_ID` with your folder ID from Step 2.1
- Replace `YOUR_GOOGLE_DRIVE_CREDENTIAL_ID` with credential ID from Step 4.2

#### Google Sheets Node:

- Replace `YOUR_GOOGLE_SHEETS_ID` with your spreadsheet ID from Step 3.2
- Replace `YOUR_GOOGLE_SHEETS_CREDENTIAL_ID` with credential ID from Step 4.3

## Step 5: Test the Workflow

### 5.1 Manual Test

1. Open the "Test Google Drive Blog Workflow" in n8n
2. Click "Execute Workflow" button
3. Monitor each node execution
4. Check for any red error indicators

### 5.2 Verify Results

After successful execution, verify:

#### Google Drive:

- Check "Blog Content" folder for new text file
- File should be named like: `blog-post-2024-01-15.txt`
- File should contain test blog content

#### Google Sheets:

- Check "Blog Content Tracker" spreadsheet
- New row should be added with:
  - Today's date
  - Test blog title
  - Blog content
  - LinkedIn post content
  - Status: "Draft"
  - Drive file ID and URL

### 5.3 Success Indicators

✅ **Success Output Node** shows:

- Google Drive file URL
- Google Sheets spreadsheet ID
- Blog title and date

❌ **Error Output Node** shows:

- Error message
- Troubleshooting guidance

## Step 6: Troubleshooting

### Common Issues & Solutions

#### Authentication Errors:

- Verify OAuth 2.0 credentials are correct
- Check if APIs are enabled in Google Cloud
- Ensure redirect URIs match your n8n instance

#### Permission Errors:

- Verify folder/sheet sharing permissions
- Check if service account has access (if using service account)
- Ensure APIs have proper scopes

#### File Upload Errors:

- Check folder ID format
- Verify folder exists and is accessible
- Check file naming conventions

#### Sheets Write Errors:

- Verify spreadsheet ID format
- Check if sheet name matches ("Sheet1")
- Ensure column headers match exactly

## Step 7: Next Steps

Once the test workflow runs successfully:

1. **Integrate with AI Content Generation**:
   - Add OpenAI node for blog content generation
   - Connect to existing daily automation

2. **Add LinkedIn Posting**:
   - Configure LinkedIn API credentials
   - Add LinkedIn posting node

3. **Set Up Scheduling**:
   - Replace manual trigger with schedule trigger
   - Set desired posting frequency

4. **Add Error Handling**:
   - Implement retry logic
   - Add Slack notifications for failures

5. **Optimize Content**:
   - Add content templates
   - Include SEO optimization
   - Add image generation and upload

## Configuration Summary

### Required IDs to Update in Workflow:

- `YOUR_GOOGLE_DRIVE_FOLDER_ID`: Google Drive folder ID
- `YOUR_GOOGLE_SHEETS_ID`: Google Sheets spreadsheet ID
- `YOUR_GOOGLE_DRIVE_CREDENTIAL_ID`: n8n credential ID for Google Drive
- `YOUR_GOOGLE_SHEETS_CREDENTIAL_ID`: n8n credential ID for Google Sheets

### Test Checklist:

- [ ] Google Cloud project created
- [ ] APIs enabled (Drive + Sheets)
- [ ] OAuth credentials created
- [ ] Google Drive folder created
- [ ] Google Sheets spreadsheet created
- [ ] n8n credentials configured
- [ ] Workflow imported and configured
- [ ] Test execution successful
- [ ] Files created in Google Drive
- [ ] Data tracked in Google Sheets

## Support

If you encounter issues:

1. Check n8n execution logs for detailed error messages
2. Verify all IDs and credentials are correct
3. Test individual nodes separately
4. Check Google Cloud Console for API usage and errors

Ready to test? Import the workflow and follow this guide step by step!

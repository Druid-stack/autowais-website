# Google Sheets Blog Structure Guide

## Overview

Your workflow logs all blog content and AI performance data to Google Sheets for tracking and analysis.

## Required Sheet Setup

### **Sheet Name:** `Blog Posts`

### **Required Columns:**

Create these columns in your Google Sheets in this order:

| Column             | Type | Description                       | Example                             |
| ------------------ | ---- | --------------------------------- | ----------------------------------- |
| **date**           | Text | Daily date (YYYY-MM-DD)           | 2024-01-20                          |
| **sessionId**      | Text | Unique session identifier         | 2024-01-20-090000-abc123xyz         |
| **title**          | Text | Blog post title                   | "5 AI Automation Trends for 2024"   |
| **content**        | Text | Full blog post content            | "In today's rapidly evolving..."    |
| **linkedinPost**   | Text | LinkedIn-optimized post           | "🚀 The future of AI automation..." |
| **linkedinPostId** | Text | LinkedIn post ID after publishing | "urn:li:activity:123456789"         |
| **status**         | Text | Publication status                | "published"                         |
| **approvedBy**     | Text | Who approved the content          | "john.doe"                          |
| **strategicTopic** | Text | AI-recommended topic              | "AI Automation in Healthcare"       |
| **seoScore**       | Text | AI SEO optimization score         | "85"                                |
| **qualityScore**   | Text | AI quality assessment score       | "92"                                |
| **algorithmScore** | Text | LinkedIn algorithm score          | "78"                                |
| **publishedTime**  | Text | Timestamp of publication          | "2024-01-20T09:15:30.000Z"          |

## Sheet Configuration

### **1. Create the Sheet**

1. **Open Google Sheets** in your browser
2. **Create a new sheet** or use existing one
3. **Rename the sheet tab** to exactly: `Blog Posts`
4. **Add the column headers** in row 1 (exactly as shown above)

### **2. Set Up Column Formatting**

- **Date column**: Format as Date (YYYY-MM-DD)
- **Score columns**: Format as Number
- **Content columns**: Format as Text (wrap text for readability)
- **ID columns**: Format as Text

### **3. Configure Sheet ID**

1. **Copy your Google Sheets URL**: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
2. **Extract the SHEET_ID** from the URL
3. **Set the n8n variable**: `GOOGLE_SHEETS_BLOG_ID` = your sheet ID

## How the Workflow Uses This Data

### **Append or Update Logic:**

- **Matches on**: `date` column
- **If date exists**: Updates the existing row
- **If date doesn't exist**: Creates a new row
- **Benefit**: Prevents duplicate entries for the same day

### **Data Flow:**

1. **AI agents generate content** and scores
2. **Human approves** the content
3. **Content publishes** to LinkedIn
4. **All data logs** to Google Sheets automatically
5. **Analytics available** for performance tracking

## Sample Data Structure

```
Date       | Session ID        | Title                  | SEO | Quality | Algorithm | Status    | Approved By
2024-01-20 | 2024-01-20-090000 | "5 AI Trends for 2024" | 85  | 92      | 78        | published | john.doe
2024-01-21 | 2024-01-21-090000 | "Automation Best..."   | 91  | 88      | 82        | published | jane.smith
```

## Benefits for Analysis

### **Performance Tracking:**

- **AI Score Trends**: Track SEO, Quality, Algorithm scores over time
- **Content Performance**: See which topics and approaches work best
- **Approval Patterns**: Understand what content gets approved vs rejected
- **Publishing Consistency**: Monitor daily publishing success

### **Optimization Insights:**

- **Best-performing topics**: Identify high-scoring strategic topics
- **AI improvement**: Track AI agent performance over time
- **Content refinement**: Use feedback to improve future content
- **ROI measurement**: Connect content performance to business metrics

## Troubleshooting

### **Issue: Data not appearing**

- Check that your sheet is named exactly "Blog Posts"
- Verify the `GOOGLE_SHEETS_BLOG_ID` variable is correct
- Ensure Google Sheets credentials are properly configured

### **Issue: Duplicate entries**

- The workflow uses date matching to prevent duplicates
- If you see duplicates, check the date format in your sheet
- Ensure the date column is formatted consistently

### **Issue: Missing columns**

- The workflow expects all columns to exist
- Add any missing columns to your sheet
- Column names must match exactly (case-sensitive)

## Next Steps

1. **Create the Google Sheet** with the required structure
2. **Set the sheet ID** in your n8n variables
3. **Test the workflow** to ensure data logs properly
4. **Set up dashboards** or charts for content performance analysis

This structure provides comprehensive tracking of your AI-powered content automation system!

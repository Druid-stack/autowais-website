# Google Sheets Setup Instructions

## Your Sheet Details

- **Sheet ID**: `17vD0SOfJojqdcBIXVm5kd0nlxydUfB_-VcCBU2N5caA`
- **Tab Name**: `Blog Posts`

## Required Column Headers

Add these **exact** column headers to your Google Sheet (Row 1):

1. **Date** - Date of content creation
2. **Session ID** - Unique session identifier
3. **Title** - Blog post title
4. **Content** - Full blog post content
5. **LinkedIn Post** - LinkedIn-optimized post
6. **LinkedIn Post ID** - LinkedIn post ID after publishing
7. **Status** - Publication status (published/rejected)
8. **Approved By** - Name of person who approved
9. **Strategic Topic** - AI-recommended topic
10. **SEO Score** - SEO optimization score (1-100)
11. **Quality Score** - Overall quality score (1-100)
12. **Algorithm Score** - LinkedIn algorithm score (1-100)
13. **Research Accuracy** - Research AI accuracy score (1-100)
14. **Factual Accuracy** - Content factual accuracy score (1-100)
15. **Published Time** - Timestamp of publication

## Setup Steps

1. **Open your Google Sheet**: [https://docs.google.com/spreadsheets/d/17vD0SOfJojqdcBIXVm5kd0nlxydUfB\_-VcCBU2N5caA/edit](https://docs.google.com/spreadsheets/d/17vD0SOfJojqdcBIXVm5kd0nlxydUfB_-VcCBU2N5caA/edit)

2. **Create "Blog Posts" tab** (if not exists):
   - Right-click on sheet tab
   - Select "Insert sheet"
   - Name it exactly: `Blog Posts`

3. **Add column headers** in Row 1:

   ```
   A1: Date
   B1: Session ID
   C1: Title
   D1: Content
   E1: LinkedIn Post
   F1: LinkedIn Post ID
   G1: Status
   H1: Approved By
   I1: Strategic Topic
   J1: SEO Score
   K1: Quality Score
   L1: Algorithm Score
   M1: Research Accuracy
   N1: Factual Accuracy
   O1: Published Time
   ```

4. **Format columns** (optional but recommended):
   - **Date (A)**: Format as Date
   - **Scores (J,K,L,M,N)**: Format as Number
   - **Published Time (O)**: Format as Date time

5. **Set permissions**:
   - Share with your n8n service account
   - Or ensure your OAuth2 credentials have access

## Research-Enhanced Features

The workflow now includes a **Research AI Agent** that provides:

- **Deep market research** with verified sources
- **Industry statistics** and data points
- **Expert quotes** and case studies
- **Competitor analysis** and unique insights
- **Factual verification** for content accuracy

### Additional Tracking Columns:

- **Research Accuracy**: Confidence level of research data (1-100)
- **Factual Accuracy**: Content factual verification score (1-100)

## Sample Data Structure

| Date       | Session ID               | Title                       | ... | Research Accuracy | Factual Accuracy |
| ---------- | ------------------------ | --------------------------- | --- | ----------------- | ---------------- |
| 2024-01-20 | 2024-01-20-090000-abc123 | "AI Revolution in Business" | ... | 95                | 98               |

## Verification

After setup, the workflow will automatically:

1. ✅ Conduct deep research on trending topics
2. ✅ Generate research-backed content
3. ✅ Track research quality metrics
4. ✅ Log all data to your Google Sheet
5. ✅ Provide comprehensive performance analytics

Your sheet will now capture research quality metrics alongside content performance data.

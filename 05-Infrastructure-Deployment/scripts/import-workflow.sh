#!/bin/bash

# Maya's Workflow Import Script
# Imports the AI Agent-Powered Daily Blog & LinkedIn Automation workflow

echo "🚀 Maya's Workflow Import Guide"
echo "================================="
echo ""

# Check if workflow file exists
WORKFLOW_FILE="../agent-workflows/daily-blog-linkedin-automation.json"
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo "❌ Error: Workflow file not found at $WORKFLOW_FILE"
    exit 1
fi

echo "✅ Workflow file found: $WORKFLOW_FILE"
echo ""

# Display workflow info
echo "📋 Workflow Information:"
echo "  • Name: AI Agent-Powered Daily Blog & LinkedIn Automation"
echo "  • Nodes: 14"
echo "  • AI Agents: 4 specialized agents"
echo "  • Credentials: Slack, LinkedIn, Google Sheets, OpenRouter"
echo "  • Google Sheets ID: 17vD0SOfJojqdcBIXVm5kd0nlxydUfB_-VcCBU2N5caA"
echo ""

echo "🔧 Import Instructions:"
echo "1. Open n8n in your browser"
echo "2. Click 'New' → 'Import' → 'From File'"
echo "3. Select this file: $WORKFLOW_FILE"
echo "4. Click 'Import'"
echo ""

echo "⚙️  After Import - Setup Checklist:"
echo "┌─────────────────────────────────────────────────────┐"
echo "│  ✅ Slack OAuth2 credentials (already connected)    │"
echo "│  ✅ LinkedIn OAuth2 credentials (already connected) │"
echo "│  ✅ Google Sheets OAuth2 credentials (connected)    │"
echo "│  ✅ OpenRouter API credentials (already connected)  │"
echo "│  ⏳ Google Sheets structure (needs column headers)  │"
echo "│  ⏳ Test the workflow manually                      │"
echo "└─────────────────────────────────────────────────────┘"
echo ""

echo "📊 Google Sheets Setup:"
echo "1. Open: https://docs.google.com/spreadsheets/d/17vD0SOfJojqdcBIXVm5kd0nlxydUfB_-VcCBU2N5caA/edit"
echo "2. Create a tab named: 'Blog Posts'"
echo "3. Add these column headers in row 1:"
echo "   date | sessionId | title | content | linkedinPost | linkedinPostId | status | approvedBy | strategicTopic | seoScore | qualityScore | algorithmScore | publishedTime"
echo ""

echo "🧪 Testing the Workflow:"
echo "1. In n8n, click 'Execute Workflow'"
echo "2. Wait for the workflow to run through AI agents"
echo "3. Check Slack for approval message"
echo "4. Reply with: APPROVE-{ID} (use the ID from the message)"
echo "5. Verify content publishes to LinkedIn"
echo "6. Check Google Sheets for logged data"
echo ""

echo "⚠️  Troubleshooting:"
echo "• If credentials fail: Re-authenticate in n8n settings"
echo "• If Google Sheets fails: Check sheet name and column headers"
echo "• If approval fails: Check webhook URL in Wait node"
echo "• If LinkedIn fails: Verify LinkedIn credentials and permissions"
echo ""

echo "🎯 Expected Workflow Flow:"
echo "  Daily Schedule (9 AM) → Session Init → 4 AI Agents → Slack Approval → LinkedIn Post → Google Sheets Log → Success Notification"
echo ""

echo "🔄 Automation Setup:"
echo "1. Once tested successfully, activate the workflow"
echo "2. It will run daily at 9 AM"
echo "3. Monitor Slack for daily approval requests"
echo "4. Track performance in Google Sheets"
echo ""

echo "📈 Maya's Pro Tips:"
echo "• Monitor AI scores to optimize content quality"
echo "• Review rejection patterns to improve AI agents"
echo "• Use Google Sheets data for performance analytics"
echo "• Set up Slack notifications for team collaboration"
echo ""

echo "🎉 You're ready to launch your AI-powered content automation!"
echo "   Import the workflow → Test manually → Enable automation"
echo ""

# Open the workflow file location
echo "📁 Opening workflow file location..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open -R "$WORKFLOW_FILE"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$(dirname "$WORKFLOW_FILE")"
fi

echo "✨ Maya's mission: Your AI content empire awaits!" 
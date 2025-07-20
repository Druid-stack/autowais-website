# LSI Approval Dashboard Setup Guide

## Quick Start: Your 10-Minute Daily Approval Workflow

This dashboard lets you review and approve all daily content in under 10 minutes, maintaining quality while automating everything else.

## Dashboard Access Options

### Option 1: Web Dashboard (Recommended)
**URL**: `https://content.livingsystemsintelligence.org`
- Mobile-responsive design
- One-click approvals
- In-line editing
- Batch operations

### Option 2: Mobile App
- iOS/Android native apps
- Swipe gestures for approve/reject
- Voice notes for edits
- Push notifications

### Option 3: Email Approval
- Reply "APPROVE" to approve
- Reply with edits to modify
- Works offline

## Setting Up Your Dashboard

### Step 1: Create Airtable Base
```
1. Go to airtable.com
2. Create new base: "LSI Content Pipeline"
3. Create tables:
   - ancient-knowledge (your topics)
   - content-approval-queue (scripts awaiting approval)
   - published-content (completed videos)
4. Share base with n8n service account
```

### Step 2: Deploy Approval Interface
```bash
# Clone the dashboard repository
git clone https://github.com/living-systems-intelligence/approval-dashboard
cd approval-dashboard

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Deploy to Vercel (free)
npm install
vercel deploy --prod
```

### Step 3: Configure Notifications
```javascript
// Set your preferred notification method in settings
{
  "notifications": {
    "email": "your@email.com",
    "sms": "+1234567890", // optional
    "slack": "@yourhandle", // optional
    "schedule": "8:00 AM daily"
  }
}
```

## Daily Approval Interface

### Desktop View
```
┌────────────────────────────────────────────────────────┐
│ 🌟 Living Systems Intelligence - Content Approval      │
│ Good morning! You have 4 items to review (est. 8 min) │
├────────────────────────────────────────────────────────┤
│                                                        │
│ 📺 LONG-FORM VIDEO (20 min)                          │
│ ┌──────────────────────────────────────────────────┐ │
│ │ "Sacred Water Structuring: Ancient Wisdom Meets   │ │
│ │  Quantum Science"                                 │ │
│ │                                                   │ │
│ │ Hook: "Did you know water has memory? The        │ │
│ │ ancient Japanese knew this thousands of years    │ │
│ │ ago..."                                          │ │
│ │                                                   │ │
│ │ [▶️ Preview Script] [📝 Quick Edit]              │ │
│ │                                                   │ │
│ │ [✅ APPROVE] [✏️ EDIT] [❌ REJECT]              │ │
│ └──────────────────────────────────────────────────┘ │
│                                                        │
│ 📱 SHORTS BUNDLE (5 x 60 sec)                         │
│ ┌──────────────────────────────────────────────────┐ │
│ │ 1. "Water Memory in 60 Seconds"                  │ │
│ │ 2. "DIY Water Structuring Device"                │ │
│ │ 3. "Scientific Proof of Structured Water"        │ │
│ │ 4. "Ancient Wells Were Vortex Chambers"          │ │
│ │ 5. "Transform Your Water Today"                  │ │
│ │                                                   │ │
│ │ [👁️ Preview All] [✅ APPROVE ALL]               │ │
│ └──────────────────────────────────────────────────┘ │
│                                                        │
│ 📊 Quick Stats                                         │
│ • Scheduled for: Tomorrow 8 AM                        │
│ • Ancient Knowledge: Japanese Water Blessing          │
│ • Build Difficulty: Easy ($50)                        │
│ • Cultural Sensitivity: ✓ Verified                    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Mobile View (Swipe Interface)
```
┌─────────────────┐
│ LSI Approval    │
│ 4 items • 8 min │
├─────────────────┤
│                 │
│ Sacred Water    │
│ Structuring     │
│                 │
│ [Preview Hook]  │
│                 │
│ "Did you know   │
│ water has       │
│ memory?..."     │
│                 │
│ ← Reject        │
│ → Approve       │
│ ↑ Edit          │
│                 │
└─────────────────┘
```

## Approval Shortcuts

### Keyboard Shortcuts (Desktop)
- `A` - Approve current item
- `E` - Edit mode
- `R` - Reject
- `Shift+A` - Approve all shorts
- `Space` - Preview
- `→` - Next item
- `←` - Previous item

### Mobile Gestures
- **Swipe Right** - Approve
- **Swipe Left** - Reject
- **Tap** - Preview
- **Long Press** - Edit
- **Pinch** - See all items

## Smart Features

### 1. AI-Powered Quick Fixes
```
Common issues auto-detected:
- Cultural sensitivity warnings
- Scientific accuracy alerts
- Missing safety disclaimers
- Brand voice inconsistencies

One-click fixes available
```

### 2. Batch Operations
```
- Approve all shorts at once
- Apply edit to multiple items
- Schedule bulk publishing
- Set recurring themes
```

### 3. Context Preservation
```
Your edits are remembered:
- Common corrections saved
- Style preferences learned
- Approval patterns recognized
- Time-saving suggestions made
```

## Integration with Tools

### Slack Commands
```
/lsi approve all - Approve pending content
/lsi edit [id] "new text" - Make quick edit
/lsi schedule [date] - Reschedule content
/lsi stats - See performance metrics
```

### Email Commands
```
Reply with:
APPROVE - Approve as is
APPROVE WITH: [edits] - Approve with changes
REJECT: [reason] - Reject with feedback
SCHEDULE: [date] - Change publish date
```

## Quality Control Automation

### Auto-Checks Before Your Review
✓ Ancient knowledge accurately referenced
✓ Scientific claims fact-checked
✓ Build instructions safety verified
✓ Cultural sensitivity confirmed
✓ Links and resources validated
✓ Copyright materials cleared

### Red Flags That Require Review
🚩 New ancient knowledge source
🚩 Complex build over $200
🚩 Unverified scientific claim
🚩 Cultural ceremony included
🚩 Safety risk identified

## Analytics Dashboard

### See Your Impact
```
┌────────────────────────────────┐
│ This Week's Performance        │
├────────────────────────────────┤
│ Videos Published: 21           │
│ Total Views: 125,430           │
│ Community Builds: 47           │
│ Avg Approval Time: 7.3 min     │
│                                │
│ Top Performer:                 │
│ "Pyramid Power Generator"      │
│ 45K views • 2.3K likes        │
└────────────────────────────────┘
```

## Troubleshooting

### Content Not Appearing?
1. Check Airtable connection
2. Verify n8n workflow running
3. Ensure notification sent

### Can't Approve?
1. Clear browser cache
2. Check login status
3. Verify permissions

### Need to Bulk Edit?
1. Use Airtable directly
2. Run bulk edit workflow
3. Contact support

## Best Practices

### Morning Routine (10 minutes)
1. **8:00 AM** - Open dashboard with coffee
2. **8:01 AM** - Quick scan of all items
3. **8:02-8:07 AM** - Review long-form video
4. **8:07-8:09 AM** - Batch approve shorts
5. **8:09-8:10 AM** - Check analytics

### Weekly Tasks (30 minutes)
- Review performance metrics
- Adjust content themes
- Update ancient knowledge priority
- Plan special series

### Monthly Review (1 hour)
- Analyze top performers
- Update automation rules
- Refine approval criteria
- Community feedback integration

## Support Resources

### Quick Help
- **Dashboard Issues**: dashboard@livingsystemsintelligence.org
- **Content Questions**: content@livingsystemsintelligence.org
- **Technical Support**: tech@livingsystemsintelligence.org

### Documentation
- Video tutorials: youtube.com/lsi-dashboard-help
- Written guides: docs.livingsystemsintelligence.org
- Community forum: forum.livingsystemsintelligence.org

## Security & Privacy

### Your Data is Protected
- SSL encryption everywhere
- 2FA authentication required
- No content stored locally
- GDPR compliant
- Daily backups

### Access Control
- Your approval is final
- No auto-publish without approval
- Edit history tracked
- Rollback available

---

## Ready to Start?

1. **Set up dashboard** (30 minutes one-time)
2. **Configure notifications** (5 minutes)
3. **Do first approval** (10 minutes)
4. **Build your empire** (10 minutes/day)

With this system, you'll publish 100+ pieces of content monthly while maintaining complete creative control - all in just 10 minutes per day.

*"Automation handles the repetition. You handle the vision."* 
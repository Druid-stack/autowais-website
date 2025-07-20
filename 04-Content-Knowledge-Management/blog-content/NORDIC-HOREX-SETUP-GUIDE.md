# Nordic Horex Customer Support Workflow Setup Guide

## Overview

This workflow automates customer support for Nordic Horex Travel Agency by:

1. Monitoring support emails
2. Looking up clients in MongoDB
3. Creating support tickets
4. Sending auto-replies to customers
5. Notifying the support team

## MongoDB Setup

### 1. Database Schema

Create a MongoDB database called `nordic_horex` with these collections:

#### Clients Collection (`clients`)

```json
{
  "_id": ObjectId("..."),
  "email": "customer@example.com",
  "name": "John Doe",
  "phone": "+1-555-123-4567",
  "address": "123 Main St, City, State 12345",
  "bookingHistory": [],
  "preferences": {
    "destination": "Scandinavia",
    "travelStyle": "adventure"
  },
  "vipStatus": false,
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}
```

#### Support Tickets Collection (`support_tickets`)

```json
{
  "_id": ObjectId("..."),
  "clientEmail": "customer@example.com",
  "clientName": "John Doe",
  "subject": "Booking modification request",
  "message": "I need to change my travel dates...",
  "timestamp": ISODate("2024-01-15T14:22:00Z"),
  "status": "open",
  "priority": "normal",
  "assignedTo": null,
  "responses": [],
  "resolvedAt": null
}
```

### 2. Sample Data

Insert sample clients:

```javascript
db.clients.insertMany([
  {
    email: "john.doe@example.com",
    name: "John Doe",
    phone: "+1-555-123-4567",
    vipStatus: false,
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    phone: "+1-555-987-6543",
    vipStatus: true,
  },
]);
```

## Email Configuration

### 1. Support Email Account

Set up `support@nordichorex.com` with:

- IMAP access enabled
- SMTP settings configured
- App passwords if using Gmail/Outlook

### 2. Email Settings

- **IMAP Server:** (e.g., imap.gmail.com for Gmail)
- **IMAP Port:** 993 (SSL)
- **SMTP Server:** (e.g., smtp.gmail.com for Gmail)
- **SMTP Port:** 587 (TLS)

## n8n Workflow Import

### 1. Import the Workflow

1. Open n8n at http://localhost:5678
2. Click "Import from file"
3. Select `nordic-horex-support-workflow.json`
4. Click "Import"

### 2. Configure Credentials

#### MongoDB Credentials

1. Go to Settings > Credentials
2. Create new "MongoDB" credential
3. Name: "Nordic Horex MongoDB"
4. Configure:
   - **Host:** your-mongodb-host
   - **Database:** nordic_horex
   - **User:** your-mongodb-user
   - **Password:** your-mongodb-password

#### Email IMAP Credentials

1. Create new "IMAP" credential
2. Name: "Support Email IMAP"
3. Configure:
   - **Host:** your-imap-server
   - **Port:** 993
   - **User:** support@nordichorex.com
   - **Password:** your-email-password
   - **SSL:** true

#### Email SMTP Credentials

1. Create new "SMTP" credential
2. Name: "Support Email SMTP"
3. Configure:
   - **Host:** your-smtp-server
   - **Port:** 587
   - **User:** support@nordichorex.com
   - **Password:** your-email-password
   - **TLS:** true

### 3. Activate the Workflow

1. Open the imported workflow
2. Click "Activate" toggle (top right)
3. The workflow will now monitor emails automatically

## Workflow Features

### 1. Email Monitoring

- Monitors `support@nordichorex.com` inbox
- Processes new emails in real-time
- Extracts sender, subject, and message content

### 2. Client Lookup

- Searches MongoDB for existing client by email
- Retrieves client information for personalization
- Handles both existing and new customers

### 3. Ticket Creation

- Creates structured support tickets in MongoDB
- Includes client info, timestamp, and status
- Assigns unique ticket IDs

### 4. Auto-Reply

- Sends personalized acknowledgment to customer
- Includes ticket number and expected response time
- Uses client name if available

### 5. Team Notification

- Alerts support team about new tickets
- Includes all relevant ticket information
- Provides quick access links

## Customization Options

### 1. Email Templates

Modify the auto-reply template in the "Send Auto-Reply" node:

- Add Nordic Horex branding
- Include specific contact information
- Customize response times

### 2. Priority Rules

Add logic to set ticket priority based on:

- VIP customer status
- Keywords in subject/message
- Time of day/urgency indicators

### 3. Assignment Rules

Implement automatic assignment based on:

- Support team availability
- Expertise areas
- Workload distribution

## Testing

### 1. Send Test Email

1. Send an email to `support@nordichorex.com`
2. Check n8n execution log
3. Verify ticket creation in MongoDB
4. Confirm auto-reply received

### 2. Monitor Executions

1. Go to n8n > Executions
2. Check successful/failed runs
3. Debug any issues in the logs

## Troubleshooting

### Common Issues:

1. **Email not triggering:** Check IMAP credentials and connection
2. **MongoDB errors:** Verify database connection and permissions
3. **Auto-reply not sent:** Check SMTP settings and credentials
4. **Missing client data:** Ensure client exists in database

### Logs:

- n8n execution logs: Available in the Executions tab
- MongoDB logs: Check your MongoDB server logs
- Email logs: Check your email provider's logs

## Security Considerations

1. **Credentials:** Store securely in n8n credential manager
2. **Database:** Use strong passwords and proper user permissions
3. **Email:** Enable 2FA and use app passwords
4. **Network:** Consider VPN for database connections

## Maintenance

1. **Regular Backups:** Backup MongoDB and n8n workflows
2. **Monitor Performance:** Check execution times and success rates
3. **Update Credentials:** Rotate passwords regularly
4. **Review Logs:** Monitor for errors and unusual activity

---

**Support Contact:**

- Email: prashant@autowais.com
- Created for: Nordic Horex Travel Agency
- Date: January 2024

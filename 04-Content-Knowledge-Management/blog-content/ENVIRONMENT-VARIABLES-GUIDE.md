# Environment Variables Guide for Autowais

## What are Environment Variables?

Environment variables are key-value pairs that store configuration data and sensitive information outside of your code. This keeps secrets like API keys, passwords, and database URLs secure and separate from your application.

## Why Use Environment Variables?

✅ **Security**: Keep sensitive data out of your code  
✅ **Flexibility**: Different settings for different environments  
✅ **Best Practice**: Industry standard for configuration management  
✅ **Deployment**: Easy to configure in production environments

## Setup Instructions

### 1. Install dotenv

```bash
npm install dotenv
```

### 2. Create your .env file

Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

### 3. Load environment variables in your code

```javascript
// At the top of your main file (server.js, app.js, etc.)
require("dotenv").config();

// Now you can access environment variables
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
```

## Environment Variables in Your Project

### Application Settings

```bash
NODE_ENV=development          # Environment (development, production, staging)
PORT=3000                     # Server port
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Public app URL
```

### Database Configuration

```bash
MONGODB_URI=mongodb://localhost:27017/autowais
DATABASE_URL=mongodb://localhost:27017/autowais
```

### Authentication

```bash
JWT_SECRET=your_jwt_secret_here    # Secret for JWT tokens
JWT_EXPIRES_IN=7d                  # Token expiration time
```

### API Keys (Replace with your actual keys)

```bash
OPENAI_API_KEY=your_openai_api_key_here
SLACK_BOT_TOKEN=your_slack_bot_token_here
SLACK_SIGNING_SECRET=your_slack_signing_secret_here
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
GOOGLE_SERVICE_ACCOUNT_KEY=your_google_service_account_key_here
```

### Email Configuration

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_here
```

### External Services

```bash
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
MAYA_API_KEY=your_maya_api_key_here
STRING_API_KEY=your_string_api_key_here
```

## How to Use in Your Code

### JavaScript/Node.js

```javascript
// Load environment variables
require("dotenv").config();

// Access variables
const apiKey = process.env.OPENAI_API_KEY;
const dbUrl = process.env.MONGODB_URI;

// Use in your application
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

### Next.js

```javascript
// In Next.js, you can access environment variables directly
const apiKey = process.env.OPENAI_API_KEY;

// For client-side access, prefix with NEXT_PUBLIC_
const publicUrl = process.env.NEXT_PUBLIC_APP_URL;
```

### TypeScript

```typescript
// Define types for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "staging";
      PORT: string;
      MONGODB_URI: string;
      OPENAI_API_KEY: string;
      // Add other variables as needed
    }
  }
}
```

## Security Best Practices

### ✅ DO:

- Use environment variables for all sensitive data
- Keep `.env` files out of version control
- Use different values for different environments
- Rotate keys regularly
- Use strong, unique secrets

### ❌ DON'T:

- Hardcode secrets in your code
- Commit `.env` files to git
- Share API keys in chat or documentation
- Use the same keys across environments
- Use weak or predictable secrets

## Environment-Specific Files

Create different files for different environments:

```bash
.env.local          # Local development (ignored by git)
.env.development    # Development environment
.env.staging        # Staging environment
.env.production     # Production environment
```

## Production Deployment

### Vercel

Set environment variables in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with its value

### Docker

```dockerfile
# In your Dockerfile
ENV NODE_ENV=production
ENV PORT=3000

# Or use docker-compose
environment:
  - NODE_ENV=production
  - MONGODB_URI=${MONGODB_URI}
```

### AWS/Cloud Platforms

Set environment variables in your hosting platform's dashboard or CLI.

## Troubleshooting

### Common Issues:

1. **Environment variable not found**

   ```javascript
   // Make sure you've loaded dotenv
   require("dotenv").config();

   // Check if the variable exists
   if (!process.env.API_KEY) {
     console.error("API_KEY not found in environment variables");
   }
   ```

2. **Next.js client-side access**

   ```javascript
   // Only NEXT_PUBLIC_ variables are available on the client
   const publicVar = process.env.NEXT_PUBLIC_APP_URL; // ✅ Works
   const privateVar = process.env.API_KEY; // ❌ Won't work on client
   ```

3. **File not found**
   ```bash
   # Make sure .env file exists in project root
   ls -la .env
   ```

## Example Usage in Autowais Project

### Server Configuration

```javascript
// server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### API Integration

```javascript
// api/openai.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateContent(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
```

## Quick Start Checklist

- [ ] Install dotenv: `npm install dotenv`
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in your actual API keys and secrets
- [ ] Add `require('dotenv').config()` to your main file
- [ ] Update `.gitignore` to exclude `.env` files
- [ ] Test that variables are accessible in your code
- [ ] Set up production environment variables

## Need Help?

If you're having trouble with environment variables:

1. Check that `.env` file exists in project root
2. Verify `require('dotenv').config()` is called early in your app
3. Confirm variable names match exactly (case-sensitive)
4. Restart your development server after changes

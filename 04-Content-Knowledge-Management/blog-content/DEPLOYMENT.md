# AUTOWAIS Website Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Zoho Mail Account**: Professional email for info@autowais.com
3. **Domain**: Your custom domain (optional but recommended)

## Zoho Mail Setup

### Step 1: Create Zoho Mail Account
1. Go to [mail.zoho.com](https://mail.zoho.com)
2. Sign up with your domain (e.g., autowais.com)
3. Verify domain ownership
4. Create email account: info@autowais.com

### Step 2: Generate App Password
1. Login to Zoho Mail
2. Go to **Settings** → **Security** → **App Passwords**
3. Click **Generate New Password**
4. Select **Third Party Applications**
5. Name: "AUTOWAIS Website Contact Form"
6. **Copy the generated password** (save it securely)

### Step 3: SMTP Settings
- **Host**: smtp.zoho.com
- **Port**: 587
- **Security**: STARTTLS
- **Username**: info@autowais.com
- **Password**: [App Password from Step 2]

## Vercel Deployment

### Step 1: Connect Repository
1. Login to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import from Git repository
4. Select your AUTOWAIS repository
5. Choose **"autowais"** as root directory

### Step 2: Configure Environment Variables
In Vercel dashboard, add these environment variables:

```
ZOHO_EMAIL=info@autowais.com
ZOHO_PASSWORD=[your_app_password_from_zoho]
```

### Step 3: Deploy
1. Click **"Deploy"**
2. Wait for build completion
3. Get your live URL (e.g., autowais.vercel.app)

### Step 4: Custom Domain (Optional)
1. In Vercel project settings, go to **"Domains"**
2. Add your custom domain (e.g., autowais.com)
3. Update DNS records as instructed
4. SSL certificate will be automatically generated

## Testing Contact Form

1. Visit your live website
2. Go to **Contact Us** page
3. Fill out the form with test data
4. Submit and verify:
   - Success message appears
   - Email received at info@autowais.com
   - Customer receives confirmation email

## Troubleshooting

### Contact Form Not Working
- Check environment variables in Vercel
- Verify Zoho Mail app password is correct
- Check Vercel function logs in dashboard

### Email Not Sending
- Confirm SMTP settings match Zoho requirements
- Check if app password has correct permissions
- Verify domain is properly configured in Zoho

### Build Failures
- Ensure all dependencies are in package.json
- Check for TypeScript errors in local development
- Review Vercel build logs for specific errors

## Performance Optimization

The website includes:
- ✅ Server-side rendering (SSR)
- ✅ Image optimization
- ✅ CSS/JS minification
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Fast loading animations

## Security Features

- ✅ Form validation (client + server)
- ✅ Email format verification
- ✅ Rate limiting (via Vercel)
- ✅ Environment variable protection
- ✅ HTTPS enforcement

## Monitoring

### Analytics (Optional)
1. Add Google Analytics to `_app.tsx`
2. Track form submissions
3. Monitor page performance

### Error Tracking (Optional)
1. Add Sentry for error monitoring
2. Track API endpoint failures
3. Get alerts for issues

## Maintenance

### Regular Updates
- Keep Next.js dependencies updated
- Monitor Vercel function usage
- Review contact form submissions
- Update content as needed

### Backup
- Repository is backed up on GitHub
- Environment variables documented
- Regular data exports from Zoho Mail

## Support

For technical issues:
1. Check Vercel function logs
2. Review error messages in browser console
3. Test API endpoints directly
4. Contact Zoho support for email issues

---

🚀 **Your AUTOWAIS website is now live with professional email integration!** 
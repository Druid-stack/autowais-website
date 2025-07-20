#!/bin/bash

# Deploy Privacy Policy to GitHub
# This script helps commit and push the privacy policy files to GitHub

echo "🚀 Deploying Privacy Policy to GitHub..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the autowais-website directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first."
    exit 1
fi

# Add the privacy policy files
echo "📝 Adding privacy policy files..."
git add PRIVACY-POLICY.md
git add public/privacy-policy.html

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit. Privacy policy files may already be up to date."
    exit 0
fi

# Commit the changes
echo "💾 Committing privacy policy files..."
git commit -m "Add comprehensive privacy policy for Autowais platform

- Add detailed privacy policy covering AI automation services
- Include LinkedIn integration and social media automation
- Cover data collection, usage, and user rights
- Add HTML version for website integration
- Ensure GDPR and CCPA compliance
- Update contact information and data protection details"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Privacy Policy successfully deployed to GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. The privacy policy is now available at: https://github.com/autowais/autowais-website"
echo "2. You can access the HTML version at: https://autowais.com/privacy-policy.html"
echo "3. Update your website footer to link to the privacy policy"
echo "4. Consider adding a cookie consent banner if not already present"
echo ""
echo "🔗 Files created:"
echo "- PRIVACY-POLICY.md (Markdown version)"
echo "- public/privacy-policy.html (HTML version for website)"
echo ""
echo "📧 Contact emails configured:"
echo "- privacy@autowais.com (General privacy inquiries)"
echo "- dpo@autowais.com (EU Data Protection Officer)" 
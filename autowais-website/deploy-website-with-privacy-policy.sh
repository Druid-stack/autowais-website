#!/bin/bash

# Deploy Website with Privacy Policy
# This script helps deploy the website with the new privacy policy page

echo "🚀 Deploying Autowais Website with Privacy Policy..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the autowais-website directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if we're logged into Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

echo "📝 Building the website..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Website successfully deployed with Privacy Policy!"
        echo ""
        echo "📋 Privacy Policy URLs:"
        echo "- Main Privacy Policy: https://autowais.com/privacy-policy"
        echo "- Alternative URL: https://autowais.com/privacy-policy.html"
        echo ""
        echo "🔗 GitHub Repository:"
        echo "- Source Code: https://github.com/Druid-stack/autowais-website"
        echo "- Privacy Policy Page: https://github.com/Druid-stack/autowais-website/blob/main/src/app/privacy-policy/page.tsx"
        echo ""
        echo "📧 Contact Information:"
        echo "- Privacy Inquiries: privacy@autowais.com"
        echo "- EU DPO: dpo@autowais.com"
        echo ""
        echo "✅ Next Steps:"
        echo "1. Test the privacy policy page at https://autowais.com/privacy-policy"
        echo "2. Add privacy policy link to website footer"
        echo "3. Update terms of service to reference privacy policy"
        echo "4. Consider adding a cookie consent banner"
    else
        echo "❌ Deployment failed. Please check your Vercel configuration."
        exit 1
    fi
else
    echo "❌ Build failed. Please check for errors in the build output."
    exit 1
fi 
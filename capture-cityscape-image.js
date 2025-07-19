const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureCityscapeImage() {
    console.log('🎨 Starting cityscape image capture...');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport to 1200x630 (optimal for social media)
        await page.setViewport({
            width: 1200,
            height: 630,
            deviceScaleFactor: 2 // Higher quality
        });
        
        // Load the HTML file
        const htmlPath = path.join(__dirname, 'trillion-opportunity-cityscape.html');
        const htmlUrl = `file://${htmlPath}`;
        
        console.log('📱 Loading cityscape HTML...');
        await page.goto(htmlUrl, { waitUntil: 'networkidle0' });
        
        // Wait for animations to settle
        console.log('⏳ Waiting for animations to settle...');
        await page.waitForTimeout(3000);
        
        // Create output directory if it doesn't exist
        const outputDir = path.join(__dirname, 'public', 'images', 'blog');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Capture screenshot
        const outputPath = path.join(outputDir, 'trillion-opportunity-cityscape.png');
        console.log('📸 Capturing screenshot...');
        
        await page.screenshot({
            path: outputPath,
            type: 'png',
            fullPage: false,
            omitBackground: false
        });
        
        console.log('✅ Cityscape image captured successfully!');
        console.log('📁 Saved to:', outputPath);
        
        // Check file size
        const stats = fs.statSync(outputPath);
        const fileSizeInKB = Math.round(stats.size / 1024);
        console.log('📊 File size:', fileSizeInKB + 'KB');
        
        return outputPath;
        
    } catch (error) {
        console.error('❌ Error capturing cityscape image:', error.message);
        throw error;
    } finally {
        await browser.close();
    }
}

// Run the capture function
captureCityscapeImage()
    .then(outputPath => {
        console.log('');
        console.log('🎉 Cityscape image ready for blog post!');
        console.log('📝 Blog post will now use the correct cityscape image');
        console.log('🌐 Ready to deploy to website');
    })
    .catch(error => {
        console.error('💥 Failed to capture cityscape image:', error);
        process.exit(1);
    }); 
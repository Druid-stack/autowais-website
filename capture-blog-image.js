const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureBlogImage() {
    console.log('🎨 Starting blog image capture...');
    
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
        const htmlPath = path.join(__dirname, 'trillion-opportunity-image.html');
        const htmlUrl = `file://${htmlPath}`;
        
        console.log('📄 Loading HTML file...');
        await page.goto(htmlUrl, { waitUntil: 'networkidle0' });
        
        // Wait for animations to settle
        console.log('⏳ Waiting for animations...');
        await page.waitForTimeout(3000);
        
        // Ensure the images directory exists
        const imagesDir = path.join(__dirname, 'public', 'images', 'blog');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        
        // Capture screenshot
        const outputPath = path.join(imagesDir, 'digital-opportunity.png');
        console.log('📸 Capturing screenshot...');
        
        await page.screenshot({
            path: outputPath,
            type: 'png',
            fullPage: false,
            omitBackground: false
        });
        
        console.log('✅ Blog image captured successfully!');
        console.log('📁 Saved to:', outputPath);
        console.log('🖼️  Image size: 1200x630px (2x scale)');
        
        // Verify file was created
        if (fs.existsSync(outputPath)) {
            const stats = fs.statSync(outputPath);
            console.log('📊 File size:', (stats.size / 1024).toFixed(2), 'KB');
        }
        
    } catch (error) {
        console.error('❌ Error capturing image:', error.message);
    } finally {
        await browser.close();
        console.log('🔒 Browser closed');
    }
}

// Run the capture
captureBlogImage().catch(console.error); 
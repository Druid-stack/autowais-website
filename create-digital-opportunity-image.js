const fs = require('fs');
const path = require('path');

// Create HTML for the digital opportunity image
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Opportunity Image</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 10px;
            line-height: 1.2;
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: #718096;
            margin-bottom: 20px;
        }
        
        .opportunity-gap {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            gap: 20px;
        }
        
        .level {
            flex: 1;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            position: relative;
            transition: transform 0.3s ease;
        }
        
        .level:hover {
            transform: translateY(-5px);
        }
        
        .level-1 {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
        }
        
        .level-2 {
            background: linear-gradient(135deg, #feca57, #ff9ff3);
            color: white;
        }
        
        .level-3 {
            background: linear-gradient(135deg, #48dbfb, #0abde3);
            color: white;
        }
        
        .level-title {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .level-percentage {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .level-description {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .stats-section {
            background: #f7fafc;
            padding: 25px;
            border-radius: 15px;
            margin: 30px 0;
        }
        
        .stats-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .stat-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #718096;
        }
        
        .cta-section {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 15px;
            color: white;
        }
        
        .cta-title {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .cta-subtitle {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .money-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        
        .arrow {
            font-size: 2rem;
            color: #667eea;
            margin: 0 10px;
        }
        
        .gap-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
            font-size: 1.1rem;
            color: #718096;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="money-icon">💰</div>
            <h1 class="title">The Hidden $2.8 Trillion Opportunity</h1>
            <p class="subtitle">Why 89% of Businesses Miss It</p>
        </div>
        
        <div class="stats-section">
            <h2 class="stats-title">📊 The Numbers Don't Lie</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">$2.8T</div>
                    <div class="stat-label">Untapped Digital Value</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">89%</div>
                    <div class="stat-label">Missing Opportunities</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">67%</div>
                    <div class="stat-label">Using Manual Processes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">11%</div>
                    <div class="stat-label">Digital Masters</div>
                </div>
            </div>
        </div>
        
        <div class="gap-indicator">
            <span>Digital Novices</span>
            <span class="arrow">→</span>
            <span>Digital Adopters</span>
            <span class="arrow">→</span>
            <span>Digital Masters</span>
        </div>
        
        <div class="opportunity-gap">
            <div class="level level-1">
                <div class="level-title">Level 1</div>
                <div class="level-percentage">67%</div>
                <div class="level-description">Digital Novices<br>Manual processes<br>High costs</div>
            </div>
            <div class="level level-2">
                <div class="level-title">Level 2</div>
                <div class="level-percentage">22%</div>
                <div class="level-description">Digital Adopters<br>Some automation<br>Moderate gains</div>
            </div>
            <div class="level level-3">
                <div class="level-title">Level 3</div>
                <div class="level-percentage">11%</div>
                <div class="level-description">Digital Masters<br>AI-powered systems<br>Maximum advantage</div>
            </div>
        </div>
        
        <div class="cta-section">
            <h3 class="cta-title">Which Side of the Gap Are You On?</h3>
            <p class="cta-subtitle">The companies that act now will dominate their markets for the next decade</p>
        </div>
    </div>
</body>
</html>
`;

// Write the HTML file
const htmlPath = path.join(__dirname, 'digital-opportunity-image.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log('🎨 **Digital Opportunity Image Created!**\n');
console.log('📁 HTML file created: digital-opportunity-image.html');
console.log('');
console.log('🖼️ **Image Features:**');
console.log('   • $2.8 trillion opportunity visualization');
console.log('   • 3 levels of digital maturity');
console.log('   • Key statistics and data points');
console.log('   • Professional gradient design');
console.log('   • Compelling call-to-action');
console.log('');
console.log('💡 **To convert to image:**');
console.log('   1. Open the HTML file in a browser');
console.log('   2. Take a screenshot or use browser dev tools');
console.log('   3. Save as PNG/JPG for LinkedIn posting');
console.log('');
console.log('📊 **Image represents:**');
console.log('   • The massive opportunity gap');
console.log('   • Why most businesses are missing out');
console.log('   • The path to digital mastery');
console.log('   • Urgency to act now');
console.log('');
console.log('✅ **Ready for LinkedIn posting!**'); 
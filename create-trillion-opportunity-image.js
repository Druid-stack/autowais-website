const fs = require('fs');
const path = require('path');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$2.8 Trillion Opportunity</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
        }
        
        .container {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
        }
        
        .content {
            position: relative;
            z-index: 2;
            padding: 60px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .main-title {
            font-size: 48px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 20px;
            text-align: center;
            line-height: 1.2;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .highlight {
            color: #00d4ff;
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            font-size: 24px;
            color: #e0e0e0;
            text-align: center;
            margin-bottom: 40px;
            font-weight: 300;
        }
        
        .stats-container {
            display: flex;
            justify-content: space-around;
            margin-bottom: 40px;
        }
        
        .stat {
            text-align: center;
            color: #ffffff;
        }
        
        .stat-number {
            font-size: 36px;
            font-weight: 700;
            color: #00d4ff;
            display: block;
            margin-bottom: 8px;
        }
        
        .stat-label {
            font-size: 14px;
            color: #b0b0b0;
            font-weight: 500;
        }
        
        .visual-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .floating-icon {
            position: absolute;
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #00d4ff;
            animation: float 6s ease-in-out infinite;
        }
        
        .floating-icon:nth-child(1) {
            top: 15%;
            left: 10%;
            animation-delay: 0s;
        }
        
        .floating-icon:nth-child(2) {
            top: 25%;
            right: 15%;
            animation-delay: 1s;
        }
        
        .floating-icon:nth-child(3) {
            bottom: 20%;
            left: 20%;
            animation-delay: 2s;
        }
        
        .floating-icon:nth-child(4) {
            bottom: 30%;
            right: 10%;
            animation-delay: 3s;
        }
        
        .floating-icon:nth-child(5) {
            top: 50%;
            left: 5%;
            animation-delay: 4s;
        }
        
        .floating-icon:nth-child(6) {
            top: 60%;
            right: 5%;
            animation-delay: 5s;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
        
        .pulse {
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
        }
        
        .cta {
            text-align: center;
            margin-top: 30px;
        }
        
        .cta-text {
            font-size: 18px;
            color: #ffffff;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .brand {
            position: absolute;
            bottom: 30px;
            right: 40px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="background-pattern"></div>
        
        <div class="visual-elements">
            <div class="floating-icon">🚀</div>
            <div class="floating-icon">💡</div>
            <div class="floating-icon">📊</div>
            <div class="floating-icon">⚡</div>
            <div class="floating-icon">🎯</div>
            <div class="floating-icon">🔮</div>
        </div>
        
        <div class="content">
            <h1 class="main-title">
                The Hidden <span class="highlight pulse">$2.8 Trillion</span><br>
                Opportunity
            </h1>
            
            <p class="subtitle">
                Why 89% of Businesses Miss It
            </p>
            
            <div class="stats-container">
                <div class="stat">
                    <span class="stat-number">$2.8T</span>
                    <span class="stat-label">Untapped Value</span>
                </div>
                <div class="stat">
                    <span class="stat-number">89%</span>
                    <span class="stat-label">Missing Out</span>
                </div>
                <div class="stat">
                    <span class="stat-number">11%</span>
                    <span class="stat-label">Digital Masters</span>
                </div>
            </div>
            
            <div class="cta">
                <p class="cta-text">Are You Ready to Claim Your Share?</p>
            </div>
        </div>
        
        <div class="brand">AUTOWAIS</div>
    </div>
</body>
</html>
`;

const outputPath = path.join(__dirname, 'trillion-opportunity-image.html');

fs.writeFileSync(outputPath, htmlContent);

console.log('🎨 Created trillion opportunity image HTML file!');
console.log('📁 File saved to:', outputPath);
console.log('');
console.log('📸 To create the image:');
console.log('1. Open the HTML file in a browser');
console.log('2. Take a screenshot (1200x630px)');
console.log('3. Save as PNG in public/images/blog/digital-opportunity.png');
console.log('');
console.log('🚀 Or use browser automation to capture it automatically!'); 
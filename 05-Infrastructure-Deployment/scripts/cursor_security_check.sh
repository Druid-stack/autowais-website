#!/bin/bash

echo "🛡️  Cursor Security Check"
echo "========================"
echo "Date: $(date)"
echo ""

# Check Cursor processes
echo "🔍 Cursor Processes:"
ps aux | grep -i cursor | grep -v grep | head -5
echo ""

# Check network connections
echo "🌐 Network Connections:"
lsof -i -P | grep -i cursor | head -10
echo ""

# Check for suspicious extensions
echo "📦 Extension Analysis:"
echo "User Extensions:"
ls ~/.cursor/extensions/ | grep -E "(github|ms-vscode|microsoft)" | head -10
echo ""

# Check Cursor settings
echo "⚙️  Current Settings:"
if [ -f ~/Library/Application\ Support/Cursor/User/settings.json ]; then
    cat ~/Library/Application\ Support/Cursor/User/settings.json
else
    echo "No custom settings found"
fi
echo ""

# Check for telemetry
echo "📊 Telemetry Status:"
if grep -q "telemetry" ~/Library/Application\ Support/Cursor/User/settings.json 2>/dev/null; then
    echo "⚠️  Telemetry settings found in config"
else
    echo "✅ No telemetry settings found"
fi
echo ""

# Check for Copilot
echo "🤖 GitHub Copilot Status:"
if ls ~/.cursor/extensions/ | grep -q "github.copilot"; then
    echo "⚠️  GitHub Copilot is installed - sends code to Microsoft"
else
    echo "✅ GitHub Copilot not found"
fi
echo ""

echo "✅ Cursor security check completed" 
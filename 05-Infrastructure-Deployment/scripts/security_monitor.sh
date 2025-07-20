#!/bin/bash

# 🛡️ macOS Security Monitor Script
# Run this script weekly to check your system security status

echo "🛡️  macOS Security Status Check"
echo "================================"
echo "Date: $(date)"
echo ""

# Check Firewall Status
echo "🔥 Firewall Status:"
firewall_status=$(system_profiler SPFirewallDataType | grep "Mode" | awk -F': ' '{print $2}')
if [[ "$firewall_status" == *"Limit incoming connections"* ]]; then
    echo "✅ Firewall: ENABLED - $firewall_status"
else
    echo "❌ Firewall: DISABLED - $firewall_status"
fi

stealth_status=$(system_profiler SPFirewallDataType | grep "Stealth Mode" | awk -F': ' '{print $2}')
if [[ "$stealth_status" == "Yes" ]]; then
    echo "✅ Stealth Mode: ENABLED"
else
    echo "❌ Stealth Mode: DISABLED"
fi
echo ""

# Check Gatekeeper Status
echo "🚪 Gatekeeper Status:"
gatekeeper_status=$(sudo spctl --status 2>/dev/null | awk '{print $1}')
if [[ "$gatekeeper_status" == "assessments" ]]; then
    echo "✅ Gatekeeper: ENABLED"
else
    echo "❌ Gatekeeper: DISABLED"
fi
echo ""

# Check for Antivirus Software
echo "🦠 Antivirus Software Check:"
antivirus_found=false

# Check common antivirus applications
antivirus_apps=("Malwarebytes" "Bitdefender" "Norton" "Avast" "Kaspersky" "McAfee" "Trend Micro")
for app in "${antivirus_apps[@]}"; do
    if [ -d "/Applications/$app.app" ]; then
        echo "✅ Found: $app"
        antivirus_found=true
    fi
done

if [ "$antivirus_found" = false ]; then
    echo "❌ No antivirus software detected!"
    echo "   Recommendation: Install Malwarebytes or Bitdefender"
fi
echo ""

# Check for suspicious processes
echo "🔍 Suspicious Process Check:"
suspicious_processes=("cryptominer" "miner" "coin" "bitcoin" "ethereum" "malware" "trojan")
for process in "${suspicious_processes[@]}"; do
    if pgrep -i "$process" > /dev/null; then
        echo "⚠️  WARNING: Suspicious process found: $process"
    fi
done
echo ""

# Check for unusual network connections
echo "🌐 Network Connection Check:"
echo "Active network connections:"
lsof -i -P | grep LISTEN | head -10
echo ""

# Check system updates
echo "🔄 System Update Status:"
softwareupdate --list | grep -E "(Software Update|Security Update)" | head -5
echo ""

# Check disk space (malware can fill disk)
echo "💾 Disk Space Check:"
df -h / | tail -1 | awk '{print "Available: " $4 " of " $2}'
echo ""

# Check for unauthorized login items
echo "🔐 Login Items Check:"
osascript -e 'tell application "System Events" to get the name of every login item' 2>/dev/null | tr ',' '\n' | sed 's/^/   /'
echo ""

# Security Recommendations
echo "📋 SECURITY RECOMMENDATIONS:"
echo "============================="
echo "1. Install antivirus software if not already installed"
echo "2. Enable FileVault encryption (System Preferences → Security & Privacy)"
echo "3. Use strong passwords and enable 2FA where possible"
echo "4. Keep all software updated"
echo "5. Be cautious with email attachments and downloads"
echo "6. Use a VPN for public WiFi"
echo "7. Regularly backup important data"
echo ""

echo "✅ Security check completed at $(date)" 
#!/bin/bash

echo "🔍 Verifying Cursor AWS Connection Blocking"
echo "==========================================="

echo "📊 Current Cursor Network Connections:"
echo "--------------------------------------"
lsof -i -P | grep -i cursor | head -10

echo ""
echo "🌐 Testing AWS Domain Resolution:"
echo "--------------------------------"

# Test if AWS domains are blocked
aws_domains=(
    "ec2-34-199-128-175.compute-1.amazonaws.com"
    "ec2-107-21-149-187.compute-1.amazonaws.com"
    "ec2-98-84-230-32.compute-1.amazonaws.com"
    "ec2-107-22-7-225.compute-1.amazonaws.com"
    "ec2-54-165-91-199.compute-1.amazonaws.com"
    "ec2-52-202-250-142.compute-1.amazonaws.com"
    "ec2-3-216-200-173.compute-1.amazonaws.com"
    "ae2c518386054b8a3.awsglobalaccelerator.com"
)

for domain in "${aws_domains[@]}"; do
    if nslookup "$domain" 2>/dev/null | grep -q "127.0.0.1"; then
        echo "✅ $domain -> BLOCKED (127.0.0.1)"
    elif nslookup "$domain" 2>/dev/null | grep -q "NXDOMAIN"; then
        echo "✅ $domain -> BLOCKED (NXDOMAIN)"
    else
        echo "❌ $domain -> NOT BLOCKED"
    fi
done

echo ""
echo "🛡️  Little Snitch Rule Status:"
echo "-----------------------------"
if [ -f "$HOME/Library/Application Support/Little Snitch/rules/Block_Cursor_AWS.lsrules" ]; then
    echo "✅ Little Snitch rule file exists"
else
    echo "❌ Little Snitch rule file not found"
fi

echo ""
echo "🔥 macOS Firewall Status:"
echo "------------------------"
firewall_status=$(system_profiler SPFirewallDataType | grep "Mode" | awk -F': ' '{print $2}')
echo "Firewall Mode: $firewall_status"

if system_profiler SPFirewallDataType | grep -q "Cursor"; then
    echo "✅ Cursor is in firewall rules"
else
    echo "❌ Cursor not found in firewall rules"
fi

echo ""
echo "📋 Recommendations:"
echo "------------------"
echo "1. If connections are still active, restart Cursor"
echo "2. If using Little Snitch, import the rule file"
echo "3. If using firewall, run: sudo /tmp/cursor_firewall_setup.sh"
echo "4. Monitor connections with: lsof -i -P | grep -i cursor" 
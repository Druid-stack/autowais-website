#!/bin/bash

echo "🔄 Restoring Cursor AWS Access"
echo "=============================="

# Remove AWS blocking entries from hosts file
echo "🗑️  Removing AWS blocking entries from hosts file..."
sudo sed -i '' '/# Block Cursor AWS connections/,/127.0.0.1 104.18.18.125/d' /etc/hosts

# Remove Cursor from firewall (if it was added)
echo "🔥 Removing Cursor from firewall..."
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --remove /Applications/Cursor.app 2>/dev/null

# Flush DNS cache
echo "🔄 Flushing DNS cache..."
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Remove Little Snitch rule file if it exists
if [ -f "$HOME/Library/Application Support/Little Snitch/rules/Block_Cursor_AWS.lsrules" ]; then
    echo "🗑️  Removing Little Snitch rule file..."
    rm "$HOME/Library/Application Support/Little Snitch/rules/Block_Cursor_AWS.lsrules"
fi

echo ""
echo "✅ AWS access restored for Cursor"
echo "🔄 Restart Cursor to test functionality:"
echo "   killall Cursor && open -a Cursor"
echo ""
echo "🌐 Test AWS connectivity:"
echo "   nslookup ec2-34-199-128-175.compute-1.amazonaws.com" 
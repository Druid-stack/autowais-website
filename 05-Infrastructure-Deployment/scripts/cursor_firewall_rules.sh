#!/bin/bash

echo "🔥 Creating macOS Firewall Rules for Cursor"
echo "==========================================="

# Create a script to add Cursor to firewall and block AWS domains
cat > /tmp/cursor_firewall_setup.sh << 'EOF'
#!/bin/bash

# Add Cursor to firewall
echo "Adding Cursor to macOS firewall..."
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/Cursor.app

# Create a hosts file entry to block AWS domains
echo "Creating hosts file entries to block AWS domains..."
sudo tee -a /etc/hosts > /dev/null << 'HOSTS_EOF'

# Block Cursor AWS connections
127.0.0.1 ec2-34-199-128-175.compute-1.amazonaws.com
127.0.0.1 ec2-107-21-149-187.compute-1.amazonaws.com
127.0.0.1 ec2-98-84-230-32.compute-1.amazonaws.com
127.0.0.1 ec2-107-22-7-225.compute-1.amazonaws.com
127.0.0.1 ec2-54-165-91-199.compute-1.amazonaws.com
127.0.0.1 ec2-52-202-250-142.compute-1.amazonaws.com
127.0.0.1 ec2-3-216-200-173.compute-1.amazonaws.com
127.0.0.1 ae2c518386054b8a3.awsglobalaccelerator.com
127.0.0.1 104.18.19.125
127.0.0.1 104.18.18.125
HOSTS_EOF

echo "✅ Firewall rules created"
echo "🔄 Flushing DNS cache..."
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

echo "✅ DNS cache flushed"
echo "🌐 AWS connections for Cursor should now be blocked"
EOF

chmod +x /tmp/cursor_firewall_setup.sh

echo "📝 Created firewall setup script: /tmp/cursor_firewall_setup.sh"
echo ""
echo "🔧 To apply the firewall rules, run:"
echo "   sudo /tmp/cursor_firewall_setup.sh"
echo ""
echo "⚠️  WARNING: This will:"
echo "   - Add Cursor to macOS firewall"
echo "   - Block specific AWS domains in hosts file"
echo "   - May break Cursor's AI features"
echo ""
echo "🔄 Alternative: Use Little Snitch (recommended)"
echo "   The Little Snitch rule is more flexible and can be easily disabled" 
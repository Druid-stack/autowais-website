#!/bin/bash

echo "🛡️  Blocking Cursor AWS Connections"
echo "=================================="

# Create Little Snitch rules directory if it doesn't exist
LITTLE_SNITCH_RULES_DIR="$HOME/Library/Application Support/Little Snitch/rules"
mkdir -p "$LITTLE_SNITCH_RULES_DIR"

# Create a rule file to block AWS connections for Cursor
cat > "$LITTLE_SNITCH_RULES_DIR/Block_Cursor_AWS.lsrules" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>rules</key>
    <array>
        <dict>
            <key>action</key>
            <string>deny</string>
            <key>process</key>
            <string>Cursor</string>
            <key>remote-hosts</key>
            <array>
                <string>*.amazonaws.com</string>
                <string>*.compute-1.amazonaws.com</string>
                <string>*.awsglobalaccelerator.com</string>
                <string>ec2-*.compute-1.amazonaws.com</string>
                <string>*.amazon.com</string>
            </array>
            <key>remote-ports</key>
            <array>
                <string>443</string>
                <string>80</string>
            </array>
            <key>rule-description</key>
            <string>Block Cursor AWS Connections</string>
        </dict>
    </array>
</dict>
</plist>
EOF

echo "✅ Created Little Snitch rule to block AWS connections"
echo "📁 Rule file: $LITTLE_SNITCH_RULES_DIR/Block_Cursor_AWS.lsrules"

# Create a script to restart Little Snitch and apply rules
cat > "$LITTLE_SNITCH_RULES_DIR/apply_cursor_rules.sh" << 'EOF'
#!/bin/bash
echo "🔄 Restarting Little Snitch to apply new rules..."
killall "Little Snitch" 2>/dev/null
sleep 2
open -a "Little Snitch"
echo "✅ Little Snitch restarted with new rules"
EOF

chmod +x "$LITTLE_SNITCH_RULES_DIR/apply_cursor_rules.sh"

echo ""
echo "🔧 Next Steps:"
echo "1. Open Little Snitch"
echo "2. Go to Rules → Import Rules"
echo "3. Select: $LITTLE_SNITCH_RULES_DIR/Block_Cursor_AWS.lsrules"
echo "4. Or run: $LITTLE_SNITCH_RULES_DIR/apply_cursor_rules.sh"
echo ""
echo "🌐 This will block Cursor from connecting to:"
echo "   - *.amazonaws.com"
echo "   - *.compute-1.amazonaws.com"
echo "   - *.awsglobalaccelerator.com"
echo "   - *.amazon.com"
echo ""
echo "⚠️  Note: This may break Cursor's AI features that rely on AWS services" 
# 🛡️ Cursor AWS Connection Blocking Guide

## 🎯 **OBJECTIVE**

Block Cursor from connecting to AWS services to prevent potential data leaks and code transmission.

## 📁 **CREATED FILES**

### **1. Little Snitch Rules (Recommended)**

- `block_cursor_aws.sh` - Creates Little Snitch rules
- Rule file: `~/Library/Application Support/Little Snitch/rules/Block_Cursor_AWS.lsrules`

### **2. macOS Firewall Rules**

- `cursor_firewall_rules.sh` - Creates firewall and hosts file rules
- Setup script: `/tmp/cursor_firewall_setup.sh`

### **3. Verification Tools**

- `verify_cursor_blocking.sh` - Checks if blocking is working

## 🚀 **QUICK START OPTIONS**

### **Option 1: Little Snitch (Recommended)**

```bash
# Already run - rule file created
# Now import the rule in Little Snitch:
# 1. Open Little Snitch
# 2. Go to Rules → Import Rules
# 3. Select: ~/Library/Application Support/Little Snitch/rules/Block_Cursor_AWS.lsrules
```

### **Option 2: macOS Firewall + Hosts File**

```bash
sudo /tmp/cursor_firewall_setup.sh
```

### **Option 3: Manual Hosts File Blocking**

```bash
sudo nano /etc/hosts
# Add these lines:
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
```

## 🔍 **VERIFICATION**

### **Check Current Connections**

```bash
lsof -i -P | grep -i cursor
```

### **Test Domain Blocking**

```bash
./verify_cursor_blocking.sh
```

### **Monitor in Real-time**

```bash
watch -n 2 'lsof -i -P | grep -i cursor'
```

## ⚠️ **IMPORTANT WARNINGS**

### **What This Will Break:**

- Cursor's AI code completion features
- Cursor's chat functionality
- Cursor's code analysis features
- Any other features that rely on AWS services

### **What Will Still Work:**

- Basic code editing
- File management
- Git integration
- Local extensions
- Terminal functionality

## 🔧 **TROUBLESHOOTING**

### **If Connections Persist:**

1. **Restart Cursor**

   ```bash
   killall Cursor
   open -a Cursor
   ```

2. **Flush DNS Cache**

   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

3. **Check Little Snitch Rules**
   - Open Little Snitch
   - Verify the rule is active
   - Check if Cursor is in the blocked list

4. **Verify Hosts File**
   ```bash
   cat /etc/hosts | grep amazonaws
   ```

### **To Re-enable AWS Connections:**

1. **Little Snitch**: Disable the rule in Little Snitch
2. **Hosts File**: Remove the blocking entries from `/etc/hosts`
3. **Firewall**: Remove Cursor from firewall rules

## 📊 **MONITORING**

### **Regular Checks:**

```bash
# Weekly security check
./security_monitor.sh

# Cursor-specific check
./cursor_security_check.sh

# AWS blocking verification
./verify_cursor_blocking.sh
```

### **Real-time Monitoring:**

- Use Little Snitch to monitor all Cursor connections
- Check Activity Monitor for Cursor processes
- Monitor network activity in Console.app

## 🎯 **RECOMMENDED APPROACH**

1. **Start with Little Snitch** (most flexible)
2. **Test Cursor functionality** after blocking
3. **Use hosts file blocking** as backup if needed
4. **Monitor regularly** for new connections
5. **Adjust rules** based on your needs

## 📞 **SUPPORT**

- **Little Snitch Support**: https://www.obdev.at/support/littlesnitch/
- **Cursor Support**: https://cursor.sh/support
- **macOS Firewall**: System Preferences → Security & Privacy → Firewall

---

**Status**: 🟡 READY - Choose your blocking method and apply
**Next Step**: Import Little Snitch rules or run firewall setup

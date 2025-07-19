# Quick LEMP Setup Guide for AUTOWAIS

## 🚀 Quick Start (5 minutes)

This guide will get your AUTOWAIS application running on a private LEMP environment quickly.

## Prerequisites

- Ubuntu 20.04+ server with sudo access
- Domain name (optional)
- SSH access to your server

## Step 1: Server Preparation

### Connect to your server and run these commands:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2
sudo npm install -g pm2

# Configure firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Step 2: Upload Your Application

### Option A: Using Git (Recommended)

```bash
cd /var/www
sudo git clone https://github.com/yourusername/autowais.git
sudo chown -R $USER:$USER autowais
cd autowais
```

### Option B: Using SCP/SFTP

```bash
# From your local machine
scp -r . user@your-server:/var/www/autowais
```

## Step 3: Quick Deployment

### Run the automated deployment script:

```bash
cd /var/www/autowais
./scripts/deploy.sh
```

This script will:

- ✅ Install all dependencies
- ✅ Build the frontend
- ✅ Configure environment files
- ✅ Setup PM2 process management
- ✅ Configure Nginx
- ✅ Setup SSL (optional)
- ✅ Configure monitoring and security

## Step 4: Verify Installation

```bash
# Check application status
pm2 status

# Check nginx status
sudo systemctl status nginx

# Check mongodb status
sudo systemctl status mongod

# View application logs
pm2 logs
```

## Step 5: Access Your Application

Your application will be available at:

- **HTTP**: http://your-server-ip
- **HTTPS**: https://yourdomain.com (if SSL configured)

## 🔧 Manual Configuration (if needed)

### Environment Files

**Backend (.env):**

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://localhost:27017/autowais
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://yourdomain.com
```

**Frontend (.env.local):**

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Manual PM2 Start

```bash
cd /var/www/autowais
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Manual Nginx Configuration

```bash
sudo cp nginx-autowais.conf /etc/nginx/sites-available/autowais
sudo ln -s /etc/nginx/sites-available/autowais /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 🛠️ Useful Commands

### Application Management

```bash
# View application status
pm2 status

# View logs
pm2 logs

# Restart applications
pm2 restart all

# Stop applications
pm2 stop all

# Monitor applications
pm2 monit
```

### System Management

```bash
# Check system resources
htop

# Check disk usage
df -h

# Check memory usage
free -h

# View nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Backup and Restore

```bash
# Create backup
./scripts/backup.sh

# Restore from backup
./scripts/restore.sh
```

## 🔒 Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key authentication enabled
- [ ] Fail2ban installed and configured
- [ ] SSL certificate installed
- [ ] Regular security updates enabled
- [ ] MongoDB authentication enabled (optional)

## 📊 Monitoring

### Setup automatic backups:

```bash
# Add to crontab for daily backups
crontab -e

# Add this line:
0 2 * * * /var/www/autowais/scripts/backup.sh
```

### Monitor system resources:

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# View real-time system stats
htop
```

## 🚨 Troubleshooting

### Common Issues:

1. **Port already in use:**

   ```bash
   sudo netstat -tulpn | grep :5001
   sudo netstat -tulpn | grep :3000
   ```

2. **Permission issues:**

   ```bash
   sudo chown -R $USER:$USER /var/www/autowais
   sudo chmod -R 755 /var/www/autowais
   ```

3. **MongoDB connection issues:**

   ```bash
   sudo systemctl status mongod
   sudo journalctl -u mongod -f
   ```

4. **Nginx configuration issues:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### Get Help:

- Check application logs: `pm2 logs`
- Check system logs: `sudo journalctl -f`
- Check nginx logs: `sudo tail -f /var/log/nginx/error.log`

## 🎯 Next Steps

1. **Configure your domain** to point to your server IP
2. **Setup SSL certificate** using Let's Encrypt
3. **Configure monitoring** and alerting
4. **Setup automated backups** to external storage
5. **Implement CI/CD** pipeline for updates

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the detailed `LEMP-DEPLOYMENT-GUIDE.md`
3. Check application and system logs
4. Verify all services are running

---

**Your AUTOWAIS application is now running on a private LEMP environment! 🎉**

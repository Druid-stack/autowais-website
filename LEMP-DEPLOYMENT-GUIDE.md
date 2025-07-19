# AUTOWAIS LEMP Deployment Guide

## Overview

This guide will help you deploy your AUTOWAIS application (Node.js backend + Next.js frontend) on a private LEMP (Linux, Nginx, MongoDB, Node.js) environment.

## Prerequisites

- Ubuntu 20.04+ or CentOS 8+ server
- Root or sudo access
- Domain name (optional but recommended)
- SSH access to your server

## Architecture

```
Internet → Nginx (Reverse Proxy) → Next.js Frontend (Port 3000)
                                → Node.js Backend (Port 5001)
                                → MongoDB (Port 27017)
```

## Step 1: Server Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Essential Packages

```bash
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

## Step 2: Install Node.js

### 2.1 Install Node.js 18+ (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2.2 Verify Installation

```bash
node --version
npm --version
```

## Step 3: Install MongoDB

### 3.1 Add MongoDB Repository

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

### 3.2 Install MongoDB

```bash
sudo apt update
sudo apt install -y mongodb-org
```

### 3.3 Start and Enable MongoDB

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

### 3.4 Secure MongoDB (Optional but Recommended)

```bash
sudo nano /etc/mongod.conf
```

Add/modify:

```yaml
security:
  authorization: enabled
```

## Step 4: Install Nginx

### 4.1 Install Nginx

```bash
sudo apt install -y nginx
```

### 4.2 Start and Enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4.3 Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Step 5: Application Deployment

### 5.1 Create Application Directory

```bash
sudo mkdir -p /var/www/autowais
sudo chown $USER:$USER /var/www/autowais
```

### 5.2 Clone/Upload Your Application

```bash
cd /var/www/autowais
# Upload your application files here
```

### 5.3 Install Dependencies

```bash
# Backend dependencies
npm install

# Frontend dependencies
cd autowais
npm install
```

### 5.4 Build Frontend

```bash
npm run build
```

## Step 6: Environment Configuration

### 6.1 Create Environment Files

```bash
# Backend .env
sudo nano /var/www/autowais/.env
```

Backend `.env` content:

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://localhost:27017/autowais
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://yourdomain.com
```

```bash
# Frontend .env.local
sudo nano /var/www/autowais/autowais/.env.local
```

Frontend `.env.local` content:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 7: Process Management with PM2

### 7.1 Install PM2

```bash
sudo npm install -g pm2
```

### 7.2 Create PM2 Configuration

```bash
sudo nano /var/www/autowais/ecosystem.config.js
```

PM2 configuration:

```javascript
module.exports = {
  apps: [
    {
      name: "autowais-backend",
      script: "server.js",
      cwd: "/var/www/autowais",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      error_file: "/var/log/autowais/backend-error.log",
      out_file: "/var/log/autowais/backend-out.log",
      log_file: "/var/log/autowais/backend-combined.log",
      time: true,
    },
    {
      name: "autowais-frontend",
      script: "npm",
      args: "start",
      cwd: "/var/www/autowais/autowais",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/var/log/autowais/frontend-error.log",
      out_file: "/var/log/autowais/frontend-out.log",
      log_file: "/var/log/autowais/frontend-combined.log",
      time: true,
    },
  ],
};
```

### 7.3 Create Log Directory

```bash
sudo mkdir -p /var/log/autowais
sudo chown $USER:$USER /var/log/autowais
```

### 7.4 Start Applications

```bash
cd /var/www/autowais
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 8: Nginx Configuration

### 8.1 Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/autowais
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS (uncomment after SSL setup)
    # return 301 https://$server_name$request_uri;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### 8.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/autowais /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 9: SSL Certificate (Optional but Recommended)

### 9.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 9.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Step 10: Monitoring and Maintenance

### 10.1 PM2 Monitoring

```bash
pm2 monit
pm2 logs
```

### 10.2 System Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Check system resources
htop
df -h
free -h
```

### 10.3 Log Rotation

```bash
sudo nano /etc/logrotate.d/autowais
```

Log rotation configuration:

```
/var/log/autowais/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Step 11: Backup Strategy

### 11.1 MongoDB Backup

```bash
# Create backup script
sudo nano /var/www/autowais/scripts/backup.sh
```

Backup script:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --out $BACKUP_DIR/autowais_$DATE

# Compress backup
tar -czf $BACKUP_DIR/autowais_$DATE.tar.gz -C $BACKUP_DIR autowais_$DATE
rm -rf $BACKUP_DIR/autowais_$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "autowais_*.tar.gz" -mtime +7 -delete
```

### 11.2 Application Backup

```bash
# Create application backup script
sudo nano /var/www/autowais/scripts/app-backup.sh
```

Application backup script:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/autowais"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup application files (excluding node_modules)
tar -czf $BACKUP_DIR/app_$DATE.tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    /var/www/autowais

# Keep only last 7 days of backups
find $BACKUP_DIR -name "app_*.tar.gz" -mtime +7 -delete
```

## Step 12: Security Hardening

### 12.1 Fail2ban Installation

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 12.2 Configure Fail2ban

```bash
sudo nano /etc/fail2ban/jail.local
```

Fail2ban configuration:

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   sudo netstat -tulpn | grep :5001
   sudo netstat -tulpn | grep :3000
   ```

2. **Permission Issues**

   ```bash
   sudo chown -R $USER:$USER /var/www/autowais
   sudo chmod -R 755 /var/www/autowais
   ```

3. **MongoDB Connection Issues**

   ```bash
   sudo systemctl status mongod
   sudo journalctl -u mongod -f
   ```

4. **Nginx Configuration Issues**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### Useful Commands

```bash
# Check application status
pm2 status
pm2 logs

# Restart applications
pm2 restart all

# Check system resources
htop
df -h
free -h

# Check logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/autowais/backend-error.log
```

## Maintenance Schedule

- **Daily**: Check application logs and system resources
- **Weekly**: Update system packages and security patches
- **Monthly**: Review and rotate logs, check backup integrity
- **Quarterly**: Security audit and performance optimization

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review application and system logs
3. Verify all services are running: `sudo systemctl status nginx mongod`
4. Check PM2 status: `pm2 status`

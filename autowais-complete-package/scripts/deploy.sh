#!/bin/bash

# AUTOWAIS LEMP Deployment Script
# This script automates the deployment of the AUTOWAIS application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="autowais"
APP_DIR="/var/www/$APP_NAME"
BACKUP_DIR="/var/backups/$APP_NAME"
LOG_DIR="/var/log/$APP_NAME"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root"
        exit 1
    fi
}

# Function to create directories
create_directories() {
    print_status "Creating necessary directories..."
    
    sudo mkdir -p $APP_DIR
    sudo mkdir -p $BACKUP_DIR
    sudo mkdir -p $LOG_DIR
    
    sudo chown $USER:$USER $APP_DIR
    sudo chown $USER:$USER $BACKUP_DIR
    sudo chown $USER:$USER $LOG_DIR
    
    print_success "Directories created successfully"
}

# Function to backup existing application
backup_existing() {
    if [ -d "$APP_DIR" ] && [ "$(ls -A $APP_DIR)" ]; then
        print_status "Backing up existing application..."
        
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
        
        tar -czf $BACKUP_FILE -C /var/www $APP_NAME --exclude='node_modules' --exclude='.next'
        
        print_success "Backup created: $BACKUP_FILE"
    fi
}

# Function to deploy application
deploy_application() {
    print_status "Deploying application..."
    
    # Copy application files
    cp -r . $APP_DIR/
    
    # Remove unnecessary files
    cd $APP_DIR
    rm -rf node_modules .next .git
    
    print_success "Application files deployed"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing backend dependencies..."
    cd $APP_DIR
    npm install --production
    
    print_status "Installing frontend dependencies..."
    cd $APP_DIR/autowais
    npm install --production
    
    print_success "Dependencies installed"
}

# Function to build frontend
build_frontend() {
    print_status "Building frontend..."
    cd $APP_DIR/autowais
    npm run build
    
    print_success "Frontend built successfully"
}

# Function to setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # Backend .env
    if [ ! -f "$APP_DIR/.env" ]; then
        cat > $APP_DIR/.env << EOF
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://localhost:27017/autowais
JWT_SECRET=$(openssl rand -base64 32)
FRONTEND_URL=https://yourdomain.com
EOF
        print_success "Backend .env created"
    fi
    
    # Frontend .env.local
    if [ ! -f "$APP_DIR/autowais/.env.local" ]; then
        cat > $APP_DIR/autowais/.env.local << EOF
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
EOF
        print_success "Frontend .env.local created"
    fi
}

# Function to setup PM2
setup_pm2() {
    print_status "Setting up PM2..."
    
    # Install PM2 globally if not installed
    if ! command -v pm2 &> /dev/null; then
        sudo npm install -g pm2
    fi
    
    # Copy ecosystem config
    cp ecosystem.config.js $APP_DIR/
    
    # Start applications
    cd $APP_DIR
    pm2 delete all 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    
    print_success "PM2 setup completed"
}

# Function to setup Nginx
setup_nginx() {
    print_status "Setting up Nginx..."
    
    # Copy nginx configuration
    sudo cp nginx-autowais.conf /etc/nginx/sites-available/$APP_NAME
    
    # Enable site
    sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
    
    # Remove default site
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test nginx configuration
    sudo nginx -t
    
    # Reload nginx
    sudo systemctl reload nginx
    
    print_success "Nginx setup completed"
}

# Function to setup SSL (optional)
setup_ssl() {
    read -p "Do you want to setup SSL with Let's Encrypt? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Setting up SSL..."
        
        # Install certbot
        sudo apt install -y certbot python3-certbot-nginx
        
        # Get domain name
        read -p "Enter your domain name: " DOMAIN_NAME
        
        # Obtain certificate
        sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos --email admin@$DOMAIN_NAME
        
        print_success "SSL setup completed"
    fi
}

# Function to setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring..."
    
    # Install monitoring tools
    sudo apt install -y htop iotop nethogs
    
    # Setup log rotation
    sudo tee /etc/logrotate.d/$APP_NAME > /dev/null << EOF
$LOG_DIR/*.log {
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
EOF
    
    print_success "Monitoring setup completed"
}

# Function to setup security
setup_security() {
    print_status "Setting up security..."
    
    # Install fail2ban
    sudo apt install -y fail2ban
    
    # Configure fail2ban
    sudo tee /etc/fail2ban/jail.local > /dev/null << EOF
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
EOF
    
    # Start fail2ban
    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban
    
    print_success "Security setup completed"
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Check if services are running
    if pm2 list | grep -q "autowais-backend.*online"; then
        print_success "Backend is running"
    else
        print_error "Backend is not running"
        return 1
    fi
    
    if pm2 list | grep -q "autowais-frontend.*online"; then
        print_success "Frontend is running"
    else
        print_error "Frontend is not running"
        return 1
    fi
    
    if sudo systemctl is-active --quiet nginx; then
        print_success "Nginx is running"
    else
        print_error "Nginx is not running"
        return 1
    fi
    
    if sudo systemctl is-active --quiet mongod; then
        print_success "MongoDB is running"
    else
        print_error "MongoDB is not running"
        return 1
    fi
    
    print_success "Deployment verification completed"
}

# Main deployment function
main() {
    print_status "Starting AUTOWAIS deployment..."
    
    check_root
    create_directories
    backup_existing
    deploy_application
    install_dependencies
    build_frontend
    setup_environment
    setup_pm2
    setup_nginx
    setup_ssl
    setup_monitoring
    setup_security
    verify_deployment
    
    print_success "Deployment completed successfully!"
    print_status "Your application should now be accessible at: https://yourdomain.com"
    print_status "Useful commands:"
    print_status "  - pm2 status (check application status)"
    print_status "  - pm2 logs (view application logs)"
    print_status "  - sudo systemctl status nginx (check nginx status)"
    print_status "  - sudo systemctl status mongod (check mongodb status)"
}

# Run main function
main "$@" 
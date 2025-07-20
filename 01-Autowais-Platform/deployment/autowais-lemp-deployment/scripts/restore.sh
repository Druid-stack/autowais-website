#!/bin/bash

# AUTOWAIS Restore Script
# This script restores the application from backups

set -e

# Configuration
APP_NAME="autowais"
BACKUP_DIR="/var/backups"
MONGODB_BACKUP_DIR="$BACKUP_DIR/mongodb"
APP_BACKUP_DIR="$BACKUP_DIR/$APP_NAME"
APP_DIR="/var/www/$APP_NAME"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Function to list available backups
list_backups() {
    print_status "Available MongoDB backups:"
    ls -la $MONGODB_BACKUP_DIR/autowais_*.tar.gz 2>/dev/null || echo "No MongoDB backups found"
    
    print_status "Available application backups:"
    ls -la $APP_BACKUP_DIR/app_*.tar.gz 2>/dev/null || echo "No application backups found"
}

# Function to select backup
select_backup() {
    print_status "Select backup to restore from:"
    list_backups
    
    read -p "Enter MongoDB backup filename (or press Enter for latest): " MONGODB_BACKUP
    read -p "Enter application backup filename (or press Enter for latest): " APP_BACKUP
    
    # Use latest if not specified
    if [ -z "$MONGODB_BACKUP" ]; then
        MONGODB_BACKUP=$(ls -t $MONGODB_BACKUP_DIR/autowais_*.tar.gz 2>/dev/null | head -1)
    fi
    
    if [ -z "$APP_BACKUP" ]; then
        APP_BACKUP=$(ls -t $APP_BACKUP_DIR/app_*.tar.gz 2>/dev/null | head -1)
    fi
    
    # Validate backup files
    if [ ! -f "$MONGODB_BACKUP" ]; then
        print_error "MongoDB backup not found: $MONGODB_BACKUP"
        exit 1
    fi
    
    if [ ! -f "$APP_BACKUP" ]; then
        print_error "Application backup not found: $APP_BACKUP"
        exit 1
    fi
    
    print_success "Selected backups:"
    print_status "MongoDB: $MONGODB_BACKUP"
    print_status "Application: $APP_BACKUP"
}

# Function to stop services
stop_services() {
    print_status "Stopping services..."
    
    # Stop PM2 processes
    pm2 stop all 2>/dev/null || true
    
    # Stop nginx
    sudo systemctl stop nginx
    
    print_success "Services stopped"
}

# Function to restore MongoDB
restore_mongodb() {
    print_status "Restoring MongoDB..."
    
    # Extract backup
    TEMP_DIR=$(mktemp -d)
    tar -xzf $MONGODB_BACKUP -C $TEMP_DIR
    
    # Find the extracted directory
    EXTRACTED_DIR=$(find $TEMP_DIR -name "autowais_*" -type d | head -1)
    
    if [ -z "$EXTRACTED_DIR" ]; then
        print_error "Could not find extracted MongoDB backup"
        rm -rf $TEMP_DIR
        exit 1
    fi
    
    # Restore MongoDB
    mongorestore --drop $EXTRACTED_DIR
    
    # Cleanup
    rm -rf $TEMP_DIR
    
    print_success "MongoDB restored successfully"
}

# Function to restore application
restore_application() {
    print_status "Restoring application..."
    
    # Backup current application if it exists
    if [ -d "$APP_DIR" ]; then
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        sudo mv $APP_DIR ${APP_DIR}_backup_$TIMESTAMP
        print_warning "Current application backed up to ${APP_DIR}_backup_$TIMESTAMP"
    fi
    
    # Create application directory
    sudo mkdir -p $APP_DIR
    sudo chown $USER:$USER $APP_DIR
    
    # Extract application backup
    tar -xzf $APP_BACKUP -C /var/www
    
    print_success "Application restored successfully"
}

# Function to restore environment files
restore_env_files() {
    print_status "Restoring environment files..."
    
    # Restore backend .env
    if [ -f "$APP_BACKUP_DIR/.env.backup" ]; then
        cp $APP_BACKUP_DIR/.env.backup $APP_DIR/.env
        print_success "Backend .env restored"
    else
        print_warning "Backend .env backup not found"
    fi
    
    # Restore frontend .env.local
    if [ -f "$APP_BACKUP_DIR/.env.local.backup" ]; then
        cp $APP_BACKUP_DIR/.env.local.backup $APP_DIR/autowais/.env.local
        print_success "Frontend .env.local restored"
    else
        print_warning "Frontend .env.local backup not found"
    fi
}

# Function to restore PM2 configuration
restore_pm2() {
    print_status "Restoring PM2 configuration..."
    
    # Find latest PM2 dump file
    PM2_DUMP=$(ls -t $APP_BACKUP_DIR/pm2_dump_*.json 2>/dev/null | head -1)
    
    if [ -n "$PM2_DUMP" ]; then
        cp $PM2_DUMP $HOME/.pm2/dump.pm2
        print_success "PM2 configuration restored"
    else
        print_warning "PM2 configuration backup not found"
    fi
}

# Function to restore Nginx configuration
restore_nginx() {
    print_status "Restoring Nginx configuration..."
    
    # Find latest nginx configuration backup
    NGINX_CONF=$(ls -t $APP_BACKUP_DIR/nginx_site_*.conf 2>/dev/null | head -1)
    
    if [ -n "$NGINX_CONF" ]; then
        sudo cp $NGINX_CONF /etc/nginx/sites-available/$APP_NAME
        print_success "Nginx configuration restored"
    else
        print_warning "Nginx configuration backup not found"
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install backend dependencies
    cd $APP_DIR
    npm install --production
    
    # Install frontend dependencies
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

# Function to start services
start_services() {
    print_status "Starting services..."
    
    # Start PM2 processes
    cd $APP_DIR
    pm2 start ecosystem.config.js
    pm2 save
    
    # Start nginx
    sudo systemctl start nginx
    
    print_success "Services started"
}

# Function to verify restoration
verify_restoration() {
    print_status "Verifying restoration..."
    
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
    
    print_success "Restoration verification completed"
}

# Function to create restoration report
create_restoration_report() {
    print_status "Creating restoration report..."
    
    REPORT_FILE="$APP_BACKUP_DIR/restore_report_$(date +%Y%m%d_%H%M%S).txt"
    
    cat > $REPORT_FILE << EOF
AUTOWAIS Restoration Report
==========================
Date: $(date)

Restoration Summary:
-------------------
- MongoDB backup used: $MONGODB_BACKUP
- Application backup used: $APP_BACKUP
- Environment files restored: $(if [ -f "$APP_DIR/.env" ]; then echo "Yes"; else echo "No"; fi)
- PM2 configuration restored: $(if [ -f "$HOME/.pm2/dump.pm2" ]; then echo "Yes"; else echo "No"; fi)
- Nginx configuration restored: $(if [ -f "/etc/nginx/sites-available/$APP_NAME" ]; then echo "Yes"; else echo "No"; fi)

Service Status:
--------------
$(pm2 list)

System Status:
-------------
$(sudo systemctl status nginx --no-pager -l)
$(sudo systemctl status mongod --no-pager -l)

EOF
    
    print_success "Restoration report created: $REPORT_FILE"
}

# Main restore function
main() {
    print_status "Starting AUTOWAIS restoration process..."
    
    # Check if running as root
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root"
        exit 1
    fi
    
    # Confirm restoration
    print_warning "This will overwrite the current application and database!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Restoration cancelled"
        exit 0
    fi
    
    select_backup
    stop_services
    restore_mongodb
    restore_application
    restore_env_files
    restore_pm2
    restore_nginx
    install_dependencies
    build_frontend
    start_services
    verify_restoration
    create_restoration_report
    
    print_success "Restoration process completed successfully!"
    print_status "Your application should now be accessible at: https://yourdomain.com"
}

# Run main function
main "$@" 
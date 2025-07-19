#!/bin/bash

# AUTOWAIS Backup Script
# This script creates backups of MongoDB data and application files

set -e

# Configuration
APP_NAME="autowais"
BACKUP_DIR="/var/backups"
MONGODB_BACKUP_DIR="$BACKUP_DIR/mongodb"
APP_BACKUP_DIR="$BACKUP_DIR/$APP_NAME"
APP_DIR="/var/www/$APP_NAME"
DATE=$(date +%Y%m%d_%H%M%S)

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

# Function to create backup directories
create_backup_dirs() {
    print_status "Creating backup directories..."
    
    mkdir -p $MONGODB_BACKUP_DIR
    mkdir -p $APP_BACKUP_DIR
    
    print_success "Backup directories created"
}

# Function to backup MongoDB
backup_mongodb() {
    print_status "Backing up MongoDB..."
    
    # Create MongoDB backup
    mongodump --out $MONGODB_BACKUP_DIR/autowais_$DATE
    
    # Compress backup
    tar -czf $MONGODB_BACKUP_DIR/autowais_$DATE.tar.gz -C $MONGODB_BACKUP_DIR autowais_$DATE
    
    # Remove uncompressed backup
    rm -rf $MONGODB_BACKUP_DIR/autowais_$DATE
    
    print_success "MongoDB backup created: autowais_$DATE.tar.gz"
}

# Function to backup application files
backup_application() {
    print_status "Backing up application files..."
    
    # Create application backup (excluding node_modules and .next)
    tar -czf $APP_BACKUP_DIR/app_$DATE.tar.gz \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='.git' \
        --exclude='*.log' \
        -C /var/www $APP_NAME
    
    print_success "Application backup created: app_$DATE.tar.gz"
}

# Function to backup environment files
backup_env_files() {
    print_status "Backing up environment files..."
    
    # Backup .env files
    if [ -f "$APP_DIR/.env" ]; then
        cp $APP_DIR/.env $APP_BACKUP_DIR/.env.backup
        print_success "Backend .env backed up"
    fi
    
    if [ -f "$APP_DIR/autowais/.env.local" ]; then
        cp $APP_DIR/autowais/.env.local $APP_BACKUP_DIR/.env.local.backup
        print_success "Frontend .env.local backed up"
    fi
}

# Function to backup PM2 configuration
backup_pm2() {
    print_status "Backing up PM2 configuration..."
    
    # Save PM2 process list
    pm2 save
    
    # Backup PM2 dump file
    if [ -f "$HOME/.pm2/dump.pm2" ]; then
        cp $HOME/.pm2/dump.pm2 $APP_BACKUP_DIR/pm2_dump_$DATE.json
        print_success "PM2 configuration backed up"
    fi
}

# Function to backup Nginx configuration
backup_nginx() {
    print_status "Backing up Nginx configuration..."
    
    # Backup nginx site configuration
    if [ -f "/etc/nginx/sites-available/$APP_NAME" ]; then
        cp /etc/nginx/sites-available/$APP_NAME $APP_BACKUP_DIR/nginx_site_$DATE.conf
        print_success "Nginx configuration backed up"
    fi
}

# Function to cleanup old backups
cleanup_old_backups() {
    print_status "Cleaning up old backups..."
    
    # Keep only last 7 days of backups
    find $MONGODB_BACKUP_DIR -name "autowais_*.tar.gz" -mtime +7 -delete
    find $APP_BACKUP_DIR -name "app_*.tar.gz" -mtime +7 -delete
    find $APP_BACKUP_DIR -name "pm2_dump_*.json" -mtime +7 -delete
    find $APP_BACKUP_DIR -name "nginx_site_*.conf" -mtime +7 -delete
    
    print_success "Old backups cleaned up"
}

# Function to create backup report
create_backup_report() {
    print_status "Creating backup report..."
    
    REPORT_FILE="$APP_BACKUP_DIR/backup_report_$DATE.txt"
    
    cat > $REPORT_FILE << EOF
AUTOWAIS Backup Report
=====================
Date: $(date)
Timestamp: $DATE

Backup Summary:
--------------
- MongoDB backup: autowais_$DATE.tar.gz
- Application backup: app_$DATE.tar.gz
- Environment files: .env.backup, .env.local.backup
- PM2 configuration: pm2_dump_$DATE.json
- Nginx configuration: nginx_site_$DATE.conf

Backup Locations:
----------------
- MongoDB backups: $MONGODB_BACKUP_DIR
- Application backups: $APP_BACKUP_DIR

Disk Usage:
----------
$(df -h $BACKUP_DIR)

Backup Sizes:
------------
$(ls -lh $MONGODB_BACKUP_DIR/autowais_$DATE.tar.gz 2>/dev/null || echo "MongoDB backup not found")
$(ls -lh $APP_BACKUP_DIR/app_$DATE.tar.gz 2>/dev/null || echo "Application backup not found")

EOF
    
    print_success "Backup report created: backup_report_$DATE.txt"
}

# Function to verify backups
verify_backups() {
    print_status "Verifying backups..."
    
    # Check if backup files exist
    if [ -f "$MONGODB_BACKUP_DIR/autowais_$DATE.tar.gz" ]; then
        print_success "MongoDB backup verified"
    else
        print_error "MongoDB backup not found"
        return 1
    fi
    
    if [ -f "$APP_BACKUP_DIR/app_$DATE.tar.gz" ]; then
        print_success "Application backup verified"
    else
        print_error "Application backup not found"
        return 1
    fi
    
    print_success "All backups verified successfully"
}

# Main backup function
main() {
    print_status "Starting AUTOWAIS backup process..."
    
    create_backup_dirs
    backup_mongodb
    backup_application
    backup_env_files
    backup_pm2
    backup_nginx
    cleanup_old_backups
    create_backup_report
    verify_backups
    
    print_success "Backup process completed successfully!"
    print_status "Backup location: $BACKUP_DIR"
    print_status "Backup timestamp: $DATE"
}

# Run main function
main "$@" 
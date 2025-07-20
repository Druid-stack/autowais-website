#!/bin/bash

# AUTOWAIS Database Setup Script
# This script sets up both MongoDB and PostgreSQL databases for the AUTOWAIS application

set -e

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

# Configuration
MONGODB_DB="autowais"
POSTGRES_DB="ai_content_system"
POSTGRES_USER="autowais_user"
POSTGRES_PASSWORD="autowais_password_2024"

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root"
        exit 1
    fi
}

# Function to setup MongoDB
setup_mongodb() {
    print_status "Setting up MongoDB..."
    
    # Check if MongoDB is running
    if ! systemctl is-active --quiet mongod; then
        print_error "MongoDB is not running. Please start MongoDB first."
        print_status "Run: sudo systemctl start mongod"
        exit 1
    fi
    
    # Create database and collections
    print_status "Creating MongoDB database and collections..."
    
    # Run MongoDB schema script
    if command -v mongosh &> /dev/null; then
        mongosh --eval "
            use $MONGODB_DB;
            $(cat mongodb-schema.sql)
        "
        print_success "MongoDB database setup completed"
    else
        print_warning "mongosh not found, using mongo shell..."
        mongo --eval "
            use $MONGODB_DB;
            $(cat mongodb-schema.sql)
        "
        print_success "MongoDB database setup completed"
    fi
}

# Function to setup PostgreSQL
setup_postgresql() {
    print_status "Setting up PostgreSQL..."
    
    # Check if PostgreSQL is running
    if ! systemctl is-active --quiet postgresql; then
        print_error "PostgreSQL is not running. Please start PostgreSQL first."
        print_status "Run: sudo systemctl start postgresql"
        exit 1
    fi
    
    # Create database and user
    print_status "Creating PostgreSQL database and user..."
    
    sudo -u postgres psql << EOF
        CREATE DATABASE $POSTGRES_DB;
        CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
        GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
        \c $POSTGRES_DB;
        GRANT ALL ON SCHEMA public TO $POSTGRES_USER;
        GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_USER;
        GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $POSTGRES_USER;
        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $POSTGRES_USER;
        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $POSTGRES_USER;
EOF
    
    # Run PostgreSQL schema script
    print_status "Running PostgreSQL schema script..."
    PGPASSWORD=$POSTGRES_PASSWORD psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -f setup-test-database.sql
    
    print_success "PostgreSQL database setup completed"
}

# Function to create database backup
create_backup() {
    print_status "Creating database backups..."
    
    # Create backup directory
    BACKUP_DIR="/var/backups/autowais/database"
    sudo mkdir -p $BACKUP_DIR
    sudo chown $USER:$USER $BACKUP_DIR
    
    # Backup MongoDB
    print_status "Backing up MongoDB..."
    mongodump --db $MONGODB_DB --out $BACKUP_DIR/mongodb_$(date +%Y%m%d_%H%M%S)
    
    # Backup PostgreSQL
    print_status "Backing up PostgreSQL..."
    PGPASSWORD=$POSTGRES_PASSWORD pg_dump -h localhost -U $POSTGRES_USER $POSTGRES_DB > $BACKUP_DIR/postgresql_$(date +%Y%m%d_%H%M%S).sql
    
    print_success "Database backups created in $BACKUP_DIR"
}

# Function to verify database setup
verify_setup() {
    print_status "Verifying database setup..."
    
    # Verify MongoDB
    if command -v mongosh &> /dev/null; then
        MONGODB_COUNT=$(mongosh --quiet --eval "use $MONGODB_DB; db.getCollectionNames().length")
        print_success "MongoDB collections: $MONGODB_COUNT"
    else
        MONGODB_COUNT=$(mongo --quiet --eval "use $MONGODB_DB; db.getCollectionNames().length")
        print_success "MongoDB collections: $MONGODB_COUNT"
    fi
    
    # Verify PostgreSQL
    PGPASSWORD=$POSTGRES_PASSWORD psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -c "
        SELECT 
            'content_topics' as table_name, COUNT(*) as count FROM content_topics
        UNION ALL
        SELECT 'posts', COUNT(*) FROM posts
        UNION ALL
        SELECT 'users', COUNT(*) FROM users
        UNION ALL
        SELECT 'content_performance', COUNT(*) FROM content_performance;
    " | tail -n +3 | while read line; do
        if [[ ! -z "$line" ]]; then
            print_success "PostgreSQL: $line"
        fi
    done
    
    print_success "Database verification completed"
}

# Function to create environment file
create_env_file() {
    print_status "Creating database environment file..."
    
    cat > database.env << EOF
# Database Configuration
# =====================

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/$MONGODB_DB
MONGODB_DB=$MONGODB_DB

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=$POSTGRES_DB
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_URI=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB

# Database URLs for different environments
# Development
DEV_MONGODB_URI=mongodb://localhost:27017/${MONGODB_DB}_dev
DEV_POSTGRES_URI=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/${POSTGRES_DB}_dev

# Production
PROD_MONGODB_URI=mongodb://localhost:27017/$MONGODB_DB
PROD_POSTGRES_URI=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB

# Test
TEST_MONGODB_URI=mongodb://localhost:27017/${MONGODB_DB}_test
TEST_POSTGRES_URI=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/${POSTGRES_DB}_test
EOF
    
    print_success "Database environment file created: database.env"
}

# Function to show usage
show_usage() {
    echo "AUTOWAIS Database Setup Script"
    echo "=============================="
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --mongodb-only     Setup only MongoDB"
    echo "  --postgresql-only  Setup only PostgreSQL"
    echo "  --backup           Create database backups"
    echo "  --verify           Verify database setup"
    echo "  --env-only         Create environment file only"
    echo "  --help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                 # Setup both databases"
    echo "  $0 --mongodb-only  # Setup only MongoDB"
    echo "  $0 --backup        # Create backups"
    echo "  $0 --verify        # Verify setup"
}

# Main function
main() {
    # Check if running as root
    check_root
    
    # Parse command line arguments
    MONGODB_ONLY=false
    POSTGRESQL_ONLY=false
    BACKUP_ONLY=false
    VERIFY_ONLY=false
    ENV_ONLY=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --mongodb-only)
                MONGODB_ONLY=true
                shift
                ;;
            --postgresql-only)
                POSTGRESQL_ONLY=true
                shift
                ;;
            --backup)
                BACKUP_ONLY=true
                shift
                ;;
            --verify)
                VERIFY_ONLY=true
                shift
                ;;
            --env-only)
                ENV_ONLY=true
                shift
                ;;
            --help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    print_status "Starting AUTOWAIS database setup..."
    
    if [ "$ENV_ONLY" = true ]; then
        create_env_file
        exit 0
    fi
    
    if [ "$BACKUP_ONLY" = true ]; then
        create_backup
        exit 0
    fi
    
    if [ "$VERIFY_ONLY" = true ]; then
        verify_setup
        exit 0
    fi
    
    if [ "$MONGODB_ONLY" = true ]; then
        setup_mongodb
    elif [ "$POSTGRESQL_ONLY" = true ]; then
        setup_postgresql
    else
        # Setup both databases
        setup_mongodb
        setup_postgresql
    fi
    
    create_env_file
    verify_setup
    
    print_success "Database setup completed successfully!"
    print_status "Environment file created: database.env"
    print_status "Use this file to configure your application's database connections."
}

# Run main function
main "$@" 
#!/bin/bash

# Yamaha TF3 + Smaart 9 Audio System Agent Quick Start Script
# This script automates the setup and launch process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if Node.js is installed
check_node_version() {
    if command -v node &> /dev/null; then
        local version=$(node --version)
        print_status "Node.js version: $version"
        return 0
    else
        print_error "Node.js is not installed. Please install Node.js 16+ first."
        return 1
    fi
}

# Function to check if npm is installed
check_npm_version() {
    if command -v npm &> /dev/null; then
        local version=$(npm --version)
        print_status "npm version: $version"
        return 0
    else
        print_error "npm is not installed. Please install npm first."
        return 1
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Function to create environment file
create_env_file() {
    if [ ! -f .env ]; then
        print_status "Creating .env file..."
        cat > .env << 'ENVEOF'
# Audio System Agent Configuration
NODE_ENV=development
TF3_BRIDGE_PORT=8080
SMAART9_BRIDGE_PORT=8081
LOG_LEVEL=info

# Smaart 9 Configuration
SMAART9_DATA_PATH=/Users/prashdcruz/Library/Application Support/Rational Acoustics/Smaart v9
SMAART9_SAMPLE_RATE=48000
SMAART9_FFT_SIZE=4096

# TF3 Configuration
TF3_BAUD_RATE=9600
TF3_FEEDBACK_THRESHOLD=-20
ENVEOF
        print_success ".env file created"
    else
        print_status ".env file already exists"
    fi
}

# Function to check USB ports
check_usb_ports() {
    print_status "Checking available USB ports..."
    if command -v lsusb &> /dev/null; then
        lsusb | grep -i yamaha || print_warning "No Yamaha devices found on USB"
    else
        print_warning "lsusb not available, cannot check USB ports"
    fi
}

# Function to start bridge services
start_bridges() {
    print_status "Starting bridge services..."
    
    # Start TF3 bridge
    if ! pgrep -f "tf3-usb-bridge.js" > /dev/null; then
        print_status "Starting TF3 USB Bridge..."
        nohup node tf3-usb-bridge.js > tf3-bridge.log 2>&1 &
        sleep 2
    else
        print_status "TF3 USB Bridge already running"
    fi
    
    # Start Smaart 9 bridge
    if ! pgrep -f "smaart9-bridge.js" > /dev/null; then
        print_status "Starting Smaart 9 Bridge..."
        nohup node smaart9-bridge.js > smaart9-bridge.log 2>&1 &
        sleep 2
    else
        print_status "Smaart 9 Bridge already running"
    fi
}

# Function to stop bridge services
stop_services() {
    print_status "Stopping bridge services..."
    pkill -f "tf3-usb-bridge.js" || true
    pkill -f "smaart9-bridge.js" || true
    sleep 2
}

# Function to check service status
check_services() {
    print_status "Checking service status..."
    
    if curl -s http://localhost:8080/health > /dev/null; then
        print_success "TF3 Bridge: Running on port 8080"
    else
        print_error "TF3 Bridge: Not responding on port 8080"
    fi
    
    if curl -s http://localhost:8081/health > /dev/null; then
        print_success "Smaart 9 Bridge: Running on port 8081"
    else
        print_error "Smaart 9 Bridge: Not responding on port 8081"
    fi
}

# Function to show status
show_status() {
    print_status "Audio System Agent Status:"
    echo
    
    # Check if services are running
    if pgrep -f "tf3-usb-bridge.js" > /dev/null; then
        print_success "TF3 USB Bridge: Running"
    else
        print_error "TF3 USB Bridge: Not running"
    fi
    
    if pgrep -f "smaart9-bridge.js" > /dev/null; then
        print_success "Smaart 9 Bridge: Running"
    else
        print_error "Smaart 9 Bridge: Not running"
    fi
    
    # Check Smaart Suite
    if pgrep -f "Smaart Suite" > /dev/null; then
        print_success "Smaart Suite: Running"
    else
        print_warning "Smaart Suite: Not running (start manually)"
    fi
    
    echo
    print_status "API Endpoints:"
    echo "  • TF3 Bridge: http://localhost:8080"
    echo "  • Smaart 9 Bridge: http://localhost:8081"
}

# Function to show logs
show_logs() {
    print_status "Recent logs:"
    echo
    if [ -f tf3-bridge.log ]; then
        echo "=== TF3 Bridge Log ==="
        tail -10 tf3-bridge.log
        echo
    fi
    if [ -f smaart9-bridge.log ]; then
        echo "=== Smaart 9 Bridge Log ==="
        tail -10 smaart9-bridge.log
        echo
    fi
}

# Function to show help
show_help() {
    echo "Yamaha TF3 + Smaart 9 Audio System Agent"
    echo
    echo "Usage: $0 [command]"
    echo
    echo "Commands:"
    echo "  setup     - Install dependencies and create config"
    echo "  start     - Start bridge services"
    echo "  stop      - Stop bridge services"
    echo "  status    - Show service status"
    echo "  logs      - Show recent logs"
    echo "  check     - Check system requirements"
    echo "  test      - Run integration test"
    echo "  help      - Show this help"
    echo
    echo "Examples:"
    echo "  $0 setup    # First time setup"
    echo "  $0 start    # Start services"
    echo "  $0 status   # Check status"
}

# Main script logic
case "${1:-help}" in
    setup)
        print_status "Setting up Audio System Agent..."
        check_node_version || exit 1
        check_npm_version || exit 1
        install_dependencies
        create_env_file
        check_usb_ports
        print_success "Setup complete! Run '$0 start' to start services."
        ;;
    start)
        print_status "Starting Audio System Agent..."
        start_bridges
        sleep 3
        check_services
        print_success "Services started! Import the n8n workflow to begin."
        ;;
    stop)
        stop_services
        print_success "Services stopped"
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    check)
        print_status "Checking system requirements..."
        check_node_version
        check_npm_version
        check_usb_ports
        ;;
    test)
        print_status "Running integration test..."
        node test-integration.js
        ;;
    help|*)
        show_help
        ;;
esac

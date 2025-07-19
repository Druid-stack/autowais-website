# Yamaha TF3 + Smaart 9 Audio System Agent

## 🎯 Overview

This agent provides intelligent coordination between Yamaha TF3 mixing console (connected via USB) and Rational Acoustics Smaart 9 measurement software for optimal audio system configuration and performance.

## ✨ Features

### 🎛️ Yamaha TF3 Integration (USB Connected)
- Direct USB serial communication
- Real-time parameter control
- Scene management and recall
- Meter monitoring and gain staging
- Feedback detection and prevention
- Automatic EQ optimization

### 📊 Smaart 9 Integration
- Real-time spectrum analysis
- Transfer function measurements
- Phase and coherence analysis
- Impulse response measurements
- Room acoustics analysis
- System alignment optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Smaart Suite running on your machine
- Yamaha TF3 console (optional for testing)

### Installation & Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd agent-workflows
   ```

2. **Run the quick setup**
   ```bash
   ./quick-start.sh setup
   ```

3. **Start the bridge services**
   ```bash
   ./quick-start.sh start
   ```

4. **Verify everything is working**
   ```bash
   ./quick-start.sh test
   ```

## 📋 Available Commands

```bash
./quick-start.sh setup    # Install dependencies and create config
./quick-start.sh start    # Start bridge services
./quick-start.sh stop     # Stop bridge services
./quick-start.sh status   # Show service status
./quick-start.sh logs     # Show recent logs
./quick-start.sh check    # Check system requirements
./quick-start.sh test     # Run integration test
./quick-start.sh help     # Show help
```

## 🔧 API Endpoints

### TF3 USB Bridge (Port 8080)
- `GET /health` - Health check
- `GET /tf3/status` - Get TF3 status
- `POST /tf3/connect` - Connect to TF3
- `POST /tf3/config` - Send configuration command
- `POST /tf3/control` - Control channel parameters
- `POST /tf3/scene` - Scene management
- `POST /tf3/apply_optimization` - Apply optimizations

### Smaart 9 Bridge (Port 8081)
- `GET /health` - Health check
- `GET /smaart9/status` - Get Smaart 9 status
- `POST /smaart9/connect` - Connect to Smaart 9
- `GET /smaart9/measurement` - Get measurement data
- `GET /smaart9/spectrum` - Get spectrum measurement
- `GET /smaart9/transfer` - Get transfer function
- `GET /smaart9/phase` - Get phase data
- `GET /smaart9/impulse` - Get impulse response
- `GET /smaart9/history` - Get measurement history
- `GET /smaart9/files` - List Smaart 9 files
- `POST /smaart9/config` - Update configuration

## 🎛️ n8n Integration

1. **Import the workflow**: Import `yamaha-tf3-smaart9-audio-agent.json` into your n8n instance
2. **Configure the agent**: The workflow includes an AI agent that can coordinate between TF3 and Smaart 9
3. **Start automation**: The agent can automatically optimize your audio system based on measurements

## 🔍 Current Status

✅ **Smaart Suite**: Detected and running on your machine  
✅ **Smaart 9 Bridge**: Running on port 8081  
✅ **TF3 USB Bridge**: Running on port 8080  
⏳ **TF3 Console**: Ready for USB connection  

## 📁 Project Structure

```
agent-workflows/
├── smaart9-bridge.js          # Smaart 9 integration bridge
├── tf3-usb-bridge.js          # TF3 USB serial bridge
├── test-integration.js        # Integration test script
├── quick-start.sh             # Management script
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🛠️ Troubleshooting

### Smaart Suite Not Detected
- Ensure Smaart Suite is running
- Check if it's installed in `/Applications/Smaart Suite.app/`

### TF3 Not Connecting
- Connect TF3 via USB
- Check USB permissions
- Verify the console is powered on

### Bridge Services Not Starting
- Check Node.js version: `node --version`
- Install dependencies: `npm install`
- Check logs: `./quick-start.sh logs`

## 📞 Support

For issues or questions:
1. Check the logs: `./quick-start.sh logs`
2. Run the test: `./quick-start.sh test`
3. Check status: `./quick-start.sh status`

## 🎉 Success!

Your audio system agent is now ready! The bridges are running and can communicate with both Smaart Suite and your TF3 console (when connected via USB).

Next steps:
1. Import the n8n workflow
2. Connect your TF3 console via USB
3. Start optimizing your audio system!

const express = require('express');
const SerialPort = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

class TF3USBBridge {
  constructor() {
    this.port = null;
    this.parser = null;
    this.isConnected = false;
    this.deviceInfo = null;
    this.currentScene = null;
    this.meterData = {};
    this.feedbackDetector = {
      enabled: true,
      threshold: -20, // dB
      frequencies: []
    };
  }

  async connect() {
    try {
      const ports = await SerialPort.list();
      console.log('Available USB ports:', ports.map(p => ({ path: p.path, manufacturer: p.manufacturer })));
      
      // Look for Yamaha TF3 device
      const tf3Port = ports.find(port => 
        port.manufacturer && port.manufacturer.toLowerCase().includes('yamaha') ||
        port.path.includes('usb') || port.path.includes('serial')
      );
      
      if (!tf3Port) {
        console.log('Yamaha TF3 not found on USB ports. Available ports:');
        ports.forEach(port => console.log(`  ${port.path} - ${port.manufacturer || 'Unknown'}`));
        return { success: false, error: 'Yamaha TF3 not found on USB ports' };
      }
      
      console.log(`Connecting to TF3 on port: ${tf3Port.path}`);
      
      this.port = new SerialPort({
        path: tf3Port.path,
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none'
      });
      
      this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
      
      this.port.on('open', () => {
        console.log('TF3 USB connection opened');
        this.isConnected = true;
        this.startMeterMonitoring();
      });
      
      this.port.on('error', (err) => {
        console.error('TF3 USB connection error:', err);
        this.isConnected = false;
      });
      
      this.port.on('close', () => {
        console.log('TF3 USB connection closed');
        this.isConnected = false;
      });
      
      this.parser.on('data', (data) => {
        this.handleTF3Response(data);
      });
      
      return { success: true, port: tf3Port.path };
      
    } catch (error) {
      console.error('Failed to connect to TF3:', error);
      return { success: false, error: error.message };
    }
  }

  async sendCommand(command, parameters = {}) {
    if (!this.isConnected) {
      throw new Error('TF3 not connected');
    }
    
    const formattedCommand = this.formatCommand(command, parameters);
    console.log(`Sending TF3 command: ${formattedCommand}`);
    
    return new Promise((resolve, reject) => {
      this.port.write(formattedCommand + '\r\n', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true, command: formattedCommand });
        }
      });
    });
  }

  formatCommand(command, parameters) {
    switch (command) {
      case 'get_status':
        return 'STATUS';
      case 'get_scene':
        return 'SCENE';
      case 'set_gain':
        return `GAIN ${parameters.channel} ${parameters.value}`;
      case 'set_eq':
        return `EQ ${parameters.channel} ${parameters.band} ${parameters.frequency} ${parameters.gain} ${parameters.q}`;
      case 'set_pan':
        return `PAN ${parameters.channel} ${parameters.value}`;
      case 'set_mute':
        return `MUTE ${parameters.channel} ${parameters.value ? 'ON' : 'OFF'}`;
      case 'set_fader':
        return `FADER ${parameters.channel} ${parameters.value}`;
      case 'recall_scene':
        return `RECALL ${parameters.scene}`;
      case 'store_scene':
        return `STORE ${parameters.scene}`;
      case 'get_meters':
        return 'METERS';
      default:
        return command;
    }
  }

  handleTF3Response(data) {
    console.log(`TF3 response: ${data}`);
    
    const parsed = this.parseTF3Response(data);
    if (parsed) {
      this.updateDeviceState(parsed);
    }
  }

  parseTF3Response(data) {
    const lines = data.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      if (line.startsWith('DEVICE:')) {
        return this.parseDeviceInfo(line);
      } else if (line.startsWith('SCENE:')) {
        return this.parseSceneInfo(line);
      } else if (line.startsWith('METER:')) {
        return this.parseMeterData(line);
      } else if (line.startsWith('STATUS:')) {
        return { type: 'status', data: line.substring(7).trim() };
      }
    }
    
    return null;
  }

  parseDeviceInfo(line) {
    const info = line.substring(7).trim();
    this.deviceInfo = info;
    return { type: 'device_info', data: info };
  }

  parseSceneInfo(line) {
    const scene = line.substring(6).trim();
    this.currentScene = scene;
    return { type: 'scene', data: scene };
  }

  parseMeterData(line) {
    const parts = line.substring(6).trim().split(' ');
    if (parts.length >= 3) {
      const channel = parseInt(parts[0]);
      const level = parseFloat(parts[1]);
      const peak = parseFloat(parts[2]);
      
      this.meterData[channel] = { level, peak, timestamp: Date.now() };
      
      // Check for feedback
      if (this.feedbackDetector.enabled && level > this.feedbackDetector.threshold) {
        this.checkForFeedback(channel, level);
      }
      
      return { type: 'meter', channel, level, peak };
    }
    return null;
  }

  startMeterMonitoring() {
    // Request meter data every 100ms
    setInterval(() => {
      if (this.isConnected) {
        this.sendCommand('get_meters').catch(err => {
          console.warn('Failed to get meters:', err.message);
        });
      }
    }, 100);
  }

  checkForFeedback(channel, level) {
    const frequency = this.estimateFrequency(level);
    this.feedbackDetector.frequencies.push({
      channel,
      frequency,
      level,
      timestamp: Date.now()
    });
    
    // Keep only recent feedback events
    const now = Date.now();
    this.feedbackDetector.frequencies = this.feedbackDetector.frequencies.filter(
      f => now - f.timestamp < 5000
    );
    
    console.log(`Potential feedback detected on channel ${channel}: ${frequency}Hz at ${level}dB`);
  }

  estimateFrequency(level) {
    // Simple frequency estimation based on level
    // In a real implementation, this would use FFT analysis
    const baseFreq = 1000;
    const levelFactor = Math.max(0, Math.min(1, (level + 60) / 60));
    return baseFreq * Math.pow(2, levelFactor * 4);
  }

  getStatus() {
    return {
      connected: this.isConnected,
      deviceInfo: this.deviceInfo,
      currentScene: this.currentScene,
      meterData: this.meterData,
      feedbackDetector: {
        enabled: this.feedbackDetector.enabled,
        threshold: this.feedbackDetector.threshold,
        recentEvents: this.feedbackDetector.frequencies.length
      }
    };
  }
}

const tf3Bridge = new TF3USBBridge();

// API Endpoints
app.get('/tf3/status', async (req, res) => {
  try {
    const status = tf3Bridge.getStatus();
    res.json({ source: 'tf3', ...status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tf3/connect', async (req, res) => {
  try {
    const result = await tf3Bridge.connect();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tf3/config', async (req, res) => {
  try {
    const { command, parameters } = req.body;
    const result = await tf3Bridge.sendCommand(command, parameters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tf3/control', async (req, res) => {
  try {
    const { channel, parameter, value } = req.body;
    const command = `set_${parameter}`;
    const parameters = { channel, value };
    const result = await tf3Bridge.sendCommand(command, parameters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tf3/scene', async (req, res) => {
  try {
    const { action, scene } = req.body;
    const command = action === 'recall' ? 'recall_scene' : 'store_scene';
    const parameters = { scene };
    const result = await tf3Bridge.sendCommand(command, parameters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tf3/apply_optimization', async (req, res) => {
  try {
    const { optimizations } = req.body;
    const results = [];
    
    for (const opt of optimizations) {
      const result = await tf3Bridge.sendCommand(opt.command, opt.parameters);
      results.push(result);
    }
    
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TF3 USB Bridge',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`TF3 USB Bridge running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /health - Health check');
  console.log('  GET  /tf3/status - Get TF3 status');
  console.log('  POST /tf3/connect - Connect to TF3');
  console.log('  POST /tf3/config - Send configuration command');
  console.log('  POST /tf3/control - Control channel parameters');
  console.log('  POST /tf3/scene - Scene management');
  console.log('  POST /tf3/apply_optimization - Apply optimizations');
});

module.exports = { TF3USBBridge, app };

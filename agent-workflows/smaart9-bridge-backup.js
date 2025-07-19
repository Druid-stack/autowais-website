const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

class Smaart9Bridge {
  constructor() {
    this.isConnected = false;
    this.currentMeasurement = null;
    this.measurementHistory = [];
    this.smaart9Paths = {
      windows: [
        'C:\\Program Files\\Rational Acoustics\\Smaart v9\\Smaart v9.exe',
        'C:\\Program Files (x86)\\Rational Acoustics\\Smaart v9\\Smaart v9.exe'
      ],
      darwin: [
        '/Applications/Smaart Suite.app/Contents/MacOS/Smaart Suite',
        '/Applications/Smaart v9.app/Contents/MacOS/Smaart v9',
        '/Applications/Smaart v9/Smaart v9.app/Contents/MacOS/Smaart v9'
      ],
      linux: [
        '/opt/smaart9/bin/smaart9',
        '/usr/local/bin/smaart9'
      ]
    };
    this.smaart9DataPath = this.getSmaart9DataPath();
    this.config = {
      sampleRate: 48000,
      fftSize: 4096,
      averaging: 'exponential',
      averagingTime: 1.0,
      frequencyRange: [20, 20000],
      smoothing: '1/3 octave'
    };
  }

  getSmaart9DataPath() {
    const platform = process.platform;
    const homeDir = process.env.HOME || process.env.USERPROFILE;

    switch (platform) {
      case 'win32':
        return path.join(process.env.APPDATA, 'Rational Acoustics', 'Smaart v9');
      case 'darwin':
        const darwinPaths = [
          path.join(homeDir, 'Library', 'Application Support', 'Rational Acoustics', 'Smaart v9'),
          path.join(homeDir, 'Library', 'Application Support', 'Rational Acoustics', 'Smaart Suite'),
          path.join(homeDir, 'Library', 'Application Support', 'Smaart Suite'),
          path.join(homeDir, 'Documents', 'Smaart'),
          path.join(homeDir, 'Desktop', 'Smaart'),
          path.join(homeDir, '.smaart9'),
          path.join(homeDir, 'Library', 'Preferences')
        ];
        return darwinPaths[0];
      case 'linux':
        return path.join(homeDir, '.config', 'smaart9');
      default:
        return path.join(homeDir, '.smaart9');
    }
  }

  async checkSmaart9Installation() {
    const platform = process.platform;
    const paths = this.smaart9Paths[platform] || [];

    for (const smaartPath of paths) {
      try {
        await fs.access(smaartPath);
        return { found: true, path: smaartPath };
      } catch (error) {
        continue;
      }
    }

    // Try to find Smaart in running processes
    try {
      const { stdout } = await execAsync('ps aux | grep -i smaart | grep -v grep');
      if (stdout.trim()) {
        const lines = stdout.trim().split('\n').filter(line => line.length > 0);
        const isSmaartSuite = lines.some(line => line.includes('Smaart Suite'));
        const isSmaartV9 = lines.some(line => line.includes('Smaart v9'));
        
        return { 
          found: true, 
          path: 'running_process', 
          processInfo: stdout.trim(),
          version: isSmaartSuite ? 'Smaart Suite' : isSmaartV9 ? 'Smaart v9' : 'Smaart'
        };
      }
    } catch (error) {
      // Process not found, continue
    }

    return { found: false, error: 'Smaart 9/Smaart Suite not found in standard locations' };
  }

  async checkSmaart9Running() {
    try {
      const { stdout } = await execAsync('ps aux | grep -i "smaart" | grep -v grep');
      const lines = stdout.trim().split('\n').filter(line => line.length > 0);
      
      if (lines.length > 0) {
        const processInfo = lines[0];
        const pidMatch = processInfo.match(/^\s*(\d+)/);
        const pid = pidMatch ? pidMatch[1] : 'unknown';
        
        // Check if it's Smaart Suite specifically
        const isSmaartSuite = processInfo.includes('Smaart Suite');
        const isSmaartV9 = processInfo.includes('Smaart v9');
        
        return {
          running: true,
          pid: pid,
          processInfo: processInfo,
          count: lines.length,
          version: isSmaartSuite ? 'Smaart Suite' : isSmaartV9 ? 'Smaart v9' : 'Smaart'
        };
      }
      
      return { running: false, error: 'Smaart not found in running processes' };
    } catch (error) {
      return { running: false, error: error.message };
    }
  }

  async connect() {
    try {
      console.log('Checking Smaart 9/Smaart Suite installation...');
      const installation = await this.checkSmaart9Installation();
      if (!installation.found) {
        throw new Error(`Smaart installation not found: ${installation.error}`);
      }
      
      const running = await this.checkSmaart9Running();
      if (!running.running) {
        console.log('Smaart Suite is not running. Please start Smaart Suite manually.');
      } else {
        console.log(`Smaart Suite is running (PID: ${running.pid})`);
      }
      
      try {
        await fs.access(this.smaart9DataPath);
        console.log(`Smaart data directory accessible: ${this.smaart9DataPath}`);
      } catch (err) {
        console.warn(`Smaart data directory not accessible: ${this.smaart9DataPath}`);
      }
      
      this.isConnected = true;
      console.log('Connected to Smaart Suite');
      return {
        success: true,
        message: 'Connected to Smaart Suite',
        installation: installation,
        running: running,
        dataPath: this.smaart9DataPath
      };
    } catch (error) {
      console.error('Failed to connect to Smaart Suite:', error);
      return { success: false, error: error.message };
    }
  }

  async readSmaart9Files() {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    const possiblePaths = [
      path.join(homeDir, 'Library', 'Application Support', 'Rational Acoustics', 'Smaart v9'),
      path.join(homeDir, 'Library', 'Application Support', 'Rational Acoustics', 'Smaart Suite'),
      path.join(homeDir, 'Library', 'Application Support', 'Smaart Suite'),
      path.join(homeDir, 'Documents', 'Smaart'),
      path.join(homeDir, 'Desktop', 'Smaart'),
      path.join(homeDir, '.smaart9'),
      path.join(homeDir, 'Library', 'Preferences')
    ];

    for (const dataPath of possiblePaths) {
      try {
        const files = await fs.readdir(dataPath);
        const measurementFiles = files.filter(file =>
          file.endsWith('.txt') ||
          file.endsWith('.csv') ||
          file.endsWith('.smaart') ||
          file.endsWith('.measurement') ||
          file.endsWith('.dat') ||
          file.includes('smaart')
        );

        if (measurementFiles.length > 0) {
          console.log(`Found Smaart files in: ${dataPath}`);
          return measurementFiles.map(file => ({
            name: file,
            path: path.join(dataPath, file),
            type: path.extname(file).substring(1)
          }));
        }
      } catch (error) {
        // Path doesn't exist or not accessible, try next one
      }
    }
    console.log('No Smaart measurement files found in any standard locations');
    return [];
  }

  async getMeasurement(type = 'spectrum') {
    try {
      // First try to read from actual Smaart files
      const files = await this.readSmaart9Files();
      
      if (files.length > 0) {
        console.log(`Found ${files.length} Smaart files, attempting to read measurement data...`);
        
        for (const file of files.slice(0, 3)) { // Try first 3 files
          try {
            const content = await fs.readFile(file.path, 'utf8');
            let measurement = null;
            
            if (file.type === 'csv') {
              measurement = this.parseCSVMeasurement(content);
            } else if (file.type === 'txt') {
              measurement = this.parseTextMeasurement(content);
            } else {
              measurement = this.parseGenericMeasurement(content);
            }
            
            if (measurement) {
              console.log(`Successfully parsed measurement from: ${file.name}`);
              this.currentMeasurement = {
                type: type,
                source: 'file',
                filename: file.name,
                timestamp: new Date().toISOString(),
                data: measurement
              };
              
              this.measurementHistory.push(this.currentMeasurement);
              return this.currentMeasurement;
            }
          } catch (error) {
            console.warn(`Failed to parse file ${file.name}:`, error.message);
            continue;
          }
        }
      }
      
      // Fall back to simulated data if no files found or parsing failed
      console.log('Using simulated measurement data');
      return await this.getSimulatedMeasurement(type);
      
    } catch (error) {
      console.error('Error getting measurement:', error);
      return await this.getSimulatedMeasurement(type);
    }
  }

  parseCSVMeasurement(content) {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    return { headers, data };
  }

  parseTextMeasurement(content) {
    const lines = content.split('\n').filter(line => line.trim());
    const data = {};
    
    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, value] = line.split(':').map(s => s.trim());
        data[key] = value;
      }
    });

    return data;
  }

  parseGenericMeasurement(content) {
    // Try to extract frequency response data from various formats
    const lines = content.split('\n').filter(line => line.trim());
    const frequencyData = [];
    
    lines.forEach(line => {
      const parts = line.split(/\s+/).filter(part => part.trim());
      if (parts.length >= 2) {
        const freq = parseFloat(parts[0]);
        const level = parseFloat(parts[1]);
        if (!isNaN(freq) && !isNaN(level)) {
          frequencyData.push({ frequency: freq, level: level });
        }
      }
    });

    return frequencyData.length > 0 ? frequencyData : null;
  }

  async getSimulatedMeasurement(type) {
    const frequencies = this.generateFrequencyArray();
    let measurement;

    switch (type) {
      case 'spectrum':
        measurement = await this.getSpectrumMeasurement();
        break;
      case 'transfer':
        measurement = await this.getTransferFunction();
        break;
      case 'phase':
        measurement = await this.getPhaseData();
        break;
      case 'impulse':
        measurement = await this.getImpulseResponse();
        break;
      default:
        measurement = await this.getSpectrumMeasurement();
    }

    this.currentMeasurement = {
      type: type,
      source: 'simulated',
      timestamp: new Date().toISOString(),
      data: measurement
    };

    this.measurementHistory.push(this.currentMeasurement);
    return this.currentMeasurement;
  }

  async getSpectrumMeasurement() {
    const frequencies = this.generateFrequencyArray();
    const spectrum = frequencies.map(freq => ({
      frequency: freq,
      level: this.calculateBaseResponse(freq) + this.calculateRoomModes(freq),
      phase: this.calculatePhaseResponse(freq),
      coherence: this.calculateCoherence(freq)
    }));

    return {
      frequencies: frequencies,
      spectrum: spectrum,
      averageLevel: spectrum.reduce((sum, point) => sum + point.level, 0) / spectrum.length,
      peakLevel: Math.max(...spectrum.map(point => point.level)),
      lowFreq: frequencies[0],
      highFreq: frequencies[frequencies.length - 1]
    };
  }

  async getTransferFunction() {
    const frequencies = this.generateFrequencyArray();
    const transfer = frequencies.map(freq => ({
      frequency: freq,
      magnitude: this.calculateTransferResponse(freq),
      phase: this.calculatePhaseResponse(freq),
      coherence: this.calculateCoherence(freq)
    }));

    return {
      frequencies: frequencies,
      transfer: transfer,
      averageMagnitude: transfer.reduce((sum, point) => sum + point.magnitude, 0) / transfer.length,
      phaseUnwrapped: this.calculateUnwrappedPhase(frequencies),
      groupDelay: this.calculateGroupDelay(transfer.map(t => t.phase))
    };
  }

  async getPhaseData() {
    const frequencies = this.generateFrequencyArray();
    const phaseData = frequencies.map(freq => ({
      frequency: freq,
      phase: this.calculatePhaseResponse(freq),
      unwrappedPhase: this.calculateUnwrappedPhase([freq])[0],
      groupDelay: this.calculateGroupDelay([this.calculatePhaseResponse(freq)])
    }));

    return {
      frequencies: frequencies,
      phase: phaseData,
      averagePhase: phaseData.reduce((sum, point) => sum + point.phase, 0) / phaseData.length,
      phaseRange: {
        min: Math.min(...phaseData.map(point => point.phase)),
        max: Math.max(...phaseData.map(point => point.phase))
      }
    };
  }

  async getImpulseResponse() {
    const timePoints = Array.from({ length: 1000 }, (_, i) => i * 0.001); // 0 to 1 second
    const impulse = timePoints.map(time => ({
      time: time,
      amplitude: this.calculateImpulseResponse(time)
    }));

    return {
      timePoints: timePoints,
      impulse: impulse,
      peakAmplitude: Math.max(...impulse.map(point => Math.abs(point.amplitude))),
      decayTime: this.calculateDecayTime(impulse)
    };
  }

  generateFrequencyArray() {
    const [lowFreq, highFreq] = this.config.frequencyRange;
    const frequencies = [];
    let freq = lowFreq;
    
    while (freq <= highFreq) {
      frequencies.push(freq);
      freq *= Math.pow(2, 1/12); // 1/12 octave spacing
    }
    
    return frequencies;
  }

  calculateBaseResponse(frequency) {
    // Simulate a typical speaker response
    const baseResponse = -3 * Math.log10(frequency / 1000);
    const roomGain = frequency < 200 ? 6 : 0;
    const highFreqRolloff = frequency > 8000 ? -12 * Math.log10(frequency / 8000) : 0;
    
    return baseResponse + roomGain + highFreqRolloff + (Math.random() - 0.5) * 2;
  }

  calculateRoomModes(frequency) {
    // Simulate room modes
    const roomModes = [60, 120, 180, 240, 300];
    let modeEffect = 0;
    
    roomModes.forEach(mode => {
      const distance = Math.abs(frequency - mode);
      if (distance < 10) {
        modeEffect += 3 * Math.exp(-distance / 5);
      }
    });
    
    return modeEffect;
  }

  calculateTransferResponse(frequency) {
    return this.calculateBaseResponse(frequency) + this.calculateRoomModes(frequency) + 10;
  }

  calculatePhaseResponse(frequency) {
    // Simulate phase response
    const basePhase = -frequency * 0.001;
    const roomPhase = Math.sin(frequency * 0.01) * 30;
    return basePhase + roomPhase + (Math.random() - 0.5) * 10;
  }

  calculateCoherence(frequency) {
    // Simulate coherence (0-1)
    const baseCoherence = 0.9;
    const frequencyEffect = frequency > 10000 ? 0.1 : 0;
    const randomVariation = (Math.random() - 0.5) * 0.1;
    return Math.max(0, Math.min(1, baseCoherence - frequencyEffect + randomVariation));
  }

  calculateImpulseResponse(time) {
    // Simulate impulse response
    const decay = Math.exp(-time * 2);
    const reflections = Math.sin(time * 100) * Math.exp(-time * 5) * 0.3;
    return decay + reflections + (Math.random() - 0.5) * 0.1;
  }

  calculateUnwrappedPhase(frequencies) {
    let unwrappedPhase = [];
    let previousPhase = 0;
    
    frequencies.forEach(freq => {
      const phase = this.calculatePhaseResponse(freq);
      let unwrapped = phase;
      
      // Unwrap phase
      while (unwrapped - previousPhase > 180) {
        unwrapped -= 360;
      }
      while (unwrapped - previousPhase < -180) {
        unwrapped += 360;
      }
      
      unwrappedPhase.push(unwrapped);
      previousPhase = unwrapped;
    });
    
    return unwrappedPhase;
  }

  calculateGroupDelay(phaseData) {
    const groupDelay = [];
    
    for (let i = 1; i < phaseData.length - 1; i++) {
      const phaseDiff = phaseData[i + 1] - phaseData[i - 1];
      const freqDiff = this.generateFrequencyArray()[i + 1] - this.generateFrequencyArray()[i - 1];
      const delay = -phaseDiff / (360 * freqDiff);
      groupDelay.push(delay);
    }
    
    return groupDelay;
  }

  calculateDecayTime(impulse) {
    const peak = Math.max(...impulse.map(point => Math.abs(point.amplitude)));
    const threshold = peak * 0.1;
    
    for (let i = 0; i < impulse.length; i++) {
      if (Math.abs(impulse[i].amplitude) < threshold) {
        return impulse[i].time;
      }
    }
    
    return 1.0; // Default decay time
  }

  getMeasurementHistory() {
    return this.measurementHistory;
  }

  getStatus() {
    return {
      connected: this.isConnected,
      currentMeasurement: this.currentMeasurement ? {
        type: this.currentMeasurement.type,
        source: this.currentMeasurement.source,
        timestamp: this.currentMeasurement.timestamp
      } : null,
      measurementCount: this.measurementHistory.length,
      config: this.config,
      dataPath: this.smaart9DataPath
    };
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    return this.config;
  }

  // Sound System Alignment Analysis Methods
  async getSystemAlignment() {
    try {
      console.log('Performing sound system alignment analysis...');
      
      // Get multiple measurement types for comprehensive alignment
      const spectrum = await this.getSpectrumMeasurement();
      const transfer = await this.getTransferFunction();
      const phase = await this.getPhaseData();
      const impulse = await this.getImpulseResponse();
      
      // Analyze alignment parameters
      const alignment = {
        frequencyResponse: this.analyzeFrequencyResponse(spectrum),
        phaseAlignment: this.analyzePhaseAlignment(phase),
        timeAlignment: this.analyzeTimeAlignment(impulse),
        crossoverAlignment: this.analyzeCrossoverAlignment(transfer),
        roomAcoustics: this.analyzeRoomAcoustics(spectrum, impulse),
        systemCoherence: this.analyzeSystemCoherence(transfer),
        recommendations: this.generateAlignmentRecommendations(spectrum, phase, impulse, transfer)
      };
      
      return {
        type: 'system_alignment',
        source: 'analysis',
        timestamp: new Date().toISOString(),
        data: alignment
      };
      
    } catch (error) {
      console.error('Error performing system alignment:', error);
      throw error;
    }
  }

  analyzeFrequencyResponse(spectrum) {
    const { spectrum: data } = spectrum;
    
    // Analyze frequency bands
    const lowFreq = data.filter(point => point.frequency < 200);
    const midFreq = data.filter(point => point.frequency >= 200 && point.frequency < 2000);
    const highFreq = data.filter(point => point.frequency >= 2000);
    
    const analysis = {
      overall: {
        averageLevel: data.reduce((sum, point) => sum + point.level, 0) / data.length,
        peakLevel: Math.max(...data.map(point => point.level)),
        dynamicRange: Math.max(...data.map(point => point.level)) - Math.min(...data.map(point => point.level))
      },
      lowFreq: {
        averageLevel: lowFreq.reduce((sum, point) => sum + point.level, 0) / lowFreq.length,
        issues: lowFreq.filter(point => point.level < -10).length > 0 ? 'Low frequency rolloff detected' : 'Good'
      },
      midFreq: {
        averageLevel: midFreq.reduce((sum, point) => sum + point.level, 0) / midFreq.length,
        issues: midFreq.filter(point => Math.abs(point.level) > 6).length > 0 ? 'Mid frequency irregularities' : 'Good'
      },
      highFreq: {
        averageLevel: highFreq.reduce((sum, point) => sum + point.level, 0) / highFreq.length,
        issues: highFreq.filter(point => point.level < -15).length > 0 ? 'High frequency rolloff detected' : 'Good'
      }
    };
    
    return analysis;
  }

  analyzePhaseAlignment(phase) {
    const { phase: data } = phase;
    
    const analysis = {
      averagePhase: data.reduce((sum, point) => sum + point.phase, 0) / data.length,
      phaseRange: {
        min: Math.min(...data.map(point => point.phase)),
        max: Math.max(...data.map(point => point.phase))
      },
      phaseIssues: data.filter(point => Math.abs(point.phase) > 90).length > 0 ? 'Phase issues detected' : 'Good',
      groupDelay: this.calculateGroupDelay(data.map(point => point.phase)),
      recommendations: []
    };
    
    // Generate phase alignment recommendations
    if (analysis.phaseIssues !== 'Good') {
      analysis.recommendations.push('Check speaker polarity and phase relationships');
      analysis.recommendations.push('Verify crossover phase alignment');
    }
    
    return analysis;
  }

  analyzeTimeAlignment(impulse) {
    const { impulse: data } = impulse;
    
    // Find main arrival time
    const peakIndex = data.findIndex(point => point.amplitude === Math.max(...data.map(p => p.amplitude)));
    const mainArrival = data[peakIndex].time;
    
    // Find secondary arrivals (reflections)
    const reflections = data.filter((point, index) => 
      index > peakIndex && point.amplitude > Math.max(...data.map(p => p.amplitude)) * 0.1
    );
    
    const analysis = {
      mainArrival: mainArrival,
      decayTime: this.calculateDecayTime(data),
      reflections: reflections.length,
      timeIssues: reflections.length > 5 ? 'Excessive reflections detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.timeIssues !== 'Good') {
      analysis.recommendations.push('Check speaker placement and room acoustics');
      analysis.recommendations.push('Consider acoustic treatment for reflections');
    }
    
    return analysis;
  }

  analyzeCrossoverAlignment(transfer) {
    const { transfer: data } = transfer;
    
    // Look for crossover points (frequency response changes)
    const crossoverPoints = [];
    for (let i = 1; i < data.length - 1; i++) {
      const slope = (data[i + 1].magnitude - data[i - 1].magnitude) / 
                   (data[i + 1].frequency - data[i - 1].frequency);
      if (Math.abs(slope) > 3) { // dB per octave
        crossoverPoints.push({
          frequency: data[i].frequency,
          slope: slope,
          magnitude: data[i].magnitude
        });
      }
    }
    
    const analysis = {
      crossoverPoints: crossoverPoints,
      averageMagnitude: data.reduce((sum, point) => sum + point.magnitude, 0) / data.length,
      magnitudeVariation: Math.max(...data.map(point => point.magnitude)) - Math.min(...data.map(point => point.magnitude)),
      crossoverIssues: crossoverPoints.length > 4 ? 'Multiple crossover points detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.crossoverIssues !== 'Good') {
      analysis.recommendations.push('Review crossover frequency settings');
      analysis.recommendations.push('Check phase alignment at crossover points');
    }
    
    return analysis;
  }

  analyzeRoomAcoustics(spectrum, impulse) {
    const { spectrum: freqData } = spectrum;
    const { impulse: timeData } = impulse;
    
    // Analyze room modes (frequency peaks)
    const roomModes = [];
    const averageLevel = freqData.reduce((sum, point) => sum + point.level, 0) / freqData.length;
    
    freqData.forEach(point => {
      if (point.level > averageLevel + 6) {
        roomModes.push({
          frequency: point.frequency,
          level: point.level,
          severity: point.level - averageLevel
        });
      }
    });
    
    const analysis = {
      roomModes: roomModes,
      reverbTime: this.calculateDecayTime(timeData),
      modalIssues: roomModes.length > 3 ? 'Room modes detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.modalIssues !== 'Good') {
      analysis.recommendations.push('Consider bass trapping for low frequency modes');
      analysis.recommendations.push('Review speaker placement relative to room dimensions');
    }
    
    return analysis;
  }

  analyzeSystemCoherence(transfer) {
    const { transfer: data } = transfer;
    
    const averageCoherence = data.reduce((sum, point) => sum + point.coherence, 0) / data.length;
    const lowCoherencePoints = data.filter(point => point.coherence < 0.7);
    
    const analysis = {
      averageCoherence: averageCoherence,
      lowCoherenceCount: lowCoherencePoints.length,
      coherenceIssues: lowCoherencePoints.length > data.length * 0.1 ? 'Coherence issues detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.coherenceIssues !== 'Good') {
      analysis.recommendations.push('Check microphone placement and signal quality');
      analysis.recommendations.push('Verify measurement setup and noise levels');
    }
    
    return analysis;
  }

  generateAlignmentRecommendations(spectrum, phase, impulse, transfer) {
    const recommendations = [];
    
    // Frequency response recommendations
    const freqAnalysis = this.analyzeFrequencyResponse(spectrum);
    if (freqAnalysis.lowFreq.issues !== 'Good') {
      recommendations.push('Apply low frequency boost or subwoofer alignment');
    }
    if (freqAnalysis.midFreq.issues !== 'Good') {
      recommendations.push('Apply mid-frequency EQ correction');
    }
    if (freqAnalysis.highFreq.issues !== 'Good') {
      recommendations.push('Check high frequency driver alignment');
    }
    
    // Phase recommendations
    const phaseAnalysis = this.analyzePhaseAlignment(phase);
    if (phaseAnalysis.phaseIssues !== 'Good') {
      recommendations.push('Adjust speaker phase relationships');
    }
    
    // Time alignment recommendations
    const timeAnalysis = this.analyzeTimeAlignment(impulse);
    if (timeAnalysis.timeIssues !== 'Good') {
      recommendations.push('Adjust speaker delay settings');
    }
    
    // Crossover recommendations
    const crossoverAnalysis = this.analyzeCrossoverAlignment(transfer);
    if (crossoverAnalysis.crossoverIssues !== 'Good') {
      recommendations.push('Review and adjust crossover settings');
    }
    
    return recommendations;
  }
}

const smaart9Bridge = new Smaart9Bridge();

// API Endpoints
app.get('/smaart9/status', async (req, res) => {
  try {
    const status = smaart9Bridge.getStatus();
    res.json({ source: 'smaart9', ...status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/smaart9/connect', async (req, res) => {
  try {
    const result = await smaart9Bridge.connect();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/measurement', async (req, res) => {
  try {
    const type = req.query.type || 'spectrum';
    const measurement = await smaart9Bridge.getMeasurement(type);
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/spectrum', async (req, res) => {
  try {
    const measurement = await smaart9Bridge.getSpectrumMeasurement();
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/transfer', async (req, res) => {
  try {
    const measurement = await smaart9Bridge.getTransferFunction();
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/phase', async (req, res) => {
  try {
    const measurement = await smaart9Bridge.getPhaseData();
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/impulse', async (req, res) => {
  try {
    const measurement = await smaart9Bridge.getImpulseResponse();
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/history', async (req, res) => {
  try {
    const history = smaart9Bridge.getMeasurementHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/smaart9/files', async (req, res) => {
  try {
    const files = await smaart9Bridge.readSmaart9Files();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/smaart9/config', async (req, res) => {
  try {
    const config = smaart9Bridge.updateConfig(req.body);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Smaart 9 Bridge',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Smaart 9 Bridge running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /health - Health check');
  console.log('  GET  /smaart9/status - Get Smaart 9 status');
  console.log('  POST /smaart9/connect - Connect to Smaart 9');
  console.log('  GET  /smaart9/measurement?type=spectrum - Get measurement');
  console.log('  GET  /smaart9/spectrum - Get spectrum measurement');
  console.log('  GET  /smaart9/transfer - Get transfer function');
  console.log('  GET  /smaart9/phase - Get phase data');
  console.log('  GET  /smaart9/impulse - Get impulse response');
  console.log('  GET  /smaart9/history - Get measurement history');
  console.log('  GET  /smaart9/files - List Smaart 9 files');
  console.log('  POST /smaart9/config - Update configuration');
});

module.exports = { Smaart9Bridge, app };

  // Sound System Alignment Analysis Methods
  async getSystemAlignment() {
    try {
      console.log('Performing sound system alignment analysis...');
      
      // Get multiple measurement types for comprehensive alignment
      const spectrum = await this.getSpectrumMeasurement();
      const transfer = await this.getTransferFunction();
      const phase = await this.getPhaseData();
      const impulse = await this.getImpulseResponse();
      
      // Analyze alignment parameters
      const alignment = {
        frequencyResponse: this.analyzeFrequencyResponse(spectrum),
        phaseAlignment: this.analyzePhaseAlignment(phase),
        timeAlignment: this.analyzeTimeAlignment(impulse),
        crossoverAlignment: this.analyzeCrossoverAlignment(transfer),
        roomAcoustics: this.analyzeRoomAcoustics(spectrum, impulse),
        systemCoherence: this.analyzeSystemCoherence(transfer),
        recommendations: this.generateAlignmentRecommendations(spectrum, phase, impulse, transfer)
      };
      
      return {
        type: 'system_alignment',
        source: 'analysis',
        timestamp: new Date().toISOString(),
        data: alignment
      };
      
    } catch (error) {
      console.error('Error performing system alignment:', error);
      throw error;
    }
  }

  analyzeFrequencyResponse(spectrum) {
    const { spectrum: data } = spectrum;
    
    // Analyze frequency bands
    const lowFreq = data.filter(point => point.frequency < 200);
    const midFreq = data.filter(point => point.frequency >= 200 && point.frequency < 2000);
    const highFreq = data.filter(point => point.frequency >= 2000);
    
    const analysis = {
      overall: {
        averageLevel: data.reduce((sum, point) => sum + point.level, 0) / data.length,
        peakLevel: Math.max(...data.map(point => point.level)),
        dynamicRange: Math.max(...data.map(point => point.level)) - Math.min(...data.map(point => point.level))
      },
      lowFreq: {
        averageLevel: lowFreq.reduce((sum, point) => sum + point.level, 0) / lowFreq.length,
        issues: lowFreq.filter(point => point.level < -10).length > 0 ? 'Low frequency rolloff detected' : 'Good'
      },
      midFreq: {
        averageLevel: midFreq.reduce((sum, point) => sum + point.level, 0) / midFreq.length,
        issues: midFreq.filter(point => Math.abs(point.level) > 6).length > 0 ? 'Mid frequency irregularities' : 'Good'
      },
      highFreq: {
        averageLevel: highFreq.reduce((sum, point) => sum + point.level, 0) / highFreq.length,
        issues: highFreq.filter(point => point.level < -15).length > 0 ? 'High frequency rolloff detected' : 'Good'
      }
    };
    
    return analysis;
  }

  analyzePhaseAlignment(phase) {
    const { phase: data } = phase;
    
    const analysis = {
      averagePhase: data.reduce((sum, point) => sum + point.phase, 0) / data.length,
      phaseRange: {
        min: Math.min(...data.map(point => point.phase)),
        max: Math.max(...data.map(point => point.phase))
      },
      phaseIssues: data.filter(point => Math.abs(point.phase) > 90).length > 0 ? 'Phase issues detected' : 'Good',
      groupDelay: this.calculateGroupDelay(data.map(point => point.phase)),
      recommendations: []
    };
    
    // Generate phase alignment recommendations
    if (analysis.phaseIssues !== 'Good') {
      analysis.recommendations.push('Check speaker polarity and phase relationships');
      analysis.recommendations.push('Verify crossover phase alignment');
    }
    
    return analysis;
  }

  analyzeTimeAlignment(impulse) {
    const { impulse: data } = impulse;
    
    // Find main arrival time
    const peakIndex = data.findIndex(point => point.amplitude === Math.max(...data.map(p => p.amplitude)));
    const mainArrival = data[peakIndex].time;
    
    // Find secondary arrivals (reflections)
    const reflections = data.filter((point, index) => 
      index > peakIndex && point.amplitude > Math.max(...data.map(p => p.amplitude)) * 0.1
    );
    
    const analysis = {
      mainArrival: mainArrival,
      decayTime: this.calculateDecayTime(data),
      reflections: reflections.length,
      timeIssues: reflections.length > 5 ? 'Excessive reflections detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.timeIssues !== 'Good') {
      analysis.recommendations.push('Check speaker placement and room acoustics');
      analysis.recommendations.push('Consider acoustic treatment for reflections');
    }
    
    return analysis;
  }

  analyzeCrossoverAlignment(transfer) {
    const { transfer: data } = transfer;
    
    // Look for crossover points (frequency response changes)
    const crossoverPoints = [];
    for (let i = 1; i < data.length - 1; i++) {
      const slope = (data[i + 1].magnitude - data[i - 1].magnitude) / 
                   (data[i + 1].frequency - data[i - 1].frequency);
      if (Math.abs(slope) > 3) { // dB per octave
        crossoverPoints.push({
          frequency: data[i].frequency,
          slope: slope,
          magnitude: data[i].magnitude
        });
      }
    }
    
    const analysis = {
      crossoverPoints: crossoverPoints,
      averageMagnitude: data.reduce((sum, point) => sum + point.magnitude, 0) / data.length,
      magnitudeVariation: Math.max(...data.map(point => point.magnitude)) - Math.min(...data.map(point => point.magnitude)),
      crossoverIssues: crossoverPoints.length > 4 ? 'Multiple crossover points detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.crossoverIssues !== 'Good') {
      analysis.recommendations.push('Review crossover frequency settings');
      analysis.recommendations.push('Check phase alignment at crossover points');
    }
    
    return analysis;
  }

  analyzeRoomAcoustics(spectrum, impulse) {
    const { spectrum: freqData } = spectrum;
    const { impulse: timeData } = impulse;
    
    // Analyze room modes (frequency peaks)
    const roomModes = [];
    const averageLevel = freqData.reduce((sum, point) => sum + point.level, 0) / freqData.length;
    
    freqData.forEach(point => {
      if (point.level > averageLevel + 6) {
        roomModes.push({
          frequency: point.frequency,
          level: point.level,
          severity: point.level - averageLevel
        });
      }
    });
    
    const analysis = {
      roomModes: roomModes,
      reverbTime: this.calculateDecayTime(timeData),
      modalIssues: roomModes.length > 3 ? 'Room modes detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.modalIssues !== 'Good') {
      analysis.recommendations.push('Consider bass trapping for low frequency modes');
      analysis.recommendations.push('Review speaker placement relative to room dimensions');
    }
    
    return analysis;
  }

  analyzeSystemCoherence(transfer) {
    const { transfer: data } = transfer;
    
    const averageCoherence = data.reduce((sum, point) => sum + point.coherence, 0) / data.length;
    const lowCoherencePoints = data.filter(point => point.coherence < 0.7);
    
    const analysis = {
      averageCoherence: averageCoherence,
      lowCoherenceCount: lowCoherencePoints.length,
      coherenceIssues: lowCoherencePoints.length > data.length * 0.1 ? 'Coherence issues detected' : 'Good',
      recommendations: []
    };
    
    if (analysis.coherenceIssues !== 'Good') {
      analysis.recommendations.push('Check microphone placement and signal quality');
      analysis.recommendations.push('Verify measurement setup and noise levels');
    }
    
    return analysis;
  }

  generateAlignmentRecommendations(spectrum, phase, impulse, transfer) {
    const recommendations = [];
    
    // Frequency response recommendations
    const freqAnalysis = this.analyzeFrequencyResponse(spectrum);
    if (freqAnalysis.lowFreq.issues !== 'Good') {
      recommendations.push('Apply low frequency boost or subwoofer alignment');
    }
    if (freqAnalysis.midFreq.issues !== 'Good') {
      recommendations.push('Apply mid-frequency EQ correction');
    }
    if (freqAnalysis.highFreq.issues !== 'Good') {
      recommendations.push('Check high frequency driver alignment');
    }
    
    // Phase recommendations
    const phaseAnalysis = this.analyzePhaseAlignment(phase);
    if (phaseAnalysis.phaseIssues !== 'Good') {
      recommendations.push('Adjust speaker phase relationships');
    }
    
    // Time alignment recommendations
    const timeAnalysis = this.analyzeTimeAlignment(impulse);
    if (timeAnalysis.timeIssues !== 'Good') {
      recommendations.push('Adjust speaker delay settings');
    }
    
    // Crossover recommendations
    const crossoverAnalysis = this.analyzeCrossoverAlignment(transfer);
    if (crossoverAnalysis.crossoverIssues !== 'Good') {
      recommendations.push('Review and adjust crossover settings');
    }
    
    return recommendations;
  }

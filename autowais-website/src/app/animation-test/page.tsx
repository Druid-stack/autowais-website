'use client';

import { useState, useEffect } from 'react';

export default function AnimationTest() {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev + 1) % 100);
    }, 50);

    const blinkInterval = setInterval(() => {
      setVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', padding: '50px' }}>
      <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '50px' }}>
        AUTOWAIS Animation Test
      </h1>
      
      {/* JavaScript controlled animation - should always work */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '20px' }}>
          JavaScript Animation (Should Always Work):
        </h2>
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#ff0000',
            transform: `translateX(${position * 5}px)`,
            transition: 'none'
          }}
        />
      </div>

      {/* Blinking element */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '20px' }}>
          JavaScript Blinking (Should Always Work):
        </h2>
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: visible ? '#00ff00' : 'transparent',
            border: '2px solid #00ff00'
          }}
        />
      </div>
      
      {/* CSS Animations with !important */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '20px' }}>
          CSS Animations (May be blocked by settings):
        </h2>
        <div className="test-spin" />
        <div className="test-bounce" />
        <div className="test-pulse" />
      </div>

      <style jsx>{`
        .test-spin {
          width: 50px;
          height: 50px;
          background-color: #0000ff;
          margin: 10px;
          animation: spin 2s linear infinite !important;
        }
        
        .test-bounce {
          width: 50px;
          height: 50px;
          background-color: #ffff00;
          margin: 10px;
          animation: bounce 1s ease-in-out infinite !important;
        }
        
        .test-pulse {
          width: 50px;
          height: 50px;
          background-color: #ff00ff;
          margin: 10px;
          animation: pulse 1s ease-in-out infinite !important;
        }

        @keyframes spin {
          from { transform: rotate(0deg) !important; }
          to { transform: rotate(360deg) !important; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) !important; }
          40% { transform: translateY(-30px) !important; }
          60% { transform: translateY(-15px) !important; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1 !important; transform: scale(1) !important; }
          50% { opacity: 0.5 !important; transform: scale(1.2) !important; }
        }
        
        /* Force animations regardless of user preferences */
        @media (prefers-reduced-motion: reduce) {
          .test-spin, .test-bounce, .test-pulse {
            animation-duration: 2s !important;
            animation-iteration-count: infinite !important;
          }
        }
      `}</style>

      <div style={{ color: 'white', marginTop: '50px' }}>
        <h3>What you should see:</h3>
        <ul style={{ color: '#ccc' }}>
          <li>Red box moving left to right (JavaScript)</li>
          <li>Green box blinking on/off (JavaScript)</li>
          <li>Blue box spinning (CSS)</li>
          <li>Yellow box bouncing (CSS)</li>
          <li>Purple box pulsing (CSS)</li>
        </ul>
        <p style={{ marginTop: '20px', color: '#ff0000' }}>
          If only the first two work, your system has animations disabled.
        </p>
      </div>
    </div>
  );
} 
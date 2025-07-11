'use client';

export default function TestAnimation() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl mb-8">Animation Test</h1>
        
        {/* CSS Animation Test */}
        <div 
          className="w-20 h-20 bg-red-500 mx-auto mb-8"
          style={{
            animation: 'spin 2s linear infinite'
          }}
        ></div>
        
        {/* Tailwind Animation Test */}
        <div className="w-20 h-20 bg-blue-500 mx-auto mb-8 animate-bounce"></div>
        
        {/* Custom Animation Test */}
        <div 
          className="w-20 h-20 bg-green-500 mx-auto"
          style={{
            animation: 'customPulse 1s ease-in-out infinite'
          }}
        ></div>
      </div>
      
      <style jsx>{`
        @keyframes customPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
} 
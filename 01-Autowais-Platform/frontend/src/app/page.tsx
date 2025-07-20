'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [floatPosition1, setFloatPosition1] = useState({ x: 0, y: 0, rotation: 0 });
  const [floatPosition2, setFloatPosition2] = useState({ x: 0, y: 0, rotation: 0 });
  const [floatPosition3, setFloatPosition3] = useState({ x: 0, y: 0, rotation: 0 });
  const [scanPosition, setScanPosition] = useState(-100);
  const [pulseScale, setPulseScale] = useState(1);
  const [bounceY, setBounceY] = useState(0);

  useEffect(() => {
    // Floating orbs animation
    const floatInterval = setInterval(() => {
      const time = Date.now() * 0.001;
      
      setFloatPosition1({
        x: Math.sin(time * 0.5) * 30,
        y: Math.cos(time * 0.7) * 20,
        rotation: time * 10
      });
      
      setFloatPosition2({
        x: Math.sin(time * 0.6 + 2) * 25,
        y: Math.cos(time * 0.8 + 2) * 15,
        rotation: time * 15
      });
      
      setFloatPosition3({
        x: Math.sin(time * 0.4 + 4) * 35,
        y: Math.cos(time * 0.6 + 4) * 25,
        rotation: time * 8
      });
    }, 50);

    // Scanning line animation
    const scanInterval = setInterval(() => {
      setScanPosition(prev => {
        if (prev >= 100) return -100;
        return prev + 2;
      });
    }, 20);

    // Pulse animation
    const pulseInterval = setInterval(() => {
      const time = Date.now() * 0.003;
      setPulseScale(1 + Math.sin(time) * 0.3);
    }, 50);

    // Bounce animation
    const bounceInterval = setInterval(() => {
      const time = Date.now() * 0.004;
      setBounceY(Math.abs(Math.sin(time)) * -15);
    }, 50);

    return () => {
      clearInterval(floatInterval);
      clearInterval(scanInterval);
      clearInterval(pulseInterval);
      clearInterval(bounceInterval);
    };
  }, []);

  return (
    <main className="pt-20">
      {/* Hero Section with JavaScript Animations */}
      <section 
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #065f46 50%, #0f172a 100%)',
          backgroundSize: '400% 400%'
        }}
      >
        {/* Animated Background Elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(4, 120, 87, 0.05) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px, 600px 600px, 800px 800px',
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%'
          }}
        ></div>
        
        {/* JavaScript Animated Floating Orbs */}
        <div 
          className="floating-orb absolute w-64 h-64 rounded-full opacity-40 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            top: '10%',
            left: '10%',
            transform: `translate(${floatPosition1.x}px, ${floatPosition1.y}px) rotate(${floatPosition1.rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="floating-orb absolute w-48 h-48 rounded-full opacity-30 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #059669, #047857)',
            top: '60%',
            right: '20%',
            transform: `translate(${floatPosition2.x}px, ${floatPosition2.y}px) rotate(${floatPosition2.rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="floating-orb absolute w-56 h-56 rounded-full opacity-35 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #065f46, #10b981)',
            bottom: '20%',
            left: '60%',
            transform: `translate(${floatPosition3.x}px, ${floatPosition3.y}px) rotate(${floatPosition3.rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        

        
        {/* JavaScript Animated Scanning Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-1 opacity-80"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.8), transparent)',
              top: '20%',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
              transform: `translateX(${scanPosition}%)`,
              transition: 'transform 0.02s linear'
            }}
          ></div>
          <div 
            className="absolute w-full h-1 opacity-80"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.8), transparent)',
              bottom: '20%',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
              transform: `translateX(${scanPosition + 50}%)`,
              transition: 'transform 0.02s linear'
            }}
          ></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your Complete Technology 
              <span 
                className="block text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(to right, #34d399, #10b981, #14b8a6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Solutions Partner
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-emerald-100 max-w-3xl mx-auto">
              AUTOWAIS transforms businesses through innovative technology solutions. We tackle any challenge, 
              from complex integrations to cutting-edge innovations, delivering results that drive real growth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md px-6 py-3 text-sm font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                style={{
                  background: 'linear-gradient(to right, #059669, #10b981)',
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)',
                  transform: `translateY(${bounceY * 0.5}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                Let's Discuss Your Needs
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-emerald-100 hover:text-white transition-colors group"
              >
                Explore Possibilities <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </div>
            
            {/* JavaScript Animated Test Elements */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-6 h-6 bg-red-400 rounded-full animate-spin"></div>
              <div 
                className="w-6 h-6 bg-yellow-400 rounded-full"
                style={{
                  transform: `scale(${pulseScale})`,
                  transition: 'transform 0.1s ease-out'
                }}
              ></div>
              <div 
                className="w-6 h-6 bg-purple-400 rounded-full"
                style={{
                  transform: `rotate(${floatPosition1.rotation}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue with rest of sections using CSS animations for backgrounds since they're less critical */}
      {/* Metrics Section with Geometric Background */}
      <section 
        className="py-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f9fafb 0%, #ecfdf5 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(5, 150, 105, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(5, 150, 105, 0.1) 75%)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}
        ></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div 
                  className="rounded-2xl p-8 text-center backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Projects Delivered</dt>
                  <dd 
                    className="order-first text-3xl font-semibold tracking-tight text-transparent bg-clip-text"
                    style={{
                      background: 'linear-gradient(to right, #059669, #10b981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    500+
                  </dd>
                  <p className="mt-2 text-sm text-gray-500">Successful technology solutions across industries</p>
                </div>
                <div 
                  className="rounded-2xl p-8 text-center backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Client Satisfaction</dt>
                  <dd 
                    className="order-first text-3xl font-semibold tracking-tight text-transparent bg-clip-text"
                    style={{
                      background: 'linear-gradient(to right, #10b981, #14b8a6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    99%
                  </dd>
                  <p className="mt-2 text-sm text-gray-500">Exceeding expectations with every project</p>
                </div>
                <div 
                  className="rounded-2xl p-8 text-center backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Years Experience</dt>
                  <dd 
                    className="order-first text-3xl font-semibold tracking-tight text-transparent bg-clip-text"
                    style={{
                      background: 'linear-gradient(to right, #14b8a6, #059669)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    10+
                  </dd>
                  <p className="mt-2 text-sm text-gray-500">Deep expertise in emerging technologies</p>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Section with Circuit Background */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 40% 60%, rgba(4, 120, 87, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 120px 120px',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        ></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Every Challenge is An Opportunity
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We don't believe in one-size-fits-all solutions. Every business is unique, and so are its technology needs. 
              Our approach starts with understanding your specific challenges and crafting the perfect solution.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Discovery & Strategy */}
              <div 
                className="rounded-2xl p-8 group transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: 'linear-gradient(to right, #10b981, #059669)'
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Discovery & Strategy</h3>
                </div>
                <p className="text-gray-600 mb-6">Understanding your business to design the right solution</p>
                <p className="text-gray-600 mb-6">
                  We start with deep discovery sessions to understand your business processes, challenges, and goals. 
                  No technical jargon—just clear conversations about what you need to succeed.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Comprehensive business analysis
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Technology opportunity assessment
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Custom solution roadmap development
                  </li>
                </ul>
              </div>

              {/* Build & Deliver */}
              <div 
                className="rounded-2xl p-8 group transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: 'linear-gradient(to right, #059669, #14b8a6)'
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Build & Deliver</h3>
                </div>
                <p className="text-gray-600 mb-6">From concept to reality with seamless execution</p>
                <p className="text-gray-600 mb-6">
                  Our experienced team brings your vision to life using the latest technologies and best practices. 
                  We handle everything from development to deployment and ongoing support.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Agile development methodology
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Rigorous testing and quality assurance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Ongoing support and optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Solutions Section with Dark Green Background */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(-45deg, #10b981, #059669, #047857, #065f46)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(-45deg, #10b981, #059669, #047857, #065f46)',
            backgroundSize: '400% 400%'
          }}
        ></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technology That Transforms Business
            </h2>
            <p className="mt-6 text-lg leading-8 text-emerald-100">
              We work across the full spectrum of modern technology, from cloud infrastructure to cutting-edge AI, 
              always choosing the right tools for your specific needs.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Custom Development */}
              <div className="relative group">
                <div 
                  className="absolute -inset-0.5 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"
                  style={{
                    background: 'linear-gradient(to right, #059669, #10b981)'
                  }}
                ></div>
                <div className="relative bg-white rounded-2xl p-8">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(to right, #10b981, #059669)'
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Development</h3>
                  <p className="text-gray-600">
                    From web applications to mobile apps, enterprise software to APIs—we build exactly what your business 
                    needs using the latest technologies and frameworks.
                  </p>
                </div>
              </div>

              {/* Process Automation */}
              <div className="relative group">
                <div 
                  className="absolute -inset-0.5 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"
                  style={{
                    background: 'linear-gradient(to right, #10b981, #14b8a6)'
                  }}
                ></div>
                <div className="relative bg-white rounded-2xl p-8">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(to right, #059669, #14b8a6)'
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Process Automation</h3>
                  <p className="text-gray-600">
                    Streamline your operations with intelligent automation solutions that reduce manual work, 
                    eliminate errors, and free your team for strategic initiatives.
                  </p>
                </div>
              </div>

              {/* System Integration */}
              <div className="relative group">
                <div 
                  className="absolute -inset-0.5 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"
                  style={{
                    background: 'linear-gradient(to right, #14b8a6, #059669)'
                  }}
                ></div>
                <div className="relative bg-white rounded-2xl p-8">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(to right, #14b8a6, #10b981)'
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">System Integration</h3>
                  <p className="text-gray-600">
                    Connect your existing systems and data sources into a unified, efficient workflow that grows 
                    with your business and adapts to changing needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                style={{
                  background: 'linear-gradient(to right, #059669, #10b981)',
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)'
                }}
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AUTOWAIS */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f9fafb 0%, #ecfdf5 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(4, 120, 87, 0.05) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px, 600px 600px, 800px 800px'
          }}
        ></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose AUTOWAIS
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're not just another technology vendor. We're your strategic partner in navigating the complex world 
              of modern technology, ensuring every solution we build drives real value for your business.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div 
                className="rounded-2xl p-8 group transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: 'linear-gradient(to right, #10b981, #059669)'
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Results-Focused Approach</h3>
                <p className="text-gray-600">
                  Every project starts with clear goals and measurable outcomes. We don't just build technology—we deliver business value.
                </p>
              </div>

              <div 
                className="rounded-2xl p-8 group transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: 'linear-gradient(to right, #059669, #14b8a6)'
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Challenge Too Complex</h3>
                <p className="text-gray-600">
                  From simple integrations to complex enterprise solutions, we thrive on solving the problems others can't handle.
                </p>
              </div>

              <div 
                className="rounded-2xl p-8 group transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: 'linear-gradient(to right, #14b8a6, #10b981)'
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Long-Term Partnership</h3>
                <p className="text-gray-600">
                  We build relationships, not just software. Our ongoing support ensures your technology grows with your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Your data security and regulatory compliance are our top priorities. We maintain the highest industry standards to protect your business.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            <div className="flex flex-col items-center group">
              <div className="bg-white rounded-xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <img 
                  src="/images/compliance/soc2-logo.png" 
                  alt="SOC 2 Type II Compliant" 
                  className="h-16 w-auto"
                  
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mt-3">SOC 2 Type II</h3>
              <p className="text-xs text-gray-600 text-center mt-1 max-w-32">Rigorous security controls and procedures</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="bg-white rounded-xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <img 
                  src="/images/compliance/gdpr-logo.png" 
                  alt="GDPR Compliant" 
                  className="h-16 w-auto"
                  
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mt-3">GDPR Ready</h3>
              <p className="text-xs text-gray-600 text-center mt-1 max-w-32">European data protection compliance</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="bg-white rounded-xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <img 
                  src="/images/compliance/hipaa-logo.png" 
                  alt="HIPAA Compliant" 
                  className="h-16 w-auto"
                  
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mt-3">HIPAA Eligible</h3>
              <p className="text-xs text-gray-600 text-center mt-1 max-w-32">Healthcare data protection standards</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Our commitment to security extends beyond compliance badges. We implement comprehensive security measures, regular audits, 
              and industry best practices to ensure your data remains protected at every stage of our partnership.
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Results Across Industries
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our clients trust us to solve their most complex challenges. From startups to enterprises, 
              we deliver solutions that drive measurable growth and operational excellence.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Process Optimization</h3>
                  <p className="text-3xl font-bold gradient-text mb-2">60% Time Savings</p>
                  <p className="text-gray-600">Automated complex workflows and eliminated bottlenecks</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">System Integration</h3>
                  <p className="text-3xl font-bold gradient-text mb-2">95% Data Accuracy</p>
                  <p className="text-gray-600">Connected disparate systems into unified platform</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Development</h3>
                  <p className="text-3xl font-bold gradient-text mb-2">3x Faster Performance</p>
                  <p className="text-gray-600">Built scalable solutions that grow with the business</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/case-studies"
                className="text-sm font-semibold leading-6 text-emerald-600 hover:text-primary-700 transition-colors"
              >
                View All Case Studies <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        className="relative overflow-hidden py-24"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #065f46 50%, #0f172a 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(4, 120, 87, 0.05) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px, 600px 600px, 800px 800px'
          }}
        ></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how AUTOWAIS can help you leverage technology to achieve your business goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md px-8 py-4 text-lg font-semibold text-white shadow-lg hover:scale-105 transition-all duration-200"
            style={{
              background: 'linear-gradient(to right, #059669, #10b981)',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)'
            }}
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Remove styled-jsx since we're using JavaScript animations */}
    </main>
  );
} 
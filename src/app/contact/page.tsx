'use client';

import { useState } from 'react';
import { useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Animation states
  const [floatPosition1, setFloatPosition1] = useState({ x: 0, y: 0, rotation: 0 });
  const [floatPosition2, setFloatPosition2] = useState({ x: 0, y: 0, rotation: 0 });
  const [floatPosition3, setFloatPosition3] = useState({ x: 0, y: 0, rotation: 0 });
  const [scanPosition, setScanPosition] = useState(-100);

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

    return () => {
      clearInterval(floatInterval);
      clearInterval(scanInterval);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #065f46 50%, #0f172a 100%)'
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
              Let's Build Something 
              <span 
                className="block text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(to right, #34d399, #10b981, #14b8a6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Amazing Together
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-emerald-100 max-w-3xl mx-auto">
              Ready to transform your business with innovative technology solutions? 
              Get in touch with our team and let's discuss how AUTOWAIS can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We'd love to hear about your project. Send us a message and we'll respond within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">karl.hallis@autowais.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ background: 'linear-gradient(to right, #059669, #14b8a6)' }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+917498048831</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ background: 'linear-gradient(to right, #14b8a6, #10b981)' }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                      <p className="text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-2">Why Choose AUTOWAIS?</h3>
                  <ul className="space-y-2 text-emerald-800">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      10+ years of technology expertise
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      99% client satisfaction rate
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Custom solutions for every business
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option value="Custom Development">Custom Development</option>
                        <option value="Process Automation">Process Automation</option>
                        <option value="System Integration">System Integration</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Tell us about your project, challenges, or how we can help..."
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      <div className="flex items-center">
                        {submitStatus.type === 'success' ? (
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        {submitStatus.message}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'hover:scale-105 transform'
                    }`}
                    style={{
                      background: isSubmitting 
                        ? '#9ca3af' 
                        : 'linear-gradient(to right, #059669, #10b981)',
                      boxShadow: isSubmitting 
                        ? 'none' 
                        : '0 10px 25px rgba(16, 185, 129, 0.25)'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>

            {/* Trust & Compliance */}
            <div className="mt-16 pt-16 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Security is Our Priority</h3>
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors">
                    <img src="/images/compliance/soc2-logo.png" alt="SOC 2" className="h-8 w-auto"  />
                    <span className="text-sm font-medium text-gray-700">SOC 2 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors">
                    <img src="/images/compliance/gdpr-logo.png" alt="GDPR" className="h-8 w-auto"  />
                    <span className="text-sm font-medium text-gray-700">GDPR Ready</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors">
                    <img src="/images/compliance/hipaa-logo.png" alt="HIPAA" className="h-8 w-auto"  />
                    <span className="text-sm font-medium text-gray-700">HIPAA Eligible</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
                  All communications and data are handled with enterprise-grade security measures and strict compliance protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
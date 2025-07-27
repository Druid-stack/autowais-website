import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - AUTOWAIS',
  description: 'Explore AUTOWAIS services including custom development, process automation, and system integration solutions.',
};

const services = [
  {
    id: 'custom-development',
    title: 'Custom Development',
    description: 'Tailored software solutions designed specifically for your business needs.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: [
      'Web Application Development',
      'Mobile App Development',
      'API Development & Integration',
      'Database Design & Optimization',
      'Cloud-Native Solutions',
      'Legacy System Modernization'
    ],
    benefits: [
      'Scalable and maintainable code',
      'Modern technology stack',
      'Performance optimization',
      'Security best practices',
      'Ongoing support and maintenance'
    ]
  },
  {
    id: 'process-automation',
    title: 'Process Automation',
    description: 'Streamline your operations with intelligent automation solutions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: [
      'Workflow Automation',
      'Data Processing Automation',
      'Email & Communication Automation',
      'Report Generation',
      'Integration Automation',
      'AI-Powered Process Optimization'
    ],
    benefits: [
      'Reduced manual errors',
      'Increased efficiency',
      'Cost savings',
      'Improved accuracy',
      '24/7 operation capability'
    ]
  },
  {
    id: 'system-integration',
    title: 'System Integration',
    description: 'Seamlessly connect your existing systems and applications.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'API Integration',
      'Third-Party Service Integration',
      'Database Integration',
      'Cloud Service Integration',
      'Legacy System Integration',
      'Real-Time Data Synchronization'
    ],
    benefits: [
      'Unified data flow',
      'Reduced data silos',
      'Improved decision making',
      'Enhanced user experience',
      'Centralized management'
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
              Comprehensive technology solutions to transform your business
            </p>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From custom development to process automation, we provide end-to-end technology solutions 
              that drive real business growth and operational efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-emerald-600">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-3 text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className={`mb-20 ${index !== 0 ? 'pt-20 border-t border-gray-200' : ''}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    {service.description}
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center mt-1">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-3 text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-emerald-600">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title} Process
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        1
                      </div>
                      <span className="ml-4 text-gray-700">Discovery & Planning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        2
                      </div>
                      <span className="ml-4 text-gray-700">Design & Architecture</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        3
                      </div>
                      <span className="ml-4 text-gray-700">Development & Testing</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        4
                      </div>
                      <span className="ml-4 text-gray-700">Deployment & Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Technology Stack
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to deliver robust, scalable, and maintainable solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL',
              'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs'
            ].map((tech) => (
              <div key={tech} className="text-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-semibold text-gray-700">{tech}</span>
                </div>
                <span className="text-sm text-gray-600">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project requirements and how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-emerald-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Start Your Project
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-semibold rounded-md text-white hover:bg-emerald-700 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
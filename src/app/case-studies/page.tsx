import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies - AUTOWAIS',
  description: 'Explore AUTOWAIS case studies and success stories. See how we\'ve helped businesses transform through technology solutions.',
};

const caseStudies = [
  {
    id: 'ecommerce-automation',
    title: 'E-commerce Process Automation',
    client: 'Retail Solutions Inc.',
    industry: 'E-commerce',
    description: 'Streamlined order processing and inventory management for a growing online retailer.',
    challenge: 'Manual order processing was causing delays and errors, leading to customer dissatisfaction and lost sales.',
    solution: 'Developed a comprehensive automation system that integrated order management, inventory tracking, and customer communication.',
    results: [
      'Reduced order processing time by 75%',
      'Eliminated 99% of manual errors',
      'Increased customer satisfaction by 40%',
      'Scaled operations to handle 5x more orders'
    ],
    technologies: ['Python', 'PostgreSQL', 'AWS', 'REST APIs', 'Automation Tools'],
    image: '/images/case-studies/ecommerce-automation.jpg'
  },
  {
    id: 'healthcare-integration',
    title: 'Healthcare System Integration',
    client: 'MedTech Solutions',
    industry: 'Healthcare',
    description: 'Integrated multiple healthcare systems to improve patient care and operational efficiency.',
    challenge: 'Multiple disconnected systems were causing data silos, leading to inefficient patient care and administrative overhead.',
    solution: 'Built a unified platform that integrated EHR, billing, and patient management systems with real-time data synchronization.',
    results: [
      'Improved patient care coordination by 60%',
      'Reduced administrative overhead by 45%',
      'Enhanced data accuracy by 95%',
      'Compliant with HIPAA and other regulations'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'HL7 FHIR', 'HIPAA Compliance'],
    image: '/images/case-studies/healthcare-integration.jpg'
  },
  {
    id: 'manufacturing-analytics',
    title: 'Manufacturing Analytics Platform',
    client: 'Industrial Manufacturing Co.',
    industry: 'Manufacturing',
    description: 'Real-time analytics platform for manufacturing process optimization and quality control.',
    challenge: 'Lack of real-time visibility into manufacturing processes was causing quality issues and production inefficiencies.',
    solution: 'Developed an IoT-enabled analytics platform that provided real-time monitoring, predictive maintenance, and quality control.',
    results: [
      'Reduced production downtime by 30%',
      'Improved product quality by 25%',
      'Increased production efficiency by 20%',
      'Real-time visibility across all facilities'
    ],
    technologies: ['Python', 'IoT Sensors', 'Machine Learning', 'Real-time Analytics', 'Cloud Computing'],
    image: '/images/case-studies/manufacturing-analytics.jpg'
  },
  {
    id: 'fintech-automation',
    title: 'Financial Services Automation',
    client: 'FinTech Innovations',
    industry: 'Financial Services',
    description: 'Automated financial reporting and compliance processes for a growing fintech company.',
    challenge: 'Manual financial reporting and compliance processes were time-consuming and prone to errors, limiting growth potential.',
    solution: 'Built an automated system that handled financial reporting, compliance checks, and regulatory submissions.',
    results: [
      'Reduced reporting time by 80%',
      'Achieved 100% compliance accuracy',
      'Scaled operations to handle 10x more transactions',
      'Improved audit trail and transparency'
    ],
    technologies: ['TypeScript', 'PostgreSQL', 'Blockchain', 'RegTech', 'Automation'],
    image: '/images/case-studies/fintech-automation.jpg'
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Case Studies
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
              Real results from real projects. See how we've helped businesses transform through technology.
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explore our portfolio of successful projects across various industries and see the measurable impact 
              our solutions have delivered for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-emerald-100">{study.client}</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                      {study.industry}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {study.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-sm text-gray-600">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-sm text-gray-600">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Numbers that speak for themselves. Here's what we've achieved for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">75%</div>
              <div className="text-gray-600">Average Efficiency Gain</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Process
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and measurable results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business challenges, goals, and requirements in detail.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategy</h3>
              <p className="text-gray-600">
                We develop a comprehensive strategy and technical architecture tailored to your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600">
                Our expert team builds your solution using modern technologies and best practices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Launch & Support</h3>
              <p className="text-gray-600">
                We deploy your solution and provide ongoing support to ensure continued success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project and how we can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-emerald-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Start Your Project
            </a>
            <a
              href="/services"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-semibold rounded-md text-white hover:bg-emerald-700 transition-colors"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
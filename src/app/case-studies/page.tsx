import Link from 'next/link';

const caseStudies = [
  {
    title: 'Process Optimization',
    metric: '60% Time Savings',
    description: 'Automated complex workflows and eliminated bottlenecks',
    industry: 'Manufacturing',
    challenge: 'Manual production tracking and quality control processes were causing delays and errors',
    solution: 'Implemented automated workflow tracking with real-time monitoring and predictive quality control',
    results: [
      '60% reduction in process completion time',
      '95% improvement in tracking accuracy', 
      '40% decrease in quality control errors',
      'Real-time visibility across entire production line'
    ]
  },
  {
    title: 'System Integration',
    metric: '95% Data Accuracy',
    description: 'Connected disparate systems into unified platform',
    industry: 'Retail',
    challenge: 'Multiple disconnected systems led to data inconsistencies and manual data entry',
    solution: 'Built comprehensive API integration layer connecting CRM, inventory, and accounting systems',
    results: [
      '95% improvement in data accuracy',
      '50% reduction in manual data entry',
      'Real-time inventory synchronization',
      'Unified reporting across all systems'
    ]
  },
  {
    title: 'Custom Development',
    metric: '3x Faster Performance',
    description: 'Built scalable solutions that grow with the business',
    industry: 'Financial Services',
    challenge: 'Legacy system couldn\'t handle growing transaction volume and needed modern architecture',
    solution: 'Developed cloud-native microservices architecture with automated scaling and monitoring',
    results: [
      '300% improvement in processing speed',
      '99.9% system uptime achieved',
      'Seamless scaling during peak periods',
      '70% reduction in infrastructure costs'
    ]
  }
];

export default function CaseStudies() {
  return (
    <main className="pt-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Proven Results
              <span className="gradient-text"> Across Industries</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our clients trust us to solve their most complex challenges. From startups to enterprises, 
              we deliver solutions that drive measurable growth and operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {caseStudies.map((study, index) => (
                <div key={index} className="text-center">
                  <div className={`rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                    index === 0 ? 'bg-gradient-to-br from-emerald-50 to-green-100' :
                    index === 1 ? 'bg-gradient-to-br from-teal-50 to-emerald-100' :
                    'bg-gradient-to-br from-green-50 to-emerald-100'
                  }`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{study.title}</h3>
                    <p className="text-3xl font-bold gradient-text mb-2">{study.metric}</p>
                    <p className="text-gray-600">{study.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Case Studies */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Deep Dive Case Studies
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Real challenges, innovative solutions, measurable results
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                <div className="p-8 lg:p-12">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                    <div>
                      <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                          {study.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                        {study.title}: {study.metric}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">{study.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">The Challenge</h4>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Solution</h4>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Results</h4>
                      <ul className="space-y-3">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start">
                            <svg className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready for Your Success Story?
            </h2>
            <p className="mt-6 text-lg leading-8 text-emerald-100">
              Every great solution starts with understanding your unique challenges. 
              Let's discuss how we can drive similar results for your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Let's Start the Conversation
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-white hover:text-emerald-100 transition-colors"
              >
                Explore Our Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
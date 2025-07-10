import Link from 'next/link';

export default function Services() {
  return (
    <main className="pt-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Technology That Transforms
              <span className="gradient-text"> Business</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We work across the full spectrum of modern technology, from cloud infrastructure to cutting-edge AI, 
              always choosing the right tools for your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Development */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Custom Development</h2>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    From web applications to mobile apps, enterprise software to APIs—we build exactly what your business 
                    needs using the latest technologies and frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p className="mb-6">
                    Every business has unique requirements that off-the-shelf software simply can't address. 
                    Our custom development services create solutions tailored specifically to your workflows, 
                    data structures, and business logic.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Web Applications:</strong> Modern, responsive web apps built with React, Vue, or Angular</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Mobile Apps:</strong> Native iOS and Android apps, or cross-platform solutions</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Enterprise Software:</strong> Scalable backend systems and microservices architecture</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">API Development:</strong> RESTful and GraphQL APIs for seamless integration</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Approach</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Agile methodology with regular iterations</li>
                    <li>• Test-driven development for reliability</li>
                    <li>• Cloud-native architecture for scalability</li>
                    <li>• Security-first design principles</li>
                    <li>• Performance optimization throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Automation */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pl-4 lg:col-start-2">
                <div className="lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Process Automation</h2>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    Streamline your operations with intelligent automation solutions that reduce manual work, 
                    eliminate errors, and free your team for strategic initiatives.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Benefits</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• 60-80% reduction in manual tasks</li>
                    <li>• 24/7 operation with no breaks</li>
                    <li>• Consistent, error-free execution</li>
                    <li>• Real-time monitoring and alerts</li>
                    <li>• Easy scaling as business grows</li>
                  </ul>
                </div>
              </div>
              <div className="lg:pl-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p className="mb-6">
                    Manual processes are bottlenecks that limit your business growth. Our automation solutions 
                    transform repetitive tasks into efficient, reliable workflows that run without human intervention.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Workflow Automation:</strong> End-to-end process automation using RPA and AI</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Document Processing:</strong> Intelligent document extraction and processing</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Customer Service:</strong> AI-powered chatbots and automated support</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Data Processing:</strong> Automated data collection, validation, and reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Integration */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">System Integration</h2>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    Connect your existing systems and data sources into a unified, efficient workflow that grows 
                    with your business and adapts to changing needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p className="mb-6">
                    Most businesses operate with disconnected systems that create data silos and inefficiencies. 
                    Our integration solutions create a unified technology ecosystem that maximizes the value of 
                    your existing investments.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">API Integration:</strong> Connect disparate systems through robust API layers</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Data Synchronization:</strong> Real-time data sync across all platforms</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Cloud Migration:</strong> Seamless transition to cloud-based infrastructure</span>
                    </li>
                    <li className="flex gap-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">✓</span>
                      <span><strong className="font-semibold text-gray-900">Legacy Modernization:</strong> Upgrade outdated systems without disruption</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Results</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• 95% improvement in data accuracy</li>
                    <li>• 50% faster reporting and analytics</li>
                    <li>• Unified view across all systems</li>
                    <li>• Reduced manual data entry</li>
                    <li>• Future-proof scalable architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Technology?
            </h2>
            <p className="mt-6 text-lg leading-8 text-emerald-100">
              Let's discuss how our technology solutions can solve your specific challenges and drive measurable results for your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Let's Discuss Your Needs
              </Link>
              <Link
                href="/case-studies"
                className="text-sm font-semibold leading-6 text-white hover:text-emerald-100 transition-colors"
              >
                View Case Studies <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
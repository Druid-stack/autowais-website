import Link from 'next/link';

const values = [
  {
    name: 'Discovery & Strategy',
    description: 'We start with deep discovery sessions to understand your business processes, challenges, and goals.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: 'Build & Deliver',
    description: 'Our experienced team brings your vision to life using the latest technologies and best practices.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: 'Ongoing Support',
    description: 'We provide continuous optimization and support to ensure your technology grows with your business.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white relative overflow-hidden min-h-screen">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-violet-400/20 to-indigo-400/20 rounded-full blur-2xl animate-pulse delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-8 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Complete{' '}
              <span className="gradient-text">Technology Solutions</span> Partner
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AUTOWAIS transforms businesses through innovative technology solutions. We tackle any challenge, 
              from complex integrations to cutting-edge innovations, delivering results that drive real growth.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div id="mission" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            To empower organizations to achieve peak performance by transforming their operations with 
            innovative technology solutions that solve real business challenges and drive measurable growth.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            AUTOWAIS was founded on the principle that every business is unique, and so are its technology needs. 
            We believe that success comes from understanding your specific challenges and crafting the perfect 
            solution, rather than forcing one-size-fits-all approaches.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div id="vision" className="relative z-10 bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Vision</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We envision a business landscape where technology seamlessly integrates with human creativity 
              to unlock unprecedented levels of efficiency, innovation, and growth.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              By making advanced technology accessible, practical, and results-oriented, we help our clients 
              not only adapt to the future but actively shape it. Every challenge is an opportunity to build 
              something better.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Expertise</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are a team of expert engineers, system architects, and technology strategists with deep 
              expertise across the full spectrum of modern technology. From cloud infrastructure to 
              cutting-edge AI, we always choose the right tools for your specific needs.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our specializations include custom development, process automation, and system integration—
              the three pillars that transform businesses and drive competitive advantage in today's 
              digital-first world.
            </p>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div id="approach" className="relative z-10 bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-600">Our Approach</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Every Challenge is an Opportunity
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We don't believe in one-size-fits-all solutions. Every business is unique, and so are its 
              technology needs. Our approach starts with understanding your specific challenges and 
              crafting the perfect solution.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {values.map((value) => (
                <div key={value.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      {value.icon}
                    </div>
                    {value.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose AUTOWAIS
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're not just another technology vendor. We're your strategic partner in navigating 
              the complex world of modern technology.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Results-Focused Approach</h3>
                <p className="text-gray-600">
                  Every project starts with clear goals and measurable outcomes. We don't just build technology—we deliver business value.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Challenge Too Complex</h3>
                <p className="text-gray-600">
                  From simple integrations to complex enterprise solutions, we thrive on solving the problems others can't handle.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Long-Term Partnership</h3>
                <p className="text-gray-600">
                  We build relationships, not just software. Our ongoing support ensures your technology grows with your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance Section */}
      <div className="relative z-10 py-16 bg-gradient-to-br from-gray-50 to-gray-100">
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
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Technology?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Partner with AUTOWAIS to build technology solutions that solve your specific challenges 
              and drive measurable results for your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Let's Discuss Your Needs
              </Link>
              <Link 
                href="/services" 
                className="text-sm font-semibold leading-6 text-white hover:text-primary-200 transition-colors"
              >
                Explore Our Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
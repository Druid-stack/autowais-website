import Link from 'next/link';

const navigation = {
  main: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ],
  services: [
    { name: 'Custom Development', href: '/services#custom-development' },
    { name: 'Process Automation', href: '/services#process-automation' },
    { name: 'System Integration', href: '/services#system-integration' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <img
                src="/images/autowais-logo-original.png"
                alt="AUTOWAIS - Your Complete Technology Solutions Partner"
                className="h-10 w-auto"

              />
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Your Complete Technology Solutions Partner. We deliver custom development, process automation, and system integration solutions that drive real business growth.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-300">
              <p>karl.hallis@autowais.com</p>
              <p>+917498048831</p>
              <p>Global Remote Operations</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white">Ready to Get Started?</h3>
            <p className="mt-4 text-sm text-gray-300">
              Let's discuss how we can transform your business with the right technology solutions.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
              >
                Let's Discuss Your Needs
              </Link>
            </div>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-white mb-4">Security & Compliance</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
              <div className="flex flex-col items-center group">
                <img
                  src="/images/compliance/soc2-logo.png"
                  alt="SOC 2 Type II Compliant"
                  className="h-12 w-auto group-hover:scale-110 transition-transform duration-200"

                />
                <span className="text-xs text-gray-400 mt-1">SOC 2 Type II</span>
              </div>
              <div className="flex flex-col items-center group">
                <img
                  src="/images/compliance/gdpr-logo.png"
                  alt="GDPR Compliant"
                  className="h-12 w-auto group-hover:scale-110 transition-transform duration-200"

                />
                <span className="text-xs text-gray-400 mt-1">GDPR Ready</span>
              </div>
              <div className="flex flex-col items-center group">
                <img
                  src="/images/compliance/hipaa-logo.png"
                  alt="HIPAA Compliant"
                  className="h-12 w-auto group-hover:scale-110 transition-transform duration-200"

                />
                <span className="text-xs text-gray-400 mt-1">HIPAA Eligible</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 max-w-2xl mx-auto">
              AUTOWAIS maintains the highest standards of security and compliance to protect your data and ensure regulatory adherence across all our solutions.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2025 AUTOWAIS. All rights reserved. | Your Complete Technology Solutions Partner
          </p>
          <div className="mt-4 lg:mt-0 flex space-x-6">
            <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
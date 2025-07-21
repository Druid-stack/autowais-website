import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Autowais',
  description: 'Autowais Privacy Policy - Learn how we protect your data and privacy on our AI automation platform.',
  keywords: 'privacy policy, data protection, GDPR, CCPA, Autowais, AI automation',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <div className="text-blue-100 text-sm">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 1, 2025
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  1. Introduction
                </h2>
                <p className="text-gray-700 mb-4">
                  Welcome to Autowais ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI automation platform, website, and related services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  2. About Autowais
                </h2>
                <p className="text-gray-700 mb-4">Autowais is an AI-powered automation platform that provides:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>AI agent workflows and automation</li>
                  <li>LinkedIn integration and social media automation</li>
                  <li>Content creation and knowledge management</li>
                  <li>Business process automation</li>
                  <li>Website and application development services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  3. Information We Collect
                </h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">3.1 Personal Information</h3>
                <p className="text-gray-700 mb-3">We may collect the following personal information:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Account Information:</strong> Name, email address, phone number, company name</li>
                  <li><strong>Profile Information:</strong> Job title, industry, professional background</li>
                  <li><strong>Authentication Data:</strong> Login credentials, security questions</li>
                  <li><strong>Contact Information:</strong> Address, billing information for paid services</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">3.2 Usage Information</h3>
                <p className="text-gray-700 mb-3">We automatically collect information about your use of our services:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Platform Usage:</strong> Features used, workflows created, automation activities</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
                  <li><strong>Analytics:</strong> Page views, session duration, user interactions</li>
                  <li><strong>Performance Data:</strong> Error logs, system performance metrics</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">3.3 Content and Data</h3>
                <p className="text-gray-700 mb-3">When you use our services, we may collect:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Workflow Data:</strong> Automation workflows, business processes, integration configurations</li>
                  <li><strong>Content:</strong> Blog posts, social media content, presentations, documents</li>
                  <li><strong>API Data:</strong> LinkedIn posts, social media interactions, third-party integrations</li>
                  <li><strong>AI Interactions:</strong> Prompts, responses, training data for AI agents</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">3.4 Third-Party Integrations</h3>
                <p className="text-gray-700 mb-3">We may collect data from third-party services you connect:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>LinkedIn:</strong> Posts, profile information, connections, engagement metrics</li>
                  <li><strong>Social Media:</strong> Content, analytics, audience data</li>
                  <li><strong>Business Tools:</strong> CRM data, email marketing platforms, productivity tools</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  4. How We Use Your Information
                </h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">4.1 Service Provision</h3>
                <p className="text-gray-700 mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Provide and maintain our AI automation platform</li>
                  <li>Process transactions and manage subscriptions</li>
                  <li>Deliver personalized content and recommendations</li>
                  <li>Support AI agent training and improvement</li>
                  <li>Enable workflow automation and integrations</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">4.2 Communication</h3>
                <p className="text-gray-700 mb-3">We may use your information to:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Send service updates and notifications</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Share educational content and best practices</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">4.3 Platform Improvement</h3>
                <p className="text-gray-700 mb-3">We use aggregated data to:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Analyze usage patterns and optimize performance</li>
                  <li>Develop new features and services</li>
                  <li>Improve AI algorithms and automation capabilities</li>
                  <li>Enhance user experience and platform functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  5. Information Sharing and Disclosure
                </h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">5.1 Service Providers</h3>
                <p className="text-gray-700 mb-3">We may share your information with trusted third-party service providers who:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Host our platform and infrastructure</li>
                  <li>Process payments and billing</li>
                  <li>Provide analytics and monitoring services</li>
                  <li>Deliver customer support and communication services</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">5.2 Business Partners</h3>
                <p className="text-gray-700 mb-3">We may share information with:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>LinkedIn and other social media platforms (with your consent)</li>
                  <li>AI service providers for enhanced functionality</li>
                  <li>Integration partners for workflow automation</li>
                  <li>Analytics and marketing service providers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  6. Data Security
                </h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">6.1 Security Measures</h3>
                <p className="text-gray-700 mb-3">We implement comprehensive security measures to protect your information:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
                  <li><strong>Access Controls:</strong> Strict access controls and authentication</li>
                  <li><strong>Monitoring:</strong> Continuous security monitoring and threat detection</li>
                  <li><strong>Backup:</strong> Regular data backups and disaster recovery procedures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  7. Your Rights and Choices
                </h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">7.1 Access and Control</h3>
                <p className="text-gray-700 mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Export your data in a portable format</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">7.2 Communication Preferences</h3>
                <p className="text-gray-700 mb-3">You can control:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Marketing email communications</li>
                  <li>Service notifications and updates</li>
                  <li>Newsletter subscriptions</li>
                  <li>Push notifications and alerts</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  8. Cookies and Tracking Technologies
                </h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">8.1 Types of Cookies</h3>
                <p className="text-gray-700 mb-3">We use various types of cookies:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                  <li><strong>Marketing Cookies:</strong> Enable personalized advertising</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  9. International Data Transfers
                </h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers and comply with applicable data protection laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  10. Children's Privacy
                </h2>
                <p className="text-gray-700 mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website, sending email notifications to registered users, and displaying prominent notices on our platform.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-gray-800 font-semibold mb-2">AUTOWAIS</p>
                    <p className="text-gray-700 mb-1">
                      Email: <a href="mailto:privacy@autowais.com" className="text-blue-600 hover:text-blue-800">privacy@autowais.com</a>
                    </p>
                    <p className="text-gray-700 mb-1">
                      Website: <a href="/" className="text-blue-600 hover:text-blue-800">autowais.com</a>
                    </p>
                    
                    <h4 className="text-lg font-medium text-gray-800 mt-4 mb-2">Data Protection Officer</h4>
                    <p className="text-gray-700">
                      For privacy-related inquiries in the European Union, you may contact our Data Protection Officer at: <a href="mailto:dpo@autowais.com" className="text-blue-600 hover:text-blue-800">dpo@autowais.com</a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center py-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AUTOWAIS</h3>
                <p className="text-gray-600 italic mb-2">Empowering businesses with AI automation</p>
                <p className="text-gray-600">
                  <a href="/" className="text-blue-600 hover:text-blue-800">autowais.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
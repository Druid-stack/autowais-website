'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Services & Solutions
  {
    id: 'services-1',
    question: 'What technology solutions does AUTOWAIS provide?',
    answer: 'AUTOWAIS offers a comprehensive range of technology solutions including custom software development, web and mobile applications, process automation, cloud infrastructure, AI integration, system integration, and digital transformation services. We work across the full spectrum of modern technology to deliver solutions tailored to your specific business needs.',
    category: 'Services & Solutions'
  },
  {
    id: 'services-2',
    question: 'How does AUTOWAIS approach custom development projects?',
    answer: 'We follow an agile methodology with regular iterations, ensuring transparency and flexibility throughout the development process. Our approach includes thorough requirements analysis, test-driven development, cloud-native architecture design, security-first principles, and continuous performance optimization. We maintain close communication with clients at every stage.',
    category: 'Services & Solutions'
  },
  {
    id: 'services-3',
    question: 'What types of automation can AUTOWAIS implement?',
    answer: 'We specialize in various automation solutions including workflow automation, data processing automation, customer service automation, inventory management, financial reporting automation, marketing automation, and AI-powered decision-making systems. Our automation solutions are designed to reduce manual work, eliminate errors, and free your team for strategic initiatives.',
    category: 'Services & Solutions'
  },
  {
    id: 'services-4',
    question: 'Does AUTOWAIS work with AI and machine learning?',
    answer: 'Yes, we have extensive experience with AI and machine learning integration. We can implement AI-powered chatbots, predictive analytics, automated decision systems, natural language processing, computer vision solutions, and intelligent automation workflows. We focus on practical AI applications that deliver measurable business value.',
    category: 'Services & Solutions'
  },

  // Process & Methodology
  {
    id: 'process-1',
    question: 'What is AUTOWAIS project development process?',
    answer: 'Our development process follows these key phases: 1) Discovery and Requirements Analysis, 2) System Design and Architecture Planning, 3) Agile Development with Regular Sprints, 4) Testing and Quality Assurance, 5) Deployment and Launch, 6) Post-Launch Support and Optimization. We maintain transparent communication throughout each phase.',
    category: 'Process & Methodology'
  },
  {
    id: 'process-2',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. Simple web applications typically take 4-8 weeks, while complex enterprise systems may require 3-6 months or more. We provide detailed project timelines during the initial consultation phase and maintain milestone-based progress tracking throughout development.',
    category: 'Process & Methodology'
  },
  {
    id: 'process-3',
    question: 'How does AUTOWAIS ensure project quality?',
    answer: 'We implement comprehensive quality assurance through code reviews, automated testing, performance monitoring, security audits, and user acceptance testing. Our test-driven development approach ensures reliability, while our continuous integration practices maintain code quality throughout the development lifecycle.',
    category: 'Process & Methodology'
  },
  {
    id: 'process-4',
    question: 'What project management tools does AUTOWAIS use?',
    answer: 'We utilize modern project management tools including Jira for task tracking, Slack for communication, GitHub for version control, and various collaboration platforms. Clients receive regular progress updates through dashboards and scheduled meetings, ensuring complete transparency throughout the project lifecycle.',
    category: 'Process & Methodology'
  },

  // Technical & Infrastructure
  {
    id: 'technical-1',
    question: 'What technologies and frameworks does AUTOWAIS work with?',
    answer: 'We work with a wide range of modern technologies including React, Vue, Angular, Node.js, Python, Java, .NET, mobile frameworks (React Native, Flutter), cloud platforms (AWS, Google Cloud, Azure), databases (PostgreSQL, MongoDB, MySQL), and various APIs and microservices architectures.',
    category: 'Technical & Infrastructure'
  },
  {
    id: 'technical-2',
    question: 'Does AUTOWAIS provide cloud migration services?',
    answer: 'Yes, we offer comprehensive cloud migration services including assessment of current infrastructure, migration strategy development, data transfer and security, application modernization, and ongoing cloud optimization. We work with major cloud providers to ensure seamless transitions with minimal downtime.',
    category: 'Technical & Infrastructure'
  },
  {
    id: 'technical-3',
    question: 'How does AUTOWAIS handle data security and compliance?',
    answer: 'Security is integrated into every aspect of our development process. We implement industry-standard security practices including encryption, secure authentication, access controls, regular security audits, and compliance with regulations like GDPR, HIPAA, and SOC 2. All code undergoes security reviews before deployment.',
    category: 'Technical & Infrastructure'
  },
  {
    id: 'technical-4',
    question: 'Can AUTOWAIS integrate with existing systems?',
    answer: 'Absolutely. We specialize in system integration and can connect new solutions with your existing software, databases, and business systems. Our integration expertise includes APIs, middleware development, data synchronization, and legacy system modernization while maintaining business continuity.',
    category: 'Technical & Infrastructure'
  },

  // Business & Pricing
  {
    id: 'business-1',
    question: 'How does AUTOWAIS pricing work?',
    answer: 'Our pricing is project-based and depends on factors like scope, complexity, timeline, and technology requirements. We provide transparent, detailed quotes with no hidden fees. Payment terms are flexible and can be structured around project milestones. We offer both fixed-price and time-and-materials options.',
    category: 'Business & Pricing'
  },
  {
    id: 'business-2',
    question: 'Does AUTOWAIS work with startups and small businesses?',
    answer: 'Yes, we work with businesses of all sizes, from startups to enterprise corporations. We understand that smaller businesses have unique needs and budget considerations, so we offer scalable solutions and flexible engagement models that can grow with your business.',
    category: 'Business & Pricing'
  },
  {
    id: 'business-3',
    question: 'What ongoing support does AUTOWAIS provide?',
    answer: 'We offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, feature enhancements, and technical support. Our support packages are customizable based on your needs and can include 24/7 monitoring, regular maintenance, and dedicated support channels.',
    category: 'Business & Pricing'
  },
  {
    id: 'business-4',
    question: 'Can AUTOWAIS help with digital transformation initiatives?',
    answer: 'Yes, digital transformation is one of our core specialties. We help businesses modernize their operations through technology adoption, process optimization, cloud migration, automation implementation, and data-driven decision making. We work as strategic partners to guide your entire digital transformation journey.',
    category: 'Business & Pricing'
  },

  // Getting Started
  {
    id: 'getting-started-1',
    question: 'How do I get started with AUTOWAIS?',
    answer: 'Getting started is simple: 1) Contact us through our website or phone, 2) Schedule a free consultation to discuss your needs, 3) Receive a detailed project proposal, 4) Begin development with our agile process. We make the onboarding process smooth and transparent.',
    category: 'Getting Started'
  },
  {
    id: 'getting-started-2',
    question: 'What information should I prepare for the initial consultation?',
    answer: 'To make the most of our consultation, prepare information about your business objectives, current technology challenges, target users, budget considerations, timeline expectations, and any existing systems. Don\'t worry if you don\'t have all details - we\'ll help you define requirements.',
    category: 'Getting Started'
  },
  {
    id: 'getting-started-3',
    question: 'Does AUTOWAIS offer free consultations?',
    answer: 'Yes, we offer free initial consultations to understand your needs and explore how we can help. This includes a project assessment, technology recommendations, and preliminary scope discussion. There\'s no obligation, and we\'re happy to provide insights about your technology challenges.',
    category: 'Getting Started'
  },
  {
    id: 'getting-started-4',
    question: 'What happens after I contact AUTOWAIS?',
    answer: 'After you contact us, we\'ll schedule a discovery call within 24 hours to understand your needs. Following the consultation, we\'ll provide a detailed proposal with project scope, timeline, and pricing. Once approved, we\'ll begin with project kickoff and start delivering results.',
    category: 'Getting Started'
  }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Animation states
  const [floatPosition1, setFloatPosition1] = useState({ x: 0, y: 0, rotation: 0 });
  const [floatPosition2, setFloatPosition2] = useState({ x: 0, y: 0, rotation: 0 });
  const [floatPosition3, setFloatPosition3] = useState({ x: 0, y: 0, rotation: 0 });

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

    return () => clearInterval(floatInterval);
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev: string[]) => 
      prev.includes(id) 
        ? prev.filter((item: string) => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${floatPosition1.x}px, ${floatPosition1.y}px) rotate(${floatPosition1.rotation}deg)`
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${floatPosition2.x}px, ${floatPosition2.y}px) rotate(${floatPosition2.rotation}deg)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${floatPosition3.x}px, ${floatPosition3.y}px) rotate(${floatPosition3.rotation}deg)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-100 py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked 
              <span className="gradient-text"> Questions</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find answers to common questions about our technology solutions, processes, and services. 
              Can't find what you're looking for? <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 font-semibold">Contact us</Link> directly.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'All'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 pr-8">{item.question}</h3>
                      <span className="text-sm text-emerald-600 font-medium">{item.category}</span>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          expandedItems.includes(item.id) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedItems.includes(item.id) && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.503-.686-6.333-1.866" />
                </svg>
                <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg leading-8 text-emerald-100">
              Our team is ready to help you find the perfect technology solution for your business.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-white hover:text-emerald-100 transition-colors"
              >
                View Our Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
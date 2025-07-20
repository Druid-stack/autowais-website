import Link from 'next/link';

const features = [
  {
    name: 'Outcome-Driven Results',
    description: 'We focus on delivering measurable business outcomes, from increased revenue to significant cost savings. Our "Service as Software" model ties our success to yours.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    name: 'Vertical Specialization',
    description: 'Our solutions are built with a deep understanding of your industry\'s unique pain points and opportunities, creating defensible competitive moats.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    name: 'Future-Proof Technology',
    description: 'We build with advanced AI, including Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG), to give you a sustainable competitive edge.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

const stats = [
  { id: 1, name: 'ROI in 18 months', value: '300%' },
  { id: 2, name: 'Reduction in operational costs', value: '40%' },
  { id: 3, name: 'Increase in efficiency', value: '70%' },
  { id: 4, name: 'Faster insights delivery', value: '40%' },
];

export default function WhyAutowais() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Why Choose AUTOWAIS?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Strategic Partner in AI Transformation
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At AUTOWAIS, we don't just sell technology; we deliver results. We combine deep industry expertise 
            with cutting-edge AI to build solutions that are not only powerful but also practical, reliable, 
            and aligned with your business goals.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stats Section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Proven Track Record of Success
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Our clients consistently achieve remarkable results with our AI solutions
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col bg-white p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-emerald-600">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            Ready to Transform Your Business?
          </h3>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Join the ranks of forward-thinking companies that have already embraced the future of AI automation.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
            >
              Start Your Transformation
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Learn More About Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
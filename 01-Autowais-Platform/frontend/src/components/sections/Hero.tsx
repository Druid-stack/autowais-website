import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            See how businesses achieve up to 300% ROI.{' '}
            <Link href="/success-stories" className="font-semibold text-emerald-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read success stories <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Unlock Unprecedented Efficiency with{' '}
            <span className="gradient-text">Agentic AI</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            AUTOWAIS delivers transformative AI SaaS and Agentic Automation solutions that streamline your processes, 
            supercharge your insights, and drive measurable growth. Move beyond traditional automation and embrace 
            a future where your systems think, adapt, and execute for you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
            >
              Schedule a Free Consultation
            </Link>
            <Link 
              href="/services" 
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Explore Our Services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Results That Drive Growth
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join forward-thinking companies already transforming their operations with AI
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">ROI Achievement</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-emerald-600">Up to 300%</dd>
              <p className="mt-2 text-sm text-gray-500">
                See how businesses are achieving remarkable returns on their AI investments
              </p>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">Efficiency Increase</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-emerald-600">70% Less</dd>
              <p className="mt-2 text-sm text-gray-500">
                Manual effort reduction through advanced automation systems
              </p>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">Faster Insights</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-emerald-600">40% Faster</dd>
              <p className="mt-2 text-sm text-gray-500">
                Accelerated market research and decision-making with AI-powered analysis
              </p>
            </div>
          </dl>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
} 
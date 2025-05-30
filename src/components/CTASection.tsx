// src/components/CTASection.tsx
import Link from 'next/link';

export default function CTASection() {
  return (
    <div className="bg-green-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to transform your health?</span>
          <span className="block text-green-600">Start your journey today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/onboarding/basic-info"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Get started
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
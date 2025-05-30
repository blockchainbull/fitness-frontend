// src/app/pricing/page.tsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState('monthly');
  
  // Define prices with annual discount (20% off)
  const plans = {
    basic: {
      monthly: 9.99,
      annually: 7.99,
    },
    pro: {
      monthly: 19.99,
      annually: 15.99,
    },
    premium: {
      monthly: 29.99,
      annually: 23.99,
    }
  };
  
  // Calculate annual total (for display)
  const getAnnualTotal = (monthlyPrice) => {
    return (monthlyPrice * 12 * 0.8).toFixed(2);
  };
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Choose the plan that works best for your health and fitness goals
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex">
              <button
                type="button"
                onClick={() => setBillingInterval('monthly')}
                className={`relative w-1/2 ${
                  billingInterval === 'monthly' ? 'bg-white border-gray-200 shadow-sm text-gray-900' : 'border border-transparent text-gray-700'
                } rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingInterval('annually')}
                className={`ml-0.5 relative w-1/2 ${
                  billingInterval === 'annually' ? 'bg-white border-gray-200 shadow-sm text-gray-900' : 'border border-transparent text-gray-700'
                } rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:z-10 sm:w-auto sm:px-8`}
              >
                Annual <span className="text-green-600 font-semibold">(Save 20%)</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {/* Basic Plan */}
            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${plans.basic[billingInterval]}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                {billingInterval === 'annually' && (
                  <p className="mt-1 text-sm text-green-600">
                    Billed annually (${getAnnualTotal(plans.basic.monthly)}/year)
                  </p>
                )}
                <p className="mt-6 text-gray-500">Great for beginners to get started with AI fitness coaching.</p>

                {/* Feature List */}
                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">AI-powered workout recommendations</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Basic nutrition guidelines</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Progress tracking</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">50 AI coach messages per month</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/onboarding/basic-info?plan=basic&billing=${billingInterval}`}
                className="mt-8 block w-full bg-green-50 border border-green-200 rounded-md py-3 text-sm font-semibold text-green-700 text-center hover:bg-green-100"
              >
                Get started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="absolute top-0 inset-x-0 transform translate-y-px">
                <div className="flex justify-center transform -translate-y-1/2">
                  <span className="inline-flex rounded-full bg-green-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                    Most Popular
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${plans.pro[billingInterval]}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                {billingInterval === 'annually' && (
                  <p className="mt-1 text-sm text-green-600">
                    Billed annually (${getAnnualTotal(plans.pro.monthly)}/year)
                  </p>
                )}
                <p className="mt-6 text-gray-500">Comprehensive AI coaching for serious fitness enthusiasts.</p>

                {/* Feature List */}
                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">All features in Basic</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Personalized meal plans</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Advanced workout customization</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">250 AI coach messages per month</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Habit building system</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/onboarding/basic-info?plan=pro&billing=${billingInterval}`}
                className="mt-8 block w-full bg-green-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-green-700"
              >
                Get started
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${plans.premium[billingInterval]}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                {billingInterval === 'annually' && (
                  <p className="mt-1 text-sm text-green-600">
                    Billed annually (${getAnnualTotal(plans.premium.monthly)}/year)
                  </p>
                )}
                <p className="mt-6 text-gray-500">The ultimate AI fitness experience for optimal results.</p>

                {/* Feature List */}
                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">All features in Pro</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Unlimited AI coach messages</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Priority AI response time</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Advanced data analytics</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">Integration with fitness wearables</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/onboarding/basic-info?plan=premium&billing=${billingInterval}`}
                className="mt-8 block w-full bg-green-50 border border-green-200 rounded-md py-3 text-sm font-semibold text-green-700 text-center hover:bg-green-100"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-6 divide-y divide-gray-200">
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Can I switch between plans?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.
                </dd>
              </div>

              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Is there a free trial?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes! We offer a 7-day free trial on all plans so you can experience the value of our AI coaching before committing.
                </dd>
              </div>

              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  What payment methods do you accept?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  We accept all major credit cards, PayPal, and Apple Pay. All payments are securely processed.
                </dd>
              </div>

              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Can I cancel anytime?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Absolutely. There are no long-term contracts or commitments. You can cancel your subscription at any time from your account settings.
                </dd>
              </div>

              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  What's the difference between monthly and annual billing?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Annual billing offers a 20% discount compared to monthly billing. You'll be charged once per year instead of monthly, saving you a significant amount.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to start your fitness journey?</span>
            <span className="block text-green-600">Get started with a 7-day free trial.</span>
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
                href="/chat"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
              >
                Chat with AI coach
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
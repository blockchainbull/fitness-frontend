// src/app/features/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Features - FitMind AI',
  description: 'Explore the innovative features of our AI-powered nutrition and fitness coaching platform',
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Powerful AI Features
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Discover how our AI-powered platform revolutionizes your fitness and nutrition journey
            </p>
          </div>
        </div>
      </div>

      {/* Primary Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Core Capabilities</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">An AI coach that adapts to you</p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform learns your preferences, adapts to your progress, and provides personalized guidance every step of the way.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-16">
              {/* Feature 1 */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 lg:pr-12">
                  <div className="lg:max-w-lg">
                    <h3 className="text-2xl font-extrabold text-gray-900">Personalized Nutrition Planning</h3>
                    <p className="mt-3 text-lg text-gray-500">
                      Get AI-generated meal plans that adapt to your dietary preferences, restrictions, and goals. Our system learns from your feedback and adjusts recommendations accordingly.
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Custom meal plans based on your caloric needs</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Accommodates dietary restrictions and allergies</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Recipes that match your taste preferences</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Grocery lists and meal prep guidance</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 flex-1 lg:mt-0 lg:pl-12">
                  <div className="lg:max-w-lg">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <div className="p-4 text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="mt-2">Nutrition Plan Image Placeholder</p>
                      </div>
                      {/* Replace with actual image when available */}
                      {/* 
                      <Image
                        src="/images/features/nutrition-plan.jpg"
                        alt="Personalized nutrition planning"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      /> 
                      */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 order-2 lg:order-1 lg:pl-12 mt-10 lg:mt-0">
                  <div className="lg:max-w-lg">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <div className="p-4 text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <p className="mt-2">Workout Plan Image Placeholder</p>
                      </div>
                      {/* Replace with actual image when available */}
                      {/* 
                      <Image
                        src="/images/features/workout-plan.jpg"
                        alt="Smart workout recommendations"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      /> 
                      */}
                    </div>
                  </div>
                </div>
                <div className="flex-1 order-1 lg:order-2 lg:pr-12">
                  <div className="lg:max-w-lg">
                    <h3 className="text-2xl font-extrabold text-gray-900">Smart Workout Recommendations</h3>
                    <p className="mt-3 text-lg text-gray-500">
                      Receive daily workout suggestions based on your fitness level, available equipment, time constraints, and recovery status.
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Progressive overload that challenges you safely</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Adapts to your available equipment and space</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Exercise form guidance with AI-based corrections</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Recovery monitoring to prevent overtraining</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 lg:pr-12">
                  <div className="lg:max-w-lg">
                    <h3 className="text-2xl font-extrabold text-gray-900">24/7 AI Health Coaching</h3>
                    <p className="mt-3 text-lg text-gray-500">
                      Ask questions anytime about nutrition, exercise, sleep, or any health topic and get evidence-based answers personalized to your situation.
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Immediate answers to your health questions</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Research-backed information tailored to you</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Health tips that fit your lifestyle</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Continuous learning from your conversations</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 flex-1 lg:mt-0 lg:pl-12">
                  <div className="lg:max-w-lg">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <div className="p-4 text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="mt-2">AI Coach Image Placeholder</p>
                      </div>
                      {/* Replace with actual image when available */}
                      {/* 
                      <Image
                        src="/images/features/ai-coach.jpg"
                        alt="24/7 AI health coaching"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      /> 
                      */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">More Powerful Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Our platform includes a comprehensive set of tools to support your health and fitness journey.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Progress Tracking</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Visual dashboards showing your improvements over time. Track weight, measurements, strength gains, and more with automated insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Habit Building</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Smart reminders and micro-habits designed to fit your schedule. Our AI helps you build sustainable health habits that last.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Community Support</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Connect with others on similar health journeys. Share achievements, challenges, and motivation in our moderated community.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Customizable Goals</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Set specific, achievable targets with our AI guidance. Adjust your goals as your fitness level and priorities change.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Injury Prevention</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Our AI analyzes your movement patterns and fatigue levels to help prevent injuries before they happen with personalized recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Data Integration</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    Sync with popular fitness trackers and health apps to consolidate all your fitness data in one place for comprehensive analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to experience these features?</span>
            <span className="block text-green-100">Start your fitness journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/onboarding/basic-info"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
              >
                Try demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
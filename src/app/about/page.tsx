// src/app/about/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - FitMind AI',
  description: 'Learn about our mission to revolutionize health and fitness with AI technology',
};

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Former fitness coach with a passion for technology. Alex founded FitMind AI to make personalized coaching accessible to everyone.',
      imagePlaceholder: 'AJ'
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Nutrition Scientist',
      bio: 'Ph.D. in Nutritional Sciences with over 10 years of research experience in personalized nutrition and metabolic health.',
      imagePlaceholder: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of AI Development',
      bio: 'AI researcher specializing in machine learning for health applications. Previously led AI teams at major tech companies.',
      imagePlaceholder: 'MR'
    },
    {
      name: 'Emma Taylor',
      role: 'Fitness Program Director',
      bio: 'Professional trainer and exercise physiologist with expertise in designing effective workout programs for all fitness levels.',
      imagePlaceholder: 'ET'
    }
  ];

  // Values data
  const values = [
    {
      title: 'Evidence-Based Approach',
      description: 'We ground all our recommendations in scientific research and validated fitness methodologies.',
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Personalization First',
      description: 'We believe that fitness is not one-size-fits-all. Our AI adapts to your unique body, goals, and preferences.',
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Continuous Improvement',
      description: 'Our AI models and recommendations constantly evolve based on the latest research and user feedback.',
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: 'Accessibility',
      description: 'We are committed to making expert health and fitness guidance available to everyone, regardless of budget or location.',
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Mission
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              We're revolutionizing health and fitness with AI technology that makes personalized coaching accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Our Story</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              From Idea to Innovation
            </p>
            <div className="mt-8 text-lg text-gray-500 max-w-3xl mx-auto">
              <p className="mb-4">
                FitMind AI began with a simple observation: while personalized fitness and nutrition coaching produces the best results, it remains inaccessible to most people due to cost and availability constraints.
              </p>
              <p className="mb-4">
                Founded in 2023, our team of fitness experts, nutritionists, and AI specialists came together with a shared vision: to democratize access to high-quality, personalized health guidance through artificial intelligence.
              </p>
              <p className="mb-4">
                We developed our proprietary AI system by training it on thousands of coaching interactions, nutrition plans, and workout programs created by certified professionals. The result is an AI coach that provides truly personalized guidance that adapts to your unique body, preferences, and goals.
              </p>
              <p>
                Today, FitMind AI is helping thousands of users achieve their health and fitness goals through accessible, affordable, and highly personalized AI coaching.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Drives Us
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                          {value.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{value.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Minds Behind FitMind AI
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our diverse team combines expertise in fitness, nutrition, and artificial intelligence.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex-shrink-0 self-center">
                    <div className="h-16 w-16 border-2 border-green-500 rounded-full flex items-center justify-center bg-green-100 text-green-800 text-xl font-bold">
                      {member.imagePlaceholder}
                    </div>
                    {/* Replace with actual image when available */}
                    {/* 
                    <Image
                      className="h-16 w-16 rounded-full"
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                    /> 
                    */}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{member.name}</h4>
                    <p className="text-green-600">{member.role}</p>
                    <p className="mt-1 text-gray-500">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by fitness enthusiasts worldwide
            </h2>
            <p className="mt-3 text-xl text-green-200 sm:mt-4">
              Our AI-powered platform is helping users achieve real results
            </p>
          </div>
          <dl className="mt-10 text-center sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                Active Users
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                50,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                Workouts Generated
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                1.2M+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                Satisfaction Rate
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                97%
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to experience the future of fitness?</span>
            <span className="block text-green-600">Join our community today.</span>
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
                href="/features"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
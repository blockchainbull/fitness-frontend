// src/components/HeroSection.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Your personal</span>{' '}
                <span className="block text-green-600 xl:inline">Nutritionist and Fitness trainer </span><br></br>
                <span className="block xl:inline">in your hand</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get personalized nutrition advice, workout plans, and health coaching from our AI that adapts to your unique body, goals, and lifestyle.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Your Free Trial
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/demo"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
                  >
                    Try Demo
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
                src="/images/hero-image.jpg"
                alt="Fitness and nutrition coaching"
               width={1000}
               height={1000}
               className="h-full w-full object-cover"
               priority
               />
        </div>
      </div>
  );
}
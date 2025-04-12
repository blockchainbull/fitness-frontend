// src/app/blog/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Blog - FitMind AI',
  description: 'Insights, tips, and news about fitness, nutrition, and AI-powered health coaching',
};

export default function BlogPage() {
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Personal Fitness Coaching',
      excerpt: 'Explore the ways artificial intelligence is transforming how we approach fitness and making personalized coaching accessible to everyone.',
      date: 'March 15, 2025',
      author: 'Alex Johnson',
      category: 'Technology',
      readTime: '5 min read',
      slug: 'how-ai-revolutionizing-fitness-coaching'
    },
    {
      id: 2,
      title: '5 Nutrition Myths Debunked by Science',
      excerpt: 'Our nutrition experts separate fact from fiction and explain what the latest research really says about healthy eating.',
      date: 'March 10, 2025',
      author: 'Dr. Sarah Chen',
      category: 'Nutrition',
      readTime: '7 min read',
      slug: 'nutrition-myths-debunked-science'
    },
    {
      id: 3,
      title: 'The Science of Progressive Overload: How to Keep Making Gains',
      excerpt: 'Learn how to apply the principle of progressive overload to continue making progress in your strength and fitness journey.',
      date: 'March 5, 2025',
      author: 'Emma Taylor',
      category: 'Fitness',
      readTime: '6 min read',
      slug: 'science-progressive-overload-making-gains'
    },
    {
      id: 4,
      title: 'Mindful Eating: A Powerful Tool for Weight Management',
      excerpt: 'Discover how mindful eating practices can transform your relationship with food and support sustainable weight management.',
      date: 'February 28, 2025',
      author: 'Dr. Sarah Chen',
      category: 'Nutrition',
      readTime: '4 min read',
      slug: 'mindful-eating-weight-management'
    },
    {
      id: 5,
      title: 'Recovery Strategies That Actually Work, According to Science',
      excerpt: 'Our fitness experts review the latest research on recovery techniques to help you bounce back faster after intense workouts.',
      date: 'February 20, 2025',
      author: 'Michael Rodriguez',
      category: 'Recovery',
      readTime: '8 min read',
      slug: 'recovery-strategies-according-science'
    },
    {
      id: 6,
      title: 'Building Sustainable Fitness Habits That Last',
      excerpt: 'Learn proven strategies to create fitness habits that stick, even when motivation fades.',
      date: 'February 15, 2025',
      author: 'Alex Johnson',
      category: 'Lifestyle',
      readTime: '5 min read',
      slug: 'building-sustainable-fitness-habits'
    },
  ];

  // Categories for filter
  const categories = [
    'All',
    'Fitness',
    'Nutrition',
    'Technology',
    'Recovery',
    'Lifestyle'
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              FitMind AI Blog
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Insights, tips, and research on fitness, nutrition, and AI health coaching
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Featured Image</p>
                    {/* Replace with actual image when available */}
                    {/* 
                    <Image
                      className="h-48 w-full object-cover"
                      src={`/images/blog/${post.slug}.jpg`}
                      alt={post.title}
                      width={600}
                      height={300}
                    /> 
                    */}
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-600">
                      {post.category}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Avatar</span>
                        {/* Replace with actual author image when available */}
                        {/* 
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={`/images/authors/${post.author.toLowerCase().replace(' ', '-')}.jpg`}
                          alt={post.author}
                          width={40}
                          height={40}
                        /> 
                        */}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-600 text-sm font-medium text-white hover:bg-green-700"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-500 text-center">
              Get the latest fitness and nutrition insights delivered straight to your inbox.
            </p>
            <div className="mt-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-gray-500">
                We care about your data. Read our{' '}
                <Link href="/privacy" className="font-medium text-green-600 hover:text-green-500">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
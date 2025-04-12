// src/components/TestimonialSection.tsx
import Image from 'next/image';

export default function TestimonialSection() {
  const testimonials = [
    {
      content:
        "I've tried dozens of fitness apps, but FitMind AI actually adapts to my changing schedule and energy levels. It's like having a personal trainer who really knows me.",
      author: 'Sarah J.',
      role: 'Lost 15 lbs in 3 months',
      imageSrc: '/placeholder-avatar-1.jpg',
    },
    {
      content:
        "As someone with dietary restrictions, finding the right nutrition plan was always a struggle. FitMind AI created a perfect meal plan that meets all my needs and I've never felt better.",
      author: 'Michael T.',
      role: 'Gained 10 lbs of muscle',
      imageSrc: '/placeholder-avatar-2.jpg',
    },
    {
      content:
        "The AI coach is available anytime I have questions. No more waiting days for answers or googling conflicting advice. This has completely transformed how I approach my health.",
      author: 'Priya K.',
      role: 'Improved athletic performance',
      imageSrc: '/placeholder-avatar-3.jpg',
    },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Hear from our satisfied users
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Real people, real results with our AI-powered coaching platform
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-600">Testimonial</p>
                    <div className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="mt-3 text-base text-gray-500">{testimonial.content}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {/* Replace with actual image when available */}
                        {/*
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={testimonial.imageSrc}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                        />
                        */}
                        <span className="text-xs text-gray-500">Photo</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
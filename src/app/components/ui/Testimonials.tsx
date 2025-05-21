'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    text: "Shoolin Consultancy transformed our business operations. Their strategic insights led to a 30% increase in productivity across our teams.",
    author: "Sarah Johnson",
    position: "CEO, TechVision Inc.",
    image: "/testimonials/person1.svg",
  },
  {
    id: 2,
    text: "Working with Shoolin Consultancy has been a game-changer. Their financial advisory services helped us navigate a challenging market and increase our revenue by 25%.",
    author: "Michael Chen",
    position: "CFO, Global Enterprises",
    image: "/testimonials/person2.svg",
  },
  {
    id: 3,
    text: "The digital transformation roadmap that Shoolin Consultancy implemented for our company has revolutionized how we interact with customers. Highly recommended!",
    author: "Priya Patel",
    position: "COO, InnovateTech",
    image: "/testimonials/person3.svg",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Client Testimonials</h2>
          <p className="text-gray-600 text-lg">
            Read what our clients say about our consulting services and the results we&apos;ve delivered.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100 shadow-md">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={`${testimonials[activeIndex].author} portrait`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-700 text-lg italic mb-6">&ldquo;{testimonials[activeIndex].text}&rdquo;</p>
                <h4 className="font-bold text-blue-800">{testimonials[activeIndex].author}</h4>
                <p className="text-gray-600">{testimonials[activeIndex].position}</p>
              </div>

              <div className="flex space-x-4 mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="rounded-full w-10 h-10 bg-gray-200 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="rounded-full w-10 h-10 bg-gray-200 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-800' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

'use client';

import { useState, useEffect } from 'react';

// Define the Testimonial type
type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  imageUrl: string | null;
  rating: number;
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials?featured=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await response.json();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Unable to load testimonials. Please try again later.');
        // Use fallback data if API fails
        setTestimonials([
          {
            id: 1,
            name: "Sarah Johnson",
            position: "CEO",
            company: "TechVision Inc.",
            content: "Shoolin Consultancy transformed our business operations. Their strategic insights led to a 30% increase in productivity across our teams.",
            imageUrl: "/testimonials/person1.svg",
            rating: 5
          },
          {
            id: 2,
            name: "Michael Chen",
            position: "CFO",
            company: "Global Enterprises",
            content: "Working with Shoolin Consultancy has been a game-changer. Their financial advisory services helped us navigate a challenging market and increase our revenue by 25%.",
            imageUrl: "/testimonials/person2.svg",
            rating: 5
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length <= 1) return;
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length <= 1) return;
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
          {loading ? (
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800 mb-4"></div>
                <p className="text-gray-600">Loading testimonials...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <p className="text-gray-600 text-center">No testimonials available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
                <div className="flex flex-col items-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100 shadow-md">
                      <img 
                        src={testimonials[activeIndex]?.imageUrl || '/testimonials/person1.svg'} 
                        alt={`${testimonials[activeIndex]?.name} portrait`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-700 text-lg italic mb-6">&ldquo;{testimonials[activeIndex]?.content}&rdquo;</p>
                    <h4 className="font-bold text-blue-800">{testimonials[activeIndex]?.name}</h4>
                    <p className="text-gray-600">{testimonials[activeIndex]?.position}, {testimonials[activeIndex]?.company}</p>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button 
                      onClick={prevTestimonial}
                      className={`rounded-full w-10 h-10 ${testimonials.length > 1 ? 'bg-gray-200 hover:bg-blue-100' : 'bg-gray-100 cursor-not-allowed'} flex items-center justify-center transition-colors`}
                      aria-label="Previous testimonial"
                      disabled={testimonials.length <= 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${testimonials.length > 1 ? 'text-blue-800' : 'text-gray-400'}`}
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
                      className={`rounded-full w-10 h-10 ${testimonials.length > 1 ? 'bg-gray-200 hover:bg-blue-100' : 'bg-gray-100 cursor-not-allowed'} flex items-center justify-center transition-colors`}
                      aria-label="Next testimonial"
                      disabled={testimonials.length <= 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${testimonials.length > 1 ? 'text-blue-800' : 'text-gray-400'}`}
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

              {testimonials.length > 1 && (
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
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

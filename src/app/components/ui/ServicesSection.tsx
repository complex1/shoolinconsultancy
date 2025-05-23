'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the Service type
type Service = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  iconUrl: string;
  slug: string;
  featured: boolean;
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services?featured=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Unable to load services. Please try again later.');
        // Use fallback data if API fails
        setServices([
          {
            id: 1,
            title: 'Business Consulting',
            description: 'Strategic business consulting to optimize operations, enhance productivity, and drive sustainable growth.',
            longDescription: 'Detailed business consulting services description',
            iconUrl: '/icons/business.svg',
            slug: 'business',
            featured: true
          },
          {
            id: 2,
            title: 'Financial Advisory',
            description: 'Expert financial guidance to help you make informed decisions, manage resources, and achieve financial stability.',
            longDescription: 'Detailed financial advisory services description',
            iconUrl: '/icons/finance.svg',
            slug: 'financial',
            featured: true
          },
          {
            id: 3,
            title: 'Strategic Planning',
            description: 'Comprehensive strategic planning services to align your vision with practical, actionable business initiatives.',
            longDescription: 'Detailed strategic planning services description',
            iconUrl: '/icons/strategy.svg',
            slug: 'strategy',
            featured: true
          },
          {
            id: 4,
            title: 'Digital Transformation',
            description: 'Transform your business with cutting-edge digital solutions that enhance efficiency and customer experience.',
            longDescription: 'Detailed digital transformation services description',
            iconUrl: '/icons/digital.svg',
            slug: 'digital',
            featured: true
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-slideUp">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-3 sm:mb-4">Our Services</h2>
          <p className="text-gray-600 text-base sm:text-lg px-4 sm:px-0">
            We provide comprehensive consulting services to help businesses thrive in today&apos;s competitive landscape.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 animate-slideUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-5 sm:p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5 sm:mb-6 mx-auto">
                    <Image 
                      src={service.iconUrl}
                      alt={service.title}
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base mb-4">{service.description}</p>
                  <div className="text-center">
                    <Link href={`/services#${service.slug}`} className="text-blue-800 font-medium hover:text-blue-600 flex items-center justify-center gap-1 group">
                      Learn more 
                      <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

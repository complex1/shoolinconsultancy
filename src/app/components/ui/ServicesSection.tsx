'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const services = [
  {
    id: 'business',
    title: 'Business Consulting',
    description: 'Strategic business consulting to optimize operations, enhance productivity, and drive sustainable growth.',
    icon: '/icons/business.svg',
  },
  {
    id: 'financial',
    title: 'Financial Advisory',
    description: 'Expert financial guidance to help you make informed decisions, manage resources, and achieve financial stability.',
    icon: '/icons/finance.svg',
  },
  {
    id: 'strategy',
    title: 'Strategic Planning',
    description: 'Comprehensive strategic planning services to align your vision with practical, actionable business initiatives.',
    icon: '/icons/strategy.svg',
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    description: 'Transform your business with cutting-edge digital solutions that enhance efficiency and customer experience.',
    icon: '/icons/digital.svg',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-slideUp">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-3 sm:mb-4">Our Services</h2>
          <p className="text-gray-600 text-base sm:text-lg px-4 sm:px-0">
            We provide comprehensive consulting services to help businesses thrive in today&apos;s competitive landscape.
          </p>
        </div>

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
                    src={service.icon}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2">{service.title}</h3>
                <p className="text-gray-600 text-center text-sm sm:text-base mb-4">{service.description}</p>
                <div className="text-center">
                  <Link href={`/services#${service.id}`} className="text-blue-800 font-medium hover:text-blue-600 flex items-center justify-center gap-1 group">
                    Learn more 
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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

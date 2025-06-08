'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeInView } from '../ui/Animations';
import ServiceEntity from '@/entities/services.entities';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/services?featured=true');

        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        setServices(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Unable to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-maroon-900/5 to-transparent relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url(/patterns/indian-pattern.svg)',
          backgroundSize: '64px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="container mx-auto relative px-4 sm:px-6">
        <FadeInView>
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-gold-400/10 text-gold-400 text-sm font-medium mb-6">
              धर्मो रक्षति रक्षितः
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-maroon-900 mb-4">
              Areas of Practice
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mx-auto mb-6" />
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              Our team of experienced attorneys provides comprehensive legal services,
              combining modern expertise with traditional values to serve justice.
            </p>
          </div>
        </FadeInView>

        {loading ? (
          <div className="flex justify-center">
            <motion.div
              className="h-12 w-12 border-4 border-black-700 rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
              />
            ))}
          </div>
        )}

        <FadeInView delay={0.2}>
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-black-700 
                         text-black-700 hover:text-white hover:bg-black-700 font-semibold rounded-lg 
                         transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">View All Practice Areas</span>
              <div className="absolute inset-0 bg-gradient-to-r from-black-700 to-black-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

export default ServicesSection;

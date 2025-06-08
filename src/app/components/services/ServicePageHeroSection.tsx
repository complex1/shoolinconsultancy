import Link from 'next/link';
import React from 'react';

const ServicePageHeroSection: React.FC<{ handleScheduleConsultation: () => void }> = ({handleScheduleConsultation}) => {
  return (
    <section className="relative bg-gradient-to-br from-black-900 via-black-700 to-black-600 py-24">
      <div className="absolute inset-0 bg-[url('/patterns/indian-pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white animate-fadeIn">
            Legal Services
          </h1>
          <p className="text-xl text-gold-200 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            Expert legal representation with a commitment to justice and client success
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => handleScheduleConsultation()}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Schedule Consultation
            </button>
            <Link
              href="#services"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 border border-white/20"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePageHeroSection;
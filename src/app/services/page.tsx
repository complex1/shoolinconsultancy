'use client';

import { useEffect, useState } from 'react';
import Image from 'next/link';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel, 
  faHandcuffs, 
  faScaleBalanced, 
  faLaptopCode, 
  faHome, 
  faFileContract,
  faShield,
  faUserTie,
  faFileSignature,
  faBalanceScale,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import ConsultationPopover from '../components/ui/ConsultationPopover';
import ServicePageHeroSection from '../components/services/ServicePageHeroSection';
import ServiceCard from '../components/services/ServiceCard';

export interface LegalService {
  id: string;
  title: string;
  description: string;
  icon: any; // IconDefinition from @fortawesome/react-fontawesome
  longDescription: string;
}

export default function Services() {
  const [legalServices, setLegalServices] = useState<LegalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);

  const handleScheduleConsultation = (service: LegalService | null = null) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const fetchLegalServices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/public/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setLegalServices(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching legal services:', error);
      setLegalServices([]);
      setLoading(false);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching services');
    }
  };
  // Fetch legal services on component mount
  useEffect(() => {
    fetchLegalServices();
  }, []);

  return (
    <>
      {/* Hero section with premium law firm styling */}
      <ServicePageHeroSection handleScheduleConsultation={handleScheduleConsultation} />

      {/* Services navigation */}
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto py-4 space-x-6 justify-start px-4 md:justify-center">
            {legalServices.map(service => (
              <a 
                key={service.id} 
                href={`#${service.id}`}
                className="text-black-700 hover:text-gold-600 whitespace-nowrap text-sm md:text-base font-medium px-3 py-2 hover:bg-black-50 rounded-md transition-colors"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      {loading && <p className='text-lg text-gray-600'>Loading services...</p>}
      {error && <p>Error fetching services: {error}</p>}
      {!loading && !error && legalServices.length === 0 && (
        <div className="container mx-auto text-center py-16">
          <p className="text-lg text-gray-600">No legal services available at the moment.</p>
        </div>
      )}

      {/* Services Cards */}
      <div className="py-16 bg-neutral-50" id="services">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {legalServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                index={index}
                service={service}
                handleScheduleConsultation={() => handleScheduleConsultation(service)}  
              />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-black-800 to-black-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/indian-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Need Legal Assistance?
            </h2>
            <p className="text-lg text-gold-200 mb-8">
              Our experienced team of lawyers is here to help. Schedule a consultation today.
            </p>
            <button
              onClick={() => handleScheduleConsultation()}
              className="inline-block px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contact Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Schedule Popover */}
      <ConsultationPopover
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attorney={{
          name: "Senior Legal Advisor",
          title: "Legal Consultant",
          role: "Legal Consultation",
          specialization: selectedService ? selectedService.title : "Legal Services"
        }}
      />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import ConsultationPopover from '../../components/ui/ConsultationPopover';
import { useParams } from 'next/navigation';

export default function ServiceDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<{
    id: string;
    title: string;
    description: string;
    icon: any; // IconDefinition from @fortawesome/react-fontawesome
    longDescription: string;
  } | null>(null);
  
  // Get params from useParams hook
  const params = useParams();
  const serviceId = params.id as string;

  // Fetch service details based on serviceId
  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public/services/${serviceId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch service details');
        }
        const data = await response.json();
        setService(data.data || null);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-black-700 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-black-700 mb-4">Service Not Found</h1>
          <Link 
            href="/services"
            className="text-gold-600 hover:text-gold-700"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black-800 via-black-700 to-black-600 py-20">
        <div className="absolute inset-0 bg-[url('/patterns/indian-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <Link
            href="/services"
            className="inline-flex items-center text-gold-200 hover:text-gold-100 mb-8 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <img src={service.icon} className="w-10 h-10 text-gold-200" />
              </div>
              <h1 className="text-4xl font-bold text-white">{service.title}</h1>
            </div>
            <p className="text-xl text-gold-200 mb-8">
              {service.description}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              {service.longDescription.split('\n\n').map((paragraph: string, idx: number) => (
                <div key={idx} className="mb-8">
                  {paragraph.includes('•') ? (
                    <>
                      <h3 className="text-xl font-bold text-black-700 mb-4">
                        {paragraph.split(':')[0]}:
                      </h3>
                      <ul className="space-y-3">
                        {paragraph.split('\n').map((item: string, i: number) => (
                          item.startsWith('•') && (
                            <li key={i} className="flex items-start">
                              <span className="text-gold-500 mr-2">•</span>
                              <span className="text-gray-700">{item.replace('•', '').trim()}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-gray-700">{paragraph}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-br from-maroon-50 to-white rounded-xl border border-maroon-100">
              <h2 className="text-2xl font-bold text-black-700 mb-4">
                Ready to Discuss Your Case?
              </h2>
              <p className="text-gray-600 mb-6">
                Our experienced legal team is here to help you navigate through your {service.title.toLowerCase()} case.
                Schedule a consultation to discuss your specific situation.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-black-700 to-black-600 hover:from-black-600 hover:to-black-500 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      <ConsultationPopover
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attorney={{
          name: "Senior Legal Advisor",
          title: "Legal Consultant",
          role: "Advisor",
          specialization: service.title
        }}
      />
    </>
  );
}

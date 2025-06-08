import { LegalService } from '@/app/services/page';
import { faArrowRight, faGavel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

interface ServiceCardProps {
  service: LegalService;
  index: number;
  handleScheduleConsultation: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, handleScheduleConsultation }) => {
  return (
    <div
      id={service.id}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Header with Icon */}
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maroon-100 to-maroon-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
            <img
              src={service.icon}
              className="w-8 h-8 text-maroon-600"
            />
          </div>
          <h3 className="text-xl font-bold text-black-700">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 mb-6 line-clamp-2">
          {service.description}
        </p>
        <div className="space-y-4">
          {service.longDescription.split('\n\n').slice(0, 1).map((paragraph, idx) => (
            <div key={idx} className="text-sm text-gray-600">
              <p className="line-clamp-3">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-4 border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <Link
            href={`/services/${service.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black-700 hover:text-black-600 border border-black-200 hover:border-black-300 rounded-lg font-medium transition-colors duration-300 group"
          >
            Learn More
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            />
          </Link>
          {/* <button
            onClick={handleScheduleConsultation}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-black-700 to-black-600 hover:from-black-600 hover:to-black-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <FontAwesomeIcon icon={faGavel} className="w-4 h-4" />
            <span>Consult Now</span>
          </button> */}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-100/20 via-gold-200/10 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-maroon-100/10 via-maroon-200/5 to-transparent rounded-tr-full"></div>
    </div>
  );
};

export default ServiceCard;
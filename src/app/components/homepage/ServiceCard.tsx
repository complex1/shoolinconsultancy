import ServiceEntity from '@/entities/services.entities';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ServiceCard: React.FC<{ service: ServiceEntity }> = ({ service }) => {
  return (
    <div
      className="p-6 rounded-lg bg-gradient-to-r from-black-700 to-black-600 border border-gold-400/20 transform transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mr-4">
          {service.iconUrl ? <img
            src={service.iconUrl}
            alt={service.title}
            width={24}
            height={24}
            className="text-gold-400"
          /> : <FontAwesomeIcon icon={faStar} className="text-gold-400" />}
        </div>
        <h3 className="text-xl font-semibold text-gold-400">{service.title}</h3>
      </div>
      <p className="text-gray-300">{service.description}</p>
    </div>
  );
};

export default ServiceCard;
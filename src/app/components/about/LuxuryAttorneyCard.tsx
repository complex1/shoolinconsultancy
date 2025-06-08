'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedinIn, 
  faTwitter, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope,
  faArrowRight,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import ConsultationPopover from '../ui/ConsultationPopover';

interface Attorney {
  id?: number;
  name: string;
  title: string;
  role: string;
  specialization: string;
  image?: string;
  email?: string;
  phone?: string;
  bio?: string;
  education?: string[];
  certifications?: string[];
  awards?: string[];
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

interface LuxuryAttorneyCardProps {
  attorney: Attorney;
  index: number;
}

const LuxuryAttorneyCard: React.FC<LuxuryAttorneyCardProps> = ({
  attorney,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    name, 
    title, 
    specialization, 
    image,
    linkedIn, 
    twitter,
    instagram,
    email
  } = attorney;

  const handleScheduleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 }
        }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative" 
      >
        {/* Simple elegant shadow effect on hover */}
        <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative z-10 bg-white">
          <div className="flex flex-col h-full">
            {/* Image section with clean overlay */}
            <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
              {/* Status indicator */}
              <div className="absolute top-3 right-3 z-20">
                <div className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-white"></div>
              </div>
              
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-neutral-200">
                    <img
                      src="/team/attorney1.svg"
                      alt={name}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Simple elegant overlay on hover */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black-700/90 to-black-700/30 p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <p className="text-white text-sm leading-normal mb-3 line-height-[1.4]">
                    <span className="text-gold-300 font-medium">Expertise:</span> {specialization}
                  </p>
                  
                  <div className="flex space-x-2">
                    {email && (
                      <Link href={`mailto:${email}`} className="w-8 h-8 rounded-full bg-white/20 hover:bg-gold-400 flex items-center justify-center transition-all duration-300" aria-label={`Email ${name}`}>
                        <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-white" />
                      </Link>
                    )}
                    {linkedIn && (
                      <Link href={linkedIn} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/20 hover:bg-gold-400 flex items-center justify-center transition-all duration-300" aria-label={`${name}'s LinkedIn profile`}>
                        <FontAwesomeIcon icon={faLinkedinIn} className="w-3.5 h-3.5 text-white" />
                      </Link>
                    )}
                    {twitter && (
                      <Link href={twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/20 hover:bg-gold-400 flex items-center justify-center transition-all duration-300" aria-label={`${name}'s Twitter profile`}>
                        <FontAwesomeIcon icon={faTwitter} className="w-3.5 h-3.5 text-white" />
                      </Link>
                    )}
                    {instagram && (
                      <Link href={instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/20 hover:bg-gold-400 flex items-center justify-center transition-all duration-300" aria-label={`${name}'s Instagram profile`}>
                        <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5 text-white" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Clean info section */}
            <div className="p-5 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-black-700 group-hover:text-black-600 transition-colors duration-300 leading-tight mb-1.5">{name}</h3>
              <p className="text-gold-500 text-sm mb-3 font-medium leading-normal">{title}</p>
              
              <div className="text-neutral-600 text-xs mb-4 leading-relaxed">
                <span className=" py-1 rounded">{specialization}</span>
              </div>
              
              {/* Simplified action buttons */}
              <div className="mt-auto pt-3 flex flex-col space-y-2">
                {/* <button
                  onClick={handleScheduleClick}
                  className="w-full px-4 py-2.5 bg-black-700 hover:bg-black-600 text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center leading-relaxed"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                  <span>Schedule Consultation</span>
                </button> */}
                <Link 
                  href={`/team/${attorney.id?.toString() || (name && name.toLowerCase().replace(/\s+/g, '-')) || 'profile'}`}
                  className="w-full px-4 py-2.5 bg-white border border-gold-400 text-black-700 text-sm font-medium rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-gold-50 leading-relaxed"
                >
                  <span className="flex items-center">
                    <span>View Profile</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 flex-shrink-0" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Schedule Modal */}
      <ConsultationPopover 
        isOpen={isModalOpen}
        onClose={handleModalClose} 
        attorney={{
          ...attorney,
          role: attorney.title // Use title as role since it's required by ConsultationPopover
        }}
      />
    </>
  );
};

export default LuxuryAttorneyCard;

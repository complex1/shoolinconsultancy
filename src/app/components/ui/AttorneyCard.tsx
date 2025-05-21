'use client';

import { useState } from 'react';

interface AttorneyCardProps {
  name: string;
  title: string;
  specialization: string;
  image?: string;
  animationDelay?: string;
}

const AttorneyCard: React.FC<AttorneyCardProps> = ({
  name,
  title,
  specialization,
  image,
  animationDelay = '0ms',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group animate-fadeIn" 
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="bg-gradient-to-b from-blue-100 to-blue-50 aspect-[3/4] flex items-center justify-center">
          {/* Profile image */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-95">
            <div className="w-full h-full bg-blue-200 flex items-center justify-center">
              {image ? (
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-800/50" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent transition-opacity duration-300 flex items-end ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="p-4 text-white animate-slideUp" style={{ animationPlayState: isHovered ? 'running' : 'paused' }}>
            <p className="text-sm">{specialization}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-blue-800">{name}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default AttorneyCard;

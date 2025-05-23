'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AttorneyCard from './AttorneyCard';

interface Attorney {
  id?: number;
  name: string;
  title: string;
  specialization: string;
  image?: string;
}

interface AttorneysSectionProps {
  title?: string;
  description?: string;
  attorneys?: Attorney[];
  className?: string;
  showContact?: boolean;
  showViewMore?: boolean;
  contactText?: string;
  viewMoreText?: string;
  contactLink?: string;
  viewMoreLink?: string;
}

const DEFAULT_ATTORNEYS: Attorney[] = [
  {
    name: "Michael Richardson",
    title: "Managing Partner",
    specialization: "Specializing in corporate law, mergers & acquisitions, and business strategy",
  },
  {
    name: "Sophia Martinez",
    title: "Senior Legal Counsel",
    specialization: "Expertise in intellectual property, patent law, and technology regulations",
  },
  {
    name: "David Johnson",
    title: "International Legal Advisor",
    specialization: "Focused on international business law, trade compliance, and global regulations",
  },
  {
    name: "Rebecca Wong",
    title: "Compliance Specialist",
    specialization: "Specialized in financial regulations, compliance, and corporate governance",
  },
];

const AttorneysSection: React.FC<AttorneysSectionProps> = ({ 
  title = "Meet Our Expert Attorneys", 
  description = "Our team of highly qualified attorneys brings decades of combined experience across multiple practice areas to provide exceptional legal counsel.",
  attorneys: initialAttorneys,
  className = "py-16 bg-white",
  showContact = true,
  showViewMore = true,
  contactText = "Schedule a Consultation",
  viewMoreText = "View Full Team",
  contactLink = "/contact",
  viewMoreLink = "/team"
}) => {
  const [attorneys, setAttorneys] = useState<Attorney[]>(initialAttorneys || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialAttorneys);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialAttorneys) {
      const fetchTeamMembers = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('/api/team');
          
          if (!response.ok) {
            throw new Error('Failed to fetch team data');
          }
          
          const data = await response.json();
          setAttorneys(data);
        } catch (err) {
          console.error('Error fetching team members:', err);
          setError('Failed to load team members');
          setAttorneys(DEFAULT_ATTORNEYS);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchTeamMembers();
    }
  }, [initialAttorneys]);

  return (
    <section className={className}>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4 animate-fadeIn">{title}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '100ms' }}>
              {description}
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {attorneys.map((attorney, index) => (
                <AttorneyCard
                  key={attorney.id || attorney.name + index}
                  name={attorney.name}
                  title={attorney.title}
                  specialization={attorney.specialization}
                  image={attorney.image}
                  animationDelay={`${index * 150}ms`}
                />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center space-x-4">
            {showContact && (
              <Link 
                href={contactLink} 
                className="btn btn-primary inline-block bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 animate-fadeIn"
                style={{ animationDelay: '600ms' }}
              >
                {contactText}
              </Link>
            )}
            {showViewMore && (
              <Link 
                href={viewMoreLink}
                className="btn btn-secondary inline-block bg-white border border-blue-800 text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 animate-fadeIn"
                style={{ animationDelay: '750ms' }}
              >
                {viewMoreText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneysSection;

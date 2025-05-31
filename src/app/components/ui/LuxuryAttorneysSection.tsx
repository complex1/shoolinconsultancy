'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faArrowRight, faGavel } from '@fortawesome/free-solid-svg-icons';
import LuxuryAttorneyCard from './LuxuryAttorneyCard';

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

interface LuxuryAttorneysSectionProps {
  title?: string;
  subtitle?: string;
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
    role: "Corporate Law",
    specialization: "Specializing in corporate law with over 20 years of experience in mergers & acquisitions, business strategy, and international regulatory compliance.",
    image: "/team/attorney1.svg",
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "michael@shoolinconsultancy.com"
  },
  {
    name: "Sophia Martinez",
    title: "Senior Legal Counsel",
    role: "Intellectual Property",
    specialization: "Expert in intellectual property law, patent litigation, and technology regulations with particular focus on emerging tech and international IP protection.",
    image: "/team/attorney2.svg",
    linkedIn: "https://linkedin.com",
    instagram: "https://instagram.com",
    email: "sophia@shoolinconsultancy.com"
  },
  {
    name: "David Johnson",
    title: "International Legal Advisor",
    role: "International Law",
    specialization: "Focused on international business law, cross-border transactions, trade compliance, and global regulatory frameworks with experience in 15+ countries.",
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "david@shoolinconsultancy.com"
  },
  {
    name: "Rebecca Wong",
    title: "Compliance Specialist",
    role: "Financial Regulations",
    specialization: "Specialized in financial regulations, corporate governance, risk management, and compliance strategies for both domestic and multinational corporations.",
    linkedIn: "https://linkedin.com",
    email: "rebecca@shoolinconsultancy.com"
  },
];

const LuxuryAttorneysSection: React.FC<LuxuryAttorneysSectionProps> = ({ 
  title = "Meet Our Distinguished Legal Team", 
  subtitle = "Excellence & Expertise",
  description = "Our team of highly qualified attorneys brings decades of combined experience across multiple practice areas, providing sophisticated legal counsel tailored to your unique needs.",
  attorneys: initialAttorneys,
  className = "py-24 bg-white",
  showContact = true,
  showViewMore = true,
  contactText = "Schedule a Consultation",
  viewMoreText = "View Complete Team",
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
    <section className={`${className} relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary-light/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-light/10 rounded-full blur-3xl"></div>
        
        {/* Subtle animated elements */}
        <motion.div 
          className="absolute top-1/4 left-10 w-32 h-32 rounded-full border border-secondary-main/20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full border border-primary-main/10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-main/5 border border-secondary-main/30 mb-4"
            >
              <span className="text-secondary-main text-sm font-medium">{subtitle}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-primary-main mb-6"
            >
              {title}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary-main to-transparent"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-neutral-600 text-lg max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          </div>
          
          {/* Team grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-secondary-main/30 border-t-secondary-main animate-spin"></div>
                <div className="absolute inset-3 rounded-full border border-primary-main/20"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-primary-main py-8 bg-neutral-100 rounded-lg border border-primary-light/20">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {attorneys.map((attorney, index) => (
                <LuxuryAttorneyCard
                  key={attorney.id || attorney.name + index}
                  attorney={attorney}
                  index={index}
                />
              ))}
            </div>
          )}
          
          {/* Actions */}
          {(showContact || showViewMore) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            >
              {showContact && (
                <Link
                  href={contactLink}
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold 
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <span className="relative z-10">{contactText}</span>
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ scale: [0.8, 1], opacity: [0, 1] }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-gold-300/40 to-gold-400/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ scale: [0.8, 1.2], opacity: [0, 0.6] }}
                    transition={{ duration: 0.4 }}
                  />
                </Link>
              )}
              {showViewMore && (
                <Link
                  href={viewMoreLink}
                  className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-neutral-200 text-neutral-700 
                    font-semibold hover:bg-neutral-50 transition-all duration-300 hover:border-gold-300"
                >
                  {viewMoreText}
                </Link>
              )}
            </motion.div>
          )}
          
          {/* Decorative legal icon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center mt-16 opacity-10"
          >
            <FontAwesomeIcon icon={faGavel} className="w-12 h-12 text-primary-main" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryAttorneysSection;

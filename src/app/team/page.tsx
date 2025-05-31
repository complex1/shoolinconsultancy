'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faGavel, faBalanceScale, faUserTie, faHandshake, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import LuxuryAttorneyCard from '../components/ui/LuxuryAttorneyCard';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  role: string; // Required by the Attorney interface in LuxuryAttorneyCard
  specialization: string;
  image?: string;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

// Add type definitions at the top of the file
interface GalleryMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  poster?: string;
}

// Gallery images and videos
const galleryMedia: GalleryMedia[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
    alt: 'Team Meeting',
    caption: 'Strategy Discussion'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80',
    alt: 'Legal Consultation', 
    caption: 'Client Consultation'
  },
  {
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-business-meeting-in-a-conference-room-4561/preview/coverr-business-meeting-in-a-conference-room-4561-preview.mp4',
    poster: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
    alt: 'Business Meeting',
    caption: 'Corporate Strategy Session'
  },
  {
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80',
    alt: 'Law Library',
    caption: 'Legal Research Center'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80', 
    alt: 'Business Meeting',
    caption: 'Corporate Legal Planning'
  },
  {
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-typing-on-computer-in-office-1584/preview/coverr-typing-on-computer-in-office-1584-preview.mp4',
    poster: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    alt: 'Office Work',
    caption: 'Legal Documentation'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80',
    alt: 'Legal Research',
    caption: 'Case Research & Analysis'
  },
  {
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    alt: 'Strategy Session',
    caption: 'Legal Strategy Development'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80',
    alt: 'Office Interior',
    caption: 'Modern Legal Workspace'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    alt: 'Legal Team',
    caption: 'Our Expert Legal Team'
  }
];

export default function TeamPage() {
  // Default team members data
  const defaultTeamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Michael Richardson",
      title: "Managing Partner",
      role: "Managing Partner",
      specialization: "Corporate Law, Mergers & Acquisitions",
      image: "/team/attorney1.svg",
      email: "michael@shoolinconsultancy.com",
      linkedIn: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      id: 2,
      name: "Sophia Martinez",
      title: "Senior Legal Counsel",
      role: "Senior Legal Counsel",
      specialization: "Intellectual Property Law",
      image: "/team/attorney2.svg",
      email: "sophia@shoolinconsultancy.com",
      linkedIn: "https://linkedin.com",
      instagram: "https://instagram.com"
    },
    {
      id: 3,
      name: "David Johnson",
      title: "International Legal Advisor",
      role: "Legal Advisor",
      specialization: "International Business Law",
      email: "david@shoolinconsultancy.com",
      linkedIn: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      id: 4,
      name: "Rebecca Wong",
      title: "Compliance Specialist",
      role: "Compliance Specialist",
      specialization: "Financial Regulations",
      email: "rebecca@shoolinconsultancy.com",
      linkedIn: "https://linkedin.com"
    },
    {
      id: 5,
      name: "James Sullivan",
      title: "Litigation Director",
      role: "Litigation Director",
      specialization: "Civil Litigation",
      image: "/team/attorney1.svg",
      email: "james@shoolinconsultancy.com",
      linkedIn: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      id: 6,
      name: "Aisha Patel",
      title: "Real Estate Partner",
      role: "Real Estate Partner",
      specialization: "Real Estate Law",
      image: "/team/attorney2.svg",
      email: "aisha@shoolinconsultancy.com",
      linkedIn: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  ];

  const [teamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const stats = [
    { icon: faUserTie, value: '25+', label: 'Expert Attorneys' },
    { icon: faGavel, value: '1000+', label: 'Cases Won' },
    { icon: faHandshake, value: '15+', label: 'Years Experience' },
    { icon: faBuilding, value: '5', label: 'Office Locations' },
    { icon: faBalanceScale, value: '98%', label: 'Success Rate' }
  ];

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % galleryMedia.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
  };

  return (
    <>
      {/* Enhanced Hero section */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/patterns/indian-pattern.svg')" }}></div>
        </div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-gold-400/30 via-gold-500/20 to-transparent rounded-br-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-gold-400/30 via-gold-500/20 to-transparent rounded-tl-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6"
            >
              Meet Our Distinguished Legal Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-secondary-light mb-12 max-w-2xl mx-auto"
            >
              A team of dedicated legal professionals committed to excellence and client success
            </motion.p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={stat.icon} className="w-6 h-6 text-secondary-main" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-100 mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary-light">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section with Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Legal Experts</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Each member of our team brings unique expertise and a commitment to excellence in their respective areas of practice.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <LuxuryAttorneyCard
                  key={member.id}
                  attorney={member}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section with Masonry Grid */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Life at Shoolin Consultancy</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Experience the professional and collaborative environment that defines our legal practice
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
              {galleryMedia.map((media, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300
                    ${index === 0 || index === 3 || index === 8 ? 'md:col-span-2 md:row-span-2' : ''}
                    ${index === 4 ? 'md:col-span-2' : ''}
                  `}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedMedia(galleryMedia[index]);
                  }}
                >
                  {media.type === 'image' ? (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <video
                        className="w-full h-full object-cover"
                        poster={media.poster}
                        playsInline
                        muted
                        loop
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => e.currentTarget.pause()}
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">{media.alt}</h3>
                      <p className="text-gold-200 text-sm">{media.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Media Modal with Carousel */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="relative max-w-7xl w-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative"
              >
                {selectedMedia.type === 'image' ? (
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    width={1920}
                    height={1080}
                    className="object-contain rounded-lg"
                    priority
                  />
                ) : (
                  <video
                    className="w-full rounded-lg"
                    controls
                    autoPlay
                    poster={selectedMedia.poster}
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMedia(null);
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                  </button>
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-white font-semibold text-xl mb-2">{selectedMedia.alt}</h3>
                  <p className="text-gold-200">{selectedMedia.caption}</p>
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-white text-xl" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-white text-xl" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Join Our Team Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/patterns/indian-pattern.svg')" }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Team</h2>
            <p className="text-xl text-gold-300 mb-10 max-w-2xl mx-auto">
              We're always looking for exceptional legal talent to join our team. If you're passionate about law and excellence, we'd love to hear from you.
            </p>
            <Link 
              href="/team/jobs" 
              className="inline-block px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

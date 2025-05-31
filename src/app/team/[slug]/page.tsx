'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useParams, useRouter } from 'next/navigation';
import ConsultationPopover from '../../components/ui/ConsultationPopover';

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
  experience?: string;
  languages?: string[];
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

// Sample attorney data - in a real application, this would come from an API or database
const DEFAULT_ATTORNEYS: Attorney[] = [
  {
    id: 1,
    name: "Michael Richardson",
    title: "Managing Partner",
    specialization: "Corporate Law, Mergers & Acquisitions",
    image: "/team/attorney1.svg",
    email: "michael@shoolinconsultancy.com",
    phone: "+91 98765 43210",
    bio: "Michael brings over 20 years of experience in corporate law with a focus on mergers & acquisitions, business strategy, and international regulatory compliance. He has successfully advised Fortune 500 companies on complex cross-border transactions and strategic partnerships across Asia-Pacific regions. His distinctive approach combines legal acumen with a deep understanding of business operations, enabling his clients to achieve their strategic objectives while minimizing legal risks.",
    education: [
      "J.D., Harvard Law School",
      "MBA, Stanford University",
      "B.A. in Economics, Delhi University"
    ],
    certifications: [
      "Certified Merger & Acquisition Specialist",
      "Corporate Governance Professional"
    ],
    awards: [
      "Legal Excellence Award, Asian Legal Business 2023",
      "Top 50 Managing Partners in India, Legal Times 2022"
    ],
    experience: "20+ years",
    languages: ["English", "Hindi", "Mandarin"],
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    role: ''
  },
  {
    id: 2,
    name: "Sophia Martinez",
    title: "Senior Legal Counsel",
    specialization: "Intellectual Property Law, Patent Litigation",
    image: "/team/attorney2.svg",
    email: "sophia@shoolinconsultancy.com",
    phone: "+91 98765 43211",
    bio: "Sophia is a distinguished intellectual property lawyer with expertise in patent litigation, technology regulations, and international IP protection. She has represented global technology companies in high-stakes patent disputes and helped numerous startups develop comprehensive IP strategies. Her background in computer science gives her unique insight into technical aspects of IP cases, particularly in emerging technology sectors.",
    education: [
      "J.D., Yale Law School",
      "B.S. in Computer Science, MIT"
    ],
    certifications: [
      "Registered Patent Attorney",
      "Certified IP Valuation Analyst"
    ],
    awards: [
      "IP Lawyer of the Year, Legal Innovation Awards 2023",
      "Women in Law Excellence Award, 2022"
    ],
    experience: "15+ years",
    languages: ["English", "Spanish", "French"],
    linkedIn: "https://linkedin.com",
    instagram: "https://instagram.com",
    role: ''
  },
  {
    id: 3,
    name: "David Johnson",
    title: "International Legal Advisor",
    specialization: "International Business Law, Trade Compliance",
    email: "david@shoolinconsultancy.com",
    phone: "+91 98765 43212",
    bio: "David specializes in international business law with extensive experience in cross-border transactions, trade compliance, and global regulatory frameworks. He has advised on major international joint ventures and has helped businesses navigate the complex legal environments of over 15 countries. His approach emphasizes practical solutions that align with both local requirements and international best practices.",
    education: [
      "LL.M. in International Law, London School of Economics",
      "J.D., Columbia Law School",
      "B.A. in International Relations, Georgetown University"
    ],
    certifications: [
      "Certified International Trade Professional",
      "Global Legal Compliance Specialist"
    ],
    awards: [
      "International Legal Advisor of the Year, Global Legal Awards 2023"
    ],
    experience: "18+ years",
    languages: ["English", "German", "Japanese"],
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    role: ''
  },
  {
    id: 4,
    name: "Rebecca Wong",
    title: "Compliance Specialist",
    specialization: "Financial Regulations, Corporate Governance",
    email: "rebecca@shoolinconsultancy.com",
    phone: "+91 98765 43213",
    bio: "Rebecca is a seasoned compliance specialist focusing on financial regulations, corporate governance, and risk management for both domestic and multinational corporations. She has guided numerous organizations through regulatory investigations and helped establish robust compliance frameworks that balance business objectives with regulatory requirements. Her proactive approach to compliance has helped clients prevent legal issues before they arise.",
    education: [
      "J.D., University of Chicago Law School",
      "M.S. in Finance, London Business School",
      "B.Com, University of Mumbai"
    ],
    certifications: [
      "Certified Compliance & Ethics Professional",
      "Anti-Money Laundering Specialist"
    ],
    awards: [
      "Corporate Governance Excellence Award, 2023",
      "Risk Management Professional of the Year, 2021"
    ],
    experience: "16+ years",
    languages: ["English", "Mandarin", "Cantonese"],
    linkedIn: "https://linkedin.com",
    role: ''
  },
  {
    id: 5,
    name: "James Sullivan",
    title: "Litigation Director",
    specialization: "Civil Litigation, Class Actions",
    image: "/team/attorney1.svg",
    email: "james@shoolinconsultancy.com",
    phone: "+91 98765 43214",
    bio: "James is a seasoned litigator with extensive courtroom experience handling complex disputes, class actions, and high-profile cases across multiple jurisdictions. His strategic litigation approach and exceptional oral advocacy have resulted in landmark victories for his clients. James combines meticulous preparation with persuasive presentation, making him particularly effective in jury trials and appellate proceedings.",
    education: [
      "J.D., Stanford Law School",
      "B.A. in Philosophy, Oxford University"
    ],
    certifications: [
      "Certified Trial Advocate",
      "Advanced Mediation Certification"
    ],
    awards: [
      "Litigator of the Year, National Law Journal 2022",
      "Top 100 Trial Lawyers, 2023"
    ],
    experience: "22+ years",
    languages: ["English", "Italian"],
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    role: ''
  },
  {
    id: 6,
    name: "Aisha Patel",
    title: "Real Estate & Construction Law Partner",
    specialization: "Real Estate Transactions, Construction Contracts",
    image: "/team/attorney2.svg",
    email: "aisha@shoolinconsultancy.com",
    phone: "+91 98765 43215",
    bio: "Aisha specializes in real estate transactions, construction contracts, land use regulations, and property dispute resolution for commercial and residential developments. She has represented developers, investors, and corporations in projects valued at over $2 billion combined. Her expertise in navigating complex zoning regulations and negotiating favorable terms has made her a trusted advisor for major real estate ventures throughout India and Southeast Asia.",
    education: [
      "J.D., University of Michigan Law School",
      "B.Arch, National Institute of Design",
      "Real Estate Development Certification, Harvard University"
    ],
    certifications: [
      "Real Estate Law Specialist",
      "Construction Contract Arbitrator"
    ],
    awards: [
      "Real Estate Lawyer of the Year, Property Legal Awards 2023",
      "Women in Construction Law Excellence Award, 2022"
    ],
    experience: "17+ years",
    languages: ["English", "Hindi", "Gujarati", "Arabic"],
    linkedIn: "https://linkedin.com",
    instagram: "https://instagram.com",
    role: ''
  }
];

export default function AttorneyProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [attorney, setAttorney] = useState<Attorney | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    
    // In a real application, you would fetch this data from an API
    // For now, we're using our sample data and finding by name converted to slug
    const foundAttorney = DEFAULT_ATTORNEYS.find(
      atty => atty.id?.toString() === slug || 
      atty.name.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (foundAttorney) {
      setAttorney(foundAttorney);
    }
    
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin"></div>
          <div className="absolute inset-3 rounded-full border border-black-700/20"></div>
        </div>
      </div>
    );
  }

  if (!attorney) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 p-4">
        <h2 className="text-2xl font-bold text-black-700 mb-4">Attorney Not Found</h2>
        <p className="text-neutral-600 mb-8">We couldn't find the attorney profile you're looking for.</p>
        <Link 
          href="/team" 
          className="px-6 py-3 bg-black-700 text-white rounded-lg flex items-center gap-2 hover:bg-black-600 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          <span>Back to Team</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <main className="bg-gradient-to-b from-white to-neutral-50 min-h-screen">
        {/* Hero section */}
        <section className="relative bg-gradient-to-br from-black-800 via-black-700 to-black-600 pt-32 pb-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/patterns/indian-pattern.svg"
              alt="Background Pattern"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-gold-400/20 via-gold-500/10 to-transparent rounded-br-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tl from-gold-400/20 via-gold-500/10 to-transparent rounded-tl-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <Link 
                href="/team" 
                className="inline-flex items-center text-gold-400 hover:text-gold-300 transition-colors mb-8"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-4 h-4" />
                <span>Back to Team</span>
              </Link>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Profile Image with gold border */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-gold-300/30 shadow-2xl flex-shrink-0"
                >
                  {attorney.image ? (
                    <Image 
                      src={attorney.image} 
                      alt={attorney.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-black-600 to-black-700 flex items-center justify-center">
                      <div className="text-6xl font-bold text-white/20">
                        {attorney.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-400/40 rounded-tl"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-400/40 rounded-br"></div>
                </motion.div>
                
                {/* Profile info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-grow text-center md:text-left"
                >
                  <div className="inline-block px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium mb-4">
                    {attorney.specialization}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{attorney.name}</h1>
                  <p className="text-xl text-gold-300 mb-6">{attorney.title}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
                    <button 
                      onClick={() => setShowScheduleModal(true)}
                      className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-gold-600/20 transition-all transform hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" />
                      <span>Schedule Consultation</span>
                    </button>
                    
                    {attorney.email && (
                      <Link 
                        href={`mailto:${attorney.email}`} 
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                        <span>Contact</span>
                      </Link>
                    )}
                  </div>
                  
                  <div className="flex gap-3 justify-center md:justify-start">
                    {attorney.linkedIn && (
                      <Link 
                        href={attorney.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400/80 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5 text-white" />
                      </Link>
                    )}
                    {attorney.twitter && (
                      <Link 
                        href={attorney.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400/80 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 text-white" />
                      </Link>
                    )}
                    {attorney.instagram && (
                      <Link 
                        href={attorney.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400/80 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-white" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bio and Details Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main bio content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-white rounded-xl shadow-xl p-8 border border-neutral-100 relative overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold-300/20 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold-300/20 rounded-br-xl"></div>
                    
                    {/* Decorative golden accent in the corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-100/20 via-gold-200/10 to-transparent rounded-bl-[80px]"></div>
                    
                    <h2 className="text-3xl font-bold text-gold-600 mb-6 relative">
                      About {attorney.name.split(' ')[0]}
                      <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-transparent mt-2"></div>
                    </h2>
                    
                    <div className="prose prose-lg max-w-none text-neutral-700">
                      <p className="mb-6">
                        {attorney.bio}
                      </p>
                      
                      {attorney.experience && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gold-600 mb-3">Experience</h3>
                          <p>{attorney.experience} of experience in {attorney.specialization}</p>
                        </div>
                      )}
                      
                      {attorney.languages && attorney.languages.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gold-600 mb-3">Languages</h3>
                          <div className="flex flex-wrap gap-2">
                            {attorney.languages.map((language, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-gold-50 border border-gold-100 rounded-full text-sm text-black-700"
                              >
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {attorney.awards && attorney.awards.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gold-600 mb-3">Recognition & Awards</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {attorney.awards.map((award, index) => (
                              <li key={index}>{award}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
                
                {/* Sidebar with credentials */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white rounded-xl shadow-xl p-8 border border-neutral-100 mb-8">
                    <h3 className="text-xl font-semibold text-gold-600 mb-4 flex items-center">
                      <span className="w-2 h-6 bg-gold-400 mr-3 rounded-sm"></span>
                      Credentials
                    </h3>
                    
                    {attorney.education && attorney.education.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-gold-500 mb-3">Education</h4>
                        <ul className="space-y-2">
                          {attorney.education.map((edu, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span className="text-neutral-700">{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {attorney.certifications && attorney.certifications.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-gold-500 mb-3">Certifications</h4>
                        <ul className="space-y-2">
                          {attorney.certifications.map((cert, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span className="text-neutral-700">{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-br from-black-700 to-black-600 rounded-xl shadow-xl p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-gold-400">
                      <span className="w-2 h-6 bg-gold-400 mr-3 rounded-sm"></span>
                      Contact Information
                    </h3>
                    
                    {attorney.email && (
                      <div className="mb-4">
                        <div className="text-sm text-gold-400 font-medium mb-1">Email</div>
                        <a href={`mailto:${attorney.email}`} className="text-white hover:text-gold-200 transition-colors">
                          {attorney.email}
                        </a>
                      </div>
                    )}
                    
                    {attorney.phone && (
                      <div className="mb-4">
                        <div className="text-sm text-gold-400 font-medium mb-1">Phone</div>
                        <a href={`tel:${attorney.phone.replace(/\s+/g, '')}`} className="text-white hover:text-gold-200 transition-colors">
                          {attorney.phone}
                        </a>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setShowScheduleModal(true)}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" />
                      <span>Schedule Consultation</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Schedule Modal */}
      {showScheduleModal && (
        <ConsultationPopover 
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          attorney={attorney}
        />
      )}
    </>
  );
}

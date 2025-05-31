'use client';

import { useState } from 'react';
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

interface LegalService {
  id: string;
  title: string;
  description: string;
  icon: any; // IconDefinition from @fortawesome/react-fontawesome
  longDescription: string;
}

const legalServices: LegalService[] = [
  {
    id: 'divorce',
    title: 'Divorce & Family Law',
    description: 'Expert legal representation in divorce proceedings, child custody, alimony, and family disputes.',
    icon: faScaleBalanced,
    longDescription: `Our experienced family law attorneys provide compassionate and professional legal guidance through 
    complex divorce proceedings and family matters. We understand the emotional challenges involved and work diligently 
    to protect your rights and interests.
    
    We handle all aspects of family law including:
    • Divorce proceedings and settlements
    • Child custody and visitation rights
    • Alimony and maintenance
    • Property division
    • Domestic violence protection
    • Marriage counseling and mediation`
  },
  {
    id: 'criminal',
    title: 'Criminal Defense',
    description: 'Strong defense representation in criminal cases with a proven track record of successful outcomes.',
    icon: faHandcuffs,
    longDescription: `Our criminal defense team provides robust legal representation for individuals facing criminal charges. 
    We believe in the presumption of innocence and fight tirelessly to protect your rights throughout the legal process.
    
    Our criminal defense services cover:
    • Criminal trial defense
    • Bail applications
    • Police investigations
    • Criminal appeals
    • Legal consultation and strategy
    • Evidence review and case building`
  },
  {
    id: 'ndps',
    title: 'NDPS Cases',
    description: 'Specialized representation in Narcotic Drugs and Psychotropic Substances Act cases.',
    icon: faShield,
    longDescription: `We provide expert legal defense in NDPS cases, understanding the complexity of drug-related laws 
    and the severe implications of such charges. Our team has extensive experience in handling NDPS matters at all levels 
    of the judicial system.
    
    Our NDPS case expertise includes:
    • Defense against possession charges
    • Challenging illegal seizures
    • Bail applications in NDPS cases
    • Legal representation at all court levels
    • Case strategy and evidence analysis
    • Rehabilitation advocacy`
  },
  {
    id: 'cyber',
    title: 'Cyber Crime',
    description: 'Expert legal assistance in cyber crime cases, digital forensics, and online security matters.',
    icon: faLaptopCode,
    longDescription: `In today's digital age, we provide comprehensive legal support for cyber crime cases, helping 
    individuals and businesses protect their digital rights and address online security challenges.
    
    Our cyber crime services include:
    • Cyber fraud investigation
    • Online harassment cases
    • Data breach representation
    • Digital evidence collection
    • Social media crimes
    • Identity theft protection`
  },
  {
    id: 'property',
    title: 'Property Verification',
    description: 'Thorough property verification services to ensure secure real estate transactions.',
    icon: faHome,
    longDescription: `Our property verification services provide comprehensive due diligence to ensure your real estate 
    investments are secure and legally sound. We conduct thorough investigations of property documents and legal status.
    
    We offer:
    • Title verification
    • Property documentation review
    • Legal status checks
    • Encumbrance certificates
    • Municipal approval verification
    • Construction permit validation`
  },
  {
    id: 'cheque',
    title: 'Cheque Bounce Cases',
    description: 'Swift legal action and resolution in cheque dishonor cases under Section 138.',
    icon: faFileContract,
    longDescription: `We provide efficient legal assistance in cheque bounce cases under Section 138 of the Negotiable 
    Instruments Act. Our team ensures quick action to protect your financial interests.
    
    Our services include:
    • Legal notices for cheque bouncing
    • Court representation
    • Settlement negotiations
    • Recovery proceedings
    • Appeals and revisions
    • Execution of orders`
  },
  {
    id: 'corporate',
    title: 'Corporate Legal Services',
    description: 'Comprehensive legal solutions for businesses and corporate entities.',
    icon: faUserTie,
    longDescription: `Our corporate legal team provides strategic advice and representation to businesses of all sizes. 
    We help navigate complex regulatory requirements and protect your business interests.
    
    Services include:
    • Company registration
    • Corporate compliance
    • Contract drafting and review
    • Mergers and acquisitions
    • Corporate restructuring
    • Regulatory compliance`
  },
  {
    id: 'civil',
    title: 'Civil Litigation',
    description: 'Expert representation in civil disputes and litigation proceedings.',
    icon: faGavel,
    longDescription: `Our civil litigation team handles a wide range of civil disputes with expertise and precision. 
    We work to achieve the best possible outcomes through strategic litigation and negotiation.
    
    We handle:
    • Property disputes
    • Contract disputes
    • Recovery suits
    • Civil appeals
    • Arbitration
    • Alternative dispute resolution`
  }
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);

  const handleScheduleConsultation = (service: LegalService | null = null) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Hero section with premium law firm styling */}
      <section className="relative bg-gradient-to-br from-black-900 via-black-700 to-black-600 py-24">
        <div className="absolute inset-0 bg-[url('/patterns/indian-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white animate-fadeIn">
              Legal Services
            </h1>
            <p className="text-xl text-gold-200 animate-fadeIn" style={{ animationDelay: '100ms' }}>
              Expert legal representation with a commitment to justice and client success
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => handleScheduleConsultation()}
                className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Schedule Consultation
              </button>
              <Link
                href="#services"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 border border-white/20"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

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
      <div className="py-16 bg-neutral-50" id="services">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {legalServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header with Icon */}
                <div className="p-6 border-b border-neutral-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maroon-100 to-maroon-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FontAwesomeIcon 
                        icon={service.icon} 
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
                    <button
                      onClick={() => handleScheduleConsultation(service)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-black-700 to-black-600 hover:from-black-600 hover:to-black-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faGavel} className="w-4 h-4" />
                      <span>Consult Now</span>
                    </button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-100/20 via-gold-200/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-maroon-100/10 via-maroon-200/5 to-transparent rounded-tr-full"></div>
              </div>
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

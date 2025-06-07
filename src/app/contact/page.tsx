'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faSearch, faArrowRight, faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import ContactFormPopup from '../components/ui/ContactFormPopup';
import NewsletterForm from '../components/ui/NewsletterForm';

interface Office {
  id: number;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  geo: {
    lat: number;
    lng: number;
  };
  image: string;
  description: string;
}

const offices: Office[] = [
  {
    id: 1,
    city: "HSR Layout, Bangalore",
    country: "India",
    address: "Shoolin Legal Consultancy, 1st Floor, 100 Feet Road, Sector 1, HSR Layout, Bengaluru, Karnataka 560068",
    phone: "+91 98765 43210",
    email: "hsr@shoolinconsultancy.com",
    geo: {
      lat: 12.9147,
      lng: 77.6419
    },
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&q=80",
    description: "Our flagship office in HSR Layout, serving South Bangalore with comprehensive legal services."
  },
  {
    id: 2,
    city: "Indiranagar, Bangalore",
    country: "India",
    address: "Shoolin Legal Consultancy, 2nd Floor, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 98765 43211",
    email: "indiranagar@shoolinconsultancy.com",
    geo: {
      lat: 12.9784,
      lng: 77.6408
    },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    description: "Located in the heart of Indiranagar, providing expert legal consultation to East Bangalore."
  },
  {
    id: 3,
    city: "Whitefield, Bangalore",
    country: "India",
    address: "Shoolin Legal Consultancy, 3rd Floor, Phoenix Marketcity Mall, Whitefield Main Road, Bengaluru, Karnataka 560066",
    phone: "+91 98765 43212",
    email: "whitefield@shoolinconsultancy.com",
    geo: {
      lat: 12.9959,
      lng: 77.7274
    },
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80",
    description: "Serving the tech corridor of Bangalore with specialized legal services for IT companies and startups."
  },
  // {
  //   id: 4,
  //   city: "Dubai",
  //   country: "UAE",
  //   address: "Shoolin Legal Consultancy, Level 14, Boulevard Plaza Tower 1, Sheikh Mohammed Bin Rashid Boulevard, Dubai, UAE",
  //   phone: "+971 4 123 4567",
  //   email: "dubai@shoolinconsultancy.com",
  //   geo: {
  //     lat: 25.2048,
  //     lng: 55.2708
  //   },
  //   image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
  //   description: "Our Dubai office serves as a hub for international legal services and cross-border transactions in the Middle East."
  // },
  // {
  //   id: 5,
  //   city: "Singapore",
  //   country: "Singapore",
  //   address: "Shoolin Legal Consultancy, Level 42, Marina Bay Financial Centre, 10 Marina Boulevard, Singapore 018983",
  //   phone: "+65 6123 4567",
  //   email: "singapore@shoolinconsultancy.com",
  //   geo: {
  //     lat: 1.2821,
  //     lng: 103.8527
  //   },
  //   image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80",
  //   description: "Strategic location in Singapore's financial district, offering comprehensive legal services across Southeast Asia."
  // },
  // {
  //   id: 6,
  //   city: "London",
  //   country: "United Kingdom",
  //   address: "Shoolin Legal Consultancy, 30 St Mary Axe (The Gherkin), London EC3A 8BF, United Kingdom",
  //   phone: "+44 20 7123 4567",
  //   email: "london@shoolinconsultancy.com",
  //   geo: {
  //     lat: 51.5144,
  //     lng: -0.0803
  //   },
  //   image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80",
  //   description: "Our London office specializes in international commercial law and cross-border transactions in the European market."
  // }
];

export default function Contact() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [jobApplication, setJobApplication] = useState<{
    job: string;
    department: string;
    ref: string;
  } | null>(null);

  // Extract query parameters on component mount
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const job = params.get('job');
      const department = params.get('department');
      const ref = params.get('ref');
      
      if (job && ref === 'careers') {
        setJobApplication({
          job,
          department: department || '',
          ref
        });
      }
    }
  }, []);

  const handleContactClick = (office: Office) => {
    setSelectedOffice(office);
    setIsPopupOpen(true);
  };

  const filteredOffices = offices.filter(office =>
    office.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
            alt="Global Offices"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/85">
            <div className="absolute inset-0 bg-repeat opacity-5" 
                 style={{ backgroundImage: "url('/patterns/indian-pattern.svg')" }}></div>
          </div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Connect With Our Global Offices
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gold-300 mb-8"
            >
              Expert legal consultation available across nine strategic locations worldwide
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search Section with Enhanced Design */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-maroon-500"
              />
              <input
                type="text"
                placeholder="Search for an office location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-maroon-200 rounded-lg focus:outline-none focus:border-maroon-500 transition-colors text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Office Locations Grid */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredOffices.map((office) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setHoveredCard(office.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="relative h-56">
                  <Image
                    src={office.image}
                    alt={`${office.city} Office`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-1 text-white">{office.city}</h3>
                    <p className="text-gold-300 mb-4">{office.country}</p>
                    <p className="text-white/90 text-sm transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {office.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-3 text-neutral-600">
                    <div className="flex items-start">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-maroon-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-sm">{office.address}</p>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-maroon-500 mr-3" />
                      <a href={`tel:${office.phone}`} className="text-sm hover:text-maroon-500 transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-maroon-500 mr-3" />
                      <a href={`mailto:${office.email}`} className="text-sm hover:text-maroon-500 transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps?q=${office.geo.lat},${office.geo.lng}`)}
                      className="flex-1 bg-black-700 text-white py-3 px-4 rounded-lg hover:bg-black-600 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                      View on Map
                    </button>
                    <button
                      onClick={() => handleContactClick(office)}
                      className="flex-1 border-2 border-black-700 text-black-700 py-3 px-4 rounded-lg hover:bg-black-700 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      Contact Office
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gold-600 to-black bg-clip-text text-transparent">
                {jobApplication ? 'Apply for Position' : 'Get in Touch'}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {jobApplication 
                  ? `Complete the form below to apply for the ${jobApplication.job} position in our ${jobApplication.department} department.` 
                  : 'Reach out to us for expert legal consultation. Our team is ready to assist you with any inquiries.'}
              </p>
              {jobApplication && (
                <div className="mt-6 bg-gold-50 border-2 border-gold-200 text-black-700 px-6 py-4 rounded-md inline-block shadow-sm">
                  <p className="font-semibold text-lg">Applying for: {jobApplication.job}</p>
                  <p className="text-neutral-600">Department: {jobApplication.department}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-md shadow-xl border border-neutral-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Illustration */}
                <div className="relative p-8 bg-gradient-to-br from-gold-50 to-neutral-50 hidden lg:block">
                  <div className="sticky top-8 space-y-6">
                    <div className="relative h-72 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
                        alt="Legal Consultation"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20"></div>
                    </div>
                    <div className="space-y-4 text-center">
                      <h3 className="text-2xl font-bold text-neutral-800">Expert Legal Support</h3>
                      <p className="text-neutral-600">Our team of experienced legal professionals is here to help you navigate complex legal matters with confidence.</p>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gold-100 flex items-center justify-center">
                              <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gold-600" />
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-neutral-600">50+ Legal Experts</span>
                      </div>
                      <div className="pt-4">
                        <div className="flex items-center justify-center space-x-2 text-gold-600">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="w-5 h-5" />
                          ))}
                        </div>
                        <p className="text-sm text-neutral-600 mt-2">Trusted by 1000+ clients</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 md:p-12">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                          Your Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-800">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-800">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                          placeholder="Your Company Ltd."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-800">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all duration-200 bg-white"
                        required
                        defaultValue={jobApplication ? "Job Application" : ""}
                      >
                        <option value="" disabled>Please select a subject</option>
                        <option value="Job Application">Job Application</option>
                        <option value="Business Consulting">Business Consulting</option>
                        <option value="Financial Advisory">Financial Advisory</option>
                        <option value="Strategic Planning">Strategic Planning</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-800">
                        {jobApplication ? 'Cover Letter/Additional Information' : 'Your Message'} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all duration-200"
                        required
                        placeholder="Please describe your inquiry in detail..."
                        defaultValue={jobApplication ? `I would like to apply for the ${jobApplication.job} position in the ${jobApplication.department} department.` : ''}
                      ></textarea>
                    </div>

                    {jobApplication && (
                      <div className="space-y-2">
                        <label htmlFor="resume" className="block text-sm font-medium text-neutral-800">
                          Upload Resume/CV <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-md p-8 text-center hover:border-gold-400 transition-colors duration-200">
                          <div className="space-y-4">
                            <div className="mx-auto h-16 w-16 text-neutral-400">
                              <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="flex text-sm text-neutral-600 justify-center">
                              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-gold-600 hover:text-gold-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" accept=".pdf,.doc,.docx" className="sr-only" required />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-neutral-500">PDF or DOC up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-6">
                      <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold rounded-md 
                          shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
                      >
                        {jobApplication ? 'Submit Application' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-black-900 to-black-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Stay Informed With Legal Updates
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-gold-300 mb-6"
                >
                  Subscribe to our newsletter and receive the latest legal insights, industry updates, and firm news directly in your inbox.
                </motion.p>
                <motion.ul 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3 mb-8"
                >
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-gold-400" />
                    </div>
                    <span className="text-neutral-300">Exclusive insights from our legal experts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-gold-400" />
                    </div>
                    <span className="text-neutral-300">Updates on latest regulations and legal changes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-gold-400" />
                    </div>
                    <span className="text-neutral-300">Invitations to exclusive webinars and events</span>
                  </li>
                </motion.ul>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gold-300">Join Our Newsletter</h3>
                <p className="text-neutral-300 mb-6">Enter your email below to subscribe to our newsletter. You can unsubscribe anytime.</p>
                <NewsletterForm 
                  darkMode={true}
                  placeholder="Your email address"
                  buttonText="Subscribe"
                />
                <p className="text-xs text-neutral-400 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from Shoolin Consultancy.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Popup */}
      {selectedOffice && (
        <ContactFormPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          office={{
            name: selectedOffice.city,
            location: selectedOffice.country
          }}
        />
      )}
    </>
  );
}

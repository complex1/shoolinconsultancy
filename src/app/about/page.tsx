'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeInView, StaggerParent } from '../components/ui/Animations';
import LuxuryAttorneysSection from '../components/ui/LuxuryAttorneysSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBalanceScale, 
  faGavel, 
  faHandshake, 
  faBriefcase, 
  faGlobe, 
  faBuilding, 
  faScaleBalanced,
  faStar,
  faLandmark
} from '@fortawesome/free-solid-svg-icons';
import JourneyTimeline from '../components/ui/JourneyTimeline';

export default function About() {
  return (
    <>
      {/* Hero section with gradient background matching homepage */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-black-900 via-black-700 to-black-600 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/patterns/indian-pattern.svg"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Rich animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Decorative floating shapes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 0.5 + Math.random() * 0.5,
                opacity: 0.1 + Math.random() * 0.2
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, rgba(184,134,11,0.2) 0%, rgba(184,134,11,0) 70%)' 
                  : 'radial-gradient(circle, rgba(128,0,32,0.15) 0%, rgba(128,0,32,0) 70%)'
              }}
            />
          ))}
        </div>
        
        {/* Animated light rays */}
        <motion.div 
          className="absolute top-0 left-1/4 w-1/2 h-full origin-top opacity-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(184,134,11,0.3) 0%, rgba(184,134,11,0) 100%)',
            transformOrigin: 'center top',
          }}
          animate={{ 
            rotate: [-5, 5, -5],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-gold-400/20 via-gold-500/10 to-transparent rounded-br-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tl from-gold-400/20 via-gold-500/10 to-transparent rounded-tl-full blur-3xl"></div>
        
        {/* Subtle animated particles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-gold-300"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.3
              }}
              animate={{ 
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-gold-400/10 text-gold-400 text-sm font-medium">
                Established 2010
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Our <span className="text-gold-400">Legacy</span> of Legal Excellence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-neutral-200 max-w-3xl mx-auto"
            >
              Discover the journey of Shoolin Consultancy, where our deep-rooted commitment to legal excellence 
              and Indian values has shaped our path to becoming a trusted name in legal consultation.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Replace the old timeline section with the new JourneyTimeline component */}
      <JourneyTimeline />
      
      {/* Mission & Values Section - Styled to match theme */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
        {/* Rich animated background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Elegant scaling rings */}
          <motion.div
            className="absolute left-[5%] top-[20%] w-[300px] h-[300px] rounded-full border border-gold-400/10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute right-[5%] bottom-[20%] w-[200px] h-[200px] rounded-full border border-black-700/10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, -45, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Abstract document lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold-300/20 to-transparent"
              style={{ 
                top: `${15 + i * 15}%`,
                left: '10%',
                right: '10%'
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                width: ['80%', '70%', '80%']
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
          
          {/* Document corner fold animation */}
          <motion.div
            className="absolute top-0 right-0 w-16 h-16 origin-top-right"
            animate={{
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold-100/20 to-transparent rounded-bl-3xl" />
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl shadow-xl bg-white p-8 mb-12 border border-neutral-100"
            >
              <h2 className="text-3xl font-bold text-black-700 mb-6 text-center">Our Mission & Values</h2>
              
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-maroon-100 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faBalanceScale} className="w-6 h-6 text-black-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-black-700">Our Mission</h3>
                </div>
                <p className="text-lg text-neutral-700 pl-16">
                  To empower organizations through strategic legal guidance, innovative solutions, and unwavering 
                  commitment to excellence, enabling them to achieve sustainable growth and lasting impact while upholding 
                  the highest standards of ethical legal practice.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-black-700">Our Core Values</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 pl-16">
                  <div className="bg-gradient-to-br from-white to-neutral-50 p-5 rounded-lg border border-neutral-100 shadow-sm">
                    <h4 className="font-bold text-gold-600 mb-2">Integrity</h4>
                    <p className="text-neutral-700">We uphold the highest standards of honesty and ethical conduct in all our interactions.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white to-neutral-50 p-5 rounded-lg border border-neutral-100 shadow-sm">
                    <h4 className="font-bold text-gold-600 mb-2">Excellence</h4>
                    <p className="text-neutral-700">We strive for exceptional quality in every aspect of our legal practice and client service.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white to-neutral-50 p-5 rounded-lg border border-neutral-100 shadow-sm">
                    <h4 className="font-bold text-gold-600 mb-2">Innovation</h4>
                    <p className="text-neutral-700">We embrace creative thinking and innovative approaches to solve complex legal challenges.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white to-neutral-50 p-5 rounded-lg border border-neutral-100 shadow-sm">
                    <h4 className="font-bold text-gold-600 mb-2">Client-Centricity</h4>
                    <p className="text-neutral-700">We place our clients' needs and success at the heart of everything we do.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Expert Attorneys section - Now using a reusable component */}
      {/* Legal Texts Background Animation */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] overflow-hidden hidden lg:block">
        <div className="absolute w-full h-full">
          {/* Scrolling legal text background */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear"
            }}
            className="text-black text-opacity-50 whitespace-pre-line text-xs"
          >
            {`
            WHEREAS the parties hereto desire to enter into this Agreement for the purposes set forth herein;
            NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties hereto agree as follows:
            1. DEFINITIONS
               1.1 "Agreement" means this legal services agreement together with all schedules and appendices attached hereto;
               1.2 "Client" means the party engaging the legal services as set forth in Schedule A;
               1.3 "Services" means the legal and professional services to be provided by the Firm to the Client as described in Schedule B;
            2. TERM AND TERMINATION
               2.1 This Agreement shall commence on the Effective Date and shall continue until the completion of the Services or termination in accordance with Section 2.2;
               2.2 Either party may terminate this Agreement upon thirty (30) days written notice to the other party;
            3. FEES AND PAYMENT
               3.1 The Client shall pay to the Firm the fees for the Services as set forth in Schedule C;
               3.2 The Firm shall issue invoices to the Client on a monthly basis, and the Client shall pay such invoices within thirty (30) days of receipt;
            4. CONFIDENTIALITY
               4.1 Each party shall maintain the confidentiality of all confidential information disclosed by the other party;
               4.2 For the purposes of this Agreement, "confidential information" means all information, whether written or oral, that is not generally known to the public;
            5. INTELLECTUAL PROPERTY
               5.1 All intellectual property rights in the materials created by the Firm in the course of providing the Services shall remain the property of the Firm;
               5.2 The Firm grants to the Client a non-exclusive, perpetual license to use such materials for the Client's internal business purposes;
            6. LIABILITY AND INDEMNIFICATION
               6.1 The Firm's liability under this Agreement shall be limited to the fees paid by the Client for the Services;
               6.2 The Client shall indemnify and hold harmless the Firm from and against any and all claims, damages, losses, and expenses arising out of or resulting from the Client's breach of this Agreement;
            7. GOVERNING LAW
               7.1 This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction];
               7.2 Any dispute arising out of or in connection with this Agreement shall be submitted to the exclusive jurisdiction of the courts of [Jurisdiction];
            IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.
            `}
          </motion.div>
        </div>
      </div>
      
      <LuxuryAttorneysSection 
        title="Meet Our Expert Attorneys"
        subtitle="Legal Excellence & Expertise"
        description="Our team of distinguished legal professionals brings decades of combined experience across multiple practice areas, providing sophisticated counsel tailored to your unique needs."
        attorneys={[
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
          {
            name: "James Sullivan",
            title: "Litigation Director",
            role: "Civil Litigation",
            specialization: "Expert in civil litigation with extensive courtroom experience handling complex disputes, class actions, and high-profile cases across multiple jurisdictions.",
            image: "/team/attorney1.svg",
            linkedIn: "https://linkedin.com",
            twitter: "https://twitter.com",
            email: "james@shoolinconsultancy.com"
          },
          {
            name: "Aisha Patel",
            title: "Real Estate & Construction Law Partner",
            role: "Real Estate Law",
            specialization: "Specialized in real estate transactions, construction contracts, land use regulations, and property dispute resolution for commercial and residential developments.",
            image: "/team/attorney2.svg",
            linkedIn: "https://linkedin.com",
            instagram: "https://instagram.com",
            email: "aisha@shoolinconsultancy.com"
          }
        ]}
        showContact={true}
        showViewMore={false}
        contactText="Schedule a Consultation"
        contactLink="/contact"
        className="py-24 bg-gradient-to-b from-white to-neutral-50"
      />
    </>
  );
}

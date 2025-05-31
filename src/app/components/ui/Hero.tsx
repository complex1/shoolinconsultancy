'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FadeInView, StaggerParent } from './Animations';
import MottoAnimation from './MottoAnimation';
import ConsultationPopover from './ConsultationPopover';
import DisclaimerAlert from './DisclaimerAlert';
import ResponsiveImage from './ResponsiveImage';
import { colors, accessibleCombos } from '@/app/styles/colors';
import RecognitionBadges from './RecognitionBadges';

const Hero = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Default attorney for initial consultation
  const defaultAttorney = {
    name: "Shoolin Legal Team",
    title: "Senior Legal Consultant",
    role: "Legal Consultation",
    specialization: "Corporate Law & Litigation"
  };
  
  // Individual particle animations instead of using variants
  const particleAnimation = (i: number) => ({
    y: [0, -10, 0],
    opacity: [0, 1, 0],
    scale: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: i * 0.2
    }
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black-900 via-black-700 to-black-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <ResponsiveImage
          src="/patterns/indian-pattern.svg"
          alt="Background Pattern"
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Subtle certification highlight effect */}
      <motion.div 
        className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-32 opacity-10 -z-10"
        animate={{
          background: [
            'radial-gradient(circle, rgba(218,165,32,0.1) 0%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(218,165,32,0.2) 0%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(218,165,32,0.1) 0%, rgba(0,0,0,0) 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Container */}
      <div className="container-responsive relative z-10">
        <div className="min-h-screen flex items-center justify-center section-responsive">
          <div className="max-w-6xl w-full mx-auto">
            <StaggerParent className="grid lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center">
              {/* Certifications Row */}
              <div className="lg:col-span-12">
                <motion.div
                  className="mb-8 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <RecognitionBadges />
                </motion.div>
              </div>
              
              {/* Animated Motto - Full Width Row */}
              {/* <div className="lg:col-span-12 mb-10">
                <motion.div 
                  className="w-full relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent transform -translate-y-1/2"></div>
                  <MottoAnimation />
                </motion.div>
              </div> */}
              
              {/* Left Column - Text Content */}
              <FadeInView className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
                  style={{ color: colors.white }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span style={{ color: colors.gold[400] }}>Legal Excellence with Indian Values</span>
                </motion.h1>

                <motion.p 
                  className="text-lg md:text-xl mb-12 mx-auto lg:mx-0 max-w-2xl"
                  style={{ color: colors.neutral[200] }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Bridging modern legal expertise with timeless Indian wisdom. Our team combines decades of experience with deep understanding of Indian judicial principles and business culture.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button 
                    onClick={() => setIsScheduleModalOpen(true)}
                    className={`
                      btn px-8 py-4 rounded-lg font-semibold text-lg 
                      transition-all transform hover:scale-105 shadow-lg
                      hover:bg-[${colors.gold[500]}]
                    `}
                    style={{ 
                      backgroundColor: colors.gold[400],
                      color: colors.black[900]
                    }}
                  >
                    Free Case Evaluation
                  </button>
                  <Link 
                    href="/team"
                    className={`
                      btn border-2 rounded-lg font-semibold text-lg transition-all
                      hover:border-white/60 hover:bg-white/10
                    `}
                    style={{ 
                      borderColor: `${colors.white}30`,
                      color: colors.white
                    }}
                  >
                    Our Legal Expertise
                  </Link>
                </motion.div>
              </FadeInView>

              {/* Right Column - Legal Symbol & Visual Elements */}
              <FadeInView delay={0.3} className="lg:col-span-6 hidden lg:flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-maroon-500/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <Image
                      src="/legal-symbol.svg"
                      alt="Legal Excellence Symbol"
                      width={450}
                      height={450}
                      className="animate-float drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </FadeInView>
            </StaggerParent>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        style={{ 
          borderColor: `${colors.white}40`
        }}
      >
        <div className="w-1 h-3 rounded-full" style={{ backgroundColor: `${colors.white}80` }}></div>
      </motion.div>

      <ConsultationPopover
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        attorney={defaultAttorney}
      />
      <DisclaimerAlert />
    </section>
  );
};

export default Hero;

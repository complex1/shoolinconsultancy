import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

const AboutPageHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[50vh] bg-gradient-to-br from-black-900 via-black-700 to-black-600 py-24 overflow-hidden">
        {/* Background Pattern */}
          <Image
            src="/patterns/indian-pattern.svg"
            alt="Background Pattern"
            fill
            className="object-cover"
            priority
          />
        
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
  );
};

export default AboutPageHeroSection;
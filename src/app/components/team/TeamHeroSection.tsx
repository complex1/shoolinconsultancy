import { faUserTie, faGavel, faHandshake, faBuilding, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';

const TeamHeroSection: React.FC = () => {

  const stats = [
      { icon: faUserTie, value: '25+', label: 'Expert Attorneys' },
      { icon: faGavel, value: '1000+', label: 'Cases Won' },
      { icon: faHandshake, value: '15+', label: 'Years Experience' },
      { icon: faBuilding, value: '5', label: 'Office Locations' },
      { icon: faBalanceScale, value: '98%', label: 'Success Rate' }
    ];
  return (
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
  );
};

export default TeamHeroSection;
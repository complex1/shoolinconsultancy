'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ContactForm from './ContactForm';

const Stats = () => {
  return (
    <>
      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { number: '15+', label: 'Years of Service', icon: '/icons/business.svg' },
              { number: '5000+', label: 'Cases Handled', icon: '/icons/litigation.svg' },
              { number: '98%', label: 'Success Rate', icon: '/icons/strategy.svg' },
              { number: '100+', label: 'Legal Experts', icon: '/icons/corporate.svg' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative">
                  {/* Card Background with Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black-700 via-gold-400 to-black-600 rounded-[6px] p-[1px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-[6px] p-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                    {/* Icon Container */}
                    <div className="mb-4">
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-black-100 to-black-50 rounded-[6px] transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black-50 to-white rounded-[6px]" />
                        <div className="relative h-full w-full p-3 group-hover:scale-110 transition-transform duration-500">
                          <Image
                            src={stat.icon}
                            alt={stat.label}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Number */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.3 }}
                      className="relative"
                    >
                      <h4 className="text-4xl font-bold mb-2 bg-gradient-to-r from-black-700 via-gold-400 to-black-600 bg-clip-text text-transparent">
                        {stat.number}
                      </h4>
                      <div className="h-[2px] w-12 mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </motion.div>

                    {/* Label */}
                    <p className="text-neutral-600 font-medium mt-2 relative z-10">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-black-700/5 rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full" />
      </section>

      {/* Recognition Section */}
     

      {/* Contact and Recognition Section */}
     
    </>
  );
};

export default Stats;

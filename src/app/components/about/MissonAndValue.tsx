import { faBalanceScale, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';

const MissionAndValue: React.FC = () => {
   return (
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
   );
};

export default MissionAndValue;
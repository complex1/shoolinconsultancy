'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLinkedin, 
    faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { 
    faStar, 
    faAward, 
    faCertificate, 
    faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        position: 'CEO, Tech Innovations Ltd',
        avatar: '/testimonials/person1.svg',
        text: 'Exceptional legal guidance in our company&apos;s expansion. Their corporate law expertise was invaluable during our Series B funding.',
        platform: 'LinkedIn',
        rating: 5,
        icon: faLinkedin,
        iconColor: '#0A66C2'
    },
    {
        name: 'Priya Mehta',
        position: 'Real Estate Developer',
        avatar: '/testimonials/person2.svg',
        text: 'Their property law team helped us navigate complex RERA regulations. Highly professional and thorough approach.',
        platform: 'Google',
        rating: 5,
        icon: faGoogle,
        iconColor: '#4285F4'
    },
    {
        name: 'Amit Shah',
        position: 'Startup Founder',
        avatar: '/testimonials/person3.svg',
        text: 'Outstanding IP protection services. They helped secure our patents and trademarks across multiple jurisdictions.',
        platform: 'Trustpilot',
        rating: 5,
        icon: faCheckCircle,
        iconColor: '#00B67A'
    },
    {
        name: 'Sarah Johnson',
        position: 'International Trade Consultant',
        avatar: '/testimonials/person1.svg',
        text: 'Their expertise in international business law is remarkable. Made our market entry into India smooth and compliant.',
        platform: 'Chambers',
        rating: 5,
        icon: faAward,
        iconColor: '#C5B358'
    },
    {
        name: 'Vikram Singhania',
        position: 'Director of Operations',
        avatar: '/testimonials/person2.svg',
        text: 'Exceptional service in handling our labor law compliance. Their team&apos;s attention to detail is commendable.',
        platform: 'Legal500',
        rating: 5,
        icon: faCertificate,
        iconColor: '#C5B358'
    },
    {
        name: 'Anita Desai',
        position: 'Finance Director',
        avatar: '/testimonials/person3.svg',
        text: 'Their tax advisory services helped us optimize our structure while maintaining full compliance. Highly recommended!',
        platform: 'Google',
        rating: 5,
        icon: faGoogle,
        iconColor: '#4285F4'
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <Image
                    src="/patterns/indian-pattern.svg"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        className="text-gold-400 font-medium block mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Client Insights
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black-700 via-gold-400 to-black-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Voices of Success
                    </motion.h2>
                    <motion.p
                        className="text-neutral-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Real experiences from our clients across different platforms, sharing their journey with our legal expertise
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, y: 20, rotate: -2 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Sticky Note Effect */}
                            <div className="relative transform transition-transform duration-300 group-hover:rotate-2 group-hover:-translate-y-2">
                                {/* Shadow Effect */}
                                <div className="absolute -inset-2 bg-black/5 rounded-[6px] transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                                
                                {/* Card Content */}
                                <div className="relative bg-white rounded-[6px] p-6 shadow-lg">
                                    {/* Platform Badge */}
                                    <div 
                                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300 flex items-center justify-center"
                                        style={{ 
                                            backgroundColor: testimonial.iconColor,
                                            color: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon 
                                            icon={testimonial.icon} 
                                            className="w-4 h-4"
                                        />
                                    </div>

                                    {/* Quote */}
                                    <div className="mb-6 relative">
                                        <div className="absolute -top-2 -left-2 text-4xl text-gold-400 opacity-20">"</div>
                                        <p className="text-neutral-600 relative z-10 italic">
                                            {testimonial.text}
                                        </p>
                                        <div className="absolute -bottom-4 -right-2 text-4xl text-gold-400 opacity-20">"</div>
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/20">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-black-700 font-semibold">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-neutral-500">
                                                {testimonial.position}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute bottom-4 right-4 flex text-gold-400">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FontAwesomeIcon 
                                                key={i} 
                                                icon={faStar} 
                                                className="w-4 h-4"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/testimonials"
                        className="inline-flex items-center px-8 py-3 bg-black-700 text-white font-semibold rounded-[6px] hover:bg-black-600 transition-colors duration-300"
                    >
                        View All Client Stories
                        <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-black-700/5 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full" />
        </section>
    );
};

export default Testimonials;

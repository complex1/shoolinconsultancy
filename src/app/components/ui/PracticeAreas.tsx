'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const practiceAreas = [
    {
        title: 'Corporate Law & Governance',
        description: 'Expert guidance in company formation, mergers & acquisitions, corporate restructuring, and regulatory compliance.',
        icon: '/icons/corporate.svg',
        key: 'Incorporating Companies, M&A, Joint Ventures'
    },
    {
        title: 'Intellectual Property Rights',
        description: 'Protection and enforcement of patents, trademarks, copyrights, and trade secrets in the Indian market.',
        icon: '/icons/ip.svg',
        key: 'Patents, Trademarks, Copyright Protection'
    },
    {
        title: 'Litigation & Dispute Resolution',
        description: 'Comprehensive representation in civil, criminal, and commercial disputes across all court levels.',
        icon: '/icons/litigation.svg',
        key: 'Civil & Criminal Litigation, Arbitration'
    },
    {
        title: 'Real Estate & Property Law',
        description: 'Legal services for property transactions, land acquisition, development projects, and real estate disputes.',
        icon: '/icons/realestate.svg',
        key: 'Property Deals, Land Acquisition, RERA'
    },
    {
        title: 'Employment & Labor Law',
        description: 'Guidance on employment contracts, workplace policies, labor disputes, and compliance with labor laws.',
        icon: '/icons/employment.svg',
        key: 'HR Policies, Labor Compliance, Disputes'
    },
    {
        title: 'Tax Law & Planning',
        description: 'Strategic tax planning, compliance assistance, and representation in tax disputes.',
        icon: '/icons/tax.svg',
        key: 'Direct & Indirect Taxes, GST'
    },
    {
        title: 'Banking & Finance',
        description: 'Legal support for banking transactions, project finance, and regulatory compliance.',
        icon: '/icons/finance.svg',
        key: 'Project Finance, Banking Regulations'
    },
    {
        title: 'Digital Law & Technology',
        description: 'Legal solutions for technology companies, data protection, and cyber law compliance.',
        icon: '/icons/digital.svg',
        key: 'Cyber Law, Data Protection, IT Act'
    },
    {
        title: 'Business Strategy & Advisory',
        description: 'Strategic legal consulting for business operations, risk management, and compliance.',
        icon: '/icons/strategy.svg',
        key: 'Legal Strategy, Risk Management'
    }
];

const PracticeAreas = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black-700 via-gold-400 to-black-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Areas of Practice
                    </motion.h2>
                    <motion.p 
                        className="text-neutral-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Comprehensive legal expertise across key practice areas, serving businesses and individuals with excellence and integrity
                    </motion.p>
                </div>

                {/* Practice Areas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {practiceAreas.map((area, index) => (
                        <motion.div
                            key={area.title}
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Card with gradient border */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-black-700 via-gold-400 to-black-600 rounded-[6px] p-[1px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Card Content */}
                                <div className="relative bg-white rounded-[6px] p-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                                    {/* Icon */}
                                    <div className="mb-4">
                                        <div className="relative w-16 h-16">
                                            <div className="absolute inset-0 bg-gradient-to-br from-black-100 to-black-50 rounded-[6px] transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-black-50 to-white rounded-[6px]" />
                                            <div className="relative h-full w-full p-3 group-hover:scale-110 transition-transform duration-500">
                                                <Image
                                                    src={area.icon}
                                                    alt={area.title}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold mb-2 text-black-700 group-hover:text-gold-400 transition-colors duration-300">
                                        {area.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-neutral-600 mb-4">
                                        {area.description}
                                    </p>

                                    {/* Key Areas */}
                                    <div className="text-sm text-gold-400 font-medium mb-4">
                                        {area.key}
                                    </div>

                                    {/* Learn More Button */}
                                    <div className="mt-4">
                                        <a
                                            href={`/services#${area.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="inline-flex items-center text-black-700 hover:text-gold-400 font-medium transition-colors duration-300"
                                        >
                                            Learn More
                                            <svg
                                                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
                                        </a>
                                    </div>

                                    {/* Hover line decoration */}
                                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-black-700/5 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full" />
        </section>
    );
};

export default PracticeAreas;

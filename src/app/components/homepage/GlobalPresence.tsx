'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const globalOffices = [
    {
        region: 'North America',
        locations: ['New York', 'San Francisco', 'Toronto'],
        partnerships: 3,
        cases: '500+'
    },
    {
        region: 'Europe',
        locations: ['London', 'Frankfurt', 'Paris'],
        partnerships: 5,
        cases: '400+'
    },
    {
        region: 'Asia Pacific',
        locations: ['Singapore', 'Hong Kong', 'Tokyo'],
        partnerships: 4,
        cases: '600+'
    },
    {
        region: 'Middle East',
        locations: ['Dubai', 'Abu Dhabi', 'Riyadh'],
        partnerships: 3,
        cases: '300+'
    }
];

const GlobalPresence = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black-700 via-gold-400 to-black-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Legal Network
                    </motion.h2>
                    <motion.p 
                        className="text-neutral-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Partnering with leading law firms worldwide to provide comprehensive legal solutions across borders
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {globalOffices.map((office, index) => (
                        <motion.div
                            key={office.region}
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-black-700 via-gold-400 to-black-600 rounded-[6px] p-[1px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-white rounded-[6px] p-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                                    <h3 className="text-xl font-semibold mb-4 text-black-700 group-hover:text-gold-400 transition-colors duration-300">
                                        {office.region}
                                    </h3>
                                    <ul className="text-neutral-600 mb-4">
                                        {office.locations.map((location) => (
                                            <li key={location} className="mb-1">{location}</li>
                                        ))}
                                    </ul>
                                    <div className="text-sm text-gold-400 font-medium">
                                        <p>{office.partnerships} Partner Firms</p>
                                        <p>{office.cases} Cases Handled</p>
                                    </div>
                                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-black-700/5 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full" />
        </section>
    );
};

export default GlobalPresence;

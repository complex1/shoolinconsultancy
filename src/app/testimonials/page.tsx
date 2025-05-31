'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLinkedin, 
    faGoogle 
} from '@fortawesome/free-brands-svg-icons';
import { 
    faStar, 
    faAward, 
    faCertificate, 
    faCheckCircle,
    faSearch,
    faFilter
} from '@fortawesome/free-solid-svg-icons';

// Extended testimonials data
const allTestimonials = [
    // Original testimonials
    {
        name: 'Rajesh Kumar',
        position: 'CEO, Tech Innovations Ltd',
        avatar: '/testimonials/person1.svg',
        text: 'Exceptional legal guidance in our company\'s expansion. Their corporate law expertise was invaluable during our Series B funding.',
        platform: 'LinkedIn',
        rating: 5,
        icon: faLinkedin,
        iconColor: '#0A66C2',
        category: 'Corporate Law'
    },
    {
        name: 'Priya Mehta',
        position: 'Real Estate Developer',
        avatar: '/testimonials/person2.svg',
        text: 'Their property law team helped us navigate complex RERA regulations. Highly professional and thorough approach.',
        platform: 'Google',
        rating: 5,
        icon: faGoogle,
        iconColor: '#4285F4',
        category: 'Real Estate'
    },
    // Add more testimonials with similar structure...
];

const categories = [
    'All',
    'Corporate Law',
    'Real Estate',
    'IP Law',
    'Tax Advisory',
    'Employment Law',
    'International Trade'
];

const platforms = [
    'All',
    'LinkedIn',
    'Google',
    'Trustpilot',
    'Chambers',
    'Legal500'
];

export default function TestimonialsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPlatform, setSelectedPlatform] = useState('All');

    // Filter testimonials based on search and filters
    const filteredTestimonials = allTestimonials.filter(testimonial => {
        const matchesSearch = testimonial.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            testimonial.position.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All' || testimonial.category === selectedCategory;
        const matchesPlatform = selectedPlatform === 'All' || testimonial.platform === selectedPlatform;

        return matchesSearch && matchesCategory && matchesPlatform;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-r from-black-800 to-black-700 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/patterns/indian-pattern.svg"
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                    <div className="max-w-3xl">
                        <motion.h1 
                            className="text-5xl md:text-6xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Client Success Stories
                        </motion.h1>
                        <motion.p 
                            className="text-xl text-white/80 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Discover how we've helped businesses and individuals achieve their legal objectives through expert guidance and dedicated support.
                        </motion.p>
                        
                        {/* Stats */}
                        <motion.div 
                            className="grid grid-cols-3 gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gold-400">500+</div>
                                <div className="text-white/60">Happy Clients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gold-400">98%</div>
                                <div className="text-white/60">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gold-400">15+</div>
                                <div className="text-white/60">Years of Excellence</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <motion.div 
                    className="absolute right-0 bottom-0 w-96 h-96 bg-gold-400/10 rounded-full -mr-48 -mb-48"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </section>

            {/* Search and Filters Section */}
            <section className="py-12 bg-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Search Bar */}
                        <div className="flex-grow relative">
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
                            />
                            <input
                                type="text"
                                placeholder="Search testimonials..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black-700 text-neutral-800 placeholder-neutral-500 hover:border-black-700/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 appearance-none focus:outline-none focus:ring-2 focus:ring-black-700 bg-white text-neutral-800 hover:border-black-700/50"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category} className="text-neutral-800 bg-white">{category}</option>
                                ))}
                            </select>
                            <FontAwesomeIcon 
                                icon={faFilter} 
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
                            />
                        </div>

                        {/* Platform Filter */}
                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 appearance-none focus:outline-none focus:ring-2 focus:ring-black-700 bg-white text-neutral-800 hover:border-black-700/50"
                            >
                                {platforms.map(platform => (
                                    <option key={platform} value={platform} className="text-neutral-800 bg-white">{platform}</option>
                                ))}
                            </select>
                            <FontAwesomeIcon 
                                icon={faFilter} 
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    {/* Platform Badge */}
                                    <div 
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm mb-4"
                                        style={{ 
                                            backgroundColor: `${testimonial.iconColor}20`,
                                            color: testimonial.iconColor
                                        }}
                                    >
                                        <FontAwesomeIcon icon={testimonial.icon} className="w-4 h-4 mr-2" />
                                        {testimonial.platform}
                                    </div>

                                    {/* Category Tag */}
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm mb-4 ml-2 bg-neutral-100 text-neutral-600">
                                        {testimonial.category}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-neutral-600 mb-6">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
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
                                    <div className="mt-4 flex text-gold-400">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FontAwesomeIcon 
                                                key={i} 
                                                icon={faStar} 
                                                className="w-4 h-4"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredTestimonials.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-neutral-600 mb-2">
                                No testimonials found
                            </h3>
                            <p className="text-neutral-500">
                                Try adjusting your search or filters to find more results.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

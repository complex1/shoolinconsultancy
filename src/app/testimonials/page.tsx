'use client';

import { useState, useEffect } from 'react';
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
    faFilter,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { TestimonialEntity } from '@/entities/testimonials.entities';

const platforms = [
    'All',
    'LinkedIn',
    'Google',
    'Trustpilot',
    'Chambers',
    'Legal500'
];

const icons: Record<string, any> = {
    LinkedIn: faLinkedin,
    Google: faGoogle,
    Trustpilot: faCheckCircle,
    Chambers: faAward,
    Legal500: faCertificate
}

const colorMap: Record<string, string> = {
    LinkedIn: '#0077B5',
    Google: '#4285F4',
    Trustpilot: '#00B67A',
    Chambers: '#FF9800',
    Legal500: '#E91E63'
};

interface PaginationMeta {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

export default function TestimonialsPage() {
    // State for testimonials data and loading
    const [testimonials, setTestimonials] = useState<TestimonialEntity[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // State for filters and pagination
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        page: 1,
        limit: 6, // Show 6 testimonials per page (2 rows of 3)
        totalCount: 0,
        totalPages: 1
    });

    // Fetch testimonials with filtering and pagination
    useEffect(() => {
        fetchTestimonials();
    }, [selectedCategory, selectedPlatform, paginationMeta.page]);

    // Fetch categories once on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            // Build query parameters
            const params = new URLSearchParams();
            params.append('page', paginationMeta.page.toString());
            params.append('limit', paginationMeta.limit.toString());
            params.append('activeOnly', 'true'); // Only show active testimonials
            
            if (selectedCategory !== 'All') {
                params.append('category', selectedCategory);
            }
            
            if (selectedPlatform !== 'All') {
                params.append('platform', selectedPlatform);
            }
            
            const response = await fetch(`/api/admin/testimonials?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch testimonials');
            }
            
            const data = await response.json();
            
            // Update testimonials and pagination metadata
            setTestimonials(data.data || []);
            setPaginationMeta(prev => ({
                ...prev,
                totalCount: data.meta.totalCount,
                totalPages: data.meta.totalPages
            }));
            setError(null);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError('Failed to load testimonials. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/testimonials/categories');
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            const data = await response.json();
            
            if (Array.isArray(data.data) && data.data.length > 0) {
                setCategories(['All', ...data.data]);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    // Handle category change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        // Reset to first page when changing filters
        setPaginationMeta(prev => ({...prev, page: 1}));
    };

    // Handle platform change
    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlatform(e.target.value);
        // Reset to first page when changing filters
        setPaginationMeta(prev => ({...prev, page: 1}));
    };

    // Pagination controls
    const goToPage = (page: number) => {
        setPaginationMeta(prev => ({...prev, page}));
        // Scroll to top of testimonials section
        document.getElementById('testimonials-section')?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Helper to get icon for platform
    const getIconForPlatform = (platform: string) => {
        return icons[platform] || faCheckCircle; // Default icon
    };

    // Helper to get color for platform
    const getColorForPlatform = (platform: string) => {
        return colorMap[platform] || '#777777'; // Default color
    };

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

            {/* Filters Section */}
            <section className="py-12 bg-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Category Filter */}
                        <div className="relative flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Practice Area</label>
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 appearance-none focus:outline-none focus:ring-2 focus:ring-black-700 bg-white text-neutral-800 hover:border-black-700/50"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <FontAwesomeIcon 
                                    icon={faFilter} 
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Platform Filter */}
                        <div className="relative flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Platform</label>
                            <div className="relative">
                                <select
                                    value={selectedPlatform}
                                    onChange={handlePlatformChange}
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 appearance-none focus:outline-none focus:ring-2 focus:ring-black-700 bg-white text-neutral-800 hover:border-black-700/50"
                                >
                                    {platforms.map(platform => (
                                        <option key={platform} value={platform}>{platform}</option>
                                    ))}
                                </select>
                                <FontAwesomeIcon 
                                    icon={faFilter} 
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section id="testimonials-section" className="py-16">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black-700"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-red-600">{error}</p>
                            <button 
                                onClick={fetchTestimonials}
                                className="mt-4 px-4 py-2 bg-black-700 text-white rounded hover:bg-black-800"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {testimonials.length === 0 ? (
                                <div className="text-center py-16">
                                    <h3 className="text-2xl font-semibold text-neutral-600 mb-2">
                                        No testimonials found
                                    </h3>
                                    <p className="text-neutral-500">
                                        Try adjusting your filters to find more results.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {testimonials.map((testimonial, index) => (
                                        <motion.div
                                            key={testimonial.id}
                                            className="group"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                                                {/* Platform Badge */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {testimonial.platform && (
                                                        <div 
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                                                            style={{ 
                                                                backgroundColor: `${getColorForPlatform(testimonial.platform)}20`,
                                                                color: getColorForPlatform(testimonial.platform)
                                                            }}
                                                        >
                                                            <FontAwesomeIcon 
                                                                icon={getIconForPlatform(testimonial.platform)} 
                                                                className="w-4 h-4 mr-2" 
                                                            />
                                                            {testimonial.platform}
                                                        </div>
                                                    )}

                                                    {/* Category Tag */}
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-600">
                                                        {testimonial.category}
                                                    </div>
                                                </div>

                                                {/* Quote */}
                                                <p className="text-neutral-600 mb-6 flex-grow">
                                                    "{testimonial.text}"
                                                </p>

                                                {/* Author Info */}
                                                <div className="flex items-center space-x-4 mt-auto">
                                                    {testimonial.avatar && (
                                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                                            <Image
                                                                src={testimonial.avatar}
                                                                alt={testimonial.name}
                                                                width={48}
                                                                height={48}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
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
                                                    {[...Array(testimonial.rating || 5)].map((_, i) => (
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
                            )}

                            {/* Pagination Controls */}
                            {paginationMeta.totalPages > 1 && (
                                <div className="flex justify-center mt-12 gap-2">
                                    <button 
                                        onClick={() => goToPage(Math.max(1, paginationMeta.page - 1))}
                                        disabled={paginationMeta.page === 1}
                                        className={`flex items-center justify-center w-10 h-10 rounded-full 
                                            ${paginationMeta.page === 1 
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                                : 'bg-black-700 text-white hover:bg-black-800'}`}
                                        aria-label="Previous page"
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                                    </button>
                                    
                                    {Array.from({ length: paginationMeta.totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`flex items-center justify-center w-10 h-10 rounded-full
                                                ${page === paginationMeta.page
                                                    ? 'bg-black-700 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button 
                                        onClick={() => goToPage(Math.min(paginationMeta.totalPages, paginationMeta.page + 1))}
                                        disabled={paginationMeta.page === paginationMeta.totalPages}
                                        className={`flex items-center justify-center w-10 h-10 rounded-full
                                            ${paginationMeta.page === paginationMeta.totalPages
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : 'bg-black-700 text-white hover:bg-black-800'}`}
                                        aria-label="Next page"
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

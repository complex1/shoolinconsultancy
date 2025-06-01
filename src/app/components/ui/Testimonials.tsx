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
import { useEffect, useState } from 'react';
import TestimonialEntity from '@/entities/testimonials.entities';

const icons = {
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

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<TestimonialEntity[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching testimonials from an API
        const fetchTestimonials = async () => {
            try {
                // Replace with actual API call
                const response = await fetch('/api/admin/testimonials');
                const data = await response.json();
                setTestimonials(data.data || []);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!testimonials || testimonials.length === 0) {
        return <div>No testimonials available.</div>;
    }
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
                                            backgroundColor: colorMap[testimonial.platform as keyof typeof colorMap] || 'green',
                                            color: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={icons[testimonial.platform as keyof typeof icons] || faCheckCircle}
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
                                            {(testimonial.avatar as string)?.length > 0 ? <Image
                                                src={testimonial.avatar as string}
                                                alt={testimonial.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            /> : (
                                                <div
                                                    v-else
                                                    className="w-full h-full flex items-center justify-center bg-gold-400/10 text-gold-400 font-semibold"
                                                    style={{ fontSize: '1.5rem' }}
                                                >
                                                    {testimonial.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
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

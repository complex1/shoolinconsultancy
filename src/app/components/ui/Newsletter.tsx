'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const benefits = [
    {
        icon: '/icons/business.svg',
        text: 'Expert Legal Analysis & Commentary'
    },
    {
        icon: '/icons/strategy.svg',
        text: 'Industry Trends & Updates'
    },
    {
        icon: '/icons/corporate.svg',
        text: 'Regulatory Changes & Compliance'
    }
];

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/public/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        setStatus('Thank you for subscribing to our newsletter!');
        setEmail('');
    };

    return (
        <section className="py-24 bg-gradient-to-br from-black-700 to-black-600 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-5">
                <Image
                    src="/patterns/indian-pattern.svg"
                    alt="Decorative Pattern"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold-400 font-medium mb-4 block">Newsletter</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Stay Ahead in the Legal Landscape
                        </h2>
                        <p className="text-neutral-200 text-lg max-w-3xl mx-auto">
                            Join our community of legal professionals and business leaders. Receive exclusive insights, analysis, and updates directly in your inbox.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.text}
                                className="flex items-center space-x-4 bg-white/5 rounded-[6px] p-4 border border-white/10"
                            >
                                <div className="w-10 h-10 rounded-[6px] bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                                    <Image
                                        src={benefit.icon}
                                        alt={benefit.text}
                                        width={24}
                                        height={24}
                                        className="text-gold-400"
                                    />
                                </div>
                                <p className="text-white text-sm">{benefit.text}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-[6px] border border-white/10">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your professional email"
                                className="flex-1 px-4 py-3 rounded-[6px] bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-gold-400"
                                required
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gold-400 text-maroon-900 font-semibold rounded-[6px] hover:bg-gold-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                Subscribe Now
                            </button>
                        </div>
                        {status && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-center text-gold-400"
                            >
                                {status}
                            </motion.p>
                        )}
                        <p className="text-white/60 text-sm text-center mt-4">
                            Join over 5,000+ legal professionals receiving our weekly insights
                        </p>
                    </motion.form>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </section>
    );
};

export default Newsletter;

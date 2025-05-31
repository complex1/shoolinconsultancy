'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebookF, 
    faTwitter, 
    faLinkedinIn, 
    faInstagram} from '@fortawesome/free-brands-svg-icons';
import { 
    faPhone, 
    faEnvelope, 
    faLocationDot,
    faGavel,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PolicyModal from '../ui/PolicyModal';
import SitemapModal from '../ui/SitemapModal';
import { privacyPolicyContent, termsOfServiceContent } from '../ui/policy-content';

const practiceAreas = [
    "Corporate Law & Governance",
    "Intellectual Property Rights",
    "Litigation & Dispute Resolution",
    "Real Estate & Property Law",
    "Employment & Labor Law",
    "Tax Law & Planning"
];

const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Testimonials", href: "/testimonials" }
];

const Footer = () => {
    const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
    const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
    const [isSitemapOpen, setIsSitemapOpen] = useState(false);
    const [isCookiesPolicyOpen, setIsCookiesPolicyOpen] = useState(false);

    return (
        <footer className="relative bg-gradient-to-br from-black-900 to-black-700 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <Image
                    src="/patterns/indian-pattern.svg"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Border Top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {/* Company Info */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/" className="block">
                            <Image
                                src="/logo.svg"
                                alt="Shoolin Consultancy"
                                width={180}
                                height={50}
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-neutral-300">
                            Providing expert legal solutions with integrity and excellence since 2010. Your trusted partner in navigating complex legal landscapes.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: faFacebookF, href: "#", color: "#1877F2" },
                                { icon: faTwitter, href: "#", color: "#1DA1F2" },
                                { icon: faLinkedinIn, href: "#", color: "#0A66C2" },
                                { icon: faInstagram, href: "#", color: "#E4405F" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-[6px] bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                                    style={{ color: social.color }}
                                >
                                    <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Practice Areas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-white font-semibold text-xl mb-6 border-b border-gold-400/20 pb-2">
                            Practice Areas
                        </h3>
                        <ul className="space-y-3">
                            {practiceAreas.map((area, index) => (
                                <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Link 
                                        href={`/services#${area.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-neutral-300 hover:text-gold-400 transition-colors duration-300 flex items-center group"
                                    >
                                        <FontAwesomeIcon 
                                            icon={faGavel} 
                                            className="w-4 h-4 mr-2 text-gold-400/50 group-hover:text-gold-400 transform group-hover:rotate-12 transition-all duration-300" 
                                        />
                                        {area}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-white font-semibold text-xl mb-6 border-b border-gold-400/20 pb-2">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Link 
                                        href={link.href}
                                        className="text-neutral-300 hover:text-gold-400 transition-colors duration-300 flex items-center group"
                                    >
                                        <FontAwesomeIcon 
                                            icon={faArrowRight} 
                                            className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300 text-gold-400/50 group-hover:text-gold-400" 
                                        />
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-white font-semibold text-xl mb-6 border-b border-gold-400/20 pb-2">
                            Get in Touch
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 group">
                                <div className="w-10 h-10 rounded-[6px] bg-gold-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <p className="text-neutral-300 group-hover:text-gold-400 transition-colors duration-300">
                                        Shoolin Legal Consultancy, 1st Floor, 100 Feet Road, Sector 1, HSR Layout, Bengaluru, Karnataka 560068
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 group">
                                <div className="w-10 h-10 rounded-[6px] bg-gold-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <a href="tel:+911234567890" className="text-neutral-300 hover:text-gold-400 transition-colors duration-300">
                                        +91 98260 00000
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 group">
                                <div className="w-10 h-10 rounded-[6px] bg-gold-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <a href="mailto:contact@shoolinconsultancy.com" className="text-neutral-300 hover:text-gold-400 transition-colors duration-300">
                                        info@shoolinconsultancy.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-neutral-400 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} Shoolin Consultancy. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link
                                href="/rss.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-gold-400 transition-colors text-sm flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                                </svg>
                                RSS Feed
                            </Link>
                            <button
                                onClick={() => setIsSitemapOpen(true)}
                                className="text-white/60 hover:text-gold-400 transition-colors text-sm"
                            >
                                Sitemap
                            </button>
                            <button
                                onClick={() => setIsPrivacyPolicyOpen(true)}
                                className="text-white/60 hover:text-gold-400 transition-colors text-sm"
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => setIsTermsOfServiceOpen(true)}
                                className="text-white/60 hover:text-gold-400 transition-colors text-sm"
                            >
                                Terms of Service
                            </button>
                            <button
                                onClick={() => setIsCookiesPolicyOpen(true)}
                                className="text-white/60 hover:text-gold-400 transition-colors text-sm"
                            >
                                Cookies Policy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Awards Banner */}
            <div className="bg-gradient-to-r from-black-950 to-black-900 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        <span className="text-gold-400 font-semibold">Recognized By:</span>
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            {[
                                { src: '/recognitions/chambers.svg', alt: 'Chambers' },
                                { src: '/recognitions/legal-500.svg', alt: 'Legal 500' },
                                { src: '/recognitions/bar-council.svg', alt: 'Bar Council' },
                                { src: '/recognitions/iblj.svg', alt: 'IBLJ' }
                            ].map((award, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Image
                                        src={award.src}
                                        alt={award.alt}
                                        width={100}
                                        height={40}
                                        className="h-8 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Policy Modals */}
            <PolicyModal
                isOpen={isPrivacyPolicyOpen}
                onClose={() => setIsPrivacyPolicyOpen(false)}
                title="Privacy Policy"
                content={privacyPolicyContent}
            />

            <PolicyModal
                isOpen={isTermsOfServiceOpen}
                onClose={() => setIsTermsOfServiceOpen(false)}
                title="Terms of Service"
                content={termsOfServiceContent}
            />

            <SitemapModal 
                isOpen={isSitemapOpen}
                onClose={() => setIsSitemapOpen(false)}
            />

            <PolicyModal
                isOpen={isCookiesPolicyOpen}
                onClose={() => setIsCookiesPolicyOpen(false)}
                title="Cookies Policy"
                content={<iframe src="/cookies-policy" className="w-full h-[70vh] border-0" />}
            />
        </footer>
    );
};

export default Footer;

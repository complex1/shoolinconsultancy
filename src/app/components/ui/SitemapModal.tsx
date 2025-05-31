'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface SitemapModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const sitemapData = {
    "Main Navigation": [
        { name: "Home", path: "/", description: "Welcome to Shoolin Consultancy - Legal Excellence with Indian Values" },
        { name: "About Us", path: "/about", description: "Learn about our history, mission, and values" },
        { name: "Our Team", path: "/team", description: "Meet our experienced legal professionals" },
        { name: "Contact Us", path: "/contact", description: "Get in touch with our legal experts" }
    ],
    "Legal Services": [
        { 
            name: "Corporate Law & Governance", 
            path: "/services/corporate-law-governance",
            description: "Expert corporate legal services and governance solutions"
        },
        { 
            name: "Intellectual Property Rights", 
            path: "/services/intellectual-property-rights",
            description: "Protect your intellectual property and innovations"
        },
        { 
            name: "Litigation & Dispute Resolution", 
            path: "/services/litigation-dispute-resolution",
            description: "Professional litigation and dispute resolution services"
        },
        { 
            name: "Real Estate & Property Law", 
            path: "/services/real-estate-property-law",
            description: "Comprehensive real estate legal solutions"
        },
        { 
            name: "Employment & Labor Law", 
            path: "/services/employment-labor-law",
            description: "Expert employment and labor law consultation"
        },
        { 
            name: "Tax Law & Planning", 
            path: "/services/tax-law-planning",
            description: "Strategic tax law and planning services"
        }
    ],
    "Knowledge Center": [
        { name: "Blog", path: "/blog", description: "Legal insights, updates, and expert opinions" },
        { name: "Testimonials", path: "/testimonials", description: "Client success stories and feedback" }
    ],
    "Legal Information": [
        { name: "Privacy Policy", path: "/privacy-policy", description: "Our privacy policy and data protection measures" },
        { name: "Terms of Service", path: "/terms-of-service", description: "Terms and conditions of our services" },
        { name: "Disclaimer", path: "/disclaimer", description: "Legal disclaimers and notices" }
    ]
};

const SitemapModal = ({ isOpen, onClose }: SitemapModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/75" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-bold text-maroon-900 pb-4 border-b border-gray-200"
                                >
                                    Site Map
                                </Dialog.Title>

                                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {Object.entries(sitemapData).map(([section, links]) => (
                                        <div key={section} className="space-y-6 bg-gray-50 p-6 rounded-xl">
                                            <h4 className="text-xl font-bold text-maroon-800 border-b border-gold-200 pb-2">
                                                {section}
                                            </h4>
                                            <ul className="space-y-4">
                                                {links.map((link, index) => (
                                                    <li key={index} className="group">
                                                        <Link
                                                            href={link.path}
                                                            className="block p-3 rounded-lg hover:bg-white transition-all duration-300"
                                                            onClick={onClose}
                                                        >
                                                            <div className="flex items-center">
                                                                <FontAwesomeIcon
                                                                    icon={faArrowRight}
                                                                    className="w-4 h-4 mr-3 text-gold-400 transform group-hover:translate-x-1 transition-transform duration-300"
                                                                />
                                                                <span className="font-medium text-maroon-900">
                                                                    {link.name}
                                                                </span>
                                                            </div>
                                                            <p className="mt-1 ml-7 text-sm text-gray-600">
                                                                {link.description}
                                                            </p>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-maroon-600 px-4 py-2 text-sm font-medium text-white hover:bg-maroon-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SitemapModal;

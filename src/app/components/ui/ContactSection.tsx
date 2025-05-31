'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBalanceScale, 
    faHandshake, 
    faGavel, 
    faPeopleGroup,
    faPhone,
    faEnvelope,
    faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// Array of inspiring legal quotes
const legalQuotes = [
    {
        quote: "Justice will not be served until those who are unaffected are as outraged as those who are.",
        author: "Benjamin Franklin"
    },
    {
        quote: "The law is not perfect, but it's there for a reason. It's created to make our lives more manageable.",
        author: "Morgan Freeman"
    },
    {
        quote: "Injustice anywhere is a threat to justice everywhere.",
        author: "Martin Luther King Jr."
    },
    {
        quote: "The arc of the moral universe is long, but it bends toward justice.",
        author: "Theodore Parker"
    },
    {
        quote: "Equal justice under law is not merely a caption on the facade of the Supreme Court building; it is perhaps the most inspiring ideal of our society.",
        author: "Justice Lewis Powell Jr."
    },
    {
        quote: "Laws are like cobwebs, which may catch small flies, but let wasps and hornets break through.",
        author: "Jonathan Swift"
    }
];

const highlights = [
    {
        icon: faBalanceScale,
        title: "Expert Legal Counsel",
        description: "Access to India's finest legal minds with decades of combined experience."
    },
    {
        icon: faHandshake,
        title: "Client-Centric Approach",
        description: "Your success is our priority. We're committed to understanding and meeting your unique needs."
    },
    {
        icon: faGavel,
        title: "Proven Track Record",
        description: "98% success rate across various legal domains and jurisdictions."
    },
    {
        icon: faPeopleGroup,
        title: "Dedicated Team",
        description: "A team of specialists ready to handle your legal matters with precision."
    }
];

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [quote, setQuote] = useState<{quote: string; author: string} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual form submission logic here
        console.log('Form submitted:', formData);
        
        // Select a random quote
        const randomQuote = legalQuotes[Math.floor(Math.random() * legalQuotes.length)];
        setQuote(randomQuote);
        
        // Set form as submitted
        setIsSubmitted(true);
        
        // You would typically send the form data to your backend here
        // For now we'll just simulate a successful submission
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: 'url(/patterns/indian-pattern.svg)' }} />
            </div>
            {/* Enhanced Decorative Elements for New Layout */}
            <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-gold-100/20 via-gold-200/10 to-transparent rounded-br-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tl from-maroon-100/20 via-maroon-200/10 to-transparent rounded-tl-full blur-3xl" />
            <div className="absolute top-1/4 right-0 w-1/5 h-1/5 bg-gradient-to-bl from-gold-100/10 to-transparent rounded-bl-full blur-2xl" />
            <div className="absolute bottom-1/4 left-0 w-1/5 h-1/5 bg-gradient-to-tr from-maroon-100/10 to-transparent rounded-tr-full blur-2xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="relative z-10 mb-20">
                        {/* Decorative elements */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full blur-2xl" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tl from-gold-400/10 to-transparent rounded-full blur-3xl" />
                        
                        <div className="text-center relative">
                            <motion.div 
                                className="inline-block mb-6"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                            >
                            </motion.div>
                            
                            <motion.h2 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="bg-gradient-to-r from-black-800 via-black-700 to-black-800 bg-clip-text text-transparent">
                                    Let's Discuss With Us
                                </span>
                                <br className="hidden md:block" />
                                <span className="relative inline-block mt-2">
                                    <span className="absolute -inset-1 bg-gradient-to-r from-gold-200/30 via-gold-300/20 to-transparent blur-md rounded-lg" />
                                    <span className="relative bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                                        Legal Aspirations
                                    </span>
                                </span>
                            </motion.h2>
                            
                            <motion.p 
                                className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Join our network of satisfied clients worldwide. Schedule a consultation with our expert legal team and embark on a journey towards{' '}
                                <span className="text-gold-600 font-medium">exceptional legal solutions</span>.
                            </motion.p>
                            
                            {/* Voice Tags */}
                            <div className="flex flex-wrap justify-center gap-4 mt-8">
                                {['Excellence', 'Innovation', 'Global Reach', 'Trust'].map((tag, index) => (
                                    <motion.span
                                        key={tag}
                                        className="px-4 py-1 bg-gradient-to-r from-neutral-50 to-white rounded-full text-sm text-neutral-600 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Decorative line */}
                            <motion.div
                                className="w-24 h-1 bg-gradient-to-r from-gold-400 to-transparent mx-auto mt-8 rounded-full"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: 96, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Main Content Grid - Restructured for form emphasis */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
                        {/* Left Column - Highlights - Takes 5 columns (40%) */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    className="bg-gradient-to-br from-neutral-50 to-white rounded-[6px] p-6 relative group hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        boxShadow: '0 4px 20px -5px rgba(182, 155, 60, 0.1)'
                                    }}
                                >
                                    {/* Decorative corner accents */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-400/30 rounded-tl-[6px] transition-colors duration-300 group-hover:border-gold-400" />
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold-400/30 rounded-tr-[6px] transition-colors duration-300 group-hover:border-gold-400" />
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold-400/30 rounded-bl-[6px] transition-colors duration-300 group-hover:border-gold-400" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold-400/30 rounded-br-[6px] transition-colors duration-300 group-hover:border-gold-400" />
                                    
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-14 h-14 rounded-[6px] bg-gradient-to-br from-gold-100 to-white flex items-center justify-center flex-shrink-0 group-hover:from-gold-200 group-hover:to-gold-100 transition-all duration-300 shadow-lg border border-gold-200">
                                                <FontAwesomeIcon icon={item.icon} className="w-7 h-7 text-gold-600 transition-transform duration-300 group-hover:scale-110" />
                                            </div>
                                            <h3 className="text-lg text-maroon-900 font-semibold group-hover:text-gold-600 transition-colors duration-300">{item.title}</h3>
                                        </div>
                                        <div className="pl-2 border-l-2 border-gold-100">
                                            <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Column - Contact Form - Takes full remaining space (7 columns/60%) */}
                        <div className="lg:col-span-7 flex flex-col">
                            {/* Contact Form - Top section */}
                            <motion.div 
                                className="bg-gradient-to-br from-neutral-50 to-white rounded-[6px] p-8 shadow-xl relative border border-neutral-100 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {/* Decorative corner accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/30 rounded-tl-[6px]" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold-400/30 rounded-tr-[6px]" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold-400/30 rounded-bl-[6px]" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold-400/30 rounded-br-[6px]" />
                                
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Form title for the larger space */}
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-black-700">Get in Touch</h3>
                                            <p className="text-gold-600 text-sm mt-2">Fill out the form below for a personalized consultation</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-black-700 mb-1">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-neutral-200 rounded-[6px] focus:outline-none focus:border-gold-400 text-neutral-700 font-medium placeholder-neutral-400 hover:border-gold-300 transition-colors duration-300"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="service" className="block text-sm font-medium text-black-700 mb-1">
                                                    Service Required
                                                </label>
                                                <select
                                                    id="service"
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-neutral-200 rounded-[6px] focus:outline-none focus:border-gold-400 text-neutral-700 font-medium appearance-none cursor-pointer hover:border-gold-300 transition-colors duration-300 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23B8860B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[calc(100%-12px)_center] bg-no-repeat"
                                                    required
                                                >
                                                    <option value="" className="text-neutral-400">Select a service</option>
                                                    <option value="corporate" className="text-neutral-700">Corporate Law</option>
                                                    <option value="ip" className="text-neutral-700">Intellectual Property</option>
                                                    <option value="litigation" className="text-neutral-700">Litigation</option>
                                                    <option value="real-estate" className="text-neutral-700">Real Estate</option>
                                                    <option value="employment" className="text-neutral-700">Employment Law</option>
                                                    <option value="tax" className="text-neutral-700">Tax Law</option>
                                                    <option value="other" className="text-neutral-700">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-black-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-neutral-200 rounded-[6px] focus:outline-none focus:border-gold-400 text-neutral-700 font-medium placeholder-neutral-400 hover:border-gold-300 transition-colors duration-300"
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-black-700 mb-1">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border border-neutral-200 rounded-[6px] focus:outline-none focus:border-gold-400 text-neutral-700 font-medium placeholder-neutral-400 hover:border-gold-300 transition-colors duration-300"
                                                    placeholder="+91 98765 43210"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-black-700 mb-1">
                                                Your Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={5}
                                                className="w-full p-3 bg-white border border-neutral-200 rounded-[6px] focus:outline-none focus:border-gold-400 text-neutral-700 font-medium placeholder-neutral-400 hover:border-gold-300 transition-colors duration-300"
                                                placeholder="Describe your legal needs in detail..."
                                                required
                                            />
                                        </div>
                                        
                                        <div className="flex justify-center mt-8">
                                            <button
                                                type="submit"
                                                className="px-10 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold rounded-[6px] hover:from-gold-500 hover:to-gold-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                                            >
                                                Submit Inquiry
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <motion.div 
                                        className="h-full py-4 flex flex-col items-center justify-center text-center"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 100,
                                            duration: 0.5 
                                        }}
                                    >
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-14 w-14 text-green-600" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M5 13l4 4L19 7" 
                                                />
                                            </svg>
                                        </div>
                                        
                                        <motion.h3 
                                            className="text-3xl font-bold text-black-700 mb-3"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Thank You, {formData.name.split(' ')[0]}!
                                        </motion.h3>
                                        
                                        <motion.p 
                                            className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            Your inquiry has been received. Our expert legal team will review your request and contact you within 24 hours.
                                        </motion.p>
                                        
                                        {quote && (
                                            <motion.div 
                                                className="mt-6 max-w-2xl mx-auto"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <div className="p-8 bg-gradient-to-r from-gold-50 to-white border border-gold-100 rounded-lg relative shadow-md">
                                                    <div className="absolute -top-5 -left-5 w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                                                        <svg 
                                                            className="w-6 h-6 text-gold-600" 
                                                            fill="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                                                        </svg>
                                                    </div>
                                                    
                                                    <p className="text-neutral-700 italic text-xl mb-4 leading-relaxed">"{quote.quote}"</p>
                                                    <p className="text-gold-600 text-right font-medium border-t border-gold-100 pt-3">— {quote.author}</p>
                                                </div>
                                                
                                                <div className="mt-10 flex justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setIsSubmitted(false);
                                                            setFormData({
                                                                name: '',
                                                                email: '',
                                                                phone: '',
                                                                service: '',
                                                                message: ''
                                                            });
                                                        }}
                                                        className="py-3 px-8 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium rounded-[6px] hover:from-gold-500 hover:to-gold-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                                                    >
                                                        Submit Another Inquiry
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                            
                            {/* Quick Response Card */}
                            <div className="bg-white rounded-[6px] shadow-xl relative p-6">
                                {/* Decorative corner accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-400 rounded-tl-[6px]" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-400 rounded-tr-[6px]" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-400 rounded-bl-[6px]" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-400 rounded-br-[6px]" />
                                
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 relative">
                                        {/* Decorative element */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-100 to-transparent rounded-bl-full opacity-50" />
                                        
                                        <div className="relative z-10 flex items-start">
                                            <div className="w-14 h-14 rounded-[6px] bg-gradient-to-br from-gold-100 to-white flex items-center justify-center flex-shrink-0 mr-5 shadow-lg border border-gold-200">
                                                <FontAwesomeIcon icon={faHandshake} className="w-7 h-7 text-gold-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gold-600 mb-3 flex items-center">
                                                    Quick Response Guarantee
                                                </h3>
                                                <p className="text-neutral-700 text-lg">
                                                    We respond to all inquiries within 24 hours. Your legal matters are our priority.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

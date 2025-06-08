'use client';

import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="p-6 bg-gradient-to-r from-black-700 to-black-600 rounded border border-gold-400/20">
            <h3 className="text-2xl font-semibold mb-6 text-gold-400">
                Schedule an Appointment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 bg-maroon-900/50 border border-gold-400/20 rounded text-neutral-200 focus:outline-none focus:border-gold-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-maroon-900/50 border border-gold-400/20 rounded text-neutral-200 focus:outline-none focus:border-gold-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-200 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 bg-maroon-900/50 border border-gold-400/20 rounded text-neutral-200 focus:outline-none focus:border-gold-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-200 mb-1">
                        Message (Optional)
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-2 bg-maroon-900/50 border border-gold-400/20 rounded text-neutral-200 focus:outline-none focus:border-gold-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gold-400 text-black-900 font-semibold rounded hover:bg-gold-500 transition-colors duration-200"
                >
                    Request Appointment
                </button>
            </form>
        </div>
    );
};

export default ContactForm;

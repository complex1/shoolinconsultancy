'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 md:py-20 lg:py-24 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Strategic Consulting Solutions for Business Growth
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
              Shoolin Consultancy helps businesses transform challenges into opportunities with strategic insights and expert guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="btn btn-secondary">
                Our Services
              </Link>
              <Link href="/contact" className="btn bg-white text-blue-800 hover:bg-blue-50">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
            <div className="relative bg-gradient-to-tr from-blue-600 to-sky-400 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Schedule a Free Consultation</h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    aria-label="Your Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    aria-label="Your Email"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    rows={3}
                    aria-label="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-700 hover:bg-blue-50 py-2 px-6 rounded-md font-medium transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

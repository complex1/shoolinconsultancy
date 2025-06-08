'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/app/styles/colors';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Shoolin Consultancy"
              width={40}
              height={40}
              className="w-auto h-10"
            />
            <div className="flex flex-col">
              <span 
                className="text-2xl font-bold"
                style={{ 
                  color: scrolled ? colors.black[900] : colors.white 
                }}
              >
                Shoolin
              </span>
              <span 
                className="text-sm font-medium"
                style={{ 
                  color: scrolled ? colors.neutral[600] : colors.neutral[200] 
                }}
              >
                Legal Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '/team', label: 'Our Team' },
              { href: '/blog', label: 'Insights' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-medium text-sm tracking-wide group"
                style={{ 
                  color: scrolled ? colors.neutral[700] : colors.white 
                }}
              >
                {item.label}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full"
                  style={{ backgroundColor: colors.gold[400] }}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className={`
                px-6 py-2.5 rounded-md text-sm font-semibold 
                transition-all duration-300 hover:scale-105
                ${scrolled 
                  ? 'bg-white hover:bg-neutral-50 border border-neutral-200' 
                  : 'bg-white hover:bg-opacity-90'
                }
              `}
              style={{
                color: colors.gold[500],
                boxShadow: scrolled ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-colors"
              style={{ 
                color: scrolled ? colors.neutral[700] : colors.white 
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 py-4 border-t border-neutral-200"
              style={{ 
                backgroundColor: colors.white 
              }}
            >
              <ul className="flex flex-col space-y-4">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/services', label: 'Services' },
                  { href: '/team', label: 'Our Team' },
                  { href: '/gallery', label: 'Gallery' },
                  { href: '/blog', label: 'Insights' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block font-medium hover:text-gold-500 transition-colors"
                      style={{ color: colors.neutral[700] }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="block py-2.5 px-4 rounded-md text-center font-semibold transition-colors bg-white border border-neutral-200 hover:bg-neutral-50"
                    style={{ 
                      color: colors.gold[500]
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

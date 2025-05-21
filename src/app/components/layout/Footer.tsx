import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shoolin Consultancy</h3>
            <p className="text-blue-100 mb-4">
              Providing expert consulting services to businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-blue-100 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" className="text-blue-100 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-blue-100 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-100 hover:text-white">Services</Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-100 hover:text-white">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#business" className="text-blue-100 hover:text-white">Business Consulting</Link>
              </li>
              <li>
                <Link href="/services#financial" className="text-blue-100 hover:text-white">Financial Advisory</Link>
              </li>
              <li>
                <Link href="/services#strategy" className="text-blue-100 hover:text-white">Strategic Planning</Link>
              </li>
              <li>
                <Link href="/services#digital" className="text-blue-100 hover:text-white">Digital Transformation</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-blue-100">
              <p className="mb-2">123 Business Street</p>
              <p className="mb-2">San Francisco, CA 94105</p>
              <p className="mb-2">United States</p>
              <p className="mb-2">
                <a href="mailto:info@shoolinconsultancy.org" className="hover:text-white">
                  info@shoolinconsultancy.org
                </a>
              </p>
              <p>
                <a href="tel:+1234567890" className="hover:text-white">
                  +1 (234) 567-890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Shoolin Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

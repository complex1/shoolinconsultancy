'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface LocationCardProps {
  title: string;
  address: string;
  phone: string;
  email: string;
  delay?: number;
}

const LocationCard = ({ title, address, phone, email, delay = 0 }: LocationCardProps) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div className="p-6 border-b border-neutral-100">
      <h3 className="text-xl font-bold text-gold-600 mb-2">{title}</h3>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-gold-600" />
        </div>
        <p className="text-neutral-600">{address}</p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-gold-600" />
        </div>
        <a href={`tel:${phone}`} className="text-neutral-600 hover:text-gold-600 transition-colors">
          {phone}
        </a>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-gold-600" />
        </div>
        <a href={`mailto:${email}`} className="text-neutral-600 hover:text-gold-600 transition-colors">
          {email}
        </a>
      </div>
    </div>
  </motion.div>
);

const LegalNetwork = () => {
  const locations = [
    {
      title: "HSR Layout Office",
      address: "Shoolin Legal Consultancy, 1st Floor, 100 Feet Road, Sector 1, HSR Layout, Bengaluru, Karnataka 560068",
      phone: "+91 98765 43210",
      email: "hsr@shoolinconsultancy.com"
    },
    {
      title: "Indiranagar Office",
      address: "Shoolin Legal Consultancy, 2nd Floor, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      phone: "+91 98765 43211",
      email: "indiranagar@shoolinconsultancy.com"
    },
    {
      title: "Whitefield Office",
      address: "Shoolin Legal Consultancy, 3rd Floor, Phoenix Marketcity Mall, Whitefield Main Road, Bengaluru, Karnataka 560066",
      phone: "+91 98765 43212",
      email: "whitefield@shoolinconsultancy.com"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black-700 via-gold-400 to-black-600 bg-clip-text text-transparent">
            Our Legal Network
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            With strategically located offices across Bangalore, we ensure accessibility and convenience for all our clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              {...location}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalNetwork; 
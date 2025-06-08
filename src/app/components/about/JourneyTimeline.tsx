'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAward, faHandshake, faScaleBalanced, faGlobe, faUsers } from '@fortawesome/free-solid-svg-icons';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: any;
  achievement?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2015',
    title: 'Foundation',
    description: 'Established Shoolin Legal Consultancy with a vision to provide exceptional legal services.',
    icon: faStar,
    achievement: 'Started with a team of 3 dedicated legal professionals'
  },
  {
    year: '2017',
    title: 'First Major Recognition',
    description: 'Received our first major legal excellence award and expanded our practice areas.',
    icon: faAward,
    achievement: 'Recognized as "Emerging Law Firm of the Year"'
  },
  {
    year: '2019',
    title: 'Strategic Expansion',
    description: 'Opened our second office in Indiranagar and formed key partnerships.',
    icon: faHandshake,
    achievement: 'Successfully handled 500+ cases'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Implemented cutting-edge legal tech solutions for enhanced client service.',
    icon: faGlobe,
    achievement: 'Launched virtual consultation platform'
  },
  {
    year: '2022',
    title: 'Market Leadership',
    description: 'Established ourselves as a leading legal consultancy in Bangalore.',
    icon: faScaleBalanced,
    achievement: '1000+ satisfied clients'
  },
  {
    year: '2024',
    title: 'Growing Strong',
    description: 'Expanded to multiple locations with a comprehensive range of legal services.',
    icon: faUsers,
    achievement: 'Team of 50+ legal professionals'
  }
];

const TimelineEvent = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} relative`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connector Line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
      </div>

      {/* Content */}
      <div className={`w-1/2 ${isEven ? 'text-right' : 'text-left'} relative z-10`}>
        <div className={`bg-white p-6 rounded-xl shadow-lg border border-neutral-100 
          ${isEven ? 'mr-8' : 'ml-8'} hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center gap-4 mb-3 text-gold-600">
            <FontAwesomeIcon icon={event.icon} className={`w-6 h-6 ${isEven ? 'order-1' : 'order-none'}`} />
            <h3 className="text-xl font-bold">{event.title}</h3>
          </div>
          <p className="text-neutral-600 mb-3">{event.description}</p>
          {event.achievement && (
            <p className="text-sm text-gold-600 font-medium">
              Achievement: {event.achievement}
            </p>
          )}
        </div>
      </div>

      {/* Year Node */}
      <div className="relative z-20">
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 
            flex items-center justify-center text-white font-bold shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {event.year}
        </motion.div>
      </div>

      {/* Empty space for alignment */}
      <div className="w-1/2" />
    </motion.div>
  );
};

const JourneyTimeline = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/legal-pattern.svg')] opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black-700 via-gold-400 to-black-600 bg-clip-text text-transparent">
            Our Journey Through Time
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a leading legal consultancy, our journey reflects our commitment to excellence and growth
          </p>
        </motion.div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.year} event={event} index={index} />
          ))}
        </div>

        {/* Future Vision */}
        <motion.div
          className="text-center mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gold-600 mb-3">Looking Ahead</h3>
          <p className="text-neutral-600">
            As we continue to grow, our commitment to providing exceptional legal services remains unwavering. 
            We envision expanding our reach while maintaining the personalized approach that sets us apart.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyTimeline; 
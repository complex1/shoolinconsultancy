import { motion } from 'framer-motion';
import Image from 'next/image';
import { colors } from '@/app/styles/colors';

interface BadgeProps {
  src: string;
  alt: string;
  label: string;
  delay?: number;
}

const Badge = ({ src, alt, label, delay = 0 }: BadgeProps) => (
  <motion.div
    className="relative"
    initial={{ scale: 0.9, rotate: delay ? 3 : -3 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2 + delay
    }}
  >
    <motion.div 
      className="inline-flex items-center px-5 py-3 rounded-full bg-gold-400/15 border border-gold-400/30 backdrop-blur-sm overflow-hidden space-x-3"
      whileHover={{
        backgroundColor: "rgba(218, 165, 32, 0.2)",
        boxShadow: "0 0 15px rgba(218, 165, 32, 0.4)",
        scale: 1.05
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative w-8 h-8">
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      
      <motion.span 
        className="text-sm font-medium whitespace-nowrap"
        style={{ color: colors.gold[400] }}
      >
        {label}
      </motion.span>

      {/* Shine effect */}
      <motion.span 
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          transform: "translateX(-100%)"
        }}
        animate={{ translateX: ["0%", "150%", "150%"] }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 5,
          delay: delay
        }}
      />
    </motion.div>

    {/* Glow effect */}
    <motion.div 
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: `${colors.gold[400]}10` }}
      animate={{ 
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.1, 0.3]
      }}
      transition={{ 
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
        delay: delay
      }}
    />
  </motion.div>
);

const RecognitionBadges = () => {
  const badges = [
    {
      src: '/badges/iso-certified.svg',
      alt: 'ISO 9001:2015 Certification',
      label: 'ISO 9001:2015 Certified',
      delay: 0
    },
    {
      src: '/badges/bar-council.svg',
      alt: 'Bar Council Registration',
      label: 'Bar Council Registered',
      delay: 0.2
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((badge, index) => (
        <Badge key={index} {...badge} />
      ))}
    </div>
  );
};

export default RecognitionBadges; 
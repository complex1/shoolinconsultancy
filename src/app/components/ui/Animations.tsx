import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type FadeInViewProps = {
  children: ReactNode;
  delay?: number;
  [key: string]: any;
};

export const FadeInView = ({ children, delay = 0, ...props }: FadeInViewProps) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={fadeIn}
    transition={{
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }}
    {...props}
  >
    {children}
  </motion.div>
);

type StaggerParentProps = {
  children: ReactNode;
  [key: string]: any;
};

export const StaggerParent = ({ children, ...props }: StaggerParentProps) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={staggerChildren}
    {...props}
  >
    {children}
  </motion.div>
);

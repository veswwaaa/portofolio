import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = 'up',
  duration = 0.7
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 32, x: 0 };
      case 'down': return { y: -32, x: 0 };
      case 'left': return { x: 36, y: 0 };
      case 'right': return { x: -36, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const initial = {
    ...getInitialPosition(),
    opacity: 0
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  by?: 'word' | 'char';
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = "",
  delay = 0,
  by = 'word'
}) => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  if (by === 'char') {
    const characters = Array.from(children);

    return (
      <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
        {characters.map((char, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: delay + index * 0.02,
                ease: customEase
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // by word
  const words = children.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden py-1">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.06,
              ease: customEase
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

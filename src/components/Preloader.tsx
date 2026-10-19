import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 700);
          }, 200);
          return 100;
        }
        // quick randomized count increment
        const step = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between p-6 md:p-12 bg-[#141414] text-[#F2EEE6] select-none"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top mono info */}
          <div className="flex justify-between items-center font-mono text-xs tracking-widest text-[#9E988F]">
            <span>[V]© 2026</span>
            <span>PORTFOLIO / SMK TELKOM BJB</span>
          </div>

          {/* Center Brand */}
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF4D1C] mb-3">
              ● INITIALIZING SYSTEM
            </p>
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight uppercase leading-none">
              Selvano Sena
            </h1>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex justify-between items-end border-t border-[#333] pt-6">
            <span className="font-mono text-xs text-[#9E988F] uppercase tracking-wider">
              Rekayasa Perangkat Lunak & IoT
            </span>
            <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tighter text-[#FF4D1C]">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

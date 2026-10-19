import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-8 right-8 z-[90] flex items-center gap-3 px-5 py-3 border border-brutal bg-[#141414] text-[#F2EEE6] dark:bg-[#F2EEE6] dark:text-[#141414] shadow-2xl"
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FF4D1C] text-white">
            <Check size={13} strokeWidth={3} />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest font-semibold">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

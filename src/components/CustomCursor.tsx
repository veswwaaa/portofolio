import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      const interactiveTarget = target?.closest('a, button, [role="button"]');

      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || "");
        setIsHovered(true);
      } else if (interactiveTarget) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center font-mono text-[10px] uppercase font-bold text-white tracking-widest"
      animate={{
        x: mousePosition.x - (cursorText ? 36 : isHovered ? 24 : 6),
        y: mousePosition.y - (cursorText ? 36 : isHovered ? 24 : 6),
        width: cursorText ? 72 : isHovered ? 48 : 12,
        height: cursorText ? 72 : isHovered ? 48 : 12,
        backgroundColor: cursorText
          ? "var(--accent)"
          : isHovered
          ? "var(--accent)"
          : "var(--text)",
        opacity: 0.95
      }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 30,
        mass: 0.2
      }}
      style={{
        borderRadius: '50%',
        mixBlendMode: cursorText ? 'normal' : 'difference'
      }}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-white drop-shadow-sm select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

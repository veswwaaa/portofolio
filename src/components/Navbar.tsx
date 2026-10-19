import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Moon, Sun, Palette } from 'lucide-react';
import { ScrambleText } from './animations/ScrambleText';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  accent: string;
  onSelectAccent: (accent: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  accent,
  onSelectAccent
}) => {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - prevScroll;
    if (latest > 120 && diff > 10) {
      setHidden(true);
    } else if (diff < -10 || latest <= 50) {
      setHidden(false);
    }
    setPrevScroll(latest);
  });

  const navLinks = [
    { label: "Proyek", href: "#proyek" },
    { label: "Tentang", href: "#tentang" },
    { label: "Sosial", href: "#kontak" }
  ];

  const accents = [
    { id: "orange", label: "Oranye (#FF4D1C)", color: "#FF4D1C" },
    { id: "lime", label: "Lime (#B8E817)", color: "#B8E817" },
    { id: "cobalt", label: "Kobalt (#3D5AFE)", color: "#3D5AFE" }
  ];

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-accent-theme"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Navbar */}
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] bg-brutal/90 backdrop-blur-md border-b border-brutal transition-colors duration-300"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo / Initials */}
          <a
            href="#"
            className="group flex items-center gap-2 font-display font-bold text-xl tracking-tight text-brutal"
            data-cursor="Home"
          >
            <span className="font-mono text-xs px-2 py-1 border border-brutal bg-accent-theme text-white uppercase tracking-wider">
              [V]©
            </span>
            <span className="hidden sm:inline font-display text-sm tracking-widest uppercase">
              SELVANO SENA
            </span>
          </a>

          {/* Right Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8 shrink-0">
            <nav className="flex items-center gap-2 sm:gap-4 md:gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative group py-1 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-tight sm:tracking-widest text-brutal hover:text-accent-theme transition-colors duration-200"
                >
                  <ScrambleText text={link.label} />
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent-theme group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>

            {/* Separator */}
            <div className="h-4 w-[1px] bg-brutal opacity-30 shrink-0" />

            {/* Controls (Theme Toggle & Accent Picker) */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Accent Theme Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAccentPicker(!showAccentPicker)}
                  className="p-1.5 sm:p-2 border border-brutal hover:bg-accent-theme hover:text-white transition-colors duration-200 shrink-0 cursor-pointer"
                  title="Ganti Warna Aksen"
                  aria-label="Pilih Warna Aksen"
                >
                  <Palette size={15} />
                </button>

                {showAccentPicker && (
                  <div className="absolute right-0 mt-2 p-2 border border-brutal bg-brutal shadow-xl z-50 flex gap-2">
                    {accents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectAccent(item.id);
                          setShowAccentPicker(false);
                        }}
                        className={`w-6 h-6 rounded-none border border-brutal transition-transform hover:scale-110 ${
                          accent === item.id ? 'ring-2 ring-offset-2 ring-brutal' : ''
                        }`}
                        style={{ backgroundColor: item.color }}
                        title={item.label}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Dark / Light Toggle */}
              <button
                onClick={onToggleTheme}
                className="p-1.5 sm:p-2 border border-brutal hover:bg-accent-theme hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
                title={isDark ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { portfolioData } from '../data';
import { Typewriter } from './animations/Typewriter';
import { ScrambleText } from './animations/ScrambleText';
import { Magnetic } from './animations/Magnetic';
import { VisitorCounter } from './VisitorCounter';

export const Hero: React.FC = () => {
  const { headline, role, learningBadge } = portfolioData;

  const scrollToProjects = () => {
    const el = document.getElementById('proyek');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 border-b border-brutal">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-between flex-1">
        {/* Top Badges / Meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-brutal bg-brutal font-mono text-[10px] sm:text-xs uppercase tracking-wider max-w-full overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-accent-theme animate-ping shrink-0" />
            <span className="font-semibold text-accent-theme shrink-0">●</span>
            <span className="truncate">
              <ScrambleText text={learningBadge} />
            </span>
          </div>

          {/* Right Meta: Visitor Counter + Location & Institution */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <VisitorCounter variant="badge" />
            <div className="font-mono text-[10px] sm:text-xs text-brutal-muted uppercase tracking-widest hidden md:block">
              BANJARBARU, ID <span>— RPL TELKOM</span>
            </div>
          </div>
        </div>

        {/* Main Display Headline (Balanced, proportional editorial brutalist typography) */}
        <div className="my-auto py-4 sm:py-6 max-w-5xl">
          <h1 className="font-display font-bold leading-[1.08] tracking-tight text-[clamp(1.5rem,4.5vw,3.75rem)] uppercase text-brutal break-words">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {headline.prefix}{" "}
                <span className="relative inline-block text-accent-theme underline decoration-2 underline-offset-4 decoration-accent-theme">
                  {headline.nameHighlight}
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-2 sm:mt-3">
              <motion.span
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {headline.middle && (
                  <span className="text-brutal opacity-95 mr-2">
                    {headline.middle.startsWith('.') ? headline.middle.slice(1).trim() : headline.middle}{" "}
                  </span>
                )}
                {headline.accentHighlight && (
                  <span className="inline-block bg-accent-theme text-white px-2 py-0.5 text-[0.92em]">
                    {headline.accentHighlight}
                  </span>
                )}
              </motion.span>
            </span>
          </h1>

          {/* Role with Typewriter effect */}
          <div className="mt-8 md:mt-12 flex items-center gap-3 font-mono text-sm sm:text-lg md:text-xl text-brutal tracking-tight">
            <span className="text-accent-theme font-bold">/</span>
            <span className="text-brutal-muted">FOKUS:</span>
            <Typewriter
              words={role}
              typingSpeed={55}
              deletingSpeed={25}
              pauseDuration={1800}
              className="font-bold text-brutal"
            />
          </div>
        </div>

        {/* Bottom CTA & Scroll Indicator */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-brutal/40">
          <div className="max-w-md font-mono text-xs text-brutal-muted leading-relaxed uppercase tracking-wider">
            Satu halaman, tiga bagian penting: tentang saya, arsip karya pilihan, dan tautan sosial media.
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center gap-3 px-6 py-4 border border-brutal bg-brutal font-mono text-xs uppercase tracking-widest font-bold text-brutal overflow-hidden cursor-pointer"
              data-cursor="Scroll"
            >
              {/* Accent fill rising from bottom on hover */}
              <span className="absolute inset-0 bg-accent-theme translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                Lihat Proyek
              </span>
              <ArrowDown
                size={14}
                className="relative z-10 group-hover:text-white group-hover:translate-y-1 transition-all duration-200"
              />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

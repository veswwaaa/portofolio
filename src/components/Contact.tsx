import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data';
import { Toast } from './Toast';
import { Reveal } from './animations/Reveal';
import { SplitText } from './animations/SplitText';
import { VisitorCounter } from './VisitorCounter';

export const Contact: React.FC = () => {
  const { email, socials } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    // Subtle celebratory confetti burst
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#FF4D1C', '#141414', '#F2EEE6']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="kontak" className="py-16 sm:py-24 md:py-36 bg-brutal text-brutal">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Giant Headline */}
        <div className="pb-8 sm:pb-12 md:pb-20 border-b border-brutal">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-theme block mb-3 font-semibold">
            // HUBUNGI SAYA
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-7xl md:text-9xl uppercase tracking-tighter leading-none text-brutal break-words">
            <SplitText by="char">Ngobrol yuk.</SplitText>
          </h2>
          <p className="mt-4 sm:mt-6 font-mono text-xs sm:text-sm text-brutal-muted max-w-xl uppercase tracking-wider">
            Terbuka untuk diskusi proyek IoT, kolaborasi web app, atau sekadar bertukar ide seputar teknologi.
          </p>
        </div>

        {/* Copy Email Bar */}
        <div className="py-6 sm:py-8 md:py-12 border-b border-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
          <div className="overflow-hidden">
            <span className="font-mono text-[11px] sm:text-xs uppercase text-brutal-muted tracking-widest block mb-1">
              EMAIL LANGSUNG:
            </span>
            <span className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brutal break-all sm:break-normal block">
              {email}
            </span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="group relative inline-flex items-center justify-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 border-2 border-brutal bg-brutal font-mono text-xs uppercase tracking-widest font-bold text-brutal overflow-hidden cursor-pointer w-full sm:w-auto shrink-0"
            data-cursor="Copy"
          >
            <span className="absolute inset-0 bg-accent-theme translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 group-hover:text-white flex items-center gap-2 transition-colors">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Tersalin ✓" : "Salin Alamat Email"}</span>
            </span>
          </button>
        </div>

        {/* Social Links Big Rows */}
        <div className="divide-y divide-brutal">
          {socials.map((social, index) => (
            <Reveal key={social.name} delay={index * 0.08} direction="up">
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="Buka"
                className="group relative flex items-center justify-between py-6 sm:py-8 md:py-10 cursor-pointer overflow-hidden transition-colors"
              >
                {/* Background sliding accent fill */}
                <div className="absolute inset-0 bg-accent-theme -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />

                <div className="relative z-10 flex items-center gap-6 md:gap-12">
                  <span className="font-mono text-xs text-brutal-muted group-hover:text-white transition-colors">
                    0{index + 1}
                  </span>
                  <span className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-brutal group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <span className="font-mono text-xs text-brutal-muted group-hover:text-white transition-colors hidden sm:inline">
                    {social.handle}
                  </span>
                  <div className="w-10 h-10 border border-brutal flex items-center justify-center group-hover:border-white group-hover:text-white text-brutal transition-colors">
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-brutal flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-brutal-muted uppercase tracking-wider">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div>
              © {new Date().getFullYear()} SELVANO SENA A.P — SMK TELKOM BANJARBARU
            </div>
            <VisitorCounter variant="footer" />
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">{portfolioData.footerNote}</span>
            <button
              onClick={scrollToTop}
              className="text-brutal hover:text-accent-theme font-bold cursor-pointer inline-flex items-center gap-1"
            >
              Kembali ke atas ↑
            </button>
          </div>
        </footer>
      </div>

      {/* Copy Toast */}
      <Toast message="Email Tersalin ke Clipboard ✓" isVisible={copied} />
    </section>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Code2 } from 'lucide-react';
import type { ProjectItem } from '../data';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-brutal bg-brutal text-brutal shadow-2xl z-10 p-6 md:p-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-brutal pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm px-2 py-0.5 bg-accent-theme text-white font-bold">
                {project.number}
              </span>
              <span className="font-mono text-xs uppercase text-brutal-muted tracking-widest">
                {project.category} • {project.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border border-brutal hover:bg-accent-theme hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Tutup Detail Proyek"
            >
              <X size={18} />
            </button>
          </div>

          {/* Project Image */}
          <div className="relative aspect-video w-full overflow-hidden border border-brutal mb-6 bg-black/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Title & Description */}
          <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight mb-3">
            {project.title}
          </h2>
          <p className="font-body text-base sm:text-lg text-brutal leading-relaxed max-w-2xl mb-6">
            {project.description}
          </p>

          {/* Tools & Tech Chips */}
          <div className="mb-8">
            <span className="block font-mono text-xs uppercase tracking-widest text-brutal-muted mb-2 flex items-center gap-2">
              <Layers size={13} /> Tools & Teknologi:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 font-mono text-xs uppercase border border-brutal bg-brutal font-medium hover:border-accent-theme transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-brutal">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-theme text-white font-mono text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-opacity"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-brutal bg-brutal text-brutal font-mono text-xs uppercase tracking-wider font-bold hover:bg-brutal/80 transition-colors"
              >
                <Code2 size={14} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

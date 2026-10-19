import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data';
import type { ProjectItem } from '../data';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './animations/Reveal';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth floating image position using spring
  const springConfig = { damping: 20, stiffness: 180, mass: 0.15 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="proyek"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-36 border-b border-brutal overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 md:pb-12 border-b border-brutal">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-theme block mb-2 font-semibold">
              // ARSIP KARYA PILIHAN
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-brutal">
              Daftar Proyek
            </h2>
          </div>
          <span className="font-mono text-xs text-brutal-muted uppercase tracking-widest mt-4 sm:mt-0">
            [TOTAL: 0{projectsData.length}] — SOFTWARE & IOT
          </span>
        </div>

        {/* Floating Preview Image (Desktop Only, follows cursor smoothly) */}
        <div className="hidden lg:block pointer-events-none absolute inset-0 z-30">
          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  left: cursorX,
                  top: cursorY,
                  translateX: '-50%',
                  translateY: '-50%'
                }}
                className="w-80 h-52 border-2 border-brutal overflow-hidden shadow-2xl bg-black"
              >
                <img
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/80 font-mono text-[10px] text-white uppercase tracking-wider truncate">
                  {hoveredProject.title}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Index List Table */}
        <div className="divide-y divide-brutal">
          {projectsData.map((project, index) => {
            const isHovered = hoveredProject?.id === project.id;
            const isAnyHovered = hoveredProject !== null;

            return (
              <Reveal key={project.id} delay={index * 0.08} direction="up">
                <div
                  onClick={() => setActiveProject(project)}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  data-cursor="Buka"
                  className={`group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 md:py-10 cursor-pointer transition-all duration-300 ${
                    isAnyHovered && !isHovered ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  {/* Left Column: Number + Title */}
                  <div className="flex items-start md:items-center gap-4 sm:gap-8 flex-1">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold transition-colors duration-200 ${
                        isHovered ? 'text-accent-theme' : 'text-brutal-muted'
                      }`}
                    >
                      {project.number}
                    </span>

                    <div className="flex-1">
                      <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-brutal group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>

                      {/* Mobile Thumbnail & Tags */}
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 lg:hidden">
                        <div className="w-full sm:w-48 h-28 overflow-hidden border border-brutal bg-black/10">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tools.slice(0, 3).map((tool) => (
                            <span
                              key={tool}
                              className="font-mono text-[10px] uppercase px-2 py-0.5 border border-brutal/50 bg-brutal text-brutal-muted"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Category, Year, Arrow */}
                  <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 md:gap-12 pl-8 md:pl-0">
                    <span className="font-mono text-xs uppercase tracking-widest text-brutal-muted">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest font-semibold text-brutal">
                      {project.year}
                    </span>
                    <div className="w-10 h-10 border border-brutal flex items-center justify-center group-hover:bg-accent-theme group-hover:text-white transition-all duration-200">
                      <ArrowUpRight
                        size={18}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

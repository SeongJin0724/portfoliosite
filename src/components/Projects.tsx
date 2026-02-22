"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects, categories, CategoryFilter } from "@/data/projects";
import { Project } from "@/types/project";
import { ProjectModal } from "./ProjectModal";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useMousePosition";

const categoryColors: Record<string, string> = {
  App: "from-violet-500/20 to-purple-600/20",
  Clone: "from-blue-500/20 to-cyan-600/20",
  Publishing: "from-emerald-500/20 to-teal-600/20",
  Tool: "from-orange-500/20 to-amber-600/20",
};

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function ProjectRow({ project, index, isHovered, onMouseEnter, onMouseLeave, onClick }: ProjectRowProps) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index * 0.5}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 md:gap-6 py-4 md:py-6 border-b border-border cursor-pointer transition-all duration-300",
        isHovered ? "border-accent/40" : ""
      )}
    >
      {/* Number */}
      <span className="font-body text-xs text-muted-foreground w-5 md:w-6 flex-shrink-0 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <span
        className={cn(
          "font-display font-bold text-base sm:text-xl md:text-2xl lg:text-3xl flex-1 min-w-0 transition-colors duration-300 leading-tight",
          isHovered ? "text-accent" : "text-foreground"
        )}
      >
        {project.title}
      </span>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* Category badge - sm 이상에서만 표시 */}
        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-body border border-border text-muted-foreground whitespace-nowrap">
          {project.category}
        </span>

        {/* Private indicator */}
        {project.isPrivate && (
          <span className="text-muted-foreground hidden sm:block">
            <LockIcon />
          </span>
        )}

        {/* Arrow */}
        <span
          className={cn(
            "transition-all duration-300 flex-shrink-0",
            isHovered ? "text-accent translate-x-1" : "text-muted-foreground"
          )}
        >
          <ArrowIcon />
        </span>
      </div>

      {/* Hover underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const mousePosition = useMousePosition();
  const sortedProjects = [...projects].sort((a, b) => {
    const featureDiff = (b.features?.length ?? 0) - (a.features?.length ?? 0);
    return featureDiff !== 0 ? featureDiff : a.id - b.id;
  });

  const filtered =
    activeCategory === "All"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === activeCategory);

  const hoveredProject = sortedProjects.find((p) => p.id === hoveredId);

  return (
    <section id="projects" className="section-padding bg-muted/20">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-accent font-body text-xs md:text-sm tracking-widest uppercase mb-2 font-medium"
        >
          Projects
        </motion.p>

        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-foreground mb-7 md:mb-10 tracking-tight"
        >
          작업물
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="flex flex-wrap gap-2 mb-6 md:mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-body transition-all duration-200",
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
              )}
            >
              {cat}
              {cat === "All" && (
                <span className="ml-1 text-xs opacity-70">({projects.length})</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Project List */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-border"
        >
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}>
              {filtered.map((project, i) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={i}
                  isHovered={hoveredId === project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 프로젝트 수 */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
          className="mt-4 text-xs text-muted-foreground font-body text-right"
        >
          총 {filtered.length}개의 프로젝트
        </motion.p>
      </div>

      {/* Cursor-following image preview (desktop only) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="fixed pointer-events-none z-40 hidden lg:block"
            style={{
              left: mousePosition.x + 24,
              top: mousePosition.y - 90,
            }}
          >
            <div
              className={cn(
                "w-56 h-36 rounded-xl overflow-hidden border border-border shadow-2xl bg-gradient-to-br",
                categoryColors[hoveredProject.category] ?? "from-gray-500/20 to-gray-600/20"
              )}
            >
              <div className="relative w-full h-full">
                <Image
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

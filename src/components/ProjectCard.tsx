"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import { scaleIn } from "@/lib/animations";

// 카테고리별 플레이스홀더 색상
const categoryColors: Record<string, string> = {
  App: "from-violet-500/20 to-purple-600/20",
  Clone: "from-blue-500/20 to-cyan-600/20",
  Publishing: "from-emerald-500/20 to-teal-600/20",
  Tool: "from-orange-500/20 to-amber-600/20",
};

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradientClass = categoryColors[project.category] ?? "from-gray-500/20 to-gray-600/20";

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col"
    >
      {/* Image */}
      <div className={`relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br ${gradientClass}`}>
        {!imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          // 이미지 없을 때 플레이스홀더
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-50">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-xs font-body">이미지 준비 중</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border">
          {project.category}
        </span>

        {/* Private badge */}
        {project.isPrivate && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-accent/90 backdrop-blur-sm text-white flex items-center gap-1">
            <LockIcon />
            Private
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-semibold text-base text-foreground leading-tight">
            {project.title}
          </h3>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors ml-2 flex-shrink-0 mt-0.5 p-1 rounded hover:bg-accent/10"
              aria-label={`${project.title} 바로가기`}
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>

        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs font-body text-muted-foreground bg-muted border border-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

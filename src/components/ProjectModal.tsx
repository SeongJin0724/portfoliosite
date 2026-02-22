"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const categoryColors: Record<string, string> = {
  App: "from-violet-500/20 to-purple-600/20",
  Clone: "from-blue-500/20 to-cyan-600/20",
  Publishing: "from-emerald-500/20 to-teal-600/20",
  Tool: "from-orange-500/20 to-amber-600/20",
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);
  const [isImageBright, setIsImageBright] = useState(false);

  // 이미지 우측 상단 밝기 분석 → X 버튼 색상 결정
  useEffect(() => {
    if (!project || imgError) {
      setIsImageBright(false);
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      const size = 80;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // X 버튼 위치인 우측 상단 영역 샘플링
      const srcX = Math.max(0, img.naturalWidth - size);
      ctx.drawImage(img, srcX, 0, size, size, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        // 인간 눈의 밝기 인식 가중치 적용
        total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }
      const avgBrightness = total / (size * size);
      setIsImageBright(avgBrightness > 140);
    };
    img.onerror = () => setIsImageBright(false);
    img.src = project.image;
  }, [project, imgError]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // 모달 열릴 때 body 스크롤 잠금 (스크롤바 사라지는 레이아웃 시프트 방지)
  useEffect(() => {
    if (project) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
      setImgError(false);
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [project]);

  const gradientClass = project
    ? (categoryColors[project.category] ?? "from-gray-500/20 to-gray-600/20")
    : "";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 스크롤 가능한 바깥 래퍼 */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl max-h-[calc(100dvh-2rem)] md:max-h-[calc(100dvh-4rem)] flex flex-col overflow-hidden"
              >
                {/* Project Image */}
                <div className={`relative h-48 md:h-64 bg-gradient-to-br ${gradientClass} rounded-t-2xl overflow-hidden flex-shrink-0`}>
                  {!imgError ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-40">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}

                  {/* Close button - 이미지 밝기에 따라 자동 색상 변경 */}
                  <button
                    onClick={onClose}
                    className={cn(
                      "absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all",
                      isImageBright
                        ? "bg-black/15 border-black/15 text-gray-900 hover:bg-black/30"
                        : "bg-white/20 border-white/20 text-white hover:bg-white/35"
                    )}
                  >
                    <CloseIcon />
                  </button>

                  {/* Category badge */}
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-body font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border">
                    {project.category}
                  </span>

                  {/* Private badge */}
                  {project.isPrivate && (
                    <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-body font-medium bg-accent/90 text-white flex items-center gap-1.5">
                      <LockIcon />
                      Private
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto">
                  {/* Title */}
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
                    {project.title}
                  </h2>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-body text-accent border border-accent/30 bg-accent/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  {project.details && (
                    <div className="mb-6">
                      <p className="text-xs text-muted-foreground font-body tracking-widest uppercase mb-3">
                        프로젝트 소개
                      </p>
                      <p className="font-body text-foreground/80 leading-relaxed text-sm md:text-base">
                        {project.details}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-8">
                      <p className="text-xs text-muted-foreground font-body tracking-widest uppercase mb-3">
                        주요 기능
                      </p>
                      <ul className="space-y-2">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 font-body text-sm md:text-base text-foreground/80">
                            <span className="text-accent mt-0.5 flex-shrink-0">
                              <CheckIcon />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {project.url && !project.isPrivate ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
                      >
                        사이트 보러가기
                        <ExternalLinkIcon />
                      </a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-muted text-muted-foreground font-body font-medium text-sm cursor-not-allowed border border-border">
                        <LockIcon />
                        비공개 프로젝트
                      </div>
                    )}
                    <button
                      onClick={onClose}
                      className="px-6 py-3.5 rounded-full border border-border text-foreground font-body font-medium text-sm hover:border-accent hover:text-accent transition-all"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const links = [
  {
    label: "Email",
    href: "mailto:thls702464@gmail.com",
    display: "thls702464@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/SeongJin0724",
    display: "github.com/SeongJin0724",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-accent font-body text-xs md:text-sm tracking-widest uppercase mb-2 font-medium"
        >
          Contact
        </motion.p>

        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 md:mb-6 tracking-tight"
        >
          함께 일해요
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="font-body text-muted-foreground text-sm md:text-base lg:text-lg max-w-lg leading-relaxed mb-8 md:mb-12"
        >
          새로운 프로젝트나 기회에 대해 이야기 나누고 싶으시다면
          편하게 연락 주세요.
        </motion.p>

        {/* Links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row gap-3 md:gap-4"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              variants={fadeInUp}
              custom={i + 3}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 px-5 md:px-6 py-4 rounded-2xl border border-border hover:border-accent transition-all duration-300 hover:bg-accent/5 min-w-0"
            >
              <span className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0">
                {link.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-body mb-0.5">{link.label}</p>
                <p className="text-sm font-body text-foreground group-hover:text-accent transition-colors truncate">
                  {link.display}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

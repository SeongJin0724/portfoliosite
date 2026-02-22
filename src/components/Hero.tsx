"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-accent-light/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto w-full"
      >
        {/* Greeting */}
        <motion.p
          variants={fadeInUp}
          custom={0}
          className="text-accent font-body text-xs md:text-sm tracking-widest uppercase mb-4 font-medium"
        >
          안녕하세요 👋
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          custom={1}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-none tracking-tight mb-4"
        >
          이성진
          <span className="text-accent">.</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          custom={2}
          className="font-display font-medium text-xl sm:text-2xl md:text-4xl text-muted-foreground mb-6"
        >
          Web Developer
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          custom={3}
          className="font-body text-muted-foreground text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mb-10"
        >
          프론트엔드부터 백엔드까지, 웹 서비스의 전 과정을
          <br className="hidden md:block" />
          직접 설계하고 구현하는 웹 개발자입니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          custom={4}
          className="flex flex-wrap gap-3 md:gap-4"
        >
          <button
            onClick={() => handleScroll("#projects")}
            className="px-6 md:px-7 py-3 md:py-3.5 rounded-full bg-accent text-white font-body font-medium text-sm tracking-wide hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
          >
            프로젝트 보기
          </button>
          <button
            onClick={() => handleScroll("#contact")}
            className="px-6 md:px-7 py-3 md:py-3.5 rounded-full border border-border text-foreground font-body font-medium text-sm tracking-wide hover:border-accent hover:text-accent transition-all hover:scale-105 active:scale-95"
          >
            연락하기
          </button>
        </motion.div>

        {/* Scroll indicator - desktop only */}
        <motion.div
          variants={fadeInUp}
          custom={5}
          className="hidden lg:flex flex-col items-start gap-2 mt-16"
        >
          <span className="text-xs text-muted-foreground font-body tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

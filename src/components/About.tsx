"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, slideInLeft } from "@/lib/animations";

const skillGroups = [
  {
    label: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue 3", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "MySQL", "MongoDB", "REST API"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Figma", "Netlify", "Vercel"],
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Label */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-accent font-body text-xs md:text-sm tracking-widest uppercase mb-2 font-medium"
        >
          About
        </motion.p>

        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-foreground mb-8 md:mb-14 tracking-tight"
        >
          저에 대해서
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Bio */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <p className="font-body text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">
              화면을 만드는 것부터 서버와 데이터베이스를 다루는 것까지,
              웹 서비스의 전 영역을 경험하며 성장하고 있는 웹 개발자입니다.
            </p>
            <p className="font-body text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">
              HTML/CSS 퍼블리싱, React·Vue 기반 앱 개발,
              Node.js와 Express를 활용한 API 서버 구축까지
              다양한 프로젝트를 직접 경험해왔습니다.
            </p>
            <p className="font-body text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">
              어떤 기술이든 목적에 맞게 선택하고 적용하는 것을 중요하게 생각하며,
              꾸준히 배우고 만들며 실력을 쌓고 있습니다.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 md:space-y-8"
          >
            {skillGroups.map((group, gi) => (
              <div key={group.label}>
                <motion.p
                  variants={fadeInUp}
                  custom={gi}
                  className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-2.5"
                >
                  {group.label}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      variants={fadeInUp}
                      custom={gi + si * 0.5}
                      className="px-3 py-1.5 rounded-full border border-border text-xs md:text-sm font-body text-foreground hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

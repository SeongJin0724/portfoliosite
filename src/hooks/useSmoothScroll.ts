"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0;

    const handleModalScrollLock = (event: Event) => {
      const customEvent = event as CustomEvent<{ locked?: boolean }>;
      if (customEvent.detail?.locked) {
        lenis.stop();
        return;
      }
      lenis.start();
    };

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    window.addEventListener("modal-scroll-lock", handleModalScrollLock as EventListener);

    return () => {
      window.removeEventListener("modal-scroll-lock", handleModalScrollLock as EventListener);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

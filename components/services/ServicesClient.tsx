'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceScroll from '@/components/services/ServiceScroll';
import ServiceCTA from '@/components/services/ServiceCTA';

export default function ServicesClient() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        lenis.scrollTo(hash, {
          offset: -120,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }, 300);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#F9FAFB]/20 min-h-screen font-sans selection:bg-[#377a9b] selection:text-[#F9FAFB]">
      <ServiceHero />
      <ServiceScroll />
    </div>
  );
}

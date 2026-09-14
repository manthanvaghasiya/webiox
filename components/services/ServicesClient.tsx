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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#F9FAFB]/20 min-h-screen font-sans selection:bg-[#1a7097] selection:text-[#F9FAFB]">
      <ServiceHero />
      <ServiceScroll />
      <ServiceCTA />
    </div>
  );
}

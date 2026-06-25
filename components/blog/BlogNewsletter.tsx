'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function BlogNewsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={ref} className="relative z-20 w-full bg-[#FAFAFA] pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#0E5E64] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl"
        >
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,250,251,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,250,251,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row">
            
            {/* Left Content */}
            <div className="flex-1 p-10 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-[#F9FAFB]/10">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#F9FAFB] mb-6 leading-[0.9] tracking-tighter font-[Zain] uppercase">
                Industry <br />
                <span className="text-[#FFBF00]">Intelligence.</span>
              </h2>
              
              <p className="text-[#F9FAFB]/70 text-lg font-light max-w-md leading-relaxed font-[IBM_Plex_Sans]">
                Exclusive architectural teardowns, performance optimizations, and design system engineering. Delivered strictly to your inbox.
              </p>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['MV', 'AK', 'RS', 'PD'].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-10 h-10 rounded-full border border-[#0E5E64] flex items-center justify-center text-[10px] font-bold text-slate-900 shadow-sm"
                      style={{ background: ['#FFBF00', '#F9FAFB', '#aed4d7', '#eef6f6'][i], zIndex: 4 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#F9FAFB]/50 uppercase tracking-widest font-mono">Trusted by 5,000+</span>
                  <span className="text-sm text-[#F9FAFB] font-bold">Engineers & Founders</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 p-10 md:p-16 lg:p-24 flex items-center justify-center bg-black/10">
              <div className="w-full max-w-md">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold text-[#F9FAFB]/50 uppercase tracking-widest font-mono">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full bg-transparent border-b-2 border-[#F9FAFB]/20 text-[#F9FAFB] text-xl md:text-2xl py-3 placeholder:text-[#F9FAFB]/20 focus:outline-none focus:border-[#FFBF00] transition-colors rounded-none font-[IBM_Plex_Sans]"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="group flex items-center justify-between w-full mt-4 bg-[#F9FAFB] text-[#0E5E64] px-8 py-5 rounded-none font-bold uppercase tracking-widest text-xs hover:bg-[#FFBF00] hover:text-slate-900 transition-colors duration-300"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-[#F9FAFB]/30 font-mono mt-2">
                      ZERO SPAM. ONE EMAIL PER WEEK.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full border border-[#FFBF00]/30 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-[#FFBF00]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#F9FAFB] mb-3 font-[IBM_Plex_Sans]">Subscription Confirmed</h3>
                    <p className="text-sm text-[#F9FAFB]/50">Check your inbox for the welcome sequence.</p>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

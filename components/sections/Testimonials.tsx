'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Quote,
  Star,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Building2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

interface ExtendedTestimonial {
  _id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
  sector: 'automotive' | 'saas' | 'retail';
  sectorLabel: string;
  metric: string;
  metricLabel: string;
  location: string;
}

const EXTENDED_TESTIMONIALS: ExtendedTestimonial[] = [
  {
    ...testimonials[0],
    sector: 'automotive',
    sectorLabel: 'Automotive Digital Flagship',
    metric: '+140%',
    metricLabel: 'Verified Buyer Inquiries',
    location: 'Commercial Automotive',
  },
  {
    ...testimonials[1],
    sector: 'retail',
    sectorLabel: 'Retail PWA & SEO Architecture',
    metric: '#1 Rank',
    metricLabel: 'Google Search Authority',
    location: 'Automotive Retail',
  },
  {
    ...testimonials[2],
    sector: 'saas',
    sectorLabel: 'Enterprise Dairy POS & SaaS',
    metric: '99.99%',
    metricLabel: 'Shift Uptime & Zero Drift',
    location: 'Navsari / Surat',
  },
];

export default function Testimonials() {
  const [activeSector, setActiveSector] = useState<'all' | 'automotive' | 'saas' | 'retail'>('all');

  const filteredTestimonials =
    activeSector === 'all'
      ? EXTENDED_TESTIMONIALS
      : EXTENDED_TESTIMONIALS.filter((t) => t.sector === activeSector);

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 bg-[#FCFCFD] text-[#0F172A] overflow-hidden selection:bg-[#1a7097] selection:text-white"
    >
      {/* ── Ambient Background Lighting ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(26, 112, 151, 0.08) 0%, transparent 65%),
            radial-gradient(circle at 15% 70%, rgba(231, 185, 0, 0.05) 0%, transparent 50%),
            repeating-linear-gradient(
              90deg,
              rgba(26, 112, 151, 0.035) 0px,
              rgba(26, 112, 151, 0.035) 1px,
              transparent 1px,
              transparent 48px
            )
          `,
        }}
      />
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[#1a7097]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full bg-[#E7B900]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-[#1a7097] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7B900]" />
            <span className="tracking-wider uppercase">CLIENT SUCCESS & ROI</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">VERIFIED ENTERPRISE PROOF</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.03em] leading-[1.12] mb-4 [text-wrap:balance]">
            <span>What Our Partners </span>
            <span className="bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              Say About Us.
            </span>
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-2xl mb-8">
            Don't just take our word for it. Explore verified outcomes from the visionary companies that trust Webiox for mission-critical software engineering.
          </p>

          {/* ── Sector Filter Tabs ── */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1 flex justify-center">
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs whitespace-nowrap">
              {[
                { id: 'all', label: 'All Partners (3)' },
                { id: 'automotive', label: 'Automotive Flagships' },
                { id: 'saas', label: 'Cloud SaaS & POS' },
                { id: 'retail', label: 'Retail PWAs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSector(tab.id as any)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-[12.5px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer ${
                    activeSector === tab.id
                      ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80'
                      : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(26,112,151,0.1)] hover:shadow-[0_30px_70px_-12px_rgba(26,112,151,0.22)] hover:border-[#1a7097]/50 flex flex-col justify-between group"
              >
                {/* Specular Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a7097]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#1a7097]/10 transition-colors duration-500" />
                
                {/* Corner Crosshairs */}
                <div className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
                <div className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>

                <div>
                  {/* Top Bar: Sector Tag & Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#1a7097] bg-[#1a7097]/10 px-2.5 py-0.5 rounded-full border border-[#1a7097]/20">
                      {testimonial.sectorLabel}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Client</span>
                    </span>
                  </div>

                  {/* Measurable ROI Metric Highlight Pill */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/70 border border-slate-200/80 mb-5 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-2xl font-black text-[#0F172A] tracking-tight block">
                        {testimonial.metric}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold text-slate-500">
                        {testimonial.metricLabel}
                      </span>
                    </div>

                    {/* Gold Rating Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#E7B900] text-[#E7B900] drop-shadow-2xs"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-600 text-sm leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover object-center bg-slate-100 border border-slate-200 shadow-2xs"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#0F172A] truncate">
                      {testimonial.author}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-[#1a7097] truncate">
                      {testimonial.role} • {testimonial.company}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400 truncate">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Bottom Rating Summary Strip ── */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#E7B900] text-[#E7B900]" />
              ))}
            </div>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#0F172A]">
              4.9 / 5.0 Average Rating
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-mono text-xs text-slate-500">
              100% On-Time Milestone Delivery
            </span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#1a7097] hover:text-[#145b7c] transition-colors"
          >
            <span>Read More Partner Case Briefs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

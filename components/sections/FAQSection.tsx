'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Company & Vision',
    question: 'What is Webiox and who do you work with?',
    answer: 'Webiox (legal entity: Webiox Digital Solutions, domain: webiox.tech) is an independent digital engineering studio and technical architecture agency. We partner with both established market authorities and ambitious growing businesses to engineer high-velocity web platforms, mobile applications, custom cloud software, and autonomous AI workflows.',
  },
  {
    category: 'Growth & Positioning',
    question: 'Can Webiox help my business if we are not an industry leader yet?',
    answer: 'Absolutely. That is our core mission. If you are already an industry leader, we protect and scale your competitive digital advantage. If you are not an industry leader yet, we build your modern digital profile, engineer custom high-converting web applications, and optimize your technical architecture to accelerate your growth and transform you into the market leader in your sector.',
  },
  {
    category: 'Core Capabilities',
    question: 'What core engineering services does Webiox provide?',
    answer: 'We specialize in three integrated disciplines: 1) High-Performance Web Platforms engineered with Next.js 16, React 19, and sub-second edge CDN caching; 2) Mobile Applications & SaaS Architectures for iOS, Android, and multi-tenant cloud ecosystems; and 3) Autonomous AI Workflows, LLM integrations, and intelligent automation pipelines that eliminate operational bottlenecks.',
  },
  {
    category: 'Milestone Guarantees',
    question: 'How does Webiox ensure on-time delivery with zero scope creep?',
    answer: 'Every project operates on strict 14-day sprint milestone gates with signed cryptographic verification. Client invoices are held in escrow and released only after staging deliverables pass automated CI/CD audits, Core Web Vitals checks, and your sign-off. We never charge open-ended hourly billing or surprise change fees.',
  },
  {
    category: 'Architecture & Security',
    question: 'What technology stack and security standards do you deploy?',
    answer: 'We engineer with TypeScript, Next.js 16 App Router, React 19, Tailwind CSS, PostgreSQL, Prisma, Redis, Docker, and AWS/Cloudflare edge networks. Every production build undergoes OWASP automated vulnerability scanning, zero-knowledge session encryption, and strict WCAG AA accessibility compliance.',
  },
  {
    category: 'Brand Independence',
    question: 'Is Webiox affiliated with Cisco Webex or Zoom?',
    answer: 'No. Webiox (webiox.tech) is an independent technology agency and software engineering studio founded by principal software architect Manthan Vaghasiya. Webiox is completely distinct and unaffiliated with Cisco Webex, Zoom, or video teleconferencing platforms.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 bg-[#FCFCFD] text-[#0F172A] selection:bg-[#1a7097] selection:text-white border-t border-slate-200/80"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-fluted-grid" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#1a7097]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#E7B900]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-[#1a7097] mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#1a7097]" />
            <span className="tracking-wider uppercase">COMMON INQUIRIES</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">TRANSPARENT ANSWERS</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-[-0.03em] leading-tight mb-3 [text-wrap:balance]">
            <span>Frequently Asked </span>
            <span className="bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our engineering squads, milestone escrow SLA, and digital growth methodology.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all hover:border-[#1a7097]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a7097]/30 rounded-2xl"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#1a7097] shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#0F172A] tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#1a7097] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-[13.5px] leading-relaxed border-t border-slate-100 font-normal">
                        <p>{faq.answer}</p>
                        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Category: {faq.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Consultation Prompt */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a7097]/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#1a7097]" />
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#0F172A]">
                Have a custom technical requirement or enterprise RFP?
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Speak directly with lead software architect Manthan Vaghasiya.
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            aria-label="Contact Webiox software architecture team"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a7097] hover:bg-[#145b7c] text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

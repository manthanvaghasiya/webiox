'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Camera,
  Code2,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
} from 'lucide-react';

/* ─── Navigation Data ─── */
const navColumns = [
  {
    heading: 'Core Capabilities',
    links: [
      { label: 'Web Development & Flagships', href: '/services/web-development' },
      { label: 'High-Conversion E-Commerce', href: '/services/ecommerce-platforms' },
      { label: 'Custom Software & SaaS', href: '/services/saas-development' },
      { label: 'Autonomous AI Workflows', href: '/services/ai-solutions' },
      { label: 'UI/UX Design & Systems', href: '/services/ui-ux-design' },
      { label: 'Native Mobile Applications', href: '/services/mobile-apps' },
    ],
  },
  {
    heading: 'Company & Work',
    links: [
      { label: 'About Webiox', href: '/about' },
      { label: 'Selected Work', href: '/portfolio' },
      { label: 'Engineering Blog', href: '/blog' },
      { label: 'Career Opportunities', href: '/career' },
      { label: 'Direct Contact', href: '/contact' },
    ],
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socials = [
  { icon: Globe, href: 'https://www.linkedin.com/company/webiox/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/webiox_tech', label: 'X (Twitter)' },
  { icon: Camera, href: 'https://www.instagram.com/webiox.ai/', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/webiox', label: 'Facebook' },
  { icon: YouTubeIcon, href: 'https://www.youtube.com/@webiox', label: 'YouTube' },
  { icon: Code2, href: 'https://github.com/webiox', label: 'GitHub' },
  { icon: MapPin, href: 'https://share.google/iDpXXxjX29qoPeAAO', label: 'Google Profile' },
];

/* ─── Scroll to top ─── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Stagger Animations ─── */
const containerAnim: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};
const itemAnim: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [deskEmail, setDeskEmail] = React.useState('');

  React.useEffect(() => {
    const user = 'manthanvaghasiya';
    const domain = 'webiox.tech';
    setDeskEmail(`${user}@${domain}`);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden selection:bg-[#1a7097] selection:text-white"
    >
      {/* ━━━━━━━━━━━━━━━━ TOP LAUNCHPAD CTA (Luminous Light Mode) ━━━━━━━━━━━━━━━━ */}
      {isHomePage && (
        <div id="contact" className="relative z-20 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[#FCFCFD]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl sm:rounded-[2.5rem] bg-white border border-slate-200/90 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(26,112,151,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
            >
              {/* Specular Ambient Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a7097]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E7B900]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Corner Crosshairs */}
              <div className="absolute top-4 left-4 text-slate-300 font-mono text-xs select-none pointer-events-none">+</div>
              <div className="absolute top-4 right-4 text-slate-300 font-mono text-xs select-none pointer-events-none">+</div>

              <div className="max-w-2xl relative z-10">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7097]/10 border border-[#1a7097]/20 text-[11px] font-mono font-bold text-[#1a7097] mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E7B900]" />
                  <span className="tracking-wider uppercase">READY TO SHIP?</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600">Q3 SPRINT SLOTS OPEN</span>
                </div>

                {/* Headline */}
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0F172A] tracking-tight leading-[1.12] mb-4 [text-wrap:balance]">
                  <span>Ready to Engineer Your </span>
                  <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
                    Next Market Flagship?
                  </span>
                </h2>

                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                  Turn complexity into high-velocity digital products. Book a 15-minute technical discovery session directly with our lead architects. Zero salespeople. Zero pitch decks.
                </p>

                {/* SLA Guarantee Strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>⚡ 12M Avg Dev Response</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#1a7097] font-bold bg-[#1a7097]/10 px-2.5 py-1 rounded-lg border border-[#1a7097]/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Escrow Milestone SLA</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0 relative z-10">
                <Link
                  href="/contact"
                  aria-label="Start a project with Webiox architects"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1a7097] hover:bg-[#145b7c] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base shadow-xl shadow-[#1a7097]/25 hover:shadow-2xl hover:shadow-[#1a7097]/35 transition-all cursor-pointer group"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/919664736245"
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="Connect with Webiox on direct WhatsApp VIP"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base shadow-xs hover:border-slate-300 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp VIP</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━ EXECUTIVE FOOTER CONTENT (Dark Contrast) ━━━━━━━━━━━━━━━━ */}
      <div className="relative bg-[#080E17] text-white">
        {/* Ambient glow blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#1a7097]/8 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E7B900]/5 blur-[140px] pointer-events-none" />

        {/* Subtle dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-dot-pattern"
        />

        {/* ── Main Footer Grid ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
          <motion.div
            variants={containerAnim}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
          >
            {/* Brand Block (4 cols) */}
            <motion.div variants={itemAnim} className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
                <div className="relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors border border-white/10">
                  <Image
                    src="/logo_without_background.png"
                    alt="Webiox Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-['Plus_Jakarta_Sans',sans-serif] font-black tracking-tight text-white">
                  WEB<span className="text-[#E7B900]">IOX</span>
                </span>
              </Link>

              <p className="text-slate-400 font-['Plus_Jakarta_Sans',sans-serif] text-sm leading-relaxed mb-6 max-w-sm">
                Premier digital engineering studio. We build ultra-fast web flagships, mobile applications, custom software architectures, and autonomous AI systems for market leaders.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#E7B900] hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Nav Columns (2 + 2 cols) */}
            {navColumns.map((col) => (
              <motion.div key={col.heading} variants={itemAnim} className="lg:col-span-2">
                <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400 mb-5 font-bold">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-['Plus_Jakarta_Sans',sans-serif] text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Direct Contact Block (4 cols) */}
            <motion.div variants={itemAnim} className="lg:col-span-4 lg:pl-6">
              <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400 mb-5 font-bold">
                Direct Engineering Desk
              </h3>
              <div className="flex flex-col gap-3.5 text-sm font-['Plus_Jakarta_Sans',sans-serif]">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  aria-label="Contact Lead Architect"
                >
                  <Mail className="w-4 h-4 text-[#1a7097] shrink-0" />
                  <span className="truncate">Contact Lead Architect</span>
                </Link>
                <a
                  href="tel:+919664736245"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#E7B900] shrink-0" />
                  <span>+91 96647 36245</span>
                </a>
                <address className="not-italic flex items-start gap-3 text-slate-400 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                  <span>
                    The Palladium, Yogi Chowk, Surat 395010, Gujarat, India
                  </span>
                </address>
              </div>
            </motion.div>
          </motion.div>

          {/* ── E-E-A-T Professional Disclaimer & Trust Verification Strip ── */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
            <div className="max-w-2xl leading-relaxed">
              <span className="text-slate-300 font-bold">Engineering Quality & SLA Disclaimer:</span>{' '}
              Webiox Digital Solutions delivers custom enterprise software architectures, web applications, and digital engineering services. All milestone deliverables include verified CI/CD test gates, OWASP compliance audits, and a 30-day post-launch warranty.
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-emerald-400 font-bold">
                ✓ OWASP Audited
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                Updated: Oct 2026
              </span>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono text-slate-400">
              &copy; {new Date().getFullYear()} Webiox Digital Solutions. Founded & Architected by Manthan Vaghasiya.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Editorial & Code Standards
              </Link>
              <span>•</span>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top of page"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Camera,
  Code2,
  ArrowUp,
} from 'lucide-react';

/* ─── Data ─── */
const navColumns = [
  {
    heading: 'Services',
    links: [
      { label: 'Enterprise Web', href: '/services/web-development' },
      { label: 'E-Commerce', href: '/services/ecommerce-platforms' },
      { label: 'SaaS Engineering', href: '/services/saas-development' },
      { label: 'AI & Automation', href: '/services/ai-solutions' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socials = [
  { icon: MessageCircle, href: 'https://twitter.com/webiox', label: 'Twitter' },
  { icon: Globe, href: 'https://linkedin.com/company/webiox', label: 'LinkedIn' },
  { icon: Camera, href: 'https://instagram.com/webiox', label: 'Instagram' },
  { icon: Code2, href: 'https://github.com/webiox', label: 'GitHub' },
];

/* ─── Scroll to top ─── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Stagger helpers ─── */
const containerAnim: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};
const itemAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Component ─── */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden selection:bg-[#FFBF00] selection:text-black"
    >
      {/* ━━━━━━━━━━━━━━━━ TOP CTA BAND (Light Background) ━━━━━━━━━━━━━━━━ */}
      {isHomePage && (
      <div className="relative z-20 px-4 sm:px-6 lg:px-12 pt-12 -mb-28 lg:-mb-40 flex justify-center">
        <div className="w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-8 rounded-[2rem] sm:rounded-[3rem] bg-white border border-slate-200 p-8 sm:p-12 lg:p-16 xl:p-20 relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)]"
          >
            {/* Ambient glow inside the box */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0E5E64]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFBF00]/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E5E64] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E5E64]"></span>
                </span>
                <p className="text-[12px] md:text-[13px] font-mono tracking-[0.25em] uppercase text-[#0E5E64]">
                  Ready to build?
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[Alice] leading-[1.1] tracking-tight text-slate-900">
                Let&apos;s craft something <br className="hidden md:block" />
                <span className="text-[#0E5E64] font-medium">
                  extraordinary.
                </span>
              </h2>
            </div>

            <Link
              href="/contact"
              className="group relative flex w-full sm:w-auto items-center justify-center gap-4 px-8 py-5 md:px-10 md:py-6 rounded-full bg-[#0E5E64] text-white font-bold text-sm md:text-base tracking-widest uppercase transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(14,94,100,0.5)] hover:bg-[#0b4d52] shrink-0 z-10 mt-4 lg:mt-0"
            >
              <span className="relative z-10">Start a Project</span>
              <div className="relative z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/20 transition-all duration-500 group-hover:bg-white/30 group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
      )}

      {/* ━━━━━━━━━━━━━━━━ FOOTER CONTENT (Dark Theme) ━━━━━━━━━━━━━━━━ */}
      <div className="relative bg-[#041B1D] text-white">
        {/* ── Ambient glow blobs ── */}
        <div className="absolute -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#0E5E64]/8 blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[#FFBF00]/5 blur-[140px] pointer-events-none" />

        {/* ── Subtle dot grid ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ━━━━━━━━━━━━━━━━ MAIN GRID ━━━━━━━━━━━━━━━━ */}
        <div className={`relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-20 ${isHomePage ? 'pt-40 lg:pt-56' : 'pt-16 lg:pt-20'}`}>
          <motion.div
            variants={containerAnim}
            initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* ── Brand block ── */}
          <motion.div variants={itemAnim} className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                <Image
                  src="/logo.png"
                  alt="Webiox Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-3xl font-bold tracking-tight font-[Zain]">
                WEB<span className="text-[#FFBF00]">IOX</span>
              </span>
            </Link>
            <p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-xs">
              Premium digital solutions engineered for ambitious businesses. We turn complexity into automated simplicity.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#FFBF00] hover:bg-white/10 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

          </motion.div>

          {/* ── Nav columns ── */}
          {navColumns.map((col) => (
            <motion.div key={col.heading} variants={itemAnim} className="lg:col-span-2">
              <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/50 hover:text-[#FFBF00] transition-all duration-300 hover:translate-x-2 inline-block transform"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ── Contact Column ── */}
          <motion.div variants={itemAnim} className="lg:col-span-4 lg:pl-12">
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:manthanvaghasiya@webiox.tech"
                className="flex items-center gap-3 text-[15px] text-white/50 hover:text-[#FFBF00] transition-all duration-300 group hover:translate-x-2 transform w-fit"
              >
                <Mail className="w-4 h-4 text-white/20 group-hover:text-[#FFBF00] transition-colors shrink-0" />
                manthanvaghasiya@webiox.tech
              </a>
              <a
                href="tel:+919664736245"
                className="flex items-center gap-3 text-[15px] text-white/50 hover:text-[#FFBF00] transition-all duration-300 group hover:translate-x-2 transform w-fit"
              >
                <Phone className="w-4 h-4 text-white/20 group-hover:text-[#FFBF00] transition-colors shrink-0" />
                +91 96647 36245
              </a>
              <span className="flex items-start gap-3 text-[15px] text-white/50 mt-1 max-w-[250px] leading-relaxed">
                <MapPin className="w-4 h-4 text-white/20 shrink-0 mt-1" />
                The Palladium, Yogi Chowk, Surat
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>

        {/* ━━━━━━━━━━━━━━━━ MASSIVE WATERMARK ━━━━━━━━━━━━━━━━ */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-[0.03]">
          <span className="text-[18vw] font-[Zain] font-bold leading-none tracking-tighter whitespace-nowrap translate-y-1/4">
            WEBIOX
          </span>
        </div>

      {/* ━━━━━━━━━━━━━━━━ BOTTOM BAR ━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-white/30 tracking-wide"
            >
              &copy; {new Date().getFullYear()} Webiox Digital Solutions. All rights reserved.
            </motion.p>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 text-xs text-white/30 tracking-wide"
            >
              <Link href="/privacy" className="hover:text-white transition-colors hidden sm:block">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors hidden sm:block">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors hidden sm:block">Cookie Policy</Link>

              {/* Divider */}
              <span className="hidden sm:block w-px h-4 bg-white/10 mx-2" />

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-[#FFBF00] hover:bg-white/[0.05] transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

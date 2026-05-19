'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
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
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
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

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[#0A0A0A] text-white selection:bg-[#FFBF00] selection:text-black"
    >
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

      {/* ━━━━━━━━━━━━━━━━ TOP CTA BAND ━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#FFBF00]/70 mb-4">
                Ready to build?
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-[Alice] leading-[1.05] tracking-tight">
                Let&apos;s craft something{' '}
                <span className="bg-gradient-to-r from-[#FFBF00] to-[#FFD54F] bg-clip-text text-transparent">
                  extraordinary
                </span>
                .
              </h2>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFBF00] text-black font-semibold text-sm tracking-wide uppercase hover:bg-[#FFD54F] transition-colors duration-300 shrink-0"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━ MAIN GRID ━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
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

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@webiox.tech"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-[#FFBF00] transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 text-[#FFBF00]/60 group-hover:text-[#FFBF00] transition-colors" />
                hello@webiox.tech
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-[#FFBF00] transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 text-[#FFBF00]/60 group-hover:text-[#FFBF00] transition-colors" />
                +91 98765 43210
              </a>
              <span className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-[#FFBF00]/60" />
                India · Remote Worldwide
              </span>
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
                      className="text-[15px] text-white/60 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ── Newsletter ── */}
          <motion.div variants={itemAnim} className="lg:col-span-2">
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">
              Stay Updated
            </h4>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Insights on web tech, AI, and digital growth. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FFBF00]/40 focus:ring-1 focus:ring-[#FFBF00]/20 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white/70 hover:bg-[#FFBF00]/10 hover:border-[#FFBF00]/30 hover:text-[#FFBF00] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>
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

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-1"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-[#FFBF00] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}

              {/* Divider */}
              <span className="w-px h-5 bg-white/10 mx-2" />

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
    </footer>
  );
}

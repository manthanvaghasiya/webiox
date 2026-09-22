'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Phone,
  ArrowRight,
  Briefcase,
  FileText,
  Mail,
} from 'lucide-react';

interface SubLink {
  readonly name: string;
  readonly href: string;
  readonly desc?: string;
  readonly badge?: string;
}

interface NavLink {
  readonly name: string;
  readonly href: string;
  readonly badge?: string;
  readonly children?: readonly SubLink[];
}

const NAV_LINKS: readonly NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', badge: '4 Squads' },
  { name: 'Portfolio', href: '/portfolio', badge: 'Selected Work' },
  {
    name: 'Company',
    href: '#',
    children: [
      { name: 'Blog', href: '/blog', desc: 'Engineering insights & tech guides' },
      { name: 'Contact Us', href: '/contact', desc: 'Direct architect consultation' },
      { name: 'Career', href: '/career', desc: 'Join our high-velocity team', badge: 'Hiring' },
    ],
  },
] as const;

const BRAND_TEAL = '#1a7097';

const mobileDrawerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pillDropdownOpen, setPillDropdownOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const pillDropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open + close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    mounted ? (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)) : false;

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PERMANENT FLOATING CAPSULE PILL NAVBAR
          (Precision-engineered for all mobile & desktop viewports)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.nav
        key="floating-pill"
        aria-label="Primary Navigation"
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="fixed top-2.5 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4"
      >
        <div
          className={`pointer-events-auto bg-white/95 backdrop-blur-xl border rounded-full p-1.5 sm:p-2 pl-3 sm:pl-4 pr-1.5 sm:pr-2 transition-all duration-300 flex items-center justify-between md:justify-start w-[calc(100vw-24px)] max-w-sm sm:max-w-md md:w-auto md:max-w-fit ${
            scrolled
              ? 'border-slate-300/90 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.14),0_1px_3px_rgba(0,0,0,0.04)]'
              : 'border-slate-200/80 shadow-[0_14px_38px_-10px_rgba(15,23,42,0.08),0_1px_3px_rgba(0,0,0,0.04)]'
          }`}
        >
          {/* Brand Logo (left) */}
          <Link
            href="/"
            aria-label="Webiox Home"
            className="relative flex items-center hover:opacity-85 active:scale-95 transition-transform shrink-0 cursor-pointer py-1 mr-2 sm:mr-3"
          >
            <Image
              src="/WEBIOX_NAME_WITH_LOG-removebg-preview.png"
              alt="Webiox"
              width={116}
              height={26}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="h-5.5 sm:h-7 w-auto object-contain select-none pointer-events-none"
            />
          </Link>

          {/* Navigation Links (center - desktop only) */}
          <div className="hidden md:flex items-center gap-0.5 md:gap-1 mx-4 lg:mx-8 xl:mx-12">
            {NAV_LINKS.map((link) => {
              const hasChildren = link.children && link.children.length > 0;
              const active = hasChildren
                ? link.children!.some((c) => isActive(c.href))
                : isActive(link.href);

              if (hasChildren) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => {
                      if (pillDropdownTimeout.current) clearTimeout(pillDropdownTimeout.current);
                      setPillDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      pillDropdownTimeout.current = setTimeout(() => setPillDropdownOpen(false), 150);
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={pillDropdownOpen}
                      className={[
                        'inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer',
                        active
                          ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold'
                          : 'text-slate-700 hover:text-[#1a7097] hover:bg-slate-100/70',
                      ].join(' ')}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={[
                          'w-3.5 h-3.5 transition-transform duration-200 text-slate-500',
                          pillDropdownOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>

                    <AnimatePresence>
                      {pillDropdownOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full right-0 mt-2.5 w-52 py-2 bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.12)]"
                        >
                          {link.children!.map((child) => {
                            const childActive = isActive(child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={[
                                    'flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg mx-1 transition-colors',
                                    childActive
                                      ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold'
                                      : 'text-slate-700 hover:text-[#1a7097] hover:bg-slate-50',
                                  ].join(' ')}
                                >
                                  <div className="flex items-center gap-2">
                                    {childActive && (
                                      <span
                                        aria-hidden
                                        className="w-1.5 h-1.5 rounded-full bg-[#1a7097]"
                                      />
                                    )}
                                    <span>{child.name}</span>
                                  </div>
                                  {child.badge && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-[#E7B900]/15 text-[#9a7b00] font-mono text-[9px] font-bold">
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'px-2.5 md:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer',
                    active
                      ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold'
                      : 'text-slate-700 hover:text-[#1a7097] hover:bg-slate-100/70',
                  ].join(' ')}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Group */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Action Button: Start Project */}
            <Link
              href="/contact"
              className="bg-[#1a7097] hover:bg-[#145b7c] text-white shadow-[0_8px_20px_-6px_rgba(26,112,151,0.55)] hover:shadow-[0_12px_28px_-6px_rgba(26,112,151,0.65)] font-semibold text-xs sm:text-sm px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer group whitespace-nowrap active:scale-95"
            >
              <span className="hidden xs:inline">Start Project</span>
              <span className="inline xs:hidden">Start</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Mobile menu toggle inside floating pill (High-Precision Animated Toggle) */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all cursor-pointer active:scale-90 ${
                mobileOpen
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 border-slate-200/80'
              }`}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATE 3: MOBILE NAVIGATION DRAWER
          (Top-tier, fluid luxury mobile menu with direct WhatsApp & Architect access)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50"
              aria-hidden
            />

            {/* Slide-Down Menu Sheet */}
            <motion.div
              id="mobile-menu"
              key="mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              variants={mobileDrawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden fixed left-3 right-3 top-14 sm:top-18 z-50 bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3)] p-4 sm:p-5 max-h-[calc(100vh-76px)] overflow-y-auto overscroll-contain flex flex-col justify-between"
            >
              <div>
                {/* Top Header Strip inside Drawer */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/WEBIOX_NAME_WITH_LOG-removebg-preview.png"
                      alt="Webiox"
                      width={116}
                      height={28}
                      style={{ width: 'auto', height: 'auto' }}
                      className="h-6 w-auto object-contain"
                    />
                    <span className="px-2 py-0.5 rounded-md bg-[#1a7097]/10 text-[#1a7097] text-[9.5px] font-mono font-bold uppercase tracking-wider">
                      STUDIO
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Navigation Links */}
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, idx) => {
                    const hasChildren = link.children && link.children.length > 0;
                    const active = hasChildren
                      ? link.children!.some((c) => isActive(c.href))
                      : isActive(link.href);

                    if (hasChildren) {
                      return (
                        <motion.li key={link.name} variants={mobileItemVariants}>
                          <button
                            type="button"
                            onClick={() => setMobileCompanyOpen((v) => !v)}
                            aria-expanded={mobileCompanyOpen}
                            className={[
                              'flex items-center justify-between w-full px-3.5 py-2.5 rounded-2xl text-base font-bold transition-colors cursor-pointer',
                              active
                                ? 'bg-[#1a7097]/10 text-[#1a7097]'
                                : 'text-slate-800 hover:bg-slate-50',
                            ].join(' ')}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-xs text-slate-400 font-semibold">
                                0{idx + 1}
                              </span>
                              <span>{link.name}</span>
                            </div>
                            <ChevronDown
                              className={[
                                'w-4 h-4 transition-transform duration-300 text-slate-500',
                                mobileCompanyOpen ? 'rotate-180' : '',
                              ].join(' ')}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileCompanyOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden pl-7 pr-2 space-y-1 pt-1 pb-2"
                              >
                                {link.children!.map((child) => {
                                  const childActive = isActive(child.href);
                                  return (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        aria-current={childActive ? 'page' : undefined}
                                        className={[
                                          'flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                                          childActive
                                            ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold'
                                            : 'text-slate-600 hover:text-[#1a7097] hover:bg-slate-50',
                                        ].join(' ')}
                                      >
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            {childActive && (
                                              <span
                                                aria-hidden
                                                className="w-1.5 h-1.5 rounded-full bg-[#1a7097]"
                                              />
                                            )}
                                            <span>{child.name}</span>
                                          </div>
                                          {child.desc && (
                                            <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                                              {child.desc}
                                            </div>
                                          )}
                                        </div>

                                        {child.badge && (
                                          <span className="px-2 py-0.5 rounded-full bg-[#E7B900]/15 text-[#9a7b00] font-mono text-[9px] font-bold">
                                            {child.badge}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    }

                    return (
                      <motion.li key={link.href} variants={mobileItemVariants}>
                        <Link
                          href={link.href}
                          aria-current={active ? 'page' : undefined}
                          className={[
                            'flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-base font-bold transition-colors cursor-pointer',
                            active
                              ? 'bg-[#1a7097]/10 text-[#1a7097]'
                              : 'text-slate-800 hover:bg-slate-50',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs text-slate-400 font-semibold">
                              0{idx + 1}
                            </span>
                            <span>{link.name}</span>
                          </div>

                          {link.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-[#1a7097]/10 text-[#1a7097] font-mono text-[10px] font-semibold">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Direct Architect VIP Access Box */}
                <motion.div
                  variants={mobileItemVariants}
                  className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#1a7097] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                      MV
                    </div>
                    <div className="min-w-0">
                      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] truncate">
                        Manthan Vaghasiya
                      </div>
                      <div className="flex items-center gap-1 text-[10.5px] font-mono text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Lead Architect VIP Online</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/919664736245?text=Hi%20Manthan%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Webiox."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-[10.5px] font-bold shrink-0 transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </motion.div>
              </div>

              {/* Bottom Quick Action CTAs */}
              <motion.div variants={mobileItemVariants} className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 w-full rounded-2xl bg-[#1a7097] hover:bg-[#145b7c] text-white px-4 py-3 font-semibold text-sm shadow-[0_10px_25px_-8px_rgba(26,112,151,0.55)] cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <div className="flex items-center justify-between px-2 pt-1 text-[11px] font-mono text-slate-400">
                  <span>Avg response: &lt; 15 mins</span>
                  <span>Surat // 21.17°N 72.83°E</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

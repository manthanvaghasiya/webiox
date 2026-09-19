'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

interface SubLink {
  readonly name: string;
  readonly href: string;
}

interface NavLink {
  readonly name: string;
  readonly href: string;
  readonly children?: readonly SubLink[];
}

const NAV_LINKS: readonly NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  {
    name: 'Company',
    href: '#',
    children: [
      { name: 'Blog', href: '/blog' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Career', href: '/career' },
    ],
  },
] as const;

const BRAND_TEAL = '#1a7097';

const mobilePanel: Variants = {
  hidden: { opacity: 0, y: -8, transition: { when: 'afterChildren' } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pillDropdownOpen, setPillDropdownOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillDropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const indicatorKey = hovered ?? NAV_LINKS.find((l) => isActive(l.href))?.href ?? null;

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PERMANENT FLOATING CAPSULE PILL NAVBAR
          (Always visible, sleek floating capsule matching user's design)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.nav
        key="floating-pill"
        aria-label="Primary Navigation"
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4"
      >
        <div
          className={`pointer-events-auto bg-white/92 backdrop-blur-xl border rounded-full p-1.5 sm:p-2 pl-3 sm:pl-4 pr-1.5 sm:pr-2 transition-shadow duration-300 flex items-center max-w-fit ${
            scrolled
              ? 'border-slate-300/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.04)]'
              : 'border-slate-200/80 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]'
          }`}
        >
          {/* Brand Logo (left) */}
          <Link
            href="/"
            aria-label="Webiox Home"
            className="relative flex items-center hover:opacity-85 active:scale-95 transition-transform shrink-0 cursor-pointer py-1"
          >
            <Image
              src="/WEBIOX_NAME_WITH_LOG-removebg-preview.png"
              alt="Webiox"
              width={120}
              height={28}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="h-6 sm:h-7 w-auto object-contain select-none pointer-events-none"
            />
          </Link>

          {/* Navigation Links (center - exact same links with expansive balanced spacing) */}
          <div className="hidden sm:flex items-center gap-0.5 md:gap-1 mx-5 sm:mx-8 md:mx-12 lg:mx-14">
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
                          className="absolute top-full right-0 mt-2.5 w-44 py-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_20px_45px_rgba(0,0,0,0.12)]"
                        >
                          {link.children!.map((child) => {
                            const childActive = isActive(child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={[
                                    'flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg mx-1 transition-colors',
                                    childActive
                                      ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold'
                                      : 'text-slate-700 hover:text-[#1a7097] hover:bg-slate-50',
                                  ].join(' ')}
                                >
                                  {childActive && (
                                    <span
                                      aria-hidden
                                      className="w-1.5 h-1.5 rounded-full bg-[#1a7097]"
                                    />
                                  )}
                                  {child.name}
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

          {/* Mobile compact key links */}
          <div className="flex sm:hidden items-center gap-0.5 mx-2">
            <Link
              href="/services"
              className={[
                'px-2 py-1 text-xs font-medium rounded-full transition-colors',
                isActive('/services') ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold' : 'text-slate-700 hover:text-[#1a7097]',
              ].join(' ')}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className={[
                'px-2 py-1 text-xs font-medium rounded-full transition-colors',
                isActive('/portfolio') ? 'text-[#1a7097] bg-[#1a7097]/10 font-semibold' : 'text-slate-700 hover:text-[#1a7097]',
              ].join(' ')}
            >
              Portfolio
            </Link>
          </div>

          {/* Action Button: Start Project */}
          <Link
            href="/contact"
            className="bg-[#1a7097] hover:bg-[#145b7c] text-white shadow-[0_10px_25px_-8px_rgba(26,112,151,0.55)] hover:shadow-[0_14px_35px_-8px_rgba(26,112,151,0.65)] font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 cursor-pointer group whitespace-nowrap"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>

          {/* Mobile menu toggle inside floating pill */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATE 3: MOBILE NAVIGATION DRAWER
          (Unified drawer accessible from either top or scrolled state)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50"
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              key="mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              variants={mobilePanel}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden fixed left-4 right-4 top-20 z-50 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-4 max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <Image
                  src="/WEBIOX_NAME_WITH_LOG-removebg-preview.png"
                  alt="Webiox"
                  width={120}
                  height={30}
                  style={{ width: 'auto', height: 'auto' }}
                  className="h-7 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const hasChildren = link.children && link.children.length > 0;
                  const active = hasChildren
                    ? link.children!.some((c) => isActive(c.href))
                    : isActive(link.href);

                  if (hasChildren) {
                    return (
                      <motion.li key={link.name} variants={mobileItem}>
                        <button
                          type="button"
                          onClick={() => setMobileCompanyOpen((v) => !v)}
                          aria-expanded={mobileCompanyOpen}
                          className={[
                            'flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors',
                            active
                              ? 'bg-[#1a7097]/10 text-[#1a7097]'
                              : 'text-slate-800 hover:bg-slate-900/5',
                          ].join(' ')}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={[
                              'w-4 h-4 transition-transform duration-300',
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
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden pl-3"
                            >
                              {link.children!.map((child) => {
                                const childActive = isActive(child.href);
                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      aria-current={childActive ? 'page' : undefined}
                                      className={[
                                        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                        childActive
                                          ? 'text-[#1a7097] bg-[#1a7097]/5'
                                          : 'text-slate-600 hover:text-[#1a7097] hover:bg-slate-50',
                                      ].join(' ')}
                                    >
                                      {childActive && (
                                        <span
                                          aria-hidden
                                          className="w-1.5 h-1.5 rounded-full bg-[#1a7097]"
                                          style={{ boxShadow: `0 0 0 4px ${BRAND_TEAL}1A` }}
                                        />
                                      )}
                                      {child.name}
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
                    <motion.li key={link.href} variants={mobileItem}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={[
                          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors',
                          active
                            ? 'bg-[#1a7097]/10 text-[#1a7097]'
                            : 'text-slate-800 hover:bg-slate-900/5',
                        ].join(' ')}
                      >
                        <span>{link.name}</span>
                        {active && (
                          <span
                            aria-hidden
                            className="w-1.5 h-1.5 rounded-full bg-[#1a7097]"
                            style={{ boxShadow: `0 0 0 4px ${BRAND_TEAL}1A` }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}

                <motion.li variants={mobileItem} className="mt-3 pt-2 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center gap-2 w-full rounded-full bg-[#1a7097] text-white px-5 py-3 font-semibold shadow-[0_10px_30px_-10px_rgba(26,112,151,0.6)] cursor-pointer"
                  >
                    Start Project
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

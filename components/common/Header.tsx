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

const BRAND_TEAL = '#0E5E64';

const navContainer: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLightPage = false;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
    <motion.header
      variants={navContainer}
      initial="hidden"
      animate="visible"
      className={[
        'fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Primary"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Webiox — Home"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E5E64] rounded-xl"
        >
          <motion.span
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            className={[
              'relative inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-500',
              scrolled || isLightPage
                ? 'bg-transparent shadow-none'
                : 'bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]',
            ].join(' ')}
          >
            <Image
              src="/logo_without_background.png"
              alt=""
              width={40}
              height={40}
              priority
              className="w-9 h-9 object-contain select-none pointer-events-none"
            />
          </motion.span>
          <div className="flex flex-col justify-center mt-1">
            <span
              className={[
                'font-bold tracking-tight text-lg transition-colors duration-300 leading-none',
                scrolled || isLightPage ? 'text-slate-900' : 'text-white',
              ].join(' ')}
            >
              Webiox
            </span>
            <span
              className={[
                'text-[9px] uppercase font-bold tracking-widest transition-colors duration-300 leading-tight mt-0.5',
                scrolled || isLightPage ? 'text-slate-500' : 'text-slate-400',
              ].join(' ')}
            >
              Digital Solution
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => {
            const hasChildren = link.children && link.children.length > 0;
            const active = hasChildren
              ? link.children!.some((c) => isActive(c.href))
              : isActive(link.href);
            const showIndicator = indicatorKey === link.href;

            if (hasChildren) {
              return (
                <li
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                    setDropdownOpen(true);
                    setHovered(link.href);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
                    setHovered(null);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className={[
                      'relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5E64]/60',
                      scrolled || isLightPage
                        ? active
                          ? 'text-[#0E5E64]'
                          : 'text-slate-700 hover:text-[#0E5E64]'
                        : active
                          ? 'text-white'
                          : 'text-white/80 hover:text-white',
                    ].join(' ')}
                  >
                    {showIndicator && (
                      <motion.span
                        layoutId="nav-pill"
                        className={[
                          'absolute inset-0 -z-10 rounded-full',
                          scrolled || isLightPage ? 'bg-slate-900/[0.06]' : 'bg-white/15',
                        ].join(' ')}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                    <ChevronDown
                      className={[
                        'w-3.5 h-3.5 transition-transform duration-300',
                        dropdownOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className={[
                          'absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full',
                          scrolled ? 'bg-[#0E5E64]' : 'bg-[#FFBF00]',
                        ].join(' ')}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full right-0 mt-2 w-48 py-2 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
                      >
                        {link.children!.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={[
                                  'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                                  childActive
                                    ? 'text-[#0E5E64] bg-[#0E5E64]/5'
                                    : 'text-slate-700 hover:text-[#0E5E64] hover:bg-slate-50',
                                ].join(' ')}
                              >
                                {childActive && (
                                  <span
                                    aria-hidden
                                    className="w-1.5 h-1.5 rounded-full bg-[#0E5E64] shrink-0"
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
                </li>
              );
            }

            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5E64]/60',
                    scrolled || isLightPage
                      ? active
                        ? 'text-[#0E5E64]'
                        : 'text-slate-700 hover:text-[#0E5E64]'
                      : active
                        ? 'text-white'
                        : 'text-white/80 hover:text-white',
                  ].join(' ')}
                >
                  {showIndicator && (
                    <motion.span
                      layoutId="nav-pill"
                      className={[
                        'absolute inset-0 -z-10 rounded-full',
                        scrolled || isLightPage ? 'bg-slate-900/[0.06]' : 'bg-white/15',
                      ].join(' ')}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={[
                        'absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full',
                        scrolled ? 'bg-[#0E5E64]' : 'bg-[#FFBF00]',
                      ].join(' ')}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E5E64]"
          >
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className={[
                'relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide overflow-hidden',
                'transition-shadow duration-300',
                scrolled || isLightPage
                  ? 'bg-[#0E5E64] text-white shadow-[0_10px_30px_-10px_rgba(14,94,100,0.6)] hover:shadow-[0_14px_40px_-10px_rgba(14,94,100,0.7)]'
                  : 'bg-[#FFBF00] text-[#0E5E64] shadow-[0_10px_30px_-10px_rgba(255,191,0,0.55)] hover:shadow-[0_14px_40px_-10px_rgba(255,191,0,0.7)]',
              ].join(' ')}
            >
              <span className="relative z-10">Start Project</span>
              <motion.span
                aria-hidden
                className="relative z-10 inline-flex"
                initial={false}
                whileHover={{ x: 3, y: -3 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
              {/* Trailing background sweep */}
              <span
                aria-hidden
                className={[
                  'pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out',
                  scrolled || isLightPage
                    ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-white/40 to-transparent',
                ].join(' ')}
              />
            </motion.span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className={[
            'md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5E64]',
            scrolled || isLightPage ? 'text-slate-900 hover:bg-slate-900/5' : 'text-white hover:bg-white/10',
          ].join(' ')}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="inline-flex"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu panel */}
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
              className="md:hidden fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-sm z-40"
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
              className="md:hidden absolute left-0 right-0 top-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
            >
              <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col">
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
                            'flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                            active
                              ? 'bg-[#0E5E64]/10 text-[#0E5E64]'
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
                              className="overflow-hidden pl-4"
                            >
                              {link.children!.map((child) => {
                                const childActive = isActive(child.href);
                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      aria-current={childActive ? 'page' : undefined}
                                      className={[
                                        'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        childActive
                                          ? 'text-[#0E5E64] bg-[#0E5E64]/5'
                                          : 'text-slate-600 hover:text-[#0E5E64] hover:bg-slate-50',
                                      ].join(' ')}
                                    >
                                      {childActive && (
                                        <span
                                          aria-hidden
                                          className="w-1.5 h-1.5 rounded-full bg-[#0E5E64]"
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
                          'flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                          active
                            ? 'bg-[#0E5E64]/10 text-[#0E5E64]'
                            : 'text-slate-800 hover:bg-slate-900/5',
                        ].join(' ')}
                      >
                        <span>{link.name}</span>
                        {active && (
                          <span
                            aria-hidden
                            className="w-1.5 h-1.5 rounded-full bg-[#0E5E64]"
                            style={{ boxShadow: `0 0 0 4px ${BRAND_TEAL}1A` }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li variants={mobileItem} className="mt-3 px-1">
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center gap-2 w-full rounded-full bg-[#0E5E64] text-white px-5 py-3 font-semibold shadow-[0_10px_30px_-10px_rgba(14,94,100,0.6)]"
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
    </motion.header>
  );
}

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, ExternalLink, Menu, X, MessageSquare, LogOut, Lock, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_PASSKEY = 'webiox@2026';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const storedAuth = typeof window !== 'undefined' ? sessionStorage.getItem('webiox_admin_auth') : null;
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    setTimeout(() => {
      if (passkeyInput.trim() === DEFAULT_PASSKEY || passkeyInput.trim().toLowerCase() === 'webiox') {
        sessionStorage.setItem('webiox_admin_auth', 'true');
        setIsAuthenticated(true);
        setPasskeyInput('');
      } else {
        setAuthError('Invalid Admin Passkey. Please try again.');
      }
      setIsVerifying(false);
    }, 400);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('webiox_admin_auth');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#377a9b]/30 border-t-[#377a9b] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center px-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#377a9b]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffc312]/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#377a9b]/20 border border-[#377a9b]/40 flex items-center justify-center mx-auto mb-6 text-[#377a9b]">
            <Lock className="w-8 h-8 text-[#377a9b]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#ffc312] uppercase tracking-wider mb-3">
            <ShieldCheck size={12} />
            <span>Restricted Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Webiox Studio Admin
          </h1>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Enter your internal administrative passkey to access client inquiries and lead management.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold text-center">
                {authError}
              </div>
            )}

            <div className="relative">
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter Admin Passkey"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#377a9b] focus:ring-4 focus:ring-[#377a9b]/20 transition-all font-mono text-sm text-center tracking-widest"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-[#377a9b] hover:bg-[#2b6683] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-[#377a9b]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Workspace</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Webiox Public Site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300">
      <div>
        <div className="p-6 h-[72px] flex items-center border-b border-slate-800/50">
          <Link href="/" className="font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#377a9b] to-[#2b6683] rounded-lg shadow-lg shadow-[#377a9b]/30 flex items-center justify-center text-white font-black text-sm">
              W
            </div>
            WEBIOX<span className="text-[#ffc312]">.</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2 mt-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Main Menu</div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                  isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#377a9b] rounded-r-full" />
                )}
                <Icon size={18} className={isActive ? 'text-[#377a9b]' : 'text-slate-500 group-hover:text-slate-300 transition-colors'} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto border-t border-slate-800/50">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">External Apps</div>
        <div className="space-y-3">
          <a href="https://leads.webiox.tech" target="_blank" rel="noopener noreferrer" 
             className="relative overflow-hidden group flex items-center justify-between px-4 py-3.5 bg-slate-900 border border-[#377a9b]/20 text-white rounded-xl font-bold shadow-lg hover:border-[#377a9b]/50 hover:shadow-[#377a9b]/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#377a9b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="flex items-center gap-2 relative z-10">
              <ExternalLink size={18} className="text-[#377a9b]" /> Lead Panel
            </span>
            <span className="text-[#377a9b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10">↗</span>
          </a>

          <a href="https://invoice.webiox.tech" target="_blank" rel="noopener noreferrer" 
             className="relative overflow-hidden group flex items-center justify-between px-4 py-3.5 bg-slate-900 border border-[#377a9b]/20 text-white rounded-xl font-bold shadow-lg hover:border-[#377a9b]/50 hover:shadow-[#377a9b]/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#377a9b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="flex items-center gap-2 relative z-10">
              <ExternalLink size={18} className="text-[#377a9b]" /> Invoice App
            </span>
            <span className="text-[#377a9b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10">↗</span>
          </a>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl w-full text-left mt-4 transition-colors font-medium cursor-pointer"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-[#377a9b]/20 selection:text-[#377a9b]">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden lg:block shrink-0 h-screen sticky top-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-4 z-50">
        <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#377a9b] to-[#2b6683] rounded-md flex items-center justify-center text-white text-xs font-bold">W</div>
          WEBIOX
        </span>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 bg-white/10 text-white rounded-lg active:scale-95 transition-transform"><Menu size={20} /></button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-50 lg:hidden shadow-2xl">
              <SidebarContent />
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg">
                <X size={20} />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 lg:pt-0 w-full overflow-x-hidden relative">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#377a9b]/8 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}

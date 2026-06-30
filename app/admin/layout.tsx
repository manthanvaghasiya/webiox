"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, ExternalLink, LogOut, Menu, X, Bell, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300">
      <div>
        <div className="p-6 h-[72px] flex items-center border-b border-slate-800/50">
          <span className="font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg shadow-lg shadow-indigo-500/20"></div>
            WEBIOX<span className="text-indigo-400">.</span>
          </span>
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
                  <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full" />
                )}
                <Icon size={18} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300 transition-colors'} />
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
             className="relative overflow-hidden group flex items-center justify-between px-4 py-3.5 bg-slate-900 border border-indigo-500/20 text-white rounded-xl font-bold shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="flex items-center gap-2 relative z-10">
              <ExternalLink size={18} className="text-indigo-400" /> Lead Panel
            </span>
            <span className="text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10">↗</span>
          </a>

          <a href="https://invoice.webiox.tech" target="_blank" rel="noopener noreferrer" 
             className="relative overflow-hidden group flex items-center justify-between px-4 py-3.5 bg-slate-900 border border-indigo-500/20 text-white rounded-xl font-bold shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="flex items-center gap-2 relative z-10">
              <ExternalLink size={18} className="text-indigo-400" /> Invoice App
            </span>
            <span className="text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10">↗</span>
          </a>
        </div>
        
        <button className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl w-full text-left mt-4 transition-colors font-medium">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-indigo-500/30">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden lg:block shrink-0 h-screen sticky top-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-4 z-50">
        <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-md"></div>
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        {/* Top Navbar (Desktop) */}
        <header className="h-[72px] bg-white/60 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-8 shrink-0 hidden lg:flex sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Admin</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 capitalize">{pathname.split('/').pop() || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-100 to-violet-100 border border-indigo-200 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 z-10">
          {children}
        </div>
      </main>
    </div>
  );
}

"use client";

import { Users, Eye, MousePointerClick, TrendingUp, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      <motion.div variants={item}>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          Welcome back, Admin <span className="text-2xl">👋</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Here's an overview of your website's performance today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Visitors', value: '12,450', change: '+14%', icon: Users, color: 'blue' },
          { title: 'Page Views', value: '45,200', change: '+8%', icon: Eye, color: 'indigo' },
          { title: 'Click Rate', value: '4.2%', change: '-1%', icon: MousePointerClick, color: 'amber', neg: true },
          { title: 'Form Submits', value: '84', change: '+22%', icon: TrendingUp, color: 'emerald' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={item} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                <div className={`p-2.5 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <h3 className="text-4xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.neg ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions & Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <motion.div variants={item} className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full">
          <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recent Blog Posts</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your latest publications</p>
            </div>
            <Link href="/admin/blog" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl transition-colors">View All</Link>
          </div>
          <div className="p-3 md:p-4 flex-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50/80 rounded-2xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl shrink-0 overflow-hidden relative group-hover:shadow-md transition-shadow">
                     <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg">Top 10 Web Design Trends in 2026</h4>
                    <p className="text-sm font-medium text-slate-400 mt-0.5">Published on June {20 - i}, 2026</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all shadow-sm">
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
              <Activity className="text-indigo-300" size={24} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Client Leads</h3>
            <p className="text-indigo-200/80 text-sm mt-3 mb-8 relative z-10 leading-relaxed">
              Open your dedicated CRM panel to follow up with hot prospects and manage your pipeline seamlessly.
            </p>
            <a href="https://leads.webiox.tech" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center justify-center gap-2 w-full bg-white text-indigo-950 px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-50 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-300">
              Open Lead Panel ↗
            </a>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
            <h3 className="font-bold text-slate-900 mb-4 px-2">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/admin/blog" className="block w-full text-left px-5 py-3.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between group">
                + Write New Blog Post
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link href="/admin/portfolio" className="block w-full text-left px-5 py-3.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between group">
                + Add Portfolio Item
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

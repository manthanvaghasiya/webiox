"use client";

import { motion } from 'framer-motion';
import { Save, Globe, Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Site Settings</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your agency website's global configuration.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {/* Settings Sections */}
      <div className="flex flex-col gap-6">
        
        {/* General Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">General Information</h2>
              <p className="text-sm text-slate-500 mt-0.5 font-medium">Primary details shown across your website.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Agency Name</label>
                <input type="text" defaultValue="Webiox Digital Solution" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Website URL</label>
                <input type="text" defaultValue="https://webiox.tech" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Meta Description (SEO)</label>
              <textarea rows={3} defaultValue="Webiox is a premium digital agency specializing in award-winning web design and bespoke software solutions." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 transition-all resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Contact Details</h2>
              <p className="text-sm text-slate-500 mt-0.5 font-medium">How clients can reach you from the main site.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Mail size={16} className="text-slate-400"/> Contact Email</label>
                <input type="email" defaultValue="hello@webiox.tech" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Phone size={16} className="text-slate-400"/> Phone Number</label>
                <input type="text" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 transition-all" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><MapPin size={16} className="text-slate-400"/> Office Address</label>
                <input type="text" defaultValue="123 Innovation Drive, Tech District, NY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden text-white">
          <div className="p-6 md:p-8 border-b border-slate-800/50 flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Admin Security</h2>
              <p className="text-sm text-slate-400 mt-0.5 font-medium">Manage your admin access credentials.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
             <div>
                <h4 className="font-bold text-lg">Change Password</h4>
                <p className="text-slate-400 text-sm mt-1">Ensure your admin account stays secure by updating your password regularly.</p>
             </div>
             <button className="shrink-0 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">
               Update Password
             </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

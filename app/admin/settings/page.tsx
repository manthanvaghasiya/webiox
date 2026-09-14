"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Key, LogOut, CheckCircle2, Laptop, Shield, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setIsSaving(true);
    setSaved(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto flex flex-col gap-8 pb-12 min-h-[calc(100vh-140px)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Security & Access <span className="text-2xl">🔒</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your admin credentials, password, and active security sessions.</p>
        </div>
        <button 
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:text-rose-600 transition-colors shadow-sm self-start sm:self-auto"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      {/* Main Security & Access Panel */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <form onSubmit={handleSave} className="p-6 sm:p-8 md:p-10 flex flex-col gap-8">
          
          {/* Section: Password Update */}
          <div className="border-b border-slate-100 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Key size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Change Admin Password</h2>
                <p className="text-sm text-slate-500 font-medium">Ensure your admin dashboard remains protected with a strong password.</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold">
                {error}
              </div>
            )}

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 8 characters)" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" 
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all disabled:opacity-70"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : saved ? (
                    <CheckCircle2 size={18} className="text-emerald-300" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? 'Saving...' : saved ? 'Password Updated!' : 'Save Password'}
                </button>
              </div>
            </div>
          </div>

          {/* Section: Active Sessions */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">Active Admin Sessions</h3>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-4">Devices currently authenticated to access the Webiox admin portal.</p>
            
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 max-w-2xl">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-500">
                  <Laptop size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Current Device • Chrome Browser</p>
                  <p className="text-xs font-medium text-emerald-600 mt-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Active Now (Current Session)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                Current
              </span>
            </div>
          </div>

        </form>
      </div>
    </motion.div>
  );
}

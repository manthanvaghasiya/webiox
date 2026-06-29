"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Shield, User, Bell, Palette, Key, LogOut, CheckCircle2, ChevronRight, Laptop } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile details', icon: User },
  { id: 'security', label: 'Security & Access', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('security');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto flex flex-col gap-8 pb-12 min-h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Settings <span className="text-2xl">⚙️</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your admin preferences, security, and account settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <LogOut size={16} /> Sign out
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:hover:shadow-none"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <CheckCircle2 size={18} className="text-emerald-300" />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Saving...' : saved ? 'Saved' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:items-start flex-1">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-transparent text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-indigo-200' : 'text-slate-400'} />
                  {tab.label}
                </div>
                {isActive && <ChevronRight size={16} className="text-indigo-300" />}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-8 md:p-12 flex flex-col gap-10"
              >
                <div className="border-b border-slate-100 pb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                      <Key size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Admin Security</h2>
                      <p className="text-slate-500 font-medium">Update your password and secure your account.</p>
                    </div>
                  </div>

                  <div className="max-w-md space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Active Sessions</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-400">
                        <Laptop size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Windows 11 • Chrome</p>
                        <p className="text-xs font-medium text-emerald-600 mt-0.5 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Active now</p>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors">Revoke</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-8 md:p-12 flex flex-col gap-10"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Profile Details</h2>
                    <p className="text-slate-500 font-medium">Manage your personal information.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/30">
                    AD
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm mb-2">
                      Upload Avatar
                    </button>
                    <p className="text-xs font-medium text-slate-400">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" defaultValue="Admin User" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" defaultValue="admin@webiox.tech" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 font-medium transition-all" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-8 md:p-12 flex flex-col gap-10"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Dashboard Preferences</h2>
                    <p className="text-slate-500 font-medium">Customize your admin experience.</p>
                  </div>
                </div>

                <div className="space-y-6 max-w-xl">
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900">Dark Mode</h4>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">Toggle dark mode for the admin panel.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed opacity-60">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900">Compact Sidebar</h4>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">Collapse the main navigation to icons only.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed opacity-60">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-8 md:p-12 flex flex-col gap-10"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Notification Settings</h2>
                    <p className="text-slate-500 font-medium">Manage how you receive alerts.</p>
                  </div>
                </div>

                <div className="space-y-4 max-w-xl">
                  {['New client inquiry received', 'Daily performance summary', 'Security alerts and login attempts'].map((item, i) => (
                    <div key={i} className="flex items-start justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-900">{item}</h4>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">Receive an email when this happens.</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${i === 1 ? 'bg-slate-200' : 'bg-indigo-600'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${i === 1 ? 'left-0.5' : 'left-[26px]'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

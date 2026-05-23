'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Calendar, Briefcase, FileText } from 'lucide-react';
import { Lead } from '@/lib/admin/types';
import { StatusBadge } from './StatusBadge';

interface LeadSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export function LeadSlideOver({ isOpen, onClose, lead }: LeadSlideOverProps) {
  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#111] border-l border-white/10 shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Lead Details</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 transition-colors rounded-full hover:bg-white/10 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{lead.clientName}</h3>
                  {lead.company && <p className="text-gray-400">{lead.company}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={lead.status} />
                  <span className="text-sm text-gray-500">Last updated today</span>
                </div>

                <div className="p-4 space-y-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a href={`mailto:${lead.email}`} className="hover:text-blue-400">{lead.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <a href={`tel:${lead.phone}`} className="hover:text-blue-400">{lead.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <span>{lead.service}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>{new Date(lead.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-400">
                    <FileText className="w-4 h-4" />
                    Notes
                  </h4>
                  <div className="p-4 text-sm text-gray-300 rounded-lg bg-white/5 whitespace-pre-wrap border border-white/5">
                    {lead.notes || 'No notes provided.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10">
              <button className="w-full py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500">
                Contact Client
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Building2, Calendar, CheckCircle, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/app/actions/contact';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getInquiries();
    setInquiries(data);
    
    // Refresh selected inquiry if it exists
    if (selectedInquiry) {
      const updated = data.find((i: any) => i.id === selectedInquiry.id);
      setSelectedInquiry(updated || null);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResolve = async (id: string) => {
    setIsProcessing(true);
    await updateInquiryStatus(id, 'Resolved');
    await load();
    setIsProcessing(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      setIsProcessing(true);
      await deleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      await load();
      setIsProcessing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto flex flex-col gap-8 pb-12 h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Client Inquiries</h1>
        <p className="text-slate-500 mt-2 font-medium">Review and respond to messages submitted through your website.</p>
      </div>

      {loading && inquiries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          
          {/* Inbox List */}
          <div className="w-full lg:w-1/3 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-y-auto flex flex-col">
            <div className="p-5 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-10 flex justify-between items-center">
               <h3 className="font-bold text-slate-900">Inbox ({inquiries.length})</h3>
               <button onClick={load} disabled={loading} className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 disabled:opacity-50">
                 {loading ? 'Refreshing...' : 'Refresh'}
               </button>
            </div>
            <div className="flex-1 divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No inquiries yet.</div>
              ) : (
                inquiries.map((inq) => (
                  <button 
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`w-full text-left p-5 hover:bg-indigo-50/50 transition-colors ${selectedInquiry?.id === inq.id ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 truncate pr-2">{inq.name}</h4>
                      {inq.status === 'Resolved' ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">Resolved</span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">New</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-indigo-600 mb-2">{inq.service}</p>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{inq.message}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Details View */}
          <div className="w-full lg:w-2/3 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-y-auto p-6 lg:p-8 relative">
            {selectedInquiry ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900">{selectedInquiry.name}</h2>
                      {selectedInquiry.status === 'Resolved' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full"><CheckCircle2 size={14}/> Resolved</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full"><Clock size={14}/> Pending</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                        <Mail size={14} className="text-slate-400" /> {selectedInquiry.email}
                      </span>
                      {selectedInquiry.phone && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                          <Phone size={14} className="text-slate-400" /> {selectedInquiry.phone}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        {new Date(selectedInquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedInquiry.status !== 'Resolved' && (
                      <button 
                        onClick={() => handleResolve(selectedInquiry.id)}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={16} /> Mark Resolved
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(selectedInquiry.id)}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Building2 size={14}/> Company</p>
                    <p className="font-semibold text-slate-900">{selectedInquiry.company || 'Not specified'}</p>
                  </div>
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={14}/> Service Requested</p>
                    <p className="font-bold text-indigo-900">{selectedInquiry.service}</p>
                  </div>
                </div>

                <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5"><MessageSquare size={14}/> Project Details</p>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <MessageSquare size={48} className="mb-4 opacity-20" />
                <p className="font-medium text-lg">Select an inquiry to view details</p>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

        </div>
      )}
    </motion.div>
  );
}

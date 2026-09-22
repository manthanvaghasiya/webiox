'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Sparkles, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '@/app/actions/contact';
import { useState, useEffect } from 'react';

const SERVICES_OPTIONS = [
  'Enterprise Web Engineering',
  'Custom SaaS Architecture',
  'High-Conversion E-Commerce',
  'AI & Autonomous Workflows',
  'UI/UX Design Systems',
  'Cross-Platform Mobile Apps',
];

const BUDGET_OPTIONS = [
  '₹50,000 - ₹1,50,000',
  '₹1,50,000 - ₹3,50,000',
  '₹3,50,000 - ₹8,00,000',
  '₹8,00,000+ / Enterprise',
];

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Enterprise Web Engineering',
    budget: '₹1,50,000 - ₹3,50,000',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [teamEmail, setTeamEmail] = useState('');

  useEffect(() => {
    const u = 'manthanvaghasiya';
    const d = 'webiox.tech';
    setTeamEmail(`${u}@${d}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await submitInquiry(formState);
      if (response.success) {
        setIsSubmitted(true);
        setFormState({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Enterprise Web Engineering',
          budget: '₹1,50,000 - ₹3,50,000',
          message: '',
        });
      } else {
        setError(response.error || 'Failed to submit inquiry. Please try again or message us on WhatsApp.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 focus:border-[#1a7097] focus:ring-4 focus:ring-[#1a7097]/10 outline-none transition-all placeholder:text-slate-400 font-medium text-sm';
  const labelClass = 'text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 block';

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] selection:bg-[#1a7097]/20 selection:text-[#1a7097] font-sans">
      
      {/* ── Hero Section ── */}
      <section className="relative w-full bg-[#051F22] pt-32 pb-40 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Animated Ambient Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-[#1a7097]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-[#FFBF00]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFBF00] font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Access to Founders & Engineers
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Let&apos;s Engineer Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-yellow-200 to-[#FFBF00]">
              Next Flagship Product.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            We partner with visionary founders and enterprises to engineer ultra-fast platforms and autonomous workflows. Get a detailed technical proposal within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-white/70">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#FFBF00]" /> 24h Response SLA</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> NDA Protected</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#FFBF00]" /> Surat Headquarters</span>
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-teal-50 text-[#1a7097] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Email Our Team</h3>
            <p className="text-xs text-slate-500 mb-4">Official proposal & inquiries</p>
            <a
              href={teamEmail ? `mailto:${teamEmail}` : '#contact-form'}
              className="text-[#1a7097] font-bold text-sm hover:underline"
            >
              {teamEmail || 'manthanvaghasiya [at] webiox.tech'}
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-50 text-[#FFBF00] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
              <Phone className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Direct Call & WhatsApp</h3>
            <p className="text-xs text-slate-500 mb-4">Mon–Sat from 9:30 AM to 7:00 PM IST</p>
            <div className="flex flex-col gap-1 items-center">
              <a href="tel:+919664736245" className="text-[#1a7097] font-bold text-sm hover:underline">
                +91 96647 36245
              </a>
              <a
                href="https://wa.me/919664736245?text=Hello%20Webiox,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold hover:underline mt-1"
              >
                <MessageCircle size={14} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-teal-50 text-[#1a7097] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Visit Studio</h3>
            <p className="text-xs text-slate-500 mb-4">Technical Headquarters</p>
            <address
              className="not-italic text-slate-700 font-medium text-sm leading-relaxed"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">The Palladium, Yogi Chowk</span>, <br />
              <span itemProp="addressLocality">Surat</span>{' '}
              <span itemProp="postalCode">395010</span>,{' '}
              <span itemProp="addressCountry">India</span>
            </address>
          </div>

        </div>
      </div>

      {/* ── Main Form Section ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200/80 p-8 sm:p-12 lg:p-16">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#1a7097] font-bold mb-2 block">
              Project Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tell Us About Your Vision
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              Fill in your project requirements below to receive an architectural estimate and timeline.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Discovery Inquiry Received!</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Our engineering lead will review your project specs and send a detailed response within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-[#1a7097] transition-colors shadow-lg"
              >
                Send Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-rose-50 text-rose-700 p-4 rounded-xl font-medium text-sm text-center border border-rose-200">
                  {error}
                </div>
              )}

              {/* Service Selection Chips */}
              <div>
                <label className={labelClass}>Select Service Required</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {SERVICES_OPTIONS.map((svc) => (
                    <button
                      type="button"
                      key={svc}
                      onClick={() => setFormState({ ...formState, service: svc })}
                      className={`px-4 py-3 rounded-xl text-xs font-bold border transition-all text-left ${
                        formState.service === svc
                          ? 'bg-[#1a7097] text-white border-[#1a7097] shadow-md shadow-[#1a7097]/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Chips */}
              <div>
                <label className={labelClass}>Estimated Budget Scope</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormState({ ...formState, budget: b })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        formState.budget === b
                          ? 'bg-[#FFBF00] text-slate-950 border-[#FFBF00] shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Manthan Vaghasiya"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Business Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+91 96647 XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>Company or Brand Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Acme Innovations"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="message" className={labelClass}>Project Goals & Overview *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Tell us what you want to build, current challenges, and desired launch timeline..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-xl bg-[#1a7097] text-white font-extrabold text-base hover:bg-[#145b7c] hover:shadow-xl hover:shadow-[#1a7097]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    Submit Project Inquiry
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}

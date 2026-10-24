'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Sparkles, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '@/app/actions/contact';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SERVICES_OPTIONS = [
  'Enterprise Web Engineering',
  'Custom SaaS Architecture',
  'High-Conversion E-Commerce',
  'AI & Autonomous Workflows',
  'UI/UX Design Systems',
  'Cross-Platform Mobile Apps',
  'Other / Career Application',
];

const BUDGET_OPTIONS = [
  '₹50,000 - ₹1,50,000',
  '₹1,50,000 - ₹3,50,000',
  '₹3,50,000 - ₹8,00,000',
  '₹8,00,000+ / Enterprise',
];

export default function ContactClient() {
  const searchParams = useSearchParams();
  const role = searchParams?.get('role');
  const serviceParam = searchParams?.get('service');

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
    if (role) {
      setFormState((prev) => ({
        ...prev,
        service: 'Other / Career Application',
        message: prev.message || `Applying for ${role} position.\n\nLinkedIn / Portfolio: \nKey experience: `,
      }));
    } else if (serviceParam) {
      const match = SERVICES_OPTIONS.find((s) => s.toLowerCase().includes(serviceParam.toLowerCase()));
      if (match) {
        setFormState((prev) => ({
          ...prev,
          service: match,
        }));
      }
    }
  }, [role, serviceParam]);

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
    'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-[#377a9b] focus:ring-4 focus:ring-[#377a9b]/10 outline-none transition-all placeholder:text-slate-400 font-medium text-base sm:text-sm min-h-[48px]';
  const labelClass = 'text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 block';

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] selection:bg-[#377a9b]/20 selection:text-[#377a9b] font-sans">
      
      {/* ── Hero Section (Ultra-Luxury Engineering Architecture) ── */}
      <section className="relative w-full bg-[#070B16] pt-32 pb-36 sm:pt-40 sm:pb-44 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Subtle Cyber Blueprint Grid with Smooth Radial Fade */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 75%)',
          }}
        />

        {/* Cinematic Multi-Layered Atmosphere Lighting */}
        {/* 1. Deep Top Stage Spotlight */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(55, 122, 155, 0.42), transparent 70%)',
          }}
        />
        {/* 2. Warm Gold/Amber Ambient Horizon Flare (Right) */}
        <div
          aria-hidden="true"
          className="absolute top-12 -right-24 w-[34rem] h-[34rem] rounded-full bg-[#ffc312]/[0.14] blur-[140px] pointer-events-none"
        />
        {/* 3. Cyan/Azure Edge Aura (Left) */}
        <div
          aria-hidden="true"
          className="absolute top-24 -left-28 w-[32rem] h-[32rem] rounded-full bg-[#0284c7]/[0.18] blur-[130px] pointer-events-none"
        />

        {/* Luminous Precision Laser Horizon Rule */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#377a9b]/80 to-transparent shadow-[0_0_25px_rgba(55,122,155,0.8)] pointer-events-none"
        />

        {/* Floating Architectural Coordinate Marks */}
        <div aria-hidden="true" className="absolute top-8 left-8 hidden lg:block text-slate-500/40 font-mono text-[11px] select-none pointer-events-none tracking-widest">
          + LAT: 21.1702° N // 72.8311° E
        </div>
        <div aria-hidden="true" className="absolute top-8 right-8 hidden lg:block text-slate-500/40 font-mono text-[11px] select-none pointer-events-none tracking-widest">
          SYS_STATUS: READY // 24H_GATE +
        </div>
        <div aria-hidden="true" className="absolute bottom-20 left-12 hidden lg:block text-slate-600/30 font-mono text-[10px] select-none pointer-events-none">
          + SEC_ENCRYPT: TLS_1.3 // ZERO_TRUST
        </div>
        <div aria-hidden="true" className="absolute bottom-20 right-12 hidden lg:block text-slate-600/30 font-mono text-[10px] select-none pointer-events-none">
          ARCHITECT_DISPATCH // STAGING_SLA +
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Executive Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.14] shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(55,122,155,0.2)] mb-6 sm:mb-8 transition-transform hover:scale-[1.02]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-200">
              Direct Access to Founders &amp; Engineers
            </span>
            <span className="text-white/30 hidden xs:inline">•</span>
            <span className="font-mono text-[10px] sm:text-[10.5px] font-bold text-[#ffc312] uppercase tracking-wider hidden xs:inline">
              100% Confidential
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-6xl md:text-7xl text-white tracking-[-0.035em] leading-[1.08] mb-6 [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <span>Let&apos;s Engineer Your</span>
            <br />
            <span className="bg-gradient-to-r from-[#ffc312] via-[#ffeaa7] to-[#f59e0b] bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(255,195,18,0.28)]">
              Next Flagship Product.
            </span>
          </h1>

          {/* Subtitle with High-End Editorial Clarity */}
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10 [text-wrap:balance]">
            We partner with visionary founders and enterprises to engineer ultra-fast platforms and autonomous workflows. Get a detailed technical proposal within 24 hours.
          </p>

          {/* 3 Luxury Glass Trust Capsules */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.09] shadow-sm hover:border-white/[0.2] transition-colors">
              <Clock className="w-3.5 h-3.5 text-[#ffc312]" />
              <span className="font-mono text-xs font-bold text-slate-200">24h Response SLA</span>
              <span className="text-[9.5px] font-mono font-bold text-[#ffc312] uppercase px-1.5 py-0.5 rounded-md bg-[#ffc312]/10 border border-[#ffc312]/20">
                Guaranteed
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.09] shadow-sm hover:border-white/[0.2] transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-slate-200">NDA Protected</span>
              <span className="text-[9.5px] font-mono font-bold text-emerald-400 uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                Mutual
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.09] shadow-sm hover:border-white/[0.2] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="font-mono text-xs font-bold text-slate-200">Surat Headquarters</span>
              <span className="text-[9.5px] font-mono font-bold text-[#38bdf8] uppercase px-1.5 py-0.5 rounded-md bg-[#38bdf8]/10 border border-[#38bdf8]/20">
                Direct Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Cards & Mobile Quick Actions ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 sm:-mt-24">
        {/* Mobile Quick-Tap Strip (< sm) */}
        <div className="grid grid-cols-3 gap-2.5 sm:hidden mb-6">
          <a
            href="https://wa.me/919664736245?text=Hello%20Webiox,%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/90 shadow-lg text-center active:scale-[0.97] transition-all min-h-[56px]"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">WhatsApp</span>
          </a>

          <a
            href="tel:+919664736245"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/90 shadow-lg text-center active:scale-[0.97] transition-all min-h-[56px]"
          >
            <Phone className="w-5 h-5 text-[#377a9b] mb-1" />
            <span className="text-[11px] font-bold text-slate-800">Direct Call</span>
          </a>

          <a
            href={teamEmail ? `mailto:${teamEmail}` : '#contact-form'}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/90 shadow-lg text-center active:scale-[0.97] transition-all min-h-[56px]"
          >
            <Mail className="w-5 h-5 text-amber-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">Email Desk</span>
          </a>
        </div>

        {/* Desktop / Tablet Grid (sm+) */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 lg:p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-50 text-[#377a9b] rounded-2xl flex items-center justify-center mb-4 lg:mb-5 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Email Our Team</h3>
            <p className="text-xs text-slate-500 mb-4">Official proposal &amp; inquiries</p>
            <a
              href={teamEmail ? `mailto:${teamEmail}` : '#contact-form'}
              className="text-[#377a9b] font-bold text-sm hover:underline"
            >
              {teamEmail || 'manthanvaghasiya [at] webiox.tech'}
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 lg:p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-amber-50 text-[#ffc312] rounded-2xl flex items-center justify-center mb-4 lg:mb-5 shadow-sm">
              <Phone className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Direct Call &amp; WhatsApp</h3>
            <p className="text-xs text-slate-500 mb-4">Mon–Sat from 9:30 AM to 7:00 PM IST</p>
            <div className="flex flex-col gap-1 items-center">
              <a href="tel:+919664736245" className="text-[#377a9b] font-bold text-sm hover:underline">
                +91 96647 36245
              </a>
              <a
                href="https://wa.me/919664736245?text=Hello%20Webiox,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold hover:underline mt-1"
              >
                <MessageCircle size={14} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 lg:p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-50 text-[#377a9b] rounded-2xl flex items-center justify-center mb-4 lg:mb-5 shadow-sm">
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
      <section id="contact-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200/80 p-5 sm:p-12 lg:p-16">
          
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#377a9b] font-bold mb-2 block">
              Project Discovery
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tell Us About Your Vision
            </h2>
            <p className="text-slate-500 text-xs sm:text-base mt-2 max-w-lg mx-auto leading-relaxed">
              Fill in your project requirements below to receive an architectural estimate and timeline.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-5 shadow-md">
                <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Discovery Inquiry Received!</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                Thank you for reaching out. Our engineering lead will review your project specs and send a detailed response within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-7 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-[#377a9b] transition-colors shadow-lg min-h-[48px] active:scale-95"
              >
                Send Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {error && (
                <div className="bg-rose-50 text-rose-700 p-3.5 sm:p-4 rounded-xl font-medium text-xs sm:text-sm text-center border border-rose-200">
                  {error}
                </div>
              )}

              {/* Service Selection Chips (Dense Touch Grid, min 48px height) */}
              <div>
                <label className={labelClass}>Select Service Required</label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                  {SERVICES_OPTIONS.map((svc) => (
                    <button
                      type="button"
                      key={svc}
                      onClick={() => setFormState({ ...formState, service: svc })}
                      className={`min-h-[48px] px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between active:scale-[0.98] cursor-pointer ${
                        formState.service === svc
                          ? 'bg-[#377a9b] text-white border-[#377a9b] shadow-md shadow-[#377a9b]/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="leading-snug">{svc}</span>
                      {formState.service === svc && (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-1.5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Chips (min 48px height) */}
              <div>
                <label className={labelClass}>Estimated Budget Scope</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormState({ ...formState, budget: b })}
                      className={`min-h-[48px] px-2.5 py-2 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center active:scale-[0.98] cursor-pointer ${
                        formState.budget === b
                          ? 'bg-[#ffc312] text-slate-950 border-[#ffc312] shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email (Mobile keyboard auto-capitalization & 16px text-base) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    enterKeyHint="next"
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
                    inputMode="email"
                    autoComplete="email"
                    enterKeyHint="next"
                    value={formState.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Phone & Company (inputMode="tel" to trigger numeric dialpad) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
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
                    autoComplete="organization"
                    enterKeyHint="next"
                    value={formState.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Acme Innovations"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="message" className={labelClass}>Project Goals &amp; Overview *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  enterKeyHint="done"
                  value={formState.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none min-h-[96px]`}
                  placeholder="Tell us what you want to build, current challenges, and desired launch timeline..."
                />
              </div>

              {/* Submit Button (min 52px height) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] py-3.5 px-6 rounded-xl bg-[#377a9b] text-white font-extrabold text-sm sm:text-base hover:bg-[#2b6683] hover:shadow-xl hover:shadow-[#377a9b]/20 transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 cursor-pointer active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
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

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Webiox Digital Solutions. Learn how we handle client data, technical project specifications, and privacy with enterprise confidentiality.',
  openGraph: {
    title: 'Privacy Policy | Webiox',
    description: 'Privacy Policy for Webiox Digital Solutions. Learn how we handle client data, technical project specifications, and privacy with enterprise confidentiality.',
    url: 'https://webiox.tech/privacy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 22, 2026';

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#090D16]">
      {/* Header Banner */}
      <section className="relative w-full bg-[#1a7097] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,185,0,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/80 hover:text-[#E7B900] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E7B900] font-mono text-xs uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise Confidentiality</span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-5xl tracking-tight leading-tight mb-4">
            Privacy Policy
          </h1>

          <p className="text-white/80 text-sm sm:text-base font-light max-w-2xl">
            At Webiox Digital Solutions, we respect your privacy and enforce strict confidentiality protocols across all client consultations, code repositories, and digital platforms.
          </p>

          <div className="mt-6 text-xs font-mono text-white/60">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-sm space-y-12">
          
          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#1a7097] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Information We Collect
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              When you submit a technical inquiry, request an architecture proposal, or apply for open engineering roles via <strong className="text-slate-900">webiox.tech</strong>, we collect only the information necessary to evaluate your requirements and contact you:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                <span><strong>Contact Details:</strong> Full name, corporate email address, phone/WhatsApp number, and company name.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                <span><strong>Project Specifications:</strong> Selected engineering services, approximate budget tier, and technical project scope details.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                <span><strong>Technical Telemetry:</strong> Anonymized performance metrics (Core Web Vitals, browser type, approximate geolocation) to monitor site availability and speed.</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#1a7097] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                How We Use Your Information
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Your data is utilized solely for legitimate business operations between you and Webiox Digital Solutions:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                <span>Delivering architectural scoping documents, fixed-milestone sprint proposals, and feasibility assessments.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                <span>Communicating through direct channels (Email, WhatsApp, or scheduled video consultations).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7097] shrink-0 mt-1" />
                <span>We <strong className="text-slate-900">never</strong> sell, broker, or monetize your contact details or project ideas to third-party ad networks or brokers.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#1a7097] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Non-Disclosure & Confidentiality
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We treat all client proprietary business models, technical architecture specs, and source code with strict non-disclosure obligations. Prior to in-depth technical deep dives, mutual Non-Disclosure Agreements (NDAs) are executed upon request to guarantee legal intellectual property protection.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#1a7097] flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Data Security & Storage
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Technical inquiries and client project communications are stored within secure, TLS 1.3 encrypted databases and industry-standard cloud environments with role-based access control. Only authorized Webiox engineering leadership can inspect project inquiries.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#1a7097] flex items-center justify-center font-mono font-bold text-sm">
                05
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Privacy Inquiries & Data Rights
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              You have the right to request access to, correction of, or permanent deletion of your inquiry information from our databases at any time. For privacy inquiries, please contact our privacy desk directly:
            </p>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs sm:text-sm text-slate-700 space-y-1.5">
              <div><strong>Entity:</strong> Webiox Digital Solutions</div>
              <div><strong>Principal Architect:</strong> Manthan Vaghasiya</div>
              <div><strong>Headquarters:</strong> The Palladium, Yogi Chowk, Surat 395010, India</div>
              <div><strong>Direct Email:</strong> <a href="mailto:manthanvaghasiya@webiox.tech" className="text-[#1a7097] hover:underline">manthanvaghasiya@webiox.tech</a></div>
              <div><strong>Phone / WhatsApp:</strong> +91 96647 36245</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

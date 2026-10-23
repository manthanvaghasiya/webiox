import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Webiox Digital Solutions. Outlining engineering engagement models, milestone delivery protocols, intellectual property ownership, and client hypercare.',
  openGraph: {
    title: 'Terms of Service | Webiox',
    description: 'Terms of Service for Webiox Digital Solutions. Outlining engineering engagement models, milestone delivery protocols, intellectual property ownership, and client hypercare.',
    url: 'https://webiox.tech/terms',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = 'October 22, 2026';

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#090D16]">
      {/* Header Banner */}
      <section className="relative w-full bg-[#377a9b] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255, 195, 18,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/80 hover:text-[#ffc312] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ffc312] font-mono text-xs uppercase tracking-widest mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Engineering Master Services Agreement</span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-5xl tracking-tight leading-tight mb-4">
            Terms of Service
          </h1>

          <p className="text-white/80 text-sm sm:text-base font-light max-w-2xl">
            These terms define our engineering engagement standards, milestone delivery covenants, and complete intellectual property transfers for Webiox Digital Solutions clients.
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
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#377a9b] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Engagement Model & Sprint Scopes
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Webiox Digital Solutions engages with clients through sprint-based milestone deliverables. Each engineering engagement begins with a verified Statement of Work (SOW) outlining:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span>Explicit architectural specifications, database models, and API surface boundaries.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span>Guaranteed sprint delivery windows (typically 3 to 6 weeks for production-ready MVPs).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span>Agreed acceptance criteria and staging gate verifications before code deployment.</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#377a9b] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Intellectual Property & Full Ownership
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              We operate under a <strong>100% Client Ownership</strong> standard. Upon final milestone payment receipt:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span>All custom code, database schemas, Figma design tokens, and digital assets become your exclusive intellectual property.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span>Git repository administrative access and production deployment credentials are fully transferred to your organization.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span>There are zero vendor lock-in dependencies, proprietary runtime licensing fees, or hidden recurring royalties.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#377a9b] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Milestone Deliveries & Payment Terms
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Our contracts protect both parties through structured escrow or staged milestone disbursements:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span><strong>Phase 01 Kickoff:</strong> Initial sprint deposit to allocate dedicated engineering squads.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span><strong>Intermediate Milestones:</strong> Staged sign-offs following working staging URL demonstrations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#377a9b] shrink-0 mt-1" />
                <span><strong>Final Release:</strong> Production deployment sign-off and hypercare commencement.</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#377a9b] flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                30-Day Hypercare Warranty
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every production launch executed by Webiox includes 30 days of complimentary post-launch Hypercare. During this period, our engineering team immediately remediates any software defects, performance regressions, or cross-browser discrepancies at zero additional cost.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#377a9b] flex items-center justify-center font-mono font-bold text-sm">
                05
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Jurisdiction & Governing Law
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              These terms and all related client agreements are governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising in connection with our services are subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India.
            </p>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs sm:text-sm text-slate-700 space-y-1.5">
              <div><strong>Entity:</strong> Webiox Digital Solutions</div>
              <div><strong>Website:</strong> https://webiox.tech</div>
              <div><strong>Headquarters:</strong> The Palladium, Yogi Chowk, Surat 395010, India</div>
              <div><strong>General Inquiries:</strong> <a href="mailto:manthanvaghasiya@webiox.tech" className="text-[#377a9b] hover:underline">manthanvaghasiya@webiox.tech</a></div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

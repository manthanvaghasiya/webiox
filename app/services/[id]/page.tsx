import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Database,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Code2,
  Cpu,
  MessageCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | Top-Tier Digital Engineering`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Webiox Digital Solutions`,
      description: service.description,
      url: `https://webiox.tech/services/${service.id}`,
      type: 'article',
      images: ['/logo_without_background512.png'],
    },
  };
}

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      '@id': 'https://webiox.tech/#organization',
      name: 'Webiox Digital Solutions',
    },
    url: `https://webiox.tech/services/${service.id}`,
    serviceType: service.title,
    areaServed: 'Global',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const deliverables = [
    {
      icon: Code2,
      title: 'Full Source Code Ownership',
      desc: 'Zero vendor lock-in. Clean, strictly-typed TypeScript repositories delivered to your private GitHub or GitLab.',
    },
    {
      icon: Zap,
      title: 'Sub-500ms TTFB Performance',
      desc: 'Edge-rendered architectures optimized for 100/100 Google Lighthouse and Core Web Vitals.',
    },
    {
      icon: ShieldCheck,
      title: 'OWASP Security & WAF Audits',
      desc: 'Enterprise security hardening, automated vulnerability scans, and GDPR/CCPA data privacy compliance.',
    },
    {
      icon: TrendingUp,
      title: 'GEO & AEO Schema Integration',
      desc: 'Structured JSON-LD entity graphs injected so conversational search engines like Perplexity, ChatGPT, and Gemini cite your brand.',
    },
  ];

  const roadmapSteps = [
    {
      step: '01',
      title: 'Technical Discovery & Systems Architecture',
      timeline: 'Week 1',
      desc: 'We map user flows, data schemas, API integrations, and edge caching strategies before writing a single line of code.',
    },
    {
      step: '02',
      title: 'High-Velocity Sprints & Automated Testing',
      timeline: 'Weeks 2-3',
      desc: 'Agile sprints with weekly live demo staging builds, unit tests, and cross-browser mobile verification.',
    },
    {
      step: '03',
      title: 'Production Hardening & 30-Day SLA Warranty',
      timeline: 'Week 4',
      desc: 'Zero-downtime DNS deployment, CDN configuration, real-time telemetry monitoring, and a 30-day post-launch warranty.',
    },
  ];

  const serviceFaqs = [
    {
      q: `How long does a typical ${service.title} sprint take?`,
      a: `Most enterprise projects ship within a 2 to 4-week sprint cycle. Phase 1 architecture is completed within 3 to 5 business days, followed by live staging milestones where you review progress continuously.`,
    },
    {
      q: `Who owns the intellectual property and code?`,
      a: `You own 100% of all intellectual property, source code, Figma assets, and cloud deployment pipelines from Day 1. We never hold client code hostage or charge recurring licensing fees.`,
    },
    {
      q: `Do you provide ongoing maintenance and SLA support?`,
      a: `Yes. Every production delivery includes a 30-day post-launch warranty for bug fixes and telemetry optimization. We also provide dedicated monthly engineering retainers for continuous feature iterations.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] selection:bg-[#377a9b] selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ━━━━━━━━━━━━━━━━ TOP HERO SPECIFICATION SECTION ━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full bg-[#080E17] text-white pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Specular Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#377a9b]/25 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#ffc312]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Subtle grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-dot-pattern"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#ffc312] font-semibold">{service.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-8">
            <div className="max-w-3xl">
              {/* Prestige Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#377a9b]/15 border border-[#377a9b]/30 text-xs font-mono font-bold text-[#377a9b] mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-white">PRODUCTION SPECIFICATION</span>
                <span className="text-slate-400">•</span>
                <span className="text-[#ffc312]">Q4 SPRINT SLOTS OPEN</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif] leading-[1.1] mb-6">
                {service.title}
              </h1>

              <p className="text-lg sm:text-2xl font-light text-slate-300 leading-relaxed max-w-2xl">
                {service.subtitle}
              </p>
            </div>

            {/* Direct Action Capsule */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#377a9b] hover:bg-[#2b6683] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#377a9b]/25 hover:shadow-2xl transition-all cursor-pointer group"
              >
                <span>Scope This Sprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/919664736245"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm sm:text-base transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Direct WhatsApp VIP</span>
              </a>
            </div>
          </div>

          {/* SLA Performance Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs font-mono">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-slate-400 uppercase tracking-wider mb-1">Average Response</div>
              <div className="text-xl font-black text-white">⚡ &lt; 500ms TTFB</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-slate-400 uppercase tracking-wider mb-1">Sprint Velocity</div>
              <div className="text-xl font-black text-white">⏱ 2 - 4 Weeks</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-slate-400 uppercase tracking-wider mb-1">Security Standard</div>
              <div className="text-xl font-black text-emerald-400">🔒 OWASP Top 10</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-slate-400 uppercase tracking-wider mb-1">Codebase Ownership</div>
              <div className="text-xl font-black text-[#ffc312]">100% Escrow &amp; Git</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ MAIN CONTENT & SPECIFICATION ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 8 Cols: Architectural Narrative & Key Capabilities */}
            <div className="lg:col-span-8 space-y-16">
              {/* Executive Overview */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#377a9b] mb-3">
                  <Sparkles className="w-4 h-4 text-[#ffc312]" />
                  <span>Engineering Philosophy</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] mb-6">
                  Engineered to outperform bloated templates.
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
                  {service.description}
                </p>

                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#377a9b]/40 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#377a9b]/10 text-[#377a9b] flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-slate-900 text-sm leading-snug">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Deliverables Grid */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#377a9b] mb-3">
                  <Cpu className="w-4 h-4 text-[#377a9b]" />
                  <span>Production Deliverables</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] mb-8">
                  What is included in every production milestone:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#377a9b]/10 text-[#377a9b] flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Phase Execution Roadmap */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#377a9b] mb-3">
                  <Clock className="w-4 h-4 text-[#ffc312]" />
                  <span>Sprint Roadmap</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] mb-8">
                  Predictable 3-Phase Sprint Execution
                </h3>

                <div className="space-y-4">
                  {roadmapSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#377a9b]/10 text-[#377a9b] font-mono font-black text-lg flex items-center justify-center shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-semibold">
                              {step.timeline}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Response AEO Block / FAQ */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#377a9b] mb-3">
                  <HelpCircle className="w-4 h-4 text-[#377a9b]" />
                  <span>Technical Direct Answers</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] mb-6">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {serviceFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs"
                    >
                      <h4 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Sticky Tech Stack & Project Inquiry Capsule */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              {/* Technology Stack Card */}
              <div className="bg-[#080E17] text-white p-7 sm:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#377a9b]/30 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#ffc312] mb-4">
                  <Database className="w-4 h-4 text-[#ffc312]" />
                  <span>Technology Stack</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Verified enterprise frameworks engineered for resilience and low latency.
                </p>

                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {service.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#377a9b]/10 text-[#377a9b] flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Ready to Scope This Service?
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Book a 15-minute technical discovery session directly with our lead architects.
                </p>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#377a9b] hover:bg-[#2b6683] text-white font-bold text-sm shadow-lg shadow-[#377a9b]/20 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <span>Book Technical Discovery</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>24-Hour SLA Discovery Turnaround</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

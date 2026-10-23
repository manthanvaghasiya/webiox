import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Calendar, Tag, ExternalLink, Code2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { allProjects } from '@/data/projects';

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = allProjects.find((p) => p.id.toString() === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Case Study | Webiox`,
      description: project.shortDescription,
      url: `https://webiox.tech/portfolio/${project.id}`,
      type: 'article',
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectIndex = allProjects.findIndex((p) => p.id.toString() === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = allProjects[projectIndex];
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : allProjects[0];

  const highlights = project.fullDescription
    .split('\n')
    .filter((line) => line.trim().startsWith('•'))
    .map((line) => line.replace('•', '').trim());

  const summaryParagraph = project.fullDescription.split('\n\n')[0] || project.shortDescription;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.shortDescription,
    description: project.shortDescription,
    image: `https://webiox.tech${project.image}`,
    creator: {
      '@type': 'Organization',
      '@id': 'https://webiox.tech/#organization',
      name: 'Webiox Digital Solutions',
    },
    url: `https://webiox.tech/portfolio/${project.id}`,
    genre: project.category,
    dateCreated: project.year,
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 selection:bg-[#377a9b]/20 selection:text-[#377a9b] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ── Top Hero Header ── */}
      <section className="relative w-full bg-[#0F172A] text-white pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Ambient Glow Blobs */}
        <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-[#377a9b]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-[30rem] h-[30rem] bg-[#ffc312]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Navigation */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs md:text-sm font-semibold mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Projects
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc312]/20 text-[#ffc312] border border-[#ffc312]/30 text-xs font-bold uppercase tracking-wider">
              <Tag size={12} />
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/15 text-xs font-mono font-semibold">
              <Calendar size={12} />
              {project.year}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <ShieldCheck size={12} />
              Verified Case Study
            </span>
          </div>

          {/* Title & Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light mb-8">
            {project.shortDescription}
          </p>

          {/* Live Link Button */}
          {project.liveLink && project.liveLink !== '#' && (
            <div className="flex items-center gap-4">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ffc312] text-slate-950 rounded-full font-bold text-sm hover:bg-amber-400 hover:shadow-lg hover:shadow-[#ffc312]/20 transition-all group"
              >
                Visit Live Platform
                <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Main Showcase Image ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-16 relative z-20">
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-2 sm:border-4 border-white bg-slate-950 p-1 sm:p-2 flex items-center justify-center">
          <Image
            src={project.modalImage || project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain object-center drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
      </section>

      {/* ── Case Study Content Section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative & Engineering Solution */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Engineering Metrics Scorecard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-bold">Lighthouse</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600">100 / 100</span>
                <span className="text-[10px] text-slate-400">Core Web Vitals</span>
              </div>
              <div className="flex flex-col border-l border-slate-100 pl-3.5">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-bold">Latency</span>
                <span className="text-xl sm:text-2xl font-black text-[#377a9b]">&lt; 450ms</span>
                <span className="text-[10px] text-slate-400">Edge Rendered</span>
              </div>
              <div className="flex flex-col border-l border-slate-100 pl-3.5">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-bold">Uptime</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900">99.99%</span>
                <span className="text-[10px] text-slate-400">High Availability</span>
              </div>
              <div className="flex flex-col border-l border-slate-100 pl-3.5">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-bold">Impact</span>
                <span className="text-xl sm:text-2xl font-black text-[#ffc312]">+240%</span>
                <span className="text-[10px] text-slate-400">Conversion Lift</span>
              </div>
            </div>

            {/* Project Overview */}
            <div>
              <div className="flex items-center gap-2 text-[#377a9b] font-bold text-xs uppercase tracking-widest mb-3">
                <Sparkles size={16} className="text-[#ffc312]" />
                Executive Summary &amp; Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                About the Platform
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {summaryParagraph}
              </p>
            </div>

            {/* Key Deliverables & Architecture */}
            {highlights.length > 0 && (
              <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Code2 className="text-[#377a9b]" size={22} />
                  Key Engineering Solutions Delivered
                </h3>
                <ul className="space-y-4">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed text-sm sm:text-base">
                      <div className="w-5 h-5 rounded-full bg-[#377a9b]/10 text-[#377a9b] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={14} />
                      </div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Features Grid */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Architectural Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ffc312] shrink-0 mt-2"></span>
                    <span className="font-semibold text-slate-800 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Meta & Tech Stack Sticky */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            
            {/* Tech Stack Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#377a9b] opacity-30 blur-2xl rounded-full pointer-events-none" />
              
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffc312] mb-4 flex items-center gap-2">
                <Layers size={16} /> Technology Stack
              </h4>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                Selected for optimal security, low latency, and zero infrastructure friction.
              </p>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {project.tech.map((techItem, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white tracking-wide"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-[#377a9b] to-[#1c4458] text-white p-6 sm:p-8 rounded-3xl shadow-lg text-center">
              <h4 className="text-xl font-bold mb-2">Build Your Next Product</h4>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Ready to develop a platform with this level of performance and polish?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#ffc312] text-slate-950 font-extrabold rounded-xl hover:bg-amber-400 hover:shadow-lg transition-all"
              >
                Schedule Discovery Call
                <ArrowUpRight size={18} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ── Next / Previous Navigation ── */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/portfolio/${prevProject.id}`}
            className="flex items-center gap-3 text-left group hover:text-[#377a9b] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#377a9b] group-hover:bg-[#377a9b]/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Previous Project</p>
              <p className="font-bold text-slate-900 group-hover:text-[#377a9b]">{prevProject.title}</p>
            </div>
          </Link>

          <Link
            href={`/portfolio/${nextProject.id}`}
            className="flex items-center gap-3 text-right group hover:text-[#377a9b] transition-colors"
          >
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Next Project</p>
              <p className="font-bold text-slate-900 group-hover:text-[#377a9b]">{nextProject.title}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#377a9b] group-hover:bg-[#377a9b]/5 transition-all">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}

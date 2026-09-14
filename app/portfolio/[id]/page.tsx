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
      title: 'Project Not Found | Webiox Digital Solutions',
    };
  }

  return {
    title: `${project.title} — Case Study | Webiox Digital Solutions`,
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 selection:bg-[#1a7097]/20 selection:text-[#1a7097] font-sans">
      
      {/* ── Top Hero Header ── */}
      <section className="relative w-full bg-[#051F22] text-white pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Ambient Glow Blobs */}
        <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-[#1a7097]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-[30rem] h-[30rem] bg-[#FFBF00]/15 rounded-full blur-[130px] pointer-events-none" />

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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFBF00]/20 text-[#FFBF00] border border-[#FFBF00]/30 text-xs font-bold uppercase tracking-wider">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFBF00] text-slate-950 rounded-full font-bold text-sm hover:bg-amber-400 hover:shadow-lg hover:shadow-[#FFBF00]/20 transition-all group"
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
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-4 border-white bg-slate-900">
          <Image
            src={project.modalImage || project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* ── Case Study Content Section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative & Engineering Solution */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Project Overview */}
            <div>
              <div className="flex items-center gap-2 text-[#1a7097] font-bold text-xs uppercase tracking-widest mb-3">
                <Sparkles size={16} />
                Executive Summary
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
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
                  <Code2 className="text-[#1a7097]" size={22} />
                  Key Engineering Solutions Delivered
                </h3>
                <ul className="space-y-4">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed text-sm sm:text-base">
                      <div className="w-5 h-5 rounded-full bg-[#1a7097]/10 text-[#1a7097] flex items-center justify-center shrink-0 mt-0.5">
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
                    <span className="w-2 h-2 rounded-full bg-[#FFBF00] shrink-0 mt-2"></span>
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a7097] opacity-30 blur-2xl rounded-full pointer-events-none" />
              
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFBF00] mb-4 flex items-center gap-2">
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
            <div className="bg-gradient-to-br from-[#1a7097] to-[#0A4044] text-white p-6 sm:p-8 rounded-3xl shadow-lg text-center">
              <h4 className="text-xl font-bold mb-2">Build Your Next Product</h4>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Ready to develop a platform with this level of performance and polish?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#FFBF00] text-slate-950 font-extrabold rounded-xl hover:bg-amber-400 hover:shadow-lg transition-all"
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
            className="flex items-center gap-3 text-left group hover:text-[#1a7097] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#1a7097] group-hover:bg-[#1a7097]/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Previous Project</p>
              <p className="font-bold text-slate-900 group-hover:text-[#1a7097]">{prevProject.title}</p>
            </div>
          </Link>

          <Link
            href={`/portfolio/${nextProject.id}`}
            className="flex items-center gap-3 text-right group hover:text-[#1a7097] transition-colors"
          >
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Next Project</p>
              <p className="font-bold text-slate-900 group-hover:text-[#1a7097]">{nextProject.title}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#1a7097] group-hover:bg-[#1a7097]/5 transition-all">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}

import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, ChevronLeft, Database } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const service = services.find((s) => s.id === params.id);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: `${service.title} | Webiox Digital Solutions`,
    description: service.description,
  };
}

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetail({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);
  
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      
      {/* Massive Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-90 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-12 transition-colors font-medium">
            <ChevronLeft className="w-5 h-5" />
            Back to Services
          </Link>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8">
            <span className="text-xl">{service.icon}</span>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
              Service Detail
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter text-white font-[Zain] mb-6 leading-none">
            {service.title}
          </h1>
          <p className="text-xl md:text-3xl font-light text-white/90 max-w-3xl leading-relaxed">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Description & Benefits */}
            <div className="lg:col-span-7 space-y-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Overview</h2>
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Key Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{benefit}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Tech Stack & CTA Sticky */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32 space-y-8">
                
                <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-20 blur-[80px] rounded-full pointer-events-none`} />
                  
                  <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-3 relative z-10">
                    <Database className="w-6 h-6 text-[#FFBF00]" />
                    Technology Stack
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 relative z-10">
                    {service.tech.map((t, i) => (
                      <div key={i} className="px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-semibold backdrop-blur-md">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-200 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to build?</h3>
                  <p className="text-slate-600 mb-8">
                    Let's discuss how we can implement {service.title} for your business.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-[#0E5E64] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0b4a4f] hover:shadow-lg transition-all group">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

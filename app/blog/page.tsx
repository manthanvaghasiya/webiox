import { Metadata } from 'next';
import BlogBackground from '@/components/blog/BlogBackground';
import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Engineering Insights & Agency Journal | Webiox',
  description: 'Deep dives into web architecture, avant-garde design systems, and the art of building world-class digital products by Webiox.',
  openGraph: {
    title: 'Engineering Insights & Agency Journal | Webiox',
    description: 'Deep dives into web architecture, avant-garde design systems, and the art of building world-class digital products by Webiox.',
    type: 'website',
    url: 'https://webiox.tech/blog',
  }
};

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Webiox Engineering Insights',
    description: metadata.description,
    url: 'https://webiox.tech/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Webiox',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webiox.tech/logo.png' // Replace with actual logo URL
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-[#0E5E64] selection:text-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 3D Background - Loaded dynamically on client */}
      <BlogBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <BlogHero />
        <BlogList />

        {/* Premium Newsletter CTA */}
        <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 overflow-hidden relative shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-[#0E5E64] opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-500 opacity-10 blur-3xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#0E5E64]">Elite</span>
              </h2>
              <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg font-light">
                Get exclusive architectural deep dives and design patterns delivered straight to your inbox. No spam, just engineering masterclasses.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-teal-50 hover:text-[#0E5E64] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

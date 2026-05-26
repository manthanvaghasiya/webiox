import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';
import BlogNewsletter from '@/components/blog/BlogNewsletter';

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
        url: 'https://webiox.tech/logo.png'
      }
    }
  };

  return (
    <div className="relative overflow-x-hidden w-full">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark brand hero — matches Services/About pattern */}
      <BlogHero />

      {/* Light content area */}
      <main className="relative bg-[#F9FAFB] selection:bg-[#0E5E64] selection:text-white">
        <BlogList />
        <BlogNewsletter />
      </main>
    </div>
  );
}

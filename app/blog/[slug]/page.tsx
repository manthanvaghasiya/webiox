import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/data/blog';
import BlogPostContent from '@/components/blog/BlogPostContent';

/* ── Static params for build-time generation ── */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Webiox`,
      description: post.excerpt,
      type: 'article',
      url: `https://webiox.tech/blog/${post.slug}`,
      images: [{ url: post.image }],
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/* ── Page component ── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      '@id': 'https://webiox.tech/#founder',
      name: post.author,
      url: 'https://webiox.tech/about',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://webiox.tech/#organization',
      name: 'Webiox',
      url: 'https://webiox.tech',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://webiox.tech/#logo',
        url: 'https://webiox.tech/webiox512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://webiox.tech/blog/${post.slug}`,
    },
    url: `https://webiox.tech/blog/${post.slug}`,
  };

  return (
    <div className="overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </div>
  );
}

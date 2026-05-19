'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowUpRight,
  Share2,
  BookOpen,
} from 'lucide-react';
import { type BlogPost } from '@/data/blog';

/* ─── Simple markdown-ish renderer ─── */
function RenderContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="space-y-2 mb-8 pl-1"
        >
          {listItems.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-slate-600 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E5E64] mt-2.5 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-[#0E5E64] text-sm font-mono">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4
          key={`h4-${i}`}
          className="text-lg font-bold text-slate-900 mt-8 mb-3"
        >
          {line.slice(5)}
        </h4>
      );
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '');
      listItems.push(text);
    } else if (line.trim() === '') {
      flushList();
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p
          key={`p-${i}`}
          className="text-lg text-slate-600 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  }
  flushList();

  return <>{elements}</>;
}

/* ─── Related Post Card ─── */
function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-xl"
              style={{
                background: `${post.categoryColor}20`,
                color: post.categoryColor,
              }}
            >
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-900 group-hover:text-[#0E5E64] transition-colors duration-300 leading-snug mb-2 line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Main Blog Post Content ─── */
export default function BlogPostContent({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden bg-slate-900"
      >
        {/* Background image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent" />
        </motion.div>

        {/* Content overlay */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 pt-32"
        >
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span
              className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
              style={{
                background: `${post.categoryColor}30`,
                color: post.categoryColor,
              }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl"
          >
            {post.title}
          </motion.h1>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mt-8"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
              style={{ background: post.categoryColor }}
            >
              {post.authorInitials}
            </div>
            <div>
              <p className="text-white font-semibold">{post.author}</p>
              <p className="text-white/40 text-sm">{post.authorRole}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Article Body ── */}
      <main className="relative bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-500 bg-white border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </motion.div>

          {/* Excerpt callout */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="border-l-4 border-[#0E5E64] pl-6 py-2 mb-12 text-xl text-slate-700 italic font-light leading-relaxed"
          >
            {post.excerpt}
          </motion.blockquote>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="prose-reset"
          >
            <RenderContent content={post.content} />
          </motion.article>

          {/* Share / Actions bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between pt-10 mt-16 border-t border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: post.categoryColor }}
              >
                {post.authorInitials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                <p className="text-xs text-slate-400">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-600 hover:border-[#0E5E64] hover:text-[#0E5E64] transition-colors"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share) {
                    navigator.share({ title: post.title, url: window.location.href });
                  }
                }}
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Related Posts ── */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-5 h-5 text-[#0E5E64]" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Continue Reading
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <RelatedCard key={rp.id} post={rp} />
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Back to blog CTA ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-slate-200 bg-white text-slate-700 font-semibold hover:border-[#0E5E64] hover:text-[#0E5E64] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#0E5E64]/10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Articles
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

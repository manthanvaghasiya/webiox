'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock, Search, X } from 'lucide-react';
import {
  blogStaggerContainer,
  blogPostItemVariants,
  fadeInUp,
  staggerFast,
  pillVariants,
  premiumEase,
  scaleIn,
} from '@/lib/motion/blog';
import { blogPosts, allCategories, type BlogPost } from '@/data/blog';
import { useState, useMemo } from 'react';

/* ────────────────────────────────────────────────────────────
   Featured Post — full-width hero card
   ──────────────────────────────────────────────────────────── */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="group relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl mb-16 md:mb-24"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/7] md:aspect-[21/9] overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFBF00] text-slate-900 text-[11px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
              Featured
            </span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
            <div className="max-w-3xl">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
                  style={{
                    background: `${post.categoryColor}25`,
                    color: post.categoryColor,
                  }}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/60 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5 text-white/60 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4 group-hover:text-[#FFBF00] transition-colors duration-500">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed mb-6 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Read CTA */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white group-hover:text-[#FFBF00] transition-colors duration-300">
                  Read Article
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FFBF00] group-hover:border-[#FFBF00] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-slate-900 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Reading time progress bar */}
      <div className="h-1 bg-slate-800">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-[#0E5E64] to-teal-400 transition-all duration-1000 group-hover:w-full"
          style={{ width: `${(post.readMinutes / 15) * 100}%` }}
        />
      </div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────────────────────
   Blog Card — compact grid card
   ──────────────────────────────────────────────────────────── */
function BlogCard({
  post,
  index,
  variant = 'default',
}: {
  post: BlogPost;
  index: number;
  variant?: 'large' | 'default';
}) {
  const isLarge = variant === 'large';

  return (
    <motion.article
      variants={blogPostItemVariants}
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(14,94,100,0.1)] hover:border-slate-200/80 transition-all duration-500 ${
        isLarge ? 'md:col-span-1' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Post number */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-slate-900 font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Category chip */}
          <div className="absolute bottom-4 left-4">
            <span
              className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-xl shadow-sm"
              style={{
                background: `${post.categoryColor}20`,
                color: post.categoryColor,
                borderColor: `${post.categoryColor}30`,
                borderWidth: 1,
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="w-px h-3 bg-slate-200" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-slate-900 group-hover:text-[#0E5E64] transition-colors duration-300 leading-snug mb-3 ${
              isLarge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            }`}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: post.categoryColor }}
              >
                {post.authorInitials}
              </div>
              <span className="text-xs font-medium text-slate-600">
                {post.author}
              </span>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#0E5E64] group-hover:border-[#0E5E64] transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </Link>

      {/* Reading time progress bar */}
      <div className="h-0.5 bg-slate-50">
        <div
          className="h-full bg-gradient-to-r from-[#0E5E64] to-teal-400 rounded-r-full"
          style={{ width: `${(post.readMinutes / 15) * 100}%` }}
        />
      </div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────────────────────
   Tags strip
   ──────────────────────────────────────────────────────────── */
function TagsStrip({ posts }: { posts: BlogPost[] }) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-wrap gap-2 justify-center mb-8"
    >
      {allTags.slice(0, 12).map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full text-[11px] font-medium text-slate-400 bg-slate-100 border border-slate-200/50"
        >
          #{tag}
        </span>
      ))}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   Main BlogList component
   ──────────────────────────────────────────────────────────── */
export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = regularPosts;

    if (activeCategory !== 'All') {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return posts;
  }, [regularPosts, activeCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Featured Post */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <FeaturedPost post={featuredPost} />
      )}

      {/* ── Filter + Search Bar ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 md:mb-16"
      >
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              placeholder="Search articles, topics, tags..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E5E64]/20 focus:border-[#0E5E64]/30 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2"
        >
          {['All', ...allCategories].map((cat) => {
            const isActive = activeCategory === cat;
            const color =
              cat !== 'All'
                ? blogPosts.find((p) => p.category === cat)?.categoryColor
                : '#0E5E64';

            return (
              <motion.button
                key={cat}
                variants={pillVariants}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={[
                  'relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-white/60 backdrop-blur-sm border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white shadow-sm',
                ].join(' ')}
                style={
                  isActive
                    ? {
                        background: color,
                        borderColor: color,
                        boxShadow: `0 8px 24px ${color}30`,
                      }
                    : undefined
                }
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── Results count ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <p className="text-sm text-slate-400">
          Showing{' '}
          <span className="font-semibold text-slate-700">
            {visiblePosts.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-700">
            {filteredPosts.length}
          </span>{' '}
          articles
          {activeCategory !== 'All' && (
            <span>
              {' '}
              in{' '}
              <span
                className="font-semibold"
                style={{
                  color:
                    blogPosts.find((p) => p.category === activeCategory)
                      ?.categoryColor || '#0E5E64',
                }}
              >
                {activeCategory}
              </span>
            </span>
          )}
        </p>
        {(activeCategory !== 'All' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-medium text-[#0E5E64] hover:underline"
          >
            Clear filters
          </button>
        )}
      </motion.div>

      {/* ── Tags strip ── */}
      {activeCategory === 'All' && !searchQuery && (
        <TagsStrip posts={blogPosts} />
      )}

      {/* ── Posts Grid ── */}
      <AnimatePresence mode="wait">
        {visiblePosts.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery}
            variants={blogStaggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visiblePosts.map((post, i) => {
              // First 2 posts in a 2-col "large" style
              const isTopRow = i < 2 && !searchQuery && activeCategory === 'All';
              return (
                <motion.div
                  key={post.id}
                  variants={blogPostItemVariants}
                  className={isTopRow ? 'lg:col-span-1 md:col-span-1' : ''}
                >
                  <BlogCard
                    post={post}
                    index={
                      blogPosts.findIndex((p) => p.id === post.id)
                    }
                    variant={isTopRow ? 'large' : 'default'}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No articles found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#0E5E64] text-white text-sm font-semibold hover:bg-[#0a4a4f] transition-colors shadow-lg shadow-[#0E5E64]/20"
            >
              View all articles
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Load More ── */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="flex justify-center mt-16"
        >
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + 3)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-slate-200 bg-white text-slate-700 font-semibold hover:border-[#0E5E64] hover:text-[#0E5E64] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#0E5E64]/10"
          >
            <span>Load More Articles</span>
            <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#0E5E64]/10 flex items-center justify-center transition-colors duration-300">
              <span className="text-xs font-bold text-slate-500 group-hover:text-[#0E5E64] transition-colors">
                +{filteredPosts.length - visibleCount}
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </section>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { blogStaggerContainer, blogPostItemVariants, fadeInUp, staggerFast, pillVariants, scaleIn, premiumEase } from '@/lib/motion/blog';
import { blogPosts, allCategories, type BlogPost } from '@/data/blog';
import { useState, useMemo } from 'react';

/* ────────────────────────────────────────────────────────────
   Featured Post — Swiss Modernism Full Width
   ──────────────────────────────────────────────────────────── */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="group relative bg-white border border-slate-200 overflow-hidden mb-16 md:mb-24 flex flex-col lg:flex-row transition-colors hover:border-slate-300"
    >
      {/* Image Side */}
      <Link href={`/blog/${post.slug}`} className="relative w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-slate-900 border border-slate-200">
          Featured
        </div>
      </Link>

      {/* Content Side */}
      <div className="flex flex-col justify-center w-full lg:w-2/5 p-8 md:p-12 lg:p-16 bg-white relative">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#0E5E64]">
            {post.category}
          </span>
          <span className="w-px h-3 bg-slate-300" />
          <span className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase font-mono">
            {new Date(post.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6 group-hover:text-[#0E5E64] transition-colors duration-300 font-[IBM_Plex_Sans]">
            {post.title}
          </h2>
        </Link>

        <p className="text-base text-slate-500 leading-relaxed font-light mb-10 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">{post.author}</span>
          </div>
          <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-[#0E5E64] transition-colors">
            Read Article <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────────────────────
   Blog Card — Strict Mathematical Grid Card
   ──────────────────────────────────────────────────────────── */
function BlogCard({ post, index, variant = 'default' }: { post: BlogPost; index: number; variant?: 'large' | 'default' }) {
  const isLarge = variant === 'large';
  
  return (
    <motion.article
      variants={blogPostItemVariants}
      className={`group relative flex flex-col bg-white border border-slate-200 transition-colors hover:border-slate-300 h-full w-full ${
        isLarge ? 'md:col-span-8' : 'md:col-span-4'
      }`}
    >
      <Link href={`/blog/${post.slug}`} className={`flex flex-col ${isLarge ? 'md:flex-row' : ''} h-full`}>
        {/* Image Area */}
        <div className={`relative overflow-hidden border-b border-slate-200 ${isLarge ? 'w-full md:w-1/2 md:border-b-0 md:border-r aspect-[4/3] md:aspect-auto' : 'w-full aspect-[4/3]'}`}>
          <motion.img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-slate-900 border border-slate-200 font-mono">
            N°{String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex flex-col flex-1 p-6 md:p-8 bg-white relative ${isLarge ? 'w-full md:w-1/2' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#0E5E64]">
              {post.category}
            </span>
            <span className="w-px h-3 bg-slate-200" />
            <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase font-mono">
              {post.readTime}
            </span>
          </div>

          <h3 className={`font-bold text-slate-900 group-hover:text-[#0E5E64] transition-colors duration-300 leading-[1.1] tracking-tight mb-4 font-[IBM_Plex_Sans] ${
            isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
          }`}>
            {post.title}
          </h3>

          <p className={`text-slate-500 leading-relaxed font-light flex-1 ${isLarge ? 'text-base line-clamp-3 mb-8' : 'text-sm line-clamp-2 mb-6'}`}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-900">{post.author}</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#0E5E64] group-hover:bg-[#0E5E64] transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-900 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </Link>
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
      className="flex flex-wrap gap-2 justify-center mb-12"
    >
      {allTags.slice(0, 12).map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-[11px] font-mono text-slate-500 uppercase tracking-widest border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  );
}

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  const filteredPosts = useMemo(() => {
    let posts = regularPosts;
    if (activeCategory !== 'All') posts = posts.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }
    return posts;
  }, [regularPosts, activeCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <section className="relative z-10 w-full bg-[#FAFAFA] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Post */}
        {featuredPost && activeCategory === 'All' && !searchQuery && (
          <FeaturedPost post={featuredPost} />
        )}

        {/* Filter + Search Bar */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 md:mb-16">
          <div className="relative max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                placeholder="Search index..."
                className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0E5E64] transition-colors font-mono"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <X className="w-3 h-3 text-slate-500" />
                </button>
              )}
            </div>
          </div>

          <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-2">
            {['All', ...allCategories].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  variants={pillVariants}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                  className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                    isActive ? 'bg-[#0E5E64] text-white border-[#0E5E64]' : 'bg-white border-slate-200 text-slate-500 hover:border-[#0E5E64] hover:text-[#0E5E64]'
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Tags strip */}
        {activeCategory === 'All' && !searchQuery && <TagsStrip posts={blogPosts} />}

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {visiblePosts.length > 0 ? (
            <motion.div key={activeCategory + searchQuery} variants={blogStaggerContainer} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {visiblePosts.map((post, i) => {
                const mod = i % 4;
                const isLarge = mod === 0 || mod === 3;
                return <BlogCard key={post.id} post={post} index={blogPosts.findIndex((p) => p.id === post.id)} variant={isLarge ? 'large' : 'default'} />;
              })}
            </motion.div>
          ) : (
            <motion.div key="empty" variants={scaleIn} initial="hidden" animate="visible" className="text-center py-24 bg-white border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-[IBM_Plex_Sans]">No documents found</h3>
              <p className="text-sm text-slate-500 mb-6 font-mono">Try adjusting your query parameters.</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="px-6 py-2.5 bg-[#0E5E64] text-white text-xs font-bold tracking-widest uppercase hover:bg-slate-900 transition-colors">
                Reset Index
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {hasMore && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: premiumEase }} className="flex justify-center mt-16">
            <button onClick={() => setVisibleCount((v) => v + 3)} className="group flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-900 text-xs font-bold tracking-widest uppercase hover:border-[#0E5E64] transition-colors duration-300">
              <span>Load More</span>
              <span className="text-slate-400 group-hover:text-[#0E5E64] font-mono">[{filteredPosts.length - visibleCount}]</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

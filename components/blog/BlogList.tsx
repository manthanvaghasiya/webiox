'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { blogPostItemVariants, blogStaggerContainer, premiumEase } from '@/lib/motion/blog';
import { useState } from 'react';

// Using the same type and static data for now as per plan
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Architecture: Microservices vs Monoliths",
    excerpt: "Exploring the architectural patterns that define modern web applications and how to choose the right approach for your project.",
    author: "Manthan Vaghasiya",
    date: "2026-05-01",
    category: "Architecture",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    slug: "web-architecture-future"
  },
  {
    id: 2,
    title: "React 19: Breaking Changes and Migration Guide",
    excerpt: "A comprehensive guide to upgrading your React applications to version 19, including breaking changes and performance improvements.",
    author: "Manthan Vaghasiya",
    date: "2026-04-28",
    category: "Frontend",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?q=80&w=2070&auto=format&fit=crop",
    slug: "react-19-migration"
  },
  {
    id: 3,
    title: "Building High-Performance SaaS: Database Optimization Strategies",
    excerpt: "Learn proven techniques to optimize database queries, indexing strategies, and caching patterns for massive-scale applications.",
    author: "Manthan Vaghasiya",
    date: "2026-04-25",
    category: "Backend",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f9?q=80&w=2070&auto=format&fit=crop",
    slug: "saas-database-optimization"
  },
  {
    id: 4,
    title: "The Psychology of Design: Converting Users into Customers",
    excerpt: "Discover psychological principles that drive user behavior and how to apply them in your design to increase conversions.",
    author: "Manthan Vaghasiya",
    date: "2026-04-22",
    category: "Design",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
    slug: "design-psychology-conversion"
  },
];

export default function BlogList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="flex flex-wrap justify-center gap-3 mb-24"
      >
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all bg-white/50 backdrop-blur-sm border border-slate-200 hover:bg-[#0E5E64] hover:text-white text-slate-700 hover:border-transparent shadow-sm"
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Staggered List Layout */}
      <motion.div 
        variants={blogStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-16 md:gap-24"
      >
        {blogPosts.map((post, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.article
              key={post.id}
              variants={blogPostItemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Image Section - Staggered */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-3xl aspect-[4/3] bg-slate-100 shadow-2xl shadow-slate-200/50">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0E5E64]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              </div>

              {/* Content Section */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold tracking-widest uppercase rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 group-hover:text-[#0E5E64] transition-colors duration-500 leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xl text-slate-600 mb-8 font-light leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                      <p className="text-xs text-slate-500">{post.readTime}</p>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:bg-[#0E5E64] group-hover:border-[#0E5E64] transition-colors duration-300"
                    >
                      <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

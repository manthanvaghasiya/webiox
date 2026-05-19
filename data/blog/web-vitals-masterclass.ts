import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 7,
  title: 'Web Vitals Masterclass: Achieving Perfect Lighthouse Scores',
  excerpt:
    'A deep technical walkthrough of how we optimized CLS, LCP, and INP across 20 client websites — including bundle analysis techniques, image strategies, and font loading patterns.',
  content: `
## Why Web Vitals Matter

Google uses Core Web Vitals as a ranking signal. But more importantly, fast websites convert better. Every 100ms of latency costs you 1% of conversions.

### The Three Pillals

1. **LCP (Largest Contentful Paint)** — Target: < 2.5s
2. **CLS (Cumulative Layout Shift)** — Target: < 0.1
3. **INP (Interaction to Next Paint)** — Target: < 200ms

### Our Optimization Playbook

**For LCP:**
- Preload critical resources with \`<link rel="preload">\`
- Use Next.js Image component with priority flag
- Inline critical CSS, defer non-critical

**For CLS:**
- Always set explicit width/height on images
- Reserve space for dynamic content with skeleton screens
- Avoid injecting content above the fold

**For INP:**
- Break long tasks with \`scheduler.yield()\`
- Use \`startTransition\` for non-urgent updates
- Virtualize long lists

### Results Across 20 Sites

- Average Lighthouse score: 98/100
- Average LCP improvement: 1.8s
- Average CLS reduction: 0.15 → 0.02
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-10',
  category: 'Performance',
  categoryColor: CATEGORY_COLORS.Performance,
  readTime: '13 min read',
  readMinutes: 13,
  image:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop',
  slug: 'web-vitals-masterclass',
  featured: false,
  tags: ['Core Web Vitals', 'Lighthouse', 'SEO'],
};

export default post;

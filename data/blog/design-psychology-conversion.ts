import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 4,
  title: 'The Psychology of Design: Converting Visitors into Loyal Customers',
  excerpt:
    'Discover the cognitive biases, emotional triggers, and behavioral patterns that drive user decisions — and how to ethically apply them in your product design for 3x conversion rates.',
  content: `
## Design is Psychology

Every pixel on your screen is a psychological trigger. Color, spacing, typography, and motion all influence how users feel and what they do next.

### The 5 Principles We Live By

1. **Hick's Law** — Reduce choices to reduce friction
2. **Von Restorff Effect** — Make the important thing visually distinct
3. **Social Proof** — Show that others trust you
4. **Loss Aversion** — Frame benefits as things users might lose
5. **Progressive Disclosure** — Reveal complexity gradually

### Real Results

By applying these principles to a client's SaaS landing page:
- Conversion rate increased from 2.1% to 6.8%
- Time on page increased by 45%
- Support tickets decreased by 30%
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-22',
  category: 'Design',
  categoryColor: CATEGORY_COLORS.Design,
  readTime: '9 min read',
  readMinutes: 9,
  image:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop',
  slug: 'design-psychology-conversion',
  featured: false,
  tags: ['UX', 'Psychology', 'Conversion'],
};

export default post;

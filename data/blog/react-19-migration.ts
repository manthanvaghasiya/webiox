import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 2,
  title: 'React 19 Server Components: The Complete Migration Playbook',
  excerpt:
    'A battle-tested guide to upgrading your React applications, including RSC adoption patterns, streaming SSR integration, and our measured performance gains across 12 production apps.',
  content: `
## Why Server Components Matter

React Server Components fundamentally change how we think about the client-server boundary. Instead of shipping entire component trees to the browser, we can now keep data-fetching and heavy logic on the server.

### Migration Strategy

1. **Audit your component tree** — identify which components are purely presentational vs. interactive
2. **Mark client boundaries** — add 'use client' only where you need interactivity
3. **Move data fetching up** — lift fetch calls to server components
4. **Stream where possible** — use Suspense boundaries for progressive loading

### Performance Results

Across 12 production applications we migrated:
- **42% reduction** in JavaScript bundle size
- **2.1s improvement** in Time to Interactive
- **67% fewer** client-side API calls
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-28',
  category: 'Frontend',
  categoryColor: CATEGORY_COLORS.Frontend,
  readTime: '12 min read',
  readMinutes: 12,
  image:
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?q=80&w=2070&auto=format&fit=crop',
  slug: 'react-19-migration',
  featured: false,
  tags: ['React', 'Server Components', 'Migration'],
};

export default post;

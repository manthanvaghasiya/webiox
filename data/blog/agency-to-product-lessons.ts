import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 8,
  title: 'From Agency to Product: Lessons from Building Our Own SaaS',
  excerpt:
    'The unfiltered story of how our agency built a SaaS product on the side — including the financial model, time allocation strategy, and the 5 critical mistakes we made along the way.',
  content: `
## The Agency-to-Product Dream

Every agency dreams of building their own product. Recurring revenue, scalability, equity value. But the reality is harder than most expect.

### Why We Did It

- Client work is linear: more revenue = more hours
- Products compound: build once, sell forever
- Our team had deep domain expertise from years of client work

### The 5 Mistakes We Made

1. **Building too much** — We spent 6 months on v1 when 6 weeks would have been enough
2. **Not talking to users** — We assumed our client experience = market knowledge
3. **Underestimating marketing** — Great products don't sell themselves
4. **Neglecting client work** — Revenue dipped 30% during the build phase
5. **Perfect is the enemy of shipped** — We delayed launch twice for "polish"

### What Worked

- Dedicating fixed time blocks (Fridays + weekends)
- Using our own tech stack (faster development)
- Leveraging existing client relationships for beta users
- Starting with a micro-SaaS ($29/month, one core feature)

### The Numbers (Month 12)

- MRR: $4,200
- Customers: 180
- Churn: 3.2%
- LTV: $890
- ROI on time invested: positive after month 8
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-05',
  category: 'Strategy',
  categoryColor: CATEGORY_COLORS.Strategy,
  readTime: '15 min read',
  readMinutes: 15,
  image:
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
  slug: 'agency-to-product-lessons',
  featured: false,
  tags: ['SaaS', 'Business', 'Startup'],
};

export default post;

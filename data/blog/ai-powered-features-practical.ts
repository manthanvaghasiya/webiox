import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 6,
  title: 'Building AI-Powered Features Without the Hype: A Practical Guide',
  excerpt:
    'Cut through the noise. We share real implementation patterns for integrating LLMs, vector search, and intelligent automation into production apps — with honest cost and latency benchmarks.',
  content: `
## AI That Actually Ships

Everyone is talking about AI. Few are shipping it well. Here's what we've learned from integrating AI into 8 production applications.

### What Works

- **Smart search** — Vector embeddings + semantic search is a game-changer
- **Content generation** — Draft creation with human review loops
- **Classification** — Auto-tagging, sentiment analysis, intent detection
- **Summarization** — Turning long documents into actionable briefs

### What Doesn't (Yet)

- Fully autonomous decision-making in critical paths
- Replacing human judgment in nuanced scenarios
- "Just add AI" without clear problem definition

### Cost Reality Check

For a typical SaaS with 10K daily active users:
- OpenAI API costs: ~$200-500/month
- Vector database (Pinecone): ~$70/month
- Custom fine-tuning: One-time $500-2000
- Total ROI: 10x in reduced manual work
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-14',
  category: 'AI & ML',
  categoryColor: CATEGORY_COLORS['AI & ML'],
  readTime: '14 min read',
  readMinutes: 14,
  image:
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
  slug: 'ai-powered-features-practical',
  featured: false,
  tags: ['AI', 'LLM', 'Automation'],
};

export default post;

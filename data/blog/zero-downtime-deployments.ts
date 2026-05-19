import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 5,
  title: 'Zero-Downtime Deployments: Our CI/CD Pipeline Blueprint',
  excerpt:
    'How we built a deployment pipeline that ships to production 40 times a day with zero downtime, automatic rollbacks, and canary releases using GitHub Actions and Kubernetes.',
  content: `
## Shipping Without Fear

Deploying to production should be boring. If your team dreads deployments, your pipeline is broken.

### Our Pipeline Architecture

1. **PR opens** → Automated tests + preview deployment
2. **PR merges** → Build artifact + security scan
3. **Canary release** → 5% traffic for 10 minutes
4. **Health check passes** → Progressive rollout to 100%
5. **Anomaly detected** → Automatic rollback in < 60 seconds

### Key Technologies

- GitHub Actions for orchestration
- Docker + Kubernetes for containerization
- Datadog for real-time monitoring
- Argo Rollouts for progressive delivery

### Results

- 40+ deployments per day
- Zero downtime in 18 months
- Mean time to recovery: < 2 minutes
- Developer confidence: through the roof
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-18',
  category: 'DevOps',
  categoryColor: CATEGORY_COLORS.DevOps,
  readTime: '11 min read',
  readMinutes: 11,
  image:
    'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop',
  slug: 'zero-downtime-deployments',
  featured: false,
  tags: ['CI/CD', 'Kubernetes', 'DevOps'],
};

export default post;

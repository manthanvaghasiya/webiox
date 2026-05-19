import { type BlogPost, CATEGORY_COLORS } from './types';

const post: BlogPost = {
  id: 3,
  title: 'Database Optimization at Scale: From 2s to 20ms Query Times',
  excerpt:
    'Learn the indexing strategies, query planner tricks, and caching architectures we used to achieve sub-20ms response times on a 50M-row PostgreSQL database serving 100K RPM.',
  content: `
## The Problem

Our client's dashboard was loading in 2+ seconds. The PostgreSQL database had grown to 50 million rows, and queries that were once fast had become painfully slow.

### Root Cause Analysis

Using EXPLAIN ANALYZE, we identified three critical bottlenecks:
1. Missing composite indexes on frequently joined columns
2. Sequential scans on large tables due to outdated statistics
3. N+1 query patterns in the ORM layer

### The Solution

- Created targeted composite indexes reducing scan time by 95%
- Implemented Redis caching layer for frequently accessed aggregations
- Rewrote critical queries using CTEs and materialized views
- Set up pg_stat_statements monitoring for ongoing optimization

### Results

- Query times dropped from 2s to 20ms (100x improvement)
- Database CPU utilization reduced by 60%
- Application could handle 4x more concurrent users
  `,
  author: 'Manthan Vaghasiya',
  authorInitials: 'MV',
  authorRole: 'Founder & Lead Architect',
  date: '2026-04-25',
  category: 'Backend',
  categoryColor: CATEGORY_COLORS.Backend,
  readTime: '10 min read',
  readMinutes: 10,
  image:
    'https://images.unsplash.com/photo-1516321318423-f06f70a504f9?q=80&w=2070&auto=format&fit=crop',
  slug: 'saas-database-optimization',
  featured: false,
  tags: ['PostgreSQL', 'Caching', 'Performance'],
};

export default post;

export { type BlogPost, CATEGORY_COLORS } from './types';

import post1 from './web-architecture-future';
import post2 from './react-19-migration';
import post3 from './saas-database-optimization';
import post4 from './design-psychology-conversion';
import post5 from './zero-downtime-deployments';
import post6 from './ai-powered-features-practical';
import post7 from './web-vitals-masterclass';
import post8 from './agency-to-product-lessons';

export const blogPosts = [post1, post2, post3, post4, post5, post6, post7, post8];
export const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
export const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, limit = 3) {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return blogPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}

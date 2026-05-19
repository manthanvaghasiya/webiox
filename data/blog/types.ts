export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorInitials: string;
  authorRole: string;
  date: string;
  category: string;
  categoryColor: string;
  readTime: string;
  readMinutes: number;
  image: string;
  slug: string;
  featured: boolean;
  tags: string[];
}

export const CATEGORY_COLORS: Record<string, string> = {
  Architecture: '#6366f1',
  Frontend: '#0EA5E9',
  Backend: '#F59E0B',
  Design: '#EC4899',
  DevOps: '#10B981',
  'AI & ML': '#8B5CF6',
  Performance: '#EF4444',
  Strategy: '#0E5E64',
};

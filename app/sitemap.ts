import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // In a real application, you would dynamically fetch portfolio items, blog posts, etc.
  return [
    {
      url: 'https://webiox.tech',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://webiox.tech/services/business-websites',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://webiox.tech/services/custom-software',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://webiox.tech/services/ai-automation',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://webiox.tech/portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://webiox.tech/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  tech: string[];
  color: string;
  from: string;
  to: string;
}

export const services: Service[] = [
  {
    id: 'web-development',
    icon: '🌐',
    title: 'Enterprise Web',
    subtitle: 'High-performance digital flagships.',
    description: 'We engineer blazingly fast, highly secure, and infinitely scalable web applications. Optimized for both search engines and rigorous user demands. From initial architecture to production deployment, we handle it all.',
    benefits: ['Sub-second Load Times', 'Micro-frontend Architecture', 'Advanced SEO Optimization'],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    color: 'from-blue-600 to-cyan-500',
    from: 'blue-600',
    to: 'cyan-500'
  },
  {
    id: 'ecommerce-platforms',
    icon: '🛍️',
    title: 'Custom E-Commerce Platforms',
    subtitle: 'Scalable online stores built for high conversion.',
    description: 'Take your physical business online or upgrade your existing store. We build custom, secure shopping platforms that handle inventory, process payments seamlessly, and give you 100% ownership of your customer data.',
    benefits: ['Custom Shopping Carts', 'Secure Payments (Stripe/Razorpay)', 'Real-time Inventory Sync'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: 'from-emerald-500 to-teal-400',
    from: 'emerald-500',
    to: 'teal-400'
  },
  {
    id: 'saas-development',
    icon: '⚙️',
    title: 'SaaS Engineering',
    subtitle: 'End-to-end product lifecycles.',
    description: 'Architecting robust Multi-tenant SaaS platforms capable of handling millions of requests. We build the engines that run modern businesses with scalability, security, and stellar performance.',
    benefits: ['Multi-tenant Isolation', 'Metered Billing Systems', 'Real-time Analytics Dashboards'],
    tech: ['TypeScript', 'AWS', 'Stripe', 'Redis'],
    color: 'from-violet-500 to-purple-400',
    from: 'violet-500',
    to: 'purple-400'
  },
  {
    id: 'ai-solutions',
    icon: '🤖',
    title: 'AI & Automation',
    subtitle: 'Autonomous business logic.',
    description: 'Deploy custom Large Language Models and intelligent autonomous agents into your infrastructure. Transform static data into predictive workflows that save time and increase efficiency.',
    benefits: ['Custom RAG Pipelines', 'Autonomous Agents', 'Semantic Search'],
    tech: ['OpenAI', 'LangChain', 'Python', 'Pinecone'],
    color: 'from-purple-600 to-pink-500',
    from: 'purple-600',
    to: 'pink-500'
  },

];

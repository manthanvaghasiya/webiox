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
  image: string;
}

export const services: Service[] = [
  {
    id: 'web-development',
    icon: '🌐',
    title: 'Enterprise Web Engineering',
    subtitle: 'Lightning-fast digital flagships that convert visitors into buyers.',
    description: "We don't use generic drag-and-drop templates. We engineer custom, high-performance websites that load in milliseconds and rank at the top of Google. A faster, more reliable website directly translates to lower bounce rates, higher trust, and more revenue for your business.",
    benefits: ['Sub-second Load Times = Higher Conversions', 'Flawless Mobile Experience', 'Technical SEO Built-in'],
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    color: 'from-blue-600 to-cyan-500',
    from: 'blue-600',
    to: 'cyan-500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 'ecommerce-platforms',
    icon: '🛍️',
    title: 'High-Conversion E-Commerce',
    subtitle: 'Scalable storefronts designed to maximize your average order value.',
    description: "Stop losing sales to slow, clunky checkout processes. We build custom e-commerce platforms that handle massive traffic spikes seamlessly. You get full ownership of your customer data, zero platform lock-in, and a checkout flow engineered to minimize cart abandonment.",
    benefits: ['Frictionless 1-Click Checkouts', 'Custom Dashboards for Inventory', '100% Data Ownership'],
    tech: ['React', 'Stripe', 'Redis', 'PostgreSQL'],
    color: 'from-emerald-500 to-teal-400',
    from: 'emerald-500',
    to: 'teal-400',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'ai-solutions',
    icon: '🤖',
    title: 'AI & Workflow Automation',
    subtitle: 'Replace manual busywork with intelligent, autonomous systems.',
    description: "We integrate custom AI models directly into your business processes. From customer support bots that actually resolve issues, to internal tools that summarize documents in seconds. We help you cut operational costs and let your team focus on high-value work.",
    benefits: ['Slash Operational Costs', '24/7 Automated Customer Support', 'Eliminate Repetitive Tasks'],
    tech: ['OpenAI API', 'LangChain', 'Python', 'Pinecone'],
    color: 'from-purple-600 to-pink-500',
    from: 'purple-600',
    to: 'pink-500',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop'
  },
  {
    id: 'saas-development',
    icon: '⚙️',
    title: 'SaaS Product Engineering',
    subtitle: 'Robust web applications built to scale from Day 1.',
    description: "Whether you're an established enterprise or a funded startup, we build the complex engines that power your product. We design multi-tenant architectures that ensure your platform remains fast, secure, and available—even when thousands of users log in simultaneously.",
    benefits: ['Bank-Grade Security', 'Automated Subscription Billing', 'Scalable Multi-Tenant Architecture'],
    tech: ['TypeScript', 'AWS', 'Docker', 'MongoDB'],
    color: 'from-violet-500 to-purple-400',
    from: 'violet-500',
    to: 'purple-400',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    id: 'ui-ux-design',
    icon: '✨',
    title: 'UI/UX Design & Prototyping',
    subtitle: 'Premium interfaces that your users will instantly understand.',
    description: "Good design isn't just making things look pretty—it's about removing friction. We craft intuitive user journeys and stunning visual prototypes that wow investors and delight your customers, ensuring your product is as easy to use as it is powerful.",
    benefits: ['Higher User Retention', 'Interactive Clickable Prototypes', 'Modern & Accessible Design Systems'],
    tech: ['Figma', 'Framer', 'Tailwind CSS', 'Motion'],
    color: 'from-amber-500 to-orange-400',
    from: 'amber-500',
    to: 'orange-400',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'mobile-apps',
    icon: '📱',
    title: 'Custom Mobile Apps',
    subtitle: 'Native-feeling iOS and Android apps built for speed.',
    description: "Reach your customers wherever they are. We build cross-platform mobile applications that feel fully native, load instantly, and keep users engaged. Stop managing two separate codebases—we deliver high-performance apps for both the App Store and Google Play efficiently.",
    benefits: ['Cross-Platform Efficiency', 'Push Notifications & Re-engagement', 'App Store Optimization'],
    tech: ['React Native', 'Expo', 'Swift', 'Kotlin'],
    color: 'from-rose-500 to-red-400',
    from: 'rose-500',
    to: 'red-400',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop'
  }
];

export interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    tech: string[];
    image: string;
    modalImage: string;
    githubLink?: string;
    liveLink?: string;
}

export const categories = ['All', 'Web Development', 'SaaS Development', 'UI/UX Design', 'AI automation'];

export const allProjects: Project[] = [
    {
        id: 1,
        title: 'GovDoc Verify Platform',
        category: 'UI/UX Design',
        year: '2026',
        shortDescription: 'Automated document verification portal for streamlined government service applications.',
        fullDescription: "GovDoc Verify Platform is a comprehensive document verification system designed to streamline government service applications.\n\n• Engineered a verification flow that intelligently guides users through precise document requirements.\n• Significantly reduced application rejection rates with real-time compliance checking.\n• Designed a highly responsive UI optimized to improve public service accessibility at scale.\n• Deployed a scalable cloud architecture to handle high volumes of applications with minimal friction.",
        features: [
            'Intelligent document requirement checklists',
            'Real-time validation and compliance checking',
            'Highly responsive UI optimized for mobile accessibility',
            'Scalable cloud deployment architecture'
        ],
        tech: ['React', 'Node.js', 'Express', 'Vercel'],
        image: '/GovDocVerifyPlatform.png',
        modalImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
        githubLink: '#',
        liveLink: 'https://vercel.com'
    },
    {
        id: 2,
        title: 'DairyFlow ',
        category: 'SaaS Development',
        year: '2025',
        shortDescription: "A modern ERP-style platform helping dairy shops manage sales, credit (udhaar), and inventory.",
        fullDescription: "DairyFlow is a SaaS-style system built specifically for small and mid-size dairy businesses in India.\n\n• Developed a custom POS flow optimized for high-traffic morning/evening shifts.\n• Implemented a robust Udhaar (credit) tracking system replacing the traditional red book.\n• Designed real-time inventory tracking to reduce wastage on perishable items.\n• Built dashboards for daily revenue, top products, and customer behaviour using clean UI patterns.",
        features: [
            "POS interface tailored to dairy workflows",
            "Customer Udhaar & Ledger Management",
            "Inventory Alerts for Perishables",
            "Daily Revenue & Performance Insights",
        ],
        tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
        image: '/dairyflow.png',
        modalImage: '/dairyflow-full.png',
        githubLink: '#',
        liveLink: '#'
    },
    {
        id: 3,
        title: 'Surat BookCycle ',
        category: 'Web Development',
        year: '2026',
        shortDescription: "A hyper-local P2P marketplace connecting students to buy, sell, and exchange used textbooks.",
        fullDescription: "Surat BookCycle is a centralized book marketplace designed to reduce textbook waste and cost for students.\n\n• Designed and implemented a RESTful API using Node.js and Express to manage book listings and user operations.\n• Integrated secure authentication with JWT to protect user sessions and personal data.\n• Built a React.js frontend with instant search, filters, and detail pages for a smooth browsing experience.\n• Created a responsive user dashboard to manage listings (add, edit, delete) on both mobile and desktop.",
        features: [
            "Secure Login/Signup with JWT",
            "Search, Category & Filter Flow",
            "Book Listing Management (CRUD)",
            "Responsive UI for Students",
        ],
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        image: '/bookcycle.png',
        modalImage: '/bookcycle-full.png',
        githubLink: '#',
        liveLink: '#'
    },
    {
        id: 4,
        title: 'LifeOS ',
        category: 'SaaS Development',
        year: '2025',
        shortDescription: "An all-in-one personal operating system that combines financial tracking and habit consistency.",
        fullDescription: "LifeOS is a MERN-based productivity platform that unifies financial tracking and habit building into a single interface.\n\n• Built a financial analytics dashboard using Recharts (area and donut charts) to visualize income vs expense.\n• Implemented a GitHub-style habit tracker with optimistic UI updates for instant feedback.\n• Used MongoDB aggregations to calculate consistency, streaks, and financial summaries.\n• Secured the platform with JWT auth and role-based access for future extensibility.",
        features: [
            "Financial Analytics with Charts",
            "Habit Tracker with Consistency Logic",
            "Goal Setting & Notes",
            "MERN Stack Architecture",
        ],
        tech: ['React', 'Socket.io', 'Node.js', 'Express'],
        image: '/lifeos.png',
        modalImage: '/lifeos-full.png',
        githubLink: '#',
        liveLink: 'https://lifeos-by-manthan.vercel.app/'
    },
    {
        id: 5,
        title: 'Sadguru Car Surat',
        category: 'Web Development',
        year: '2024',
        shortDescription: "Surat's trusted pre-owned car dealership platform with robust inventory and staff management.",
        fullDescription: "Sadguru Car Melo is a comprehensive digital dealership platform built to streamline the buying, selling, and exchanging of pre-owned cars in Surat.\n\n• Integrated a dynamic vehicle inventory management system for 150+ certified cars.\n• Built a dedicated Staff Portal with PWA capabilities for on-the-go dealership management.\n• Optimized for high local search visibility using AutoDealer rich snippets and JSON-LD schema.\n• Designed a responsive, high-performance customer interface for browsing available inventory.",
        features: [
            "Dynamic Vehicle Inventory System",
            "Staff Admin Portal with PWA Support",
            "Advanced Local SEO & Rich Snippets",
            "Seamless Mobile-First UI/UX"
        ],
        tech: ['React', 'Vite', 'Node.js', 'Express'],
        image: '/sadguru.png',
        modalImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop',
        githubLink: '#',
        liveLink: 'https://sadgurucarsurat.com/'
    }
];

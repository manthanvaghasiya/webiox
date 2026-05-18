'use client';

import { motion } from 'framer-motion';

interface PortfolioFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const PortfolioFilter = ({ categories, activeCategory, setActiveCategory }: PortfolioFilterProps) => {
    return (
        <section className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 justify-center p-1.5 bg-brand-gray/50 backdrop-blur-md border border-gray-200/50 rounded-full w-fit mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${activeCategory === category ? 'text-brand-gray' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {activeCategory === category && (
                            <motion.div
                                layoutId="activeFilterBubble"
                                className="absolute inset-0 bg-gray-900 rounded-full -z-10 shadow-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {category}
                    </button>
                ))}
            </motion.div>
        </section>
    );
};

export default PortfolioFilter;

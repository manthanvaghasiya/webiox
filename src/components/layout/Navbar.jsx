import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const activeUserStyle = "text-brand-blue font-bold";
  const defaultUserStyle = "text-gray-600 hover:text-brand-blue font-medium transition-colors";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-blue text-brand-yellow p-2 rounded-lg group-hover:bg-blue-900 transition-colors shadow-lg">
              <Code2 size={24} />
            </div>
            <span className="font-black text-2xl tracking-tight text-brand-blue">
              Webiox<span className="text-brand-yellow">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeUserStyle : defaultUserStyle
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-brand-yellow text-brand-blue hover:bg-yellow-400 transition-all duration-300 rounded-full font-bold shadow-[0_0_15px_rgba(255,184,0,0.3)] hover:shadow-[0_0_20px_rgba(255,184,0,0.5)]"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-blue hover:text-blue-800 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl bg-brand-gray">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-bold ${
                      isActive
                        ? 'bg-brand-blue/10 text-brand-blue'
                        : 'text-gray-700 hover:bg-gray-100/50 hover:text-brand-blue font-medium'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-brand-yellow text-brand-blue rounded-md font-bold shadow-[0_0_15px_rgba(255,184,0,0.3)]"
                >
                  Start Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

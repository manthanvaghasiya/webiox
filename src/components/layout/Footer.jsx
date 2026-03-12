import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-20 pb-10 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group inline-flex">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Code2 size={24} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Webiox<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              We build digital experiences that transform businesses. Premium web development and design for modern brands.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors inline-block">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-primary transition-colors inline-block">Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors inline-block">Contact</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors inline-block">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services" className="hover:text-primary transition-colors inline-block">Web Development</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors inline-block">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors inline-block">SaaS Products</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors inline-block">API Integration</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors inline-block">AI Solutions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <span>123 Innovation Drive, Tech District, San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-primary shrink-0" size={20} />
                <a href="mailto:hello@webiox.agency" className="hover:text-primary transition-colors">hello@webiox.agency</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} Webiox Agency. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

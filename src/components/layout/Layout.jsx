import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add logic later if needed for route transitions
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden pt-20">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

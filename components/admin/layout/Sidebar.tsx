'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Briefcase } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Portfolio', href: '/admin/cms/portfolio', icon: Briefcase },
  { name: 'Services', href: '/admin/cms/services', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-full bg-[#0a0a0a] border-r border-white/10 text-gray-300">
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <span className="text-xl font-bold tracking-wider text-white">WEBIOX<span className="text-blue-500">.ADMIN</span></span>
      </div>
      
      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={twMerge(
                  clsx(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                    isActive
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )
                )}
              >
                <item.icon
                  className={twMerge(
                    clsx(
                      'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200',
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-white'
                    )
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex-shrink-0 p-4 border-t border-white/10">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 rounded-md hover:bg-white/5 hover:text-white">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
        <button className="flex items-center w-full px-3 py-2 mt-1 text-sm font-medium text-gray-400 transition-colors duration-200 rounded-md hover:bg-white/5 hover:text-red-400">
          <LogOut className="w-5 h-5 mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
}

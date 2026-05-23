'use client';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-black selection:bg-blue-500/30">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Topbar />
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

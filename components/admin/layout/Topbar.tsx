'use client';

import { Bell, Search } from 'lucide-react';

export function Topbar() {
  return (
    <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-[#0a0a0a] border-b border-white/10">
      <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-200">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full py-2 pl-8 pr-3 bg-transparent border-transparent text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search leads, projects..."
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center ml-4 md:ml-6">
          <button
            type="button"
            className="p-1 text-gray-400 bg-[#0a0a0a] rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-blue-500"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown Placeholder */}
          <div className="relative ml-3">
            <div>
              <button
                type="button"
                className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-blue-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
                  <span className="font-medium text-xs">AD</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

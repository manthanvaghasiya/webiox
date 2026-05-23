'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to external service
    console.error('Critical Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-6 bg-red-500/20 rounded-full border border-red-500/30">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Critical System Error
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-400">
            A fatal error occurred at the layout level. Our engineering team has been notified.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <button
              onClick={() => reset()}
              className="flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Attempt Recovery
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

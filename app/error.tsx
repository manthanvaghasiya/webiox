'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a production app, log this error to Sentry, Logtail, etc.
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-24 sm:py-32 lg:px-8 bg-[#F9FAFB]">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Something went wrong
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          We apologize for the inconvenience. An unexpected error has occurred in our system.
        </p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <button
            onClick={() => reset()}
            className="flex items-center rounded-md bg-[#0E5E64] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0b4a4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5E64]"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </button>
          <a href="/" className="text-sm font-semibold text-gray-900">
            Go back home <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

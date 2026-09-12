'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center shadow-lg">
        <AlertOctagon className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-4xl font-extrabold text-slate-800 tracking-wider">500</span>
        <h1 className="text-2xl font-extrabold text-slate-900">System Error Occurred</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          An unexpected error occurred while processing your request. Our technical monitoring team has been notified.
        </p>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <button
          onClick={() => reset()}
          className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { WardConnectAnimatedLoader } from '@/components/WardConnectAnimatedLoader';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="p-6 rounded-full bg-slate-900 shadow-xl border border-slate-800">
        <WardConnectAnimatedLoader size={90} />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-4xl font-extrabold text-slate-800 tracking-wider">404</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The requested ward page or link does not exist or has been moved.
        </p>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <Link
          href="/"
          className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}

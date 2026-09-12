'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const NetworkStatusListener: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Rely strictly on browser online/offline status
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleRetry = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsOffline(!navigator.onLine);
      setIsChecking(false);
    }, 500);
  };

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 text-white backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <div className="max-w-md w-full space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center animate-pulse">
          <WifiOff className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Network Connection Disconnected</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your internet connection was interrupted. Please check your network connection and retry.
          </p>
        </div>

        <button
          onClick={handleRetry}
          disabled={isChecking}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          <span>{isChecking ? 'Checking Connection...' : 'Retry Connection'}</span>
        </button>
      </div>
    </div>
  );
};

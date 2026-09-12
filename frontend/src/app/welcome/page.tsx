'use client';

import React from 'react';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useWard } from '@/context/WardContext';
import { WardConnectAnimatedLoader } from '@/components/WardConnectAnimatedLoader';

export default function WelcomePage() {
  const { setIsAuthModalOpen } = useWard();

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6 max-w-sm mx-auto flex flex-col items-center">
        {/* Animated Orbiting 3-Dots Loader Emblem */}
        <div className="p-6 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
          <WardConnectAnimatedLoader size={130} />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">WardConnect</h1>
        </div>

        {/* ONLY SIGN IN / REGISTER BUTTON */}
        <div className="pt-2 w-full">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign In / Register</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

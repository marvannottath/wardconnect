'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, PhoneCall, ArrowLeft, Plus, ShieldCheck, UserCheck } from 'lucide-react';
import { useWard } from '@/context/WardContext';

export default function MatrimonyPage() {
  const { userProfile, setIsAuthModalOpen } = useWard();

  const profiles = [
    {
      id: 1,
      gender: 'Bride (വധു)',
      age: 24,
      edu: 'M.Sc Computer Science',
      occ: 'Software Engineer (Kochi)',
      ward: 'Ward 22 South Trippanachi',
      contact: 'Parent: 9846112233',
    },
    {
      id: 2,
      gender: 'Groom (വരൻ)',
      age: 28,
      edu: 'B.Tech Civil Engineering',
      occ: 'Assistant Engineer (PWD Govt)',
      ward: 'Ward 22 Center',
      contact: 'Parent: 9447334455',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Ward Dashboard</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-600" />
            <span>Ward Matrimony & Marriage Alliance Desk</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Verified Local Matrimonial Listings for Panchayath Residents</p>
        </div>

        <button
          onClick={() => (!userProfile ? setIsAuthModalOpen(true) : null)}
          className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Register Proposal</span>
        </button>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-1">
        <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-rose-600" />
          <span>100% Verified Local Ward Proposals</span>
        </div>
        <p className="text-xs text-rose-800 leading-relaxed">
          വാർഡിലെ വിശ്വസനീയമായ വിവാഹ ആലോചനകൾ നേരിട്ട് പങ്കുവെക്കാനും ബന്ധപ്പെടാനുമുള്ള സുരക്ഷിത പ്ലാറ്റ്‌ഫോം.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {p.gender} • {p.age} Yrs
                </span>
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">{p.edu}</h3>
              <p className="text-xs font-semibold text-slate-700">Occupation: {p.occ}</p>
              <p className="text-xs text-slate-400">{p.ward}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{p.contact}</span>
              <a
                href={`tel:${p.contact.replace(/\D/g, '')}`}
                className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Family</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
